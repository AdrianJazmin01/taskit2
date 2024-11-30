import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1,"Required")
})


export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  confirmPassword: z
    .string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})


export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})