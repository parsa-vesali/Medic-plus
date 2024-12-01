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
import { GenderOptions } from '@/constant'
import { Label } from '../ui/label'


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
                                    <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange={field.onChange}
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
                        label="Address"
                        placeholder="14 street, New york, NY - 5101"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder=" Software Engineer"
                    />
                </div>
                {/* Emergency Contact Name & Emergency Contact Number */}
                <div className="input-wrapp">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <section className='space-y-6'>
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>اطلاعات پزشکی</h2>
                    </div>
                </section>
                {/* PRIMARY CARE PHYSICIAN */}
                {/* INSURANCE & POLICY NUMBER */}
                {/* ALLERGY & CURRENT MEDICATIONS */}
                {/* FAMILY MEDICATION & PAST MEDICATIONS */}



                {/* <SubmitButton isLoading={isLoading}>ادامه </SubmitButton> */}
            </form>
        </Form>
    )
}

export default RegisterForm