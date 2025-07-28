import connectDB from "@/lib/db";
import Profile from "../models/UserModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();

        const token = new URL(req.url).searchParams.get("token");

        if (!token) {
            return NextResponse.json({ message: "Missing verification code" }, { status: 400 });
        }

        // Find user by emailVerificationToken and check if it's not expired
        const user = await Profile.findOne({ 
            emailVerificationToken: token,
            emailVerificationTokenExpires: { $gt: new Date() } // Check if token is not expired
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired verification code" }, { status: 400 });
        }

        // Mark email as verified and clear the token
        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpires = undefined;

        await user.save();

        return NextResponse.json({ 
            message: "Email verified successfully",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                emailVerified: user.emailVerified
            }
        });

    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
