import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image'
import React from 'react'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container  ">
                <div className="sub-container max-w-[860px] flex-1 justify-between ">
                    <span className="flex items-center gap-2 mb-8">
                        <Image
                            src='/assets/icons/logo-icon.svg'
                            height={1000}
                            width={1000}
                            alt="Logo"
                            className="w-fit"
                        />
                        <h2 className="font-Dana-Bold text-2xl"> مدیک‌<span className=" text-sky-500">پلاس</span></h2>
                    </span>

                    <AppointmentForm
                        patientId={patient?.$id}
                        userId={userId}
                        type="create"
                    />

                    <p className="copyright py-12">
                        &copy; {new Date().getFullYear()} مدیک پلاس. تمامی حقوق محفوظ است.
                    </p>
                </div>
            </section>


            <Image
                src='/assets/images/appointment-img.png'
                height={1000}
                width={1000}
                alt="Appointment"
                className="side-img max-w-[390px]"
            />

        </div>
    )
}

export default NewAppointment 