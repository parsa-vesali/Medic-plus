import StatCard from '@/components/StatCard'
import {columns, Payment} from '@/components/table/Columns';
import {DataTable} from '@/components/table/DataTable';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image'
import React from 'react'


const Admin = async () => {
    const appointments = await getRecentAppointmentList();

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <span className="flex items-center gap-2">
                    <Image
                        src='/assets/icons/logo-icon.svg'
                        height={1000}
                        width={1000}
                        alt="Logo"
                        className="w-fit"
                    />
                    <h2 className="font-Dana-Bold text-xl"> مدیک‌<span className=" text-sky-500">پلاس</span></h2>
                </span>
                <p className='text-2xl font-Dana-Medium'>داشبورد ادمین</p>

            </header>

            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h2 className='header'>خوش آمدید 👋</h2>
                    <p className='text-dark-700'>
                        مدیریت و سازماندهی نوبت‌های جدید را آغاز کنید.
                    </p>
                </section>

                <section className='admin-stat'>
                    <StatCard
                        type="appointments"
                        count={appointments.scheduledCount}
                        label="نوبت‌های زمان‌بندی‌شده"
                        icon={"/assets/icons/appointments.svg"}
                    />
                    <StatCard
                        type="pending"
                        count={appointments.pendingCount}
                        label="نوبت‌های در انتظار تأیید"
                        icon={"/assets/icons/pending.svg"}
                    />
                    <StatCard
                        type="cancelled"
                        count={appointments.cancelledCount} 
                        label="نوبت‌های لغوشده"
                        icon={"/assets/icons/cancelled.svg"}
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents} />
            </main>
        </div>
    )
}

export default Admin