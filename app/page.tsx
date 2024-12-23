import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams} : SearchParamProps) {

  const isAdmin = searchParams.admin === 'true'
  

  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP */}
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px] justify-start">
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

          <PatientForm />

          <div className="text-sm mt-10 flex flex-col md:flex-row items-center md:justify-between ">
            <p className="text-dark-600">
              &copy; {new Date().getFullYear()} مدیک پلاس. تمامی حقوق محفوظ است.
            </p>
            <Link href="/?admin=true" className="text-sky-500 font-Dana-Medium">
              پنل ادمین
            </Link>
          </div>
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
  );
}
