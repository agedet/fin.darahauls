// --- Helper functions for MongoDB user store ---
// These functions now interact with Mongoose.

import connectDB from "@/lib/db";
import Profile from "../models/UserModel";
import bcrypt from "bcryptjs";
import { User } from "../../../../types/next-auth";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  await connectDB();
  const user = await Profile.findOne({ email });
  return user ? user.toObject() as User : null; // Convert Mongoose document to plain object
};

export const findUserById = async (id: string): Promise<User | null> => {
  await connectDB();
  const user = await Profile.findById(id);
  return user ? user.toObject() as User : null;
};

export const createUser = async (user: Omit<User, "id" | "passwordHash" | "createdAt" | "updatedAt"> & { passwordPlain: string }): Promise<User> => {
  await connectDB();
  const passwordHash = await bcrypt.hash(user.passwordPlain, 10);
  const newUser = new Profile({
    ...user,
    passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await newUser.save();
  console.log("User created:", newUser.email);
  return newUser.toObject() as User;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  await connectDB();
  const updatedUser = await Profile.findByIdAndUpdate(
    userId,
    { ...updates, updatedAt: new Date() },
    { new: true } // Return the updated document
  );
  if (updatedUser) {
    console.log("User updated:", updatedUser.email, updates);
    return updatedUser.toObject() as User;
  }
  return null;
};

// Function to find a user by their verification token
export const findUserByVerificationToken = async (token: string): Promise<User | null> => {
  await connectDB();
  const user = await Profile.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpires: { $gt: new Date() }, // Check if token is not expired
  });
  return user ? user.toObject() as User : null;
};

// Function to find a user by their password reset token
export const findUserByPasswordResetToken = async (token: string): Promise<User | null> => {
  await connectDB();
  const user = await Profile.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: new Date() }, // Check if token is not expired
  });
  return user ? user.toObject() as User : null;
};