import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BAW Studio",
  description:
    "Black and White Studio is a creative agency specializing in design and development. We create innovative solutions that blend aesthetics and functionality to help our clients stand out in the digital landscape.",
  keywords: [
    "creative agency",
    "design",
    "development",
    "innovative solutions",
    "aesthetics",
    "functionality",
    "digital landscape",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <SmoothScrollProvider>
              <div className="wrapper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </SmoothScrollProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
