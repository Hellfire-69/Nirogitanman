import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | NirogiTanman",
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: October 2023
            </p>
            
            <div className="prose prose-base prose-slate prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight text-muted-foreground leading-relaxed max-w-none">
              
              <p>
                Welcome to NirogiTanman. By accessing or using our platform, you agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">1. Nature of the Service</h2>
              <p>
                NirogiTanman provides a platform for integrating Ayurvedic principles, modern medical context, 
                and yoga/lifestyle guidance. We offer AI-assisted chat tools, personalized diet plans based on 
                user input, and a directory for scheduling consultations with wellness experts and doctors.
              </p>
              
              <div className="p-5 my-6 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-foreground font-semibold mb-0 mt-0">
                  CRITICAL: Not Medical Advice
                </p>
                <p className="mb-0 mt-2 text-sm">
                  The AI features, generated plans, and informational content provided on this platform are for 
                  general wellness and educational purposes only. They do not constitute medical advice, diagnosis, 
                  or treatment. Always consult a qualified, licensed healthcare professional for medical decisions.
                </p>
              </div>

              <h2 className="text-2xl text-foreground mt-10 mb-4">2. Account Registration</h2>
              <p>
                To access certain features, you must create an account. You agree to provide accurate, current, 
                and complete information during the registration process and to update such information to keep it 
                accurate. You are responsible for safeguarding your password and for all activities that occur 
                under your account.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">3. Acceptable Use</h2>
              <p>
                You agree not to use the platform to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Submit false, misleading, or inappropriate health data.</li>
                <li>Attempt to bypass our security measures or Row Level Security (RLS) protections.</li>
                <li>Use the AI Assistant to generate harmful, illegal, or abusive content.</li>
                <li>Rely on the platform for emergency medical situations. In an emergency, contact your local emergency services immediately.</li>
              </ul>

              <h2 className="text-2xl text-foreground mt-10 mb-4">4. Third-Party Services and Content</h2>
              <p>
                Our platform utilizes third-party AI processors (such as Groq and Google Gemini) to generate 
                responses. While we strive for accuracy, we cannot guarantee the perfection of AI-generated content. 
                You acknowledge that AI responses may occasionally contain inaccuracies and should not be used as the 
                sole basis for health decisions.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">5. Intellectual Property</h2>
              <p>
                The platform, including its original content, features, and functionality, are owned by NirogiTanman 
                and are protected by international copyright, trademark, and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, NirogiTanman shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, 
                resulting from your access to or use of or inability to access or use the platform.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">7. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right 
                to use the platform will immediately cease.
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
