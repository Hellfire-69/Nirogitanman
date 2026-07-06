import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProgramsGrid } from "@/components/ProgramsGrid";
import { StatsBar } from "@/components/StatsBar";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TrustBar />
      <ProgramsGrid />
      <StatsBar />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </main>
  );
}
