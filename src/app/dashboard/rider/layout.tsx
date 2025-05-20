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
      <div className="hidden relative lg:flex items-center justify-center lg:w-1/2 bg-[url('/ride.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 z-40 flex flex-col gap-2 h-full w-full items-center justify-center bg-gradient-to-br from-[#000000] to-[#000000]/50">
         
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center px-[20px] lg:w-1/2">
       
        {children}
        <Toaster richColors position="top-left" />
      </div>
    </main>
  );
}
