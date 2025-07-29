import connectDB from "@/lib/db";
import { NextResponse } from "next/server"
import Profile from "../models/UserModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";


export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { email, password, firstName, lastName, phoneNumber, dob, country, gender, state } = body;

        await connectDB();

        const existingUser = await Profile.findOne({ email});

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user first
        const newUser = new Profile({
            firstName,
            lastName,
            fullname: `${firstName} ${lastName}`,
            phoneNumber,
            email,
            password: hashedPassword,
            dateOfBirth: dob,
            country,
            state, 
            gender: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(),
            role: "user",
        });

        await newUser.save();

        // Now generate the verification token after user is created
        const token = await generateVerificationToken(email);
        
        // Try to send verification email, but don't fail if email is not configured
        try {
            // Check if email configuration is available
            if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
                await sendVerificationEmail(email, token);
            } else {
                console.warn("Email configuration not found. Skipping email sending in development mode.");
                console.log("Verification code for testing:", token);
            }
        } catch (emailError) {
            console.warn("Email sending failed, but user was created successfully:", emailError);
            console.log("Verification code for testing:", token);
            // Continue with registration even if email fails
        }

        return NextResponse.json(
            {message: "Account created successfully. Please check your email to verify your account."},
            {status: 200 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : "An unknown error occurred" },
            { status: 500 }
        )
    }
}