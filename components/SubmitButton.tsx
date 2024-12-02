import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode,
}
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
    return (
        <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full p-5'}>
            {isLoading ? (
                <div className="flex items-center g-4">
                    درحال بارگذاری
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="animate-spin mr-2"
                    />
                </div>
            ) : (children)}
        </Button>
    )
}

export default SubmitButton