'use client'

import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * RiderDashboardPage
 * Displays content specific to riders.
 * It performs a server-side check for the 'rider' role.
 */
export default async function RiderDashboardPage() {
  const session = await auth();

  // Server-side role check
  if (!session || !session.user || session.user.role !== "rider") {
    redirect("/auth/login"); // Redirect to login if not rider
  }

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Rider Dashboard
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Hello, <span className="font-semibold">{session.user.firstName || session.user.email}</span>!
        Here you can manage your deliveries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>My Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              View your assigned and completed deliveries.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">View Deliveries</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Earnings Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Check your earnings and payment history.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">View Earnings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}