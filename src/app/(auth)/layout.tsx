import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "sonner";

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
    <main className="flex h-screen w-full">
      <div className="hidden relative lg:flex items-center justify-center lg:w-1/2 bg-[url('/ride.jpg')] bg-cover bg-center bg-no-repeat brightness-50">
        <div className="absolute inset-0 z-40 flex h-full w-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Dara Hauls</h1>
        </div>
      </div>

      <div className="w-full flex justify-center items-center lg:w-1/2">
        {children}
        <Toaster richColors position="top-left" />
      </div>
    </main>
  );
}
