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
          <h1 className="text-4xl font-bold lowercase text-white text-center">
            Welcome to Dara Hauls
          </h1>
          <p className="text-center text-white text-lg mb-4">
            Book your ride instantly. Fast, safe, and affordable.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center px-[20px] lg:w-1/2">
        <div className="lg:hidden mb-4">
          <h1 className="text-4xl font-bold tracking-wider lowercase text-center mb-8">
            Dara Hauls
          </h1>
        </div>
        {children}
        <Toaster richColors position="top-left" />
      </div>
    </main>
  );
}
