"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "../../types/next-auth"

interface AuthContextType {
  user: User | null;
  loading: boolean;
  registerUser: (formData: any) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  verifyEmail: (otp: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSession: (data: Partial<User>) => Promise<void>;
  requestReset: (email: string) => Promise<void>;
  confirmReset: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<User | null >(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || "",
        firstName: session.user.firstName || "",
        lastName: "", 
        phoneNumber: "",
        gender: "Male",
        dateOfBirth: new Date(),
        country: "",
        state: "", 
        role: (["user", "rider", "accounts", "manager", "admin"] as const).includes(session.user?.role as any)
          ? session.user?.role as "user" | "rider" | "accounts" | "manager" | "admin"
          : "user", // Default role
        emailVerified: session.user.emailVerified || false,
        passwordHash: "", // Not exposed to client
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [session, status]);

  const registerUser = useCallback(async (formData: any) => {
    setLoading(true);
    
    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 200) {
        toast.success("Registration successful! Check your email for a verification code.");
        router.push(`/verify?email=${formData.email}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");

      throw error;
    }  finally {
      setLoading(false);
    }
  }, [router]);

  const loginUser = useCallback(async (email: string, password: string) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", { 
        redirect: false, 
        email, 
        password 
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid email or password.");
        } else if (result.error === "EmailNotVerified") {
          toast.warning("Your email is not verified. Please check your inbox.");
          router.push(`/verify?email=${email}`);
        } else {
          toast.error(`Login failed: ${result.error}`);
        }
      } else if (result?.ok) {
          // If login is successful, NextAuth updates the session automatically.
          // We can then redirect based on the user's role from the session.
          const sessionUser = (await update())?.user; // Force update and get latest session
          if (sessionUser?.emailVerified === false) {
            toast.warning("Your email is not verified. Please check your inbox.");
            router.push(`/verify?email=${email}`);
            return;
          }

          toast.success("Login successful");
          switch (session?.user.role) {
            case "admin":
              router.push("/dashboard/admin");
              break;
            case "rider":
              router.push("/dashboard/rider");
              break;
            case "manager":
              router.push("/dashboard/manager");
              break;
            case "accounts":
              router.push("/dashboard/accounts");
              break;
            default:
              router.push("/dashboard/rider");
          } 
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login.")
    } finally {
      setLoading(false);
    }
  }, [router, update]);

  const verifyEmail = useCallback(async (otp: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/verify?token=${otp}`);
      
      if (response.status === 200) {
        const { user: verifiedUser } = response.data;
        
        // Update the session with verified user data
        await update({
          user: {
            id: verifiedUser.id,
            email: verifiedUser.email,
            firstName: verifiedUser.firstName,
            lastName: verifiedUser.lastName,
            role: verifiedUser.role,
            emailVerified: verifiedUser.emailVerified
          }
        });

        toast.success("Email verified successfully!");
        
        // Redirect based on user role
        switch (verifiedUser.role) {
          case "admin":
            router.push("/dashboard/admin");
            break;
          case "rider":
            router.push("/dashboard/rider");
            break;
          case "manager":
            router.push("/dashboard/manager");
            break;
          case "accounts":
            router.push("/dashboard/accounts");
            break;
          default:
            router.push("/dashboard/rider");
        }
      }
    } catch (error: any) {
      console.error("Email verification error:", error);
      const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router, update]);

  const resendVerification = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/resend-verification", { email });
      if (response.status === 200) {
        toast.success("Verification code resent successfully!");
      }
    } catch (error: any) {
      console.error("Resend verification error:", error);
      const errorMessage = error.response?.data?.message || "Failed to resend verification code. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    setUser(null);
    toast.info("You have been logged out.");
    router.push("/login");
  }, [router]);

  const requestReset = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/reset/request", { email });
      if (response.status === 200) {
        toast.success("A password reset link has been sent to your email.")
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmReset = useCallback(async (token: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/reset/confirm", { token, password });
      if (response.status === 200) {
        toast.success("Your password has been reset successfully! You can now log in.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const updateSession = useCallback(async (data: Partial<User>) => {
    await update(data); // NextAuth's update function
  }, [update]);



  return (
    <AuthContext.Provider
      value={{ user, loading, registerUser, loginUser, verifyEmail, resendVerification, logout, requestReset, confirmReset, updateSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};