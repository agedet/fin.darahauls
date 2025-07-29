'use client'

import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import axios from "axios";
// import { toast } from "sonner";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Server-side role check
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/auth/login"); // Redirect to login if not admin
  }

  // Example of fetching protected data (client-side in a real app, but showing server component usage)
  // In a real app, this would be a client component using `useAuth` and `axios`
  // to fetch data from `/api/protected` after the user is authenticated.
  // const fetchProtectedData = async () => {
  //   try {
  //     // This fetch is for demonstration. In a real client component, use axios.
  //     const response = await axios.get("/api/protected");
  //     const data = await response.data;
  //     if (response.status === 200) {
  //       toast.success(`Protected data fetched: ${data.message}`);
  //       console.log("Protected Data:", data);
  //     } else {
  //       toast.error(`Failed to fetch protected data: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching protected data:", error);
  //     toast.error("An error occurred while fetching protected data.");
  //   }
  // };

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Welcome, <span className="font-semibold">{session.user.firstName || session.user.email}</span>!
        You have full administrative access.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user accounts, roles, and permissions.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">View Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Configure application settings and preferences.
            </p>
            <Button className="mt-4 w-full">
              <Link href="#">Configure Settings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Protected API Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Test access to a protected API endpoint.
            </p>
            {/* This button would typically be in a client component */}
            <Button
              className="mt-4 w-full"
              // onClick={async () => {
              //   // This is a client-side interaction, so we need to use a client component
              //   // For demonstration, I'm putting the logic here, but for a real app,
              //   // you'd extract this into a client component or hook.
              //   const response = await fetch("/api/protected");
              //   const data = await response.json();
              //   if (response.ok) {
              //     toast.success(`Protected data: ${data.message}`);
              //   } else {
              //     toast.error(`Access denied: ${data.message}`);
              //   }
              // }}
            >
              Fetch Protected Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}