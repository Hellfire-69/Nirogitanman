"use client";

import React from "react";
import { motion } from "motion/react";
import { Leaf, Stethoscope, BookOpenCheck, HeartPulse } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Modern Medicine",
    desc: "Clinical credibility matters. NirogiTanman layers evidence-based allopathic context alongside traditional Ayurvedic guidance — not as a replacement, but as an integrated lens.",
  },
  {
    icon: <BookOpenCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Yoga & Lifestyle",
    desc: "Movement, breath, and sleep are not afterthoughts here. Yoga and lifestyle guidance are woven into every program and personalised plan as primary tools, not supplements.",
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    title: "Preventive Focus",
    desc: "The goal is to understand and address root causes — not just suppress symptoms. Assessments, AI guidance, and expert consults all orient toward long-term sustained wellness.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen pt-24 pb-0">
      {/* ── Hero block ────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-32 relative overflow-hidden">
        {/* Subtle background glow to elevate the text-only hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl relative z-10">
          <motion.div
            className="flex flex-col gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold bg-primary/10 text-primary w-fit border border-primary/20"
            >
              About the Platform
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary [text-wrap:balance] leading-[1.05]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Integrative wellness, built from first principles.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl [text-wrap:balance]"
            >
              NirogiTanman is an internship prototype for a holistic health platform that brings
              Ayurveda, Allopathy, and Yoga together under one roof — not as separate offerings,
              but as a genuinely integrated system for understanding and improving your health.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── What it is ────────────────────────────────────────── */}
      <section className="bg-muted/30 py-24 md:py-32 border-y border-border/50 relative">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.68, ease: silk }}
            >
              <h2
                className="font-heading text-3xl md:text-4xl font-bold text-foreground [text-wrap:balance]"
                style={{ letterSpacing: "-0.02em" }}
              >
                What NirogiTanman actually does
              </h2>
              <div className="flex flex-col gap-6 text-muted-foreground text-base leading-relaxed">
                <p>
                  At its core, this platform gives you a structured place to understand your health
                  through multiple lenses at once. You fill in a health assessment, get a Dosha-aware
                  diet plan generated from a vetted wellness knowledge base, and can book consultations
                  with wellness experts or doctors — all in one session without switching tools.
                </p>
                <p>
                  The AI features — diet plan generation and the Ayurvedic assistant chat — are deliberately
                  scoped. They draw on a curated facts table, carry visible disclaimers, and redirect
                  to human consultants for anything medical. The design goal is an AI that enhances
                  expert access, not one that tries to replace clinical judgment.
                </p>
                <p>
                  The booking flow connects to real Supabase data: doctor availability is tracked
                  in a live slots table, and bookings write back to a bookings table. Even in
                  prototype form, the architecture is built to be upgraded — swapping seed data for
                  real doctor records requires no schema changes.
                </p>
                <p>
                  This is a 3–5 day sprint prototype. The goal is to prove that the concept works
                  end-to-end, that the design is credible, and that the technical foundation can
                  carry the real product if the project is selected for full development.
                </p>
              </div>
            </motion.div>
            
            {/* Visual Integration: Glassmorphism image card */}
            <motion.div
              className="relative order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border/50"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: silk }}
            >
              <Image 
                src="/programs/digestive-wellness.png"
                alt="Ayurvedic herbs and holistic wellness elements"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-multiply" />
              {/* Glassmorphism badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-background/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] supports-[backdrop-filter]:bg-background/10 text-white">
                <p className="font-heading text-lg font-semibold tracking-tight">Structured Holistic Care</p>
                <p className="text-sm opacity-90">Integrating multiple wellness lenses.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ─────────────────────────────────────── */}
      <section className="bg-background py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: silk }}
          >
            <h2
              className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 [text-wrap:balance]"
              style={{ letterSpacing: "-0.02em" }}
            >
              The three pillars
            </h2>
            <p className="text-muted-foreground text-lg">
              A deeply integrated approach replacing isolated wellness solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: silk }}
                className="group flex flex-col gap-5 p-8 rounded-3xl bg-muted/20 border border-border/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,83,70,0.08)] hover:border-primary/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
              >
                {/* Double-bezel icon well matching HowItWorks */}
                <div className="p-2.5 rounded-[1.25rem] bg-primary/8 border border-primary/15 w-fit shadow-[0_2px_12px_rgba(0,83,70,0.07)] group-hover:bg-primary/10 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-[calc(1.25rem-0.625rem)] bg-background flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,83,70,0.05),0_1px_4px_rgba(0,83,70,0.06)] group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {pillar.icon}
                  </div>
                </div>
                <div>
                  <h3
                    className="font-heading text-xl font-bold text-foreground mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach / mission ────────────────────────────────── */}
      <section className="bg-primary py-24 md:py-32 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl relative z-10 text-center">
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.68, ease: silk }}
          >
            <h2
              className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground [text-wrap:balance]"
              style={{ letterSpacing: "-0.02em" }}
            >
              The approach in one sentence
            </h2>
            <p className="text-primary-foreground/90 text-xl md:text-2xl leading-relaxed [text-wrap:balance] max-w-3xl">
              Give each person the clearest, most honest picture of their health from every
              available tradition — ancient and modern — and connect them with the right human
              expert to act on it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full sm:w-auto"
              >
                Try the Platform
                <span className="ml-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/#programs"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/60 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full sm:w-auto"
              >
                View Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
