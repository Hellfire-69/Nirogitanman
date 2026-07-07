import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertTriangle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Health Disclaimer | NirogiTanman",
};

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-32 pb-0">
        <section className="bg-background py-16 flex-1">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary/60 mb-4">
              Legal
            </p>
            <h1
              className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 [text-wrap:balance]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Health Disclaimer
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: October 2023
            </p>
            
            <div className="prose prose-base prose-slate prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight text-muted-foreground leading-relaxed max-w-none">
              
              <div className="p-6 my-8 bg-destructive/5 border-l-4 border-destructive rounded-r-xl">
                <div className="flex gap-3">
                  <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold mb-2 mt-0 text-lg">
                      Not Medical Advice
                    </p>
                    <p className="mb-0 text-sm leading-relaxed">
                      NirogiTanman is an internship prototype for a holistic wellness platform. The 
                      content, AI-generated diet plans, Ayurvedic assistant responses, and all other 
                      information on this platform are provided for <strong>general wellness education only</strong>.
                      Nothing on this platform constitutes medical advice, diagnosis, or treatment. Do not 
                      make medical decisions — including decisions about medications, dosages, or treatments — 
                      based on information provided by this platform.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl text-foreground mt-10 mb-4">1. Consult a Healthcare Professional</h2>
              <p>
                Always consult a qualified, licensed healthcare professional before making any changes 
                to your diet, exercise routine, or health management plan, particularly if you have a 
                pre-existing medical condition, are pregnant, or are taking medications. The integration 
                of Ayurvedic and Allopathic knowledge on this platform is meant to foster better conversations 
                with your doctor, not replace them.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">2. Limitations of AI Features</h2>
              <p>
                The AI features on this platform — specifically the <strong>Ayurvedic Assistant</strong> and 
                the <strong>Diet Plan Generator</strong> — are powered by large language models. While they are 
                prompted to draw on vetted wellness facts and prioritize safety, they have inherent limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>AI models can hallucinate or confidently provide inaccurate information.</li>
                <li>They cannot diagnose physical symptoms or interpret medical test results.</li>
                <li>They do not have a complete picture of your medical history.</li>
              </ul>
              <p>
                The AI is designed to redirect you to human experts when queries cross the line into medical 
                territory. If you bypass these guardrails, you do so at your own risk.
              </p>

              <div className="p-6 my-8 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="flex gap-3">
                  <Info className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold mb-2 mt-0">
                      Prototype Seeded Data Notice
                    </p>
                    <p className="mb-0 text-sm leading-relaxed">
                      Because this is a prototype, the directory of experts and doctors available for booking 
                      is currently populated with <strong>seeded test data</strong>. The practitioners listed 
                      are not real individuals, and any bookings made will not result in a real medical 
                      consultation. Do not submit actual sensitive health information in the booking notes.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl text-foreground mt-10 mb-4">3. Emergency Situations</h2>
              <p>
                <strong>Never use this platform in a medical emergency.</strong> If you think you may have a 
                medical emergency, call your doctor, go to the nearest hospital emergency department, or call 
                emergency services immediately.
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
