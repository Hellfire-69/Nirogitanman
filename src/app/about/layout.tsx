import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About NirogiTanman | Integrative Wellness Platform",
  description:
    "Learn about NirogiTanman — an integrative Ayurveda, Allopathy, and Yoga wellness platform built to provide holistic, personalised health guidance.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
