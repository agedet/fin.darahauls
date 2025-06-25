import connectDB from "@/lib/db";
import Profile from "../../models/UserModel";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return new Response("Token and password are required", { status: 400 });
    }

    await connectDB();

    const user = await Profile.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: new Date() } // Check if token is still valid
    });

    if (!user) {
        return new Response("Invalid or expired token", { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10); 
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return new Response("Password reset successfully", { status: 200 });
}