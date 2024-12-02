"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
import { FormFieldType } from './PatientForm'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, GenderOptions, IdentificationTypes } from '@/constant'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import FileUploader from '../FileUploader'


const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const userData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            const user = await createUser(userData);

            if (user) {
                router.push(`/patients/${user.$id}/register`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-4'>
                    <h1 className='text-2xl'>به دنیای سلامت خوش آمدید 💙</h1>
                    <p className='text-dark-700'>برای ادامه، لطفاً اطلاعات خود را ثبت نمایید.</p>
                </section>

                <section className='space-y-6'>
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>اطلاعات شخصی</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        placeholder="نام خود را وارد کنید"
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
                        placeholder="خیابان 14، نیویورک، NY - 5101"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="شغل"
                        placeholder="مهندس نرم‌افزار"
                    />
                </div>
                {/* Emergency Contact Name & Emergency Contact Number */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="نام تماس اضطراری"
                        placeholder="نام سرپرست"
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
                        placeholder="بیمه ایران"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="شماره بیمه‌نامه"
                        placeholder="۱۲۳۴۵۶۷۸۹"
                    />
                </div>

                {/* ALLERGY & CURRENT MEDICATIONS */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="آلرژی‌ها (در صورت وجود)"
                        placeholder="بادام‌زمینی، پنی‌سیلین، گرده گل"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="داروهای فعلی"
                        placeholder="ایبوپروفن ۲۰۰ میلی‌گرم، لووتیروکسین ۵۰ میکروگرم"
                    />
                </div>

                {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="سابقه پزشکی خانوادگی (در صورت مرتبط بودن)"
                        placeholder="مادر سرطان مغز داشت، پدر فشار خون دارد"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="سابقه پزشکی گذشته"
                        placeholder="عمل آپاندیس در سال ۲۰۱۵، آسم از دوران کودکی"
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
                        label="نوع شناسایی"
                        placeholder="نوع شناسایی را انتخاب کنید"
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
                        label="شماره شناسایی"
                        placeholder="123456789"
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