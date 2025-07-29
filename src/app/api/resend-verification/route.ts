import connectDB from "@/lib/db";
import { NextResponse } from "next/server"
import Profile from "../models/UserModel";
import { resendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        await connectDB();

        const user = await Profile.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.emailVerified) {
            return NextResponse.json({ message: "Email is already verified" }, { status: 400 });
        }

        // Generate new verification token
        const token = await generateVerificationToken(email);
        
        // Try to resend verification email
        try {
            await resendVerificationEmail(email, token);
        } catch (emailError) {
            console.warn("Email sending failed:", emailError);
            return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 });
        }

        return NextResponse.json(
            { message: "Verification email sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Resend verification error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
} 