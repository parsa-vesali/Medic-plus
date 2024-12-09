import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatCardProps {
    type: 'appointments' | 'pending' | 'cancelled',
    label: string,
    icon: string,
    count: number
}

const StatCard = ({ type, label, icon, count }: StatCardProps) => {
    return (
        <div className="stat-card">
            <span className='size-12 flex items-center justify-center bg-dark-300 rounded-xl'>
                <Image
                    src={icon}
                    alt={label}
                    height={32}
                    width={32}
                    className='size-8 w-fit'
                />
            </span>
            <div className='space-y-2'>
                <p className='text-14-regular'>
                    {label}
                </p>
                <h2 className='text-2xl font-Dana-Bold text-zinc-200'>{count}</h2>
            </div>
        </div>
    )
}

export default StatCard