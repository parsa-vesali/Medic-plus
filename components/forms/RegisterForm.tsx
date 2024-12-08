"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { PatientFormValidation, UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser, registerPatient } from '@/lib/actions/patient.actions'
import { FormFieldType } from './PatientForm'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constant'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import FileUploader from '../FileUploader'


const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);
        // Store file info in form data as
        let formData;
        if (
            values.identificationDocument &&
            values.identificationDocument?.length > 0
        ) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.identificationDocument[0].name);
        }
        try {
            const patient = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            // @ts-ignore
            const newPatient = await registerPatient(patient);
            if (newPatient) {
                router.push(`/patients/${user.$id}/new-appointment`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='mb-12 space-y-2'>
                    <h1 className='text-2xl font-Dana-Medium'>کاربر گرامی، خوش آمدید 👋</h1>
                    <p className='text-dark-600'>لطفاً اطلاعات خود را به درستی وارد نمایید.</p>
                </section>
                <section className='space-y-6'>
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>اطلاعات شخصی</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        label="نام و نام خانوادگی"
                        placeholder="نام کامل خود را وارد کنید"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    {/* EMAIL & PHONE */}
                    <div className="input-wrapp">

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="ایمیل"
                            placeholder="ایمیل خود را وارد کنید"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="شماره تلفن"
                            placeholder="شماره تلفن خود را وارد کنید"
                        />

                    </div>

                    {/* BirthDate & Gender */}
                    <div className="input-wrapp">
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="تاریخ تولد"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="جنسیت"
                            placeholder="شماره تلفن خود را وارد کنید"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup dir='rtl' className='flex h-11 gap-6 xl:justify-between' onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option) => (
                                            <div className="radio-group" key={option}>
                                                <RadioGroupItem value={option} id='option' />
                                                <Label htmlFor={option} className='cursor-pointer'>{option}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>
                </section>

                {/* Address & Occupation */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="آدرس"
                        placeholder="آدرس محل سکونت خود را وارد کنید."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="شغل"
                        placeholder="شغل خود را وارد کنید"
                    />
                </div>
                {/* Emergency Contact Name & Emergency Contact Number */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="نام همراه "
                        placeholder="نام همراه خود را وارد کنید"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="شماره تماس اضطراری"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <section className='space-y-6'>
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>اطلاعات پزشکی</h2>
                    </div>
                </section>

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
                {/* INSURANCE & POLICY NUMBER */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="شرکت بیمه"
                        placeholder="نام بیمه خود را وارد کنید."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="شماره بیمه"
                        placeholder="شماره بیمه خود را وارد کنید."
                    />
                </div>

                {/* ALLERGY & CURRENT MEDICATIONS */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="آلرژی‌ها (در صورت وجود)"
                        placeholder="مثال : پنی‌سیلین، گرده گل"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="داروهای فعلی (در صورت وجود)"
                        placeholder="نام داروی فعلی خود را وارد کنید."
                    />
                </div>

                {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="سابقه بیماری خانوادگی (در صورت مرتبط بودن)"
                        placeholder=""
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="سابقه بیماری گذشته"
                        placeholder=""
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">شناسایی و تأیید هویت</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="نوع مدرک شناسایی"
                        placeholder="نوع مدرک شناسایی را انتخاب کنید"
                    >
                        {IdentificationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="شماره ملی"
                        placeholder="شماره ملی خود را وارد کنید."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="مدرک شناسایی"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />

                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">رضایت و حریم خصوصی</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="رضایت می‌دهم که برای شرایط سلامتی‌ام درمان دریافت کنم."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="رضایت می‌دهم که اطلاعات سلامتی من برای اهداف درمانی استفاده و افشا شود."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="تایید می‌کنم که سیاست حفظ حریم خصوصی را بررسی کرده و با آن موافقم."
                    />
                </section>


                <SubmitButton isLoading={isLoading}>ادامه </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm