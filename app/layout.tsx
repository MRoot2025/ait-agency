import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AiT Agency — We Build AI Employees for Your Business",
  description:
    "Custom AI workers that handle intake, scheduling, documentation, and outreach 24/7. Blueprint, build, and managed AI automation for SMBs and healthcare.",
  openGraph: {
    title: "AiT Agency — AI Workers Built for Your Business",
    description: "We blueprint, build, and manage custom AI employees that automate your most repetitive work.",
    url: "https://aitagency.ai",
    siteName: "AiT Agency",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
