import connectDB from "@/lib/db";
import Profile from "../models/UserModel";

export async function GET(req: Request) {
    await connectDB();

    const token = new URL(req.url).searchParams.get("token");

    if (!token) {
        return new Response("Missing token", { status: 400 });
    }

    const user = await Profile.findOne({ 
        verificationToken: token 
    });

    if (!user) {
        return new Response("Invalid token", { status: 400 });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return new Response("Email verified");
}
