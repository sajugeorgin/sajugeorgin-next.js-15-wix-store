import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s | Nirra", absolute: "Nirra" },
  description:
    "An e-commerce website built with Next.js 15 and Wix Studio Headless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sen.className} antialiased`}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
