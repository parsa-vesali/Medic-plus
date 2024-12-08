"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
import { FormFieldType } from './PatientForm'
import { Doctors } from '@/constant'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { createAppointment, updateAppointment } from '@/lib/actions/appointment.actions'
import { Appointment } from '@/types/appwrite.types'



const AppointmentForm = ({ userId, patientId, type, appointment, setOpen }:
  {
    userId: string,
    patientId: string,
    type: 'create' | 'cancel' | 'schedule',
    appointment?: Appointment,
    setOpen?: (open: boolean) => void,
  }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);
        if (newAppointment) {
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "لغو نوبت";
      break;
    case "schedule":
      buttonLabel = "زمان‌بندی نوبت";
      break;
    default:
      buttonLabel = "ثبت نوبت";
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        {type === 'create' && (
          <section className='mb-12 space-y-2'>
            <h1 className='text-2xl font-Dana-Medium'>درخواست نوبت 🏥</h1>
            <p className='text-dark-600'>لطفاً اطلاعات خود را وارد نمایید.</p>
          </section>
        )}


        {type !== 'cancel' && (
          <>
            {/* PRIMARY CARE PHYSICIAN */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="نام پزشک "
              placeholder="نام پزشک خود را وارد کنید"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="تاریخ و ساعت مورد نظر"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            <div className="input-wrapp">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="دلیل مراجعه"
                placeholder="مثال : چکاپ ماهانه"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="توضیحات / یادداشت‌ها"
                placeholder="مثال : ترجیحاً وقت‌های بعدازظهر"
                disabled={type === "schedule"}
              />

            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="دلیل لغو"
            placeholder="یک جلسه فوری پیش آمد"
          />

        )}


        <SubmitButton isLoading={isLoading} className={` w-full ${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'}`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm