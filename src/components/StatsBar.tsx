/**
 * StatsBar — Brand-identity strip with four Ayurvedic wellness pillars.
 * Solid deep-teal section; glass treatment applied to individual stat pills
 * (light-over-dark glass recipe matching Navbar/GlassCard principle of
 * bg/{alpha} + backdrop-blur + hairline border). WhileInView stagger entrance.
 */
"use client";

import React from "react";
import { motion } from "motion/react";

const stats = [
  { value: "Authentic", label: "Ayurvedic Principles" },
  { value: "Holistic", label: "Integrated Wellness" },
  { value: "Certified", label: "Health Experts" },
  { value: "Tailored", label: "To Your Dosha" },
];

export function StatsBar() {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.64,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              /* Glass pill on dark teal: white/10 bg, backdrop-blur, hairline white border, inset top highlight */
              className="flex flex-col items-center text-center rounded-2xl px-4 py-6 md:py-8 bg-white/8 backdrop-blur-xl border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_20px_rgba(0,0,0,0.12)] supports-[backdrop-filter]:bg-white/6"
            >
              <div
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary leading-none mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] md:text-sm font-medium text-primary-foreground/80 tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
