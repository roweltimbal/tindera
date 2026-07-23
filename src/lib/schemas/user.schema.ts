// Zod schema for user validation
import { z } from "zod"

// Sign-in form schema (validated in actions.ts against raw user input)
export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})
export type SignInSchema = z.infer<typeof signInSchema>

// Sign-up form schema (validated in actions.ts against raw user input)
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Enter a valid email address."),
    storeName: z.string().min(1, "Store name is required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })
export type SignUpSchema = z.infer<typeof signUpSchema>
