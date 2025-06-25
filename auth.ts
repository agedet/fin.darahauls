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
                    // Check if the user exists and email is verified
                    const user = await Profile.findOne({
                        email: credentials.email
                    });

                    if (!user || !user.emailVerified) {
                        throw new Error("Invalid email or unverified email");
                    }

                    if (user) {
                        const isPasswordValid = await bcrypt.compare(
                            credentials.password as string,
                            user.password as string
                        );
                    
                        if (!isPasswordValid) {
                            throw new Error("Invalid password");
                        } else {
                            return user;
                        }
                    }

                    console.log("User found:", user);

                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error("Invalid credentials"); 
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async signIn({ user, account}: { 
                user: AuthUser; 
                account?: Account | null;
                credentials?: Record<string, any>;
            }
        ) {
            if (account?.provider === "credentials") {
                return true;
            }

            return false;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                // token.userRole = user?.role;
            }
            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.userRole = token.userRole;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
})