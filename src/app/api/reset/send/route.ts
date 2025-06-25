import connectDB from "@/lib/db";
import Profile from "../../models/UserModel";
import { generateToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";


export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    await connectDB();

    const user = await Profile.findOne({ email: email });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    const token = generateToken();

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    await user.save();

    await sendPasswordResetEmail(user.email, token);

    return new Response("Reset email sent", { status: 200 });
}

