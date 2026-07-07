"use client";

import React from "react";
import { motion } from "motion/react";
import { Leaf, Stethoscope, BookOpenCheck, HeartPulse } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";


/* Silk ease — shared across the site */
const silk = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: silk },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const pillars = [
  {
    icon: <Leaf className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Ayurveda",
    desc: "Ancient Indian science of life — diet, herbs, daily rhythm, and body-type (Dosha) awareness form the foundation of every personalised plan on this platform.",
    tint: "bg-[oklch(0.65_0.15_45)]/5",
    border: "group-hover:border-[oklch(0.65_0.15_45)]/20",
    bgImage: "/about/aruyved-about.png"
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Modern Medicine",
    desc: "Clinical credibility matters. NirogiTanman layers evidence-based allopathic context alongside traditional Ayurvedic guidance — not as a replacement, but as an integrated lens.",
    tint: "bg-primary/5",
    border: "group-hover:border-primary/20"
  },
  {
    icon: <BookOpenCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Yoga & Lifestyle",
    desc: "Movement, breath, and sleep are not afterthoughts here. Yoga and lifestyle guidance are woven into every program and personalised plan as primary tools, not supplements.",
    tint: "bg-[oklch(0.85_0.05_80)]/30",
    border: "group-hover:border-[oklch(0.85_0.05_80)]/50",
    bgImage: "/about/type-about.png"
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Preventive Focus",
    desc: "The goal is to understand and address root causes — not just suppress symptoms. Assessments, AI guidance, and expert consults all orient toward long-term sustained wellness.",
    tint: "bg-[oklch(0.97_0.02_160)]/60",
    border: "group-hover:border-primary/20"
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen pt-24 pb-0 selection:bg-primary/20 selection:text-primary">
      {/* ── Hero block ────────────────────────────────────────── */}
      <section className="bg-background pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {/* Subtle radial gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[oklch(0.65_0.15_45)]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none -z-10" />
        
        {/* Background Artwork - about-hero.png */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] md:w-[70%] lg:w-[60%] aspect-square md:aspect-auto md:h-[120%] opacity-20 pointer-events-none mix-blend-multiply"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 0.3, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: silk }}
        >
          <Image
            src="/about/about-hero.png"
            alt="Botanical illustration"
            fill
            className="object-contain md:object-cover object-right md:object-center mask-image-linear-to-l"
            style={{ maskImage: "linear-gradient(to right, transparent, black 60%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 60%)" }}
          />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center md:text-left">
          <motion.div
            className="flex flex-col items-center md:items-start gap-8 max-w-4xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-background border border-border/50 shadow-sm text-muted-foreground backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 text-primary" />
                Our Story
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl md:text-7xl lg:text-[6rem] font-bold text-foreground [text-wrap:balance] leading-[1.02] tracking-tighter"
            >
              Integrative wellness, <br className="hidden md:block" />
              <span className="text-muted-foreground">built from first principles.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl [text-wrap:balance] mt-2"
            >
              Bridging ancient Ayurvedic wisdom with modern clinical science to give you the most honest picture of your health.
            </motion.p>
          </motion.div>
        </div>
      </section>

    {/* ── Our Philosophy ────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-background to-[oklch(0.97_0.02_160)]/40 py-20 md:py-32 relative border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
            {/* Elegant visual */}
            <motion.div
              className="relative w-full lg:w-5/12 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-border/50 p-8 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: silk }}
            >
              <Image 
                src="/about/balance-about.png"
                alt="Balancing holistic health and modern science"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 p-3 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center border border-white/20 text-white">
                <HeartPulse className="w-7 h-7" />
              </div>
              
              <div className="relative z-10 mt-auto text-white">
                <p className="font-heading text-2xl font-bold mb-2 tracking-tight drop-shadow-sm">Holistic Lens</p>
                <p className="text-base text-white/90 leading-relaxed max-w-[95%] drop-shadow-sm">Health isn&apos;t just the absence of disease—it&apos;s the alignment of mind, body, and rhythm.</p>
              </div>
            </motion.div>

            {/* Concise Vision */}
            <motion.div
              className="flex flex-col gap-8 w-full lg:w-7/12"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: silk }}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.05] tracking-tighter">
                Wellness shouldn&apos;t mean choosing sides.
              </h2>
              
              <div className="flex flex-col gap-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  For decades, we&apos;ve treated ancient traditions and modern science as opposing forces. You were either seeking holistic alignment or clinical precision.
                </p>
                <p>
                  We built NirogiTanman because we believe the most complete picture of health requires both. We layer evidence-based allopathic context alongside traditional Ayurvedic guidance, integrating them into a single, cohesive ecosystem.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ─────────────────────────────────────── */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: silk }}
          >
            <h2
              className="font-heading text-4xl md:text-5xl lg:text-[4rem] font-bold text-foreground mb-4 [text-wrap:balance] tracking-tighter leading-[1.05]"
            >
              The three pillars
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-relaxed">
              A deeply integrated approach replacing isolated wellness solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1, ease: silk }}
                className={`group relative overflow-hidden flex flex-col gap-6 p-8 md:p-10 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 h-full ${pillar.tint} ${pillar.border}`}
              >
                {pillar.bgImage && (
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 ease-out pointer-events-none">
                    <Image 
                      src={pillar.bgImage} 
                      alt="" 
                      fill 
                      className="object-cover mix-blend-multiply transition-transform duration-[2s] group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  </div>
                )}
                
                {/* Double-bezel icon well */}
                <div className="relative z-10 p-3 rounded-[1.2rem] bg-white/50 border border-white/20 w-fit shadow-sm backdrop-blur-md group-hover:bg-white/80 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {pillar.icon}
                  </div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3
                    className="font-heading text-2xl font-bold text-foreground mb-3 tracking-tight"
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mt-auto">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We Built This (The Story) ───────────────────────── */}
      <section className="bg-primary text-white py-24 md:py-32 relative overflow-hidden">
        {/* Background Artwork - story-about.png */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about/story-about.png"
            alt="The story behind NirogiTanman"
            fill
            className="object-cover opacity-40 mix-blend-multiply"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/60 to-primary/95" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10">
          <motion.div
            className="flex flex-col gap-10 md:gap-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: silk }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-white/95 [text-wrap:balance]"
            >
              Healthcare is fragmented. We created NirogiTanman to bridge the gap between ancient wisdom and clinical precision.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: silk }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-white/80 [text-wrap:balance]"
            >
              Our AI doesn&apos;t replace doctors—it empowers you to understand your habits and connects you seamlessly to human experts when you need them.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: silk }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.3] text-[oklch(0.7_0.15_45)] [text-wrap:balance] drop-shadow-sm"
            >
              Honest, integrated wellness.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission Statement ──────────────────────────────────── */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="w-full lg:w-5/12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: silk }}
            >
              <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl ring-1 ring-border/40">
                <Image
                  src="/about/journey-about.png"
                  alt="A balanced journey to health"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-7/12 flex flex-col gap-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: silk }}
            >
              <div className="w-10 h-1 bg-[oklch(0.65_0.15_45)]/40 rounded-full" />
              <blockquote className="font-heading text-2xl md:text-3xl leading-[1.3] text-foreground tracking-tight">
                &quot;Our mission is to give every person the clearest, most honest picture of their health—drawing from every available tradition—and connect them with the right human expert to act on it.&quot;
              </blockquote>
              <div className="text-muted-foreground uppercase tracking-widest text-xs font-semibold mt-2">
                — The NirogiTanman Team
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Call To Action ──────────────────────────── */}
      {/* Footer is handled by layout.tsx */}
      <CtaBanner bgImage="/about/CTA-about.png" />
    </main>
  );
}
