import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen md:overflow-y-hidden">
      {/* OTP */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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

          <PatientForm />

          <div className="text-sm mt-10 flex items-center justify-between ">
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
        src='/assets/images/bg.jpg'
        height={1000}
        width={1000}
        alt="Patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
