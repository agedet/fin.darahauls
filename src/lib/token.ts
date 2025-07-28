// This file handles the generation of unique tokens for email verification and password resets.

import { findUserByEmail, updateUser } from "@/app/api/db/routes"; // Import user management functions

/**
 * Generates a unique verification token for email verification.
 * In a real application, you might want to store this token in a database
 * along with an expiry date. For this example, it's stored directly on the user object.
 * @param email The user's email address.
 * @returns The generated 6-digit OTP.
 */
export const generateVerificationToken = async (email: string): Promise<string> => {
  // Generate a 6-digit OTP
  const token = Math.floor(100000 + Math.random() * 900000).toString();

  // In a real database, you'd save this token and its expiry to a dedicated table
  // or directly on the user record.
  const user = await findUserByEmail(email);
  
  if (user) {
    await updateUser(user.id, {
      emailVerificationToken: token,
      emailVerificationTokenExpires: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
    });
  } else {
    throw new Error("User not found for token generation.");
  }

  return token;
};

/**
 * Generates a unique password reset token.
 * @param email The user's email address.
 * @returns The generated token.
 */
export const generatePasswordResetToken = async (email: string): Promise<string> => {
  // Generate a 6-digit OTP
  const token = Math.floor(100000 + Math.random() * 900000).toString();

  // In a real database, you'd save this token and its expiry.
  const user = await findUserByEmail(email);

  if (user) {
    await updateUser(user.id, {
      passwordResetToken: token,
      passwordResetTokenExpires: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
    });
  } else {
    throw new Error("User not found for password reset token generation.");
  }

  return token;
};