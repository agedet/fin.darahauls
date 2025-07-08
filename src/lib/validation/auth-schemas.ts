// This file defines Zod schemas for validating various authentication forms.

import { z } from "zod";

// --- Registration Schemas ---

export const registrationStep1Schema = z.object({
  firstName: z.string().min(2, "First name is required and must be at least 2 characters."),
  lastName: z.string().min(2, "Last name is required and must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g., +1234567890)."),
});

export const registrationStep2Schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to the field that caused the error
});

export const registrationStep3Schema = z.object({
  gender: z.enum(["Male", "Female"], { message: "Please select a gender." }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
    invalid_type_error: "Invalid date format.",
  }).max(new Date(), "Date of birth cannot be in the future."), // Ensure DOB is not in the future
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
});

// Combined schema for full registration (used for server-side validation if needed)
export const fullRegistrationSchema = registrationStep1Schema
  .and(registrationStep2Schema)
  .and(registrationStep3Schema);

// --- Login Schema ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

// --- Forgot Password Schema ---
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address."),
});

// --- Reset Password Schema ---
export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

// --- User Type Definition (for consistent data structure) ---
// This type should align with your database schema
export type User = z.infer<typeof fullRegistrationSchema> & {
  id: string;
  passwordHash: string;
  role: "user" | "rider" | "admin" | "accounts" | "manager";
  emailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetTokenExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};