'use client'

import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout
 * A protected layout for all dashboard routes.
 * It checks if the user is authenticated. If not, it redirects to the login page.
 * It also includes a basic navigation for demonstration.
 */

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  // If no session or user, redirect to login
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  // You can add more granular role-based checks here if a layout is shared
  // For now, individual dashboard pages will handle their specific role checks.

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome, {session.user.firstName || session.user.email}!
          </h1>
          <nav>
            <ul className="flex space-x-4">
              {session.user.role === "admin" && (
                <li>
                  <a href="/dashboard/admin" className="hover:underline">
                    Admin Dashboard
                  </a>
                </li>
              )}
              {session.user.role === "rider" && (
                <li>
                  <a href="/dashboard/rider" className="hover:underline">
                    Rider Dashboard
                  </a>
                </li>
              )}
              {session.user.role === "accounts" && (
                <li>
                  <a href="/dashboard/accounts" className="hover:underline">
                    Accounts Dashboard
                  </a>
                </li>
              )}
              {session.user.role === "manager" && (
                <li>
                  <a href="/dashboard/manager" className="hover:underline">
                    Manager Dashboard
                  </a>
                </li>
              )}
              <li>
                {/* Logout button - can be a form submission or client-side call */}
                <form action="/api/auth/signout" method="post">
                  <button type="submit" className="hover:underline">
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>
      <Toaster richColors position="top-right" /> {/* Toaster for dashboard pages */}
    </div>
  );
}