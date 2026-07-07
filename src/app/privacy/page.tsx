import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | NirogiTanman",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: October 2023
            </p>
            
            <div className="prose prose-base prose-slate prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight text-muted-foreground leading-relaxed max-w-none">
              
              <p>
                At NirogiTanman, we believe that your health data belongs to you. This Privacy Policy 
                explains how we collect, use, and protect your information when you use our platform.
                We designed our systems to collect only what is necessary to provide personalized wellness 
                guidance, and we never sell your data or use it for third-party advertising.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you use the platform:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Account Information:</strong> When you register, we collect your email address and password to secure your account.</li>
                <li><strong>Health & Wellness Data:</strong> Information you submit through our intake forms, including daily routines, basic physical metrics, and Dosha assessment answers.</li>
                <li><strong>Consultation Bookings:</strong> Details regarding expert or doctor consultations you schedule through the platform.</li>
                <li><strong>Chat Transcripts:</strong> Messages you send to the Ayurvedic AI assistant.</li>
              </ul>

              <h2 className="text-2xl text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
              <p>We use the data we collect solely to operate and improve the platform:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>To generate personalized, Dosha-aware diet and lifestyle plans.</li>
                <li>To provide conversational AI assistance relevant to your health queries.</li>
                <li>To facilitate and manage bookings with healthcare experts.</li>
                <li>To secure your account and enforce our Terms of Service.</li>
              </ul>

              <h2 className="text-2xl text-foreground mt-10 mb-4">3. Data Storage and Security</h2>
              <p>
                Your data is stored securely using <strong>Supabase</strong>, our primary infrastructure provider. 
                We use Postgres with Row Level Security (RLS) to ensure that your health data and bookings 
                can only be accessed by your authenticated account. Passwords are cryptographically hashed 
                before storage.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">4. Third-Party Processors</h2>
              <p>
                To provide our AI features, we utilize specialized third-party processors. When you interact 
                with the AI Assistant or generate a diet plan, your inputs are processed by:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Groq:</strong> Provides ultra-low latency processing for our chat features.</li>
                <li><strong>Google Gemini:</strong> Processes complex queries for diet plan generation and conversational responses.</li>
              </ul>
              <p>
                These processors only receive the specific prompts and context necessary to generate a response. 
                They do not have direct access to your underlying database records. We do not integrate with 
                any third-party advertising or tracking networks.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">5. Data Retention</h2>
              <p>
                We retain your account information, health assessments, and chat history for as long as your 
                account remains active. You have the right to request deletion of your account and all associated 
                data at any time. Upon deletion, your data is permanently removed from our active databases.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">6. Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, or delete the personal 
                information we hold about you. You can review and update your assessment data directly within 
                your Dashboard. For complete account deletion, please contact our support team.
              </p>

              <h2 className="text-2xl text-foreground mt-10 mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact 
                us at privacy@nirogitanman.example.com.
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
