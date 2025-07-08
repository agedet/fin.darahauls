// This component wraps your application with NextAuth's SessionProvider
// to make the session available to all client components.

"use client"; // This component must be a client component

import { SessionProvider } from "next-auth/react";
import React from "react";

interface NextAuthSessionProviderProps {
  children: React.ReactNode;
}

/**
 * NextAuthSessionProvider
 * Wraps the application with NextAuth's SessionProvider to enable
 * client-side session management and access to session data.
 */
export function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}