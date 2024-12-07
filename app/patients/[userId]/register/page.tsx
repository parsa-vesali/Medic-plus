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
                    {/* LOGO */}
                    <Link href='/' className="flex items-center gap-1 mb-10">
                        <Image
                            src='/assets/icons/logo-icon.svg'
                            height={1000}
                            width={1000}
                            alt="Logo"
                            className="w-10"
                        />
                        <h2 className="font-Dana-Bold text-2xl"> مدیک‌<span className=" text-sky-500">پلاس</span></h2>
                    </Link>

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
                className="side-img max-w-[380px]"
            />

        </div>
    )
}

export default Register