import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { NextAuthSessionProvider } from "@/context/next-auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dara Hauls",
  description: "Ride hailing app for the comfort of travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        <NextAuthSessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextAuthSessionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
