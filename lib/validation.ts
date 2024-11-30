import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
  email: z.string().email("ایمیل وارد شده معتبر نیست"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "شماره تلفن وارد شده معتبر نیست"
    ),
});
