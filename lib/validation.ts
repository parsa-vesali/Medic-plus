import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
  email: z.string().email("آدرس ایمیل نامعتبر است"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{12}$/.test(phone), "شماره تلفن نامعتبر است"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
  email: z.string().email("آدرس ایمیل نامعتبر است"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{12}$/.test(phone), "شماره تلفن نامعتبر است"),
  birthDate: z.coerce.date(),
  gender: z.enum(["آقا", "خانوم"]),
  address: z
    .string()
    .min(5, "آدرس باید حداقل ۵ کاراکتر باشد")
    .max(500, "آدرس باید حداکثر ۵۰۰ کاراکتر باشد"),
  occupation: z
    .string()
    .min(2, "شغل باید حداقل ۲ کاراکتر باشد")
    .max(500, "شغل باید حداکثر ۵۰۰ کاراکتر باشد"),
  emergencyContactName: z
    .string()
    .min(2, "نام تماس اضطراری باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام تماس اضطراری باید حداکثر ۵۰ کاراکتر باشد"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{12}$/.test(emergencyContactNumber),
      "شماره تماس اضطراری نامعتبر است"
    ),
  primaryPhysician: z.string().min(2, "لطفاً حداقل یک پزشک انتخاب کنید"),
  insuranceProvider: z
    .string()
    .min(2, "نام بیمه باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام بیمه باید حداکثر ۵۰ کاراکتر باشد"),
  insurancePolicyNumber: z
    .string()
    .min(2, "شماره بیمه‌نامه باید حداقل ۲ کاراکتر باشد")
    .max(50, "شماره بیمه‌نامه باید حداکثر ۵۰ کاراکتر باشد"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "باید برای درمان رضایت دهید",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "باید برای افشای اطلاعات رضایت دهید",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "باید برای حریم خصوصی رضایت دهید",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "لطفاً حداقل یک پزشک انتخاب کنید"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "دلیل باید حداقل ۲ کاراکتر باشد")
    .max(500, "دلیل باید حداکثر ۵۰۰ کاراکتر باشد"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "لطفاً حداقل یک پزشک انتخاب کنید"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "لطفاً حداقل یک پزشک انتخاب کنید"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "دلیل لغو باید حداقل ۲ کاراکتر باشد")
    .max(500, "دلیل لغو باید حداکثر ۵۰۰ کاراکتر باشد"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
