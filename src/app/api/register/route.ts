import connectDB from "@/lib/db";
import { NextResponse } from "next/server"
import Profile from "../models/UserModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";


export const POST = async (request: any) => {
    try {
        const body = await request.json();
        const { email, password, firstName, lastName, phoneNumber, dob, country } = body;

        await connectDB();

        const existingUser = await Profile.findOne({ email});

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = await generateVerificationToken(email);

        const newUser = new Profile({
            firstName,
            lastName,
            fullname: `${firstName} ${lastName}`,
            phoneNumber,
            email,
            password: hashedPassword,
            dob,
            country,
            userRole: "user", // Default role
            verificationToken: token,
        });

        await newUser.create();
        await sendVerificationEmail(email, token);

        return NextResponse.json(
            {message: "Account created. Please check your email to verify your account."},
            {status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : "An unknown error occurred" },
            { status: 500 }
        )
    }
}