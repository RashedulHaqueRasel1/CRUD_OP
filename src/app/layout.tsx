import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sheard/Navbar/Navbar";
import Footer from "@/components/sheard/Footer/Footer";
import { Providers } from "@/providers/providers";
import { Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD Operation",
  description: "Welcome to CRUD Operation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar></Navbar>
          {children}
          <Toaster richColors position="top-center"/>
          <Footer></Footer>
        </body>
      </Providers>
    </html>
  );
}
