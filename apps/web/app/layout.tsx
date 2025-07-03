import { Footer, Navbar } from "@/components";
import "@packtok/ui/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Packtok",
  description: "Complete Packaging Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
