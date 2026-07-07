/**
 * TrustBar — Post-hero trust signal strip.
 * Floats as a glass panel over the background seam between Hero and Programs,
 * using the shared Navbar/GlassCard glass recipe. Staggered whileInView entrance.
 */
"use client";

import React from "react";
import { ShieldCheck, Leaf, Stethoscope, Users } from "lucide-react";
import { motion } from "motion/react";

const items = [
  {
    icon: <Leaf className="h-5 w-5 text-primary" strokeWidth={1.5} />,
    title: "Integrated Care",
    desc: "Ayurveda & Modern Science",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />,
    title: "Safe & Effective",
    desc: "Vetted health protocols",
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-primary" strokeWidth={1.5} />,
    title: "Preventive Focus",
    desc: "Treat the root cause",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" strokeWidth={1.5} />,
    title: "Trusted Community",
    desc: "Thousands recovering daily",
  },
];

export function TrustBar() {
  return (
    /* Outer section: neutral bg so the glass floats against something */
    <section className="bg-background border-y border-border/50 py-0">
      <div className="container mx-auto px-4 md:px-6">
        {/* Glass panel — exact recipe: Navbar pill + GlassCard */}
        <div className="rounded-2xl bg-background/50 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] supports-[backdrop-filter]:bg-background/40 px-6 py-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.56,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center space-y-3"
              >
                {/* Icon pill — glass inner refraction: hairline border + inset highlight */}
                <div className="p-2.5 rounded-xl bg-primary/8 border border-primary/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
