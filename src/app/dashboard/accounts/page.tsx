'use client'

import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * AccountsDashboardPage
 * Displays content specific to accounts personnel.
 * It performs a server-side check for the 'accounts' role.
 */
export default async function AccountsDashboardPage() {
  const session = await auth();

  // Server-side role check
  if (!session || !session.user || session.user.role !== "accounts") {
    redirect("/auth/login"); // Redirect to login if not accounts
  }

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Accounts Dashboard
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Welcome, <span className="font-semibold">{session.user.firstName || session.user.email}</span>!
        Manage financial operations here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Create, view, and manage invoices.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">Manage Invoices</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Payroll Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Process payroll for all employees.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">Process Payroll</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}