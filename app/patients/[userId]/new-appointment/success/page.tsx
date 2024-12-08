import { Button } from '@/components/ui/button';
import { Doctors } from '@/constant';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId)
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)


    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className="success-img ">
                {/* LOGO */}
                <Link href='/' className="flex items-center gap-1 mb-8">
                    <Image
                        src='/assets/icons/logo-icon.svg'
                        height={1000}
                        width={1000}
                        alt="Logo"
                        className="w-10"
                    />
                    <h2 className="font-Dana-Bold text-2xl"> مدیک‌<span className=" text-sky-500">پلاس</span></h2>
                </Link>

                <section className='flex flex-col items-center'>
                    <Image
                        src='/assets/gifs/success.gif'
                        height={280}
                        width={260}
                        className='mb-6'
                        alt='Success'
                    />
                    <h2 className='header mb-2 max-w-[600px] text-center'>
                        درخواست <span className="text-sky-500">نوبت شما</span> با موفقیت ثبت شد!
                    </h2>
                    <p className='text-dark-600'>کاربر گرامی , به زودی برای تأیید نوبت با شما تماس خواهیم گرفت.</p>
                </section>


                <section className='request-details'>
                    <p>جزئیات نوبت درخواستی:</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            alt='doctor'
                            height={100}
                            width={100}
                            className='size-6'
                        />
                        <p className='whitespace-nowrap'>دکتر {doctor?.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Image
                            src='/assets/icons/calendar.svg'
                            alt='calendar'
                            height={24}
                            width={24}
                            className='mb-1'
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant="outline" className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        ثبت نوبت جدید
                    </Link>
                </Button>

            </div>
        </div>
    )
}

export default Success