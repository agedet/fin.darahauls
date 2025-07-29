import connectDB  from "@/lib/db";
import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Profile from "@/app/api/models/UserModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" as const },
                password: { label: "Password", type: "password" as const },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;                    
                }

                await connectDB();

                try {
                    // Check if the user exists
                    const user = await Profile.findOne({
                        email: credentials.email
                    });

                    if (!user) {
                        throw new Error("CredentialsSignin");
                    }

                    // Check if email is verified
                    if (!user.emailVerified) {
                        throw new Error("EmailNotVerified");
                    }

                    // Verify password
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password as string
                    );
                
                    if (!isPasswordValid) {
                        throw new Error("CredentialsSignin");
                    }

                    console.log("User found:", user);
                    return user;

                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw error; 
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async signIn({ user, account }: { 
                user: AuthUser | any; 
                account?: Account | null;
                profile?: any;
                email?: { verificationRequest?: boolean };
                credentials?: Record<string, any>;
            }
        ) {
            // If using credentials, ensure email is verified (Date or boolean)
            if (account?.provider === "credentials") {
                // Accept both boolean and Date types for emailVerified
                if (
                    typeof user.emailVerified === "boolean"
                        ? user.emailVerified
                        : !!user.emailVerified // Date or null
                ) {
                    return true;
                }
                return false;
            }

            return false;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.emailVerified = typeof user.emailVerified === "boolean"
                    ? user.emailVerified
                    : user.emailVerified
                        ? true
                        : undefined;
            }

            if (trigger === "update" && session?.emailVerified !== undefined ) {
                token.emailVerified = session.emailVerified;
            }

            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.emailVerified = token.emailVerified;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/error",
        verifyRequest: "/verify",
    },
})

