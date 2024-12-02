import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {

    const user = await getUser(userId)
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px]">
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

                    <RegisterForm user={user} />

                    
                        <p className="copyright py-12">
                            &copy; {new Date().getFullYear()} مدیک پلاس. تمامی حقوق محفوظ است.
                        </p>
                    
                </div>
            </section>

            <Image
                src='/assets/images/register-img.png'
                height={1000}
                width={1000}
                alt="Patient"
                className="side-img  max-w-[390px]"
            />

        </div>
    )
}

export default Register