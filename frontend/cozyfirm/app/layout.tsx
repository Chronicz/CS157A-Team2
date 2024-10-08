import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cozy Firm",
  description: "Version: In development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Navbar />
        <main className="relative overflow-hidden flex justify-center content-center items-start min-h-[85vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
