/**
 * Hero — Landing page opening section.
 * Art-directed background (mobile/desktop), animated content entrance,
 * and integrated image-composition overlays.
 */
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { motion, type Variants } from "motion/react";

/* ─── Motion variants ─────────────────────────────────────────────────────── */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const common = {
    alt: "Botanical Illustration",
    fill: true,
    priority: true,
    sizes: "100vw",
    className: "object-cover object-center",
  };
  const { props: mobile } = getImageProps({ ...common, src: "/hero/hero-mobile.png" });
  const { props: desktop } = getImageProps({ ...common, src: "/hero/hero-desktop.png" });

  return (
    <section className="relative overflow-hidden w-full min-h-[92vh] flex items-center pt-24 pb-16 md:pt-36 md:pb-28">
      {/* Background Image (Art Directed) */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} />
        <img {...mobile} alt="Botanical Illustration" className="absolute inset-0 w-full h-full object-cover object-center" />
      </picture>

      {/* Mobile: soft veil so text is always legible */}
      <div className="absolute inset-0 bg-background/72 md:hidden z-0" />

      {/* Desktop: directional overlay — text side full coverage, image side breathes */}
      <div
        className="absolute inset-0 hidden md:block z-0"
        style={{
          background:
            "linear-gradient(100deg, oklch(0.98 0.01 75 / 0.88) 0%, oklch(0.98 0.01 75 / 0.68) 42%, oklch(0.98 0.01 75 / 0.12) 72%, transparent 100%)",
        }}
      />

      {/* Bottom vignette — grounds the illustration, removes the floating-on-white feel */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.98 0.01 75 / 0.9) 0%, transparent 100%)",
        }}
      />

      {/* Content Block — staggered entrance */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="max-w-2xl flex flex-col justify-center space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow pill — one deliberate kicker, not applied to every section */}
          <motion.div variants={item}>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary/10 text-primary">
              Ayurveda · Allopathy · Yoga
            </span>
          </motion.div>

          <motion.div className="space-y-5" variants={item}>
            <h1
              className="font-heading text-5xl font-bold tracking-tight sm:text-6xl xl:text-[5.5rem] text-primary leading-[1.05] [text-wrap:balance]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Integrative Wellness for a Balanced Life
            </h1>
            <p className="max-w-[560px] text-lg text-foreground/70 md:text-xl leading-relaxed [text-wrap:balance]">
              Experience the harmony of Ayurveda, the precision of modern medicine, and the calm of Yoga — unified to heal, sustain, and help you thrive.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit"
            >
              Start Your Journey
              <span className="ml-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="#programs"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-4 text-sm font-semibold text-primary hover:bg-primary/6 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit"
            >
              Explore Programs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
