export const GenderOptions = ["آقا", "خانم",];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "گواهی تولد",
  "گواهینامه رانندگی",
  "کارت/بیمه‌نامه پزشکی",
  "کارت شناسایی نظامی",
  "کارت ملی",
  "گذرنامه",
  "کارت اقامت (گرین کارت)",
  "کارت تأمین اجتماعی",
  "کارت شناسایی ایالتی",
  "کارت شناسایی دانشجویی",
  "کارت رأی‌دهی",
];


export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "جان گرین",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "لیلا کامرون",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "دیوید لیوینگستون",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "ایوان پیتر",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "جین پاول",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "الکس رمی‌رز",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "جاسمین لی",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "الیانا کروز",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "هاردیک شارما",
  },
];


export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};