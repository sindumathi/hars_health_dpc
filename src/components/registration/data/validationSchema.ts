import { z } from "zod";

export const personalDetailsSchema = z.object({
  name: z.string().min(3, "First name is required"),

  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  contactNumber: z
    .string()
    .regex(/^\d{10,}$/, "Must be at least 10 digits and numbers only")
    .or(z.literal(""))
    .optional(),

  patientId: z.string().min(3, "Patient ID is required"),

  dateOfBirth: z.string().min(3, "Date of birth is required"),

  gender: z
    .string()
    .min(1, "Please select a gender")
    .refine((value) => ["Male", "Female", "Transgender"].includes(value), {
      message: "Please select a valid gender",
    }),
});

export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;
