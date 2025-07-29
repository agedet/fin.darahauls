import { } from "next-auth";
import { JWT } from "next-auth/jwt";
import { z } from "zod";
import {
  registrationStep1Schema,
  registrationStep2Schema,
  registrationStep3Schema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validation/auth-schemas"; // Import schemas

interface Credentials {
  email: string;
  password: string;
  role: string;
}

// User Type (should match your database schema)
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string; // Stored hashed password
  gender: "Male" | "Female";
  dateOfBirth: Date;
  country: string;
  state: string;
  role: "user" | "rider" | "admin" | "accounts" | "manager"; // User roles
  emailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetTokenExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add role to session user
      emailVerified?: boolean; // Add emailVerified to session user
    };
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string; // Add role to the User type
    emailVerified: boolean; // Add emailVerified to the User type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email: string;
    role?: string; // Add role to JWT
    emailVerified?: boolean; // Add emailVerified to JWT
  }
}

// Form Data Types
export type RegistrationStep1FormData = z.infer<typeof registrationStep1Schema>;
export type RegistrationStep2FormData = z.infer<typeof registrationStep2Schema>;
export type RegistrationStep3FormData = z.infer<typeof registrationStep3Schema>;
export type RegisterFormData = RegistrationStep1FormData &
  RegistrationStep2FormData &
  RegistrationStep3FormData;

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
