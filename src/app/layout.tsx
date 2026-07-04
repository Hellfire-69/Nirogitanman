import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NirogiTanman | Holistic Wellness",
  description: "Ayurveda, Allopathy & Yoga platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${bricolageGrotesque.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
