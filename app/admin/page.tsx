import StatCard from '@/components/StatCard'
import { columns, } from '@/components/table/Columns';
import { DataTable } from '@/components/table/DataTable';
import { Input } from '@/components/ui/input';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { HiOutlineArrowLeftStartOnRectangle, HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import { ImCommand } from "react-icons/im";


const Admin = async () => {
    const appointments = await getRecentAppointmentList();

    return (
        <div className='mx-auto flex lg:max-w-6xl flex-col space-y-10 '>
            <header className='admin-header container'>
                <Link href='/' className="flex items-center gap-1">
                    <Image
                        src='/assets/icons/logo-icon.svg'
                        height={1000}
                        width={1000}
                        alt="Logo"
                        className="w-8"
                    />
                    <h2 className="font-Dana-Bold text-xl"> مدیک‌<span className=" text-sky-500">پلاس</span></h2>
                </Link>

                <button className='hidden lg:flex mr-14 relative  h-10 px-3 bg-dark-200 items-center justify-center rounded-xl cursor-pointer'>
                    <ImCommand className='w-5 h-5 text-dark-600' />
                    <Input
                        type='search'
                        className='search-input'
                        placeholder='جستجو ...' />
                </button>

                <div className="flex items-center gap-x-3">
                    <span className='relative w-10 h-10 flex items-center justify-center bg-dark-200 rounded-xl cursor-pointer'>
                        <HiOutlineBell className='w-6 h-6 text-zinc-200' />
                        <span className="absolute top-0 left-0 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                    </span>
                    <span className='relative w-10 h-10 flex items-center justify-center bg-dark-200 rounded-xl cursor-pointer'>
                        <HiOutlineUser className='w-6 h-6 text-zinc-200' />
                    </span>
                    <Link href='/' className='relative px-3 h-10 flex gap-x-1 items-center justify-center bg-dark-200 rounded-xl cursor-pointer'>
                        <HiOutlineArrowLeftStartOnRectangle className='w-6 h-6 text-zinc-200' />
                        <p className='text-sm'>خروج</p>
                    </Link>
                </div>
            </header>

            <main className='admin-main container'>
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

                <section className='w-full'>
                    <DataTable columns={columns} data={appointments.documents} />
                </section>
            </main>

        </div>
    )
}

export default Admin