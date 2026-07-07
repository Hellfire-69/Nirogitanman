/**
 * HowItWorks — Landing page 3-step process section.
 * Double-bezel icon wells, animated connector line that draws in on scroll,
 * and Silk-curve staggered whileInView entrance matching the rest of the landing page.
 */
"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardList, BookOpenCheck, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="h-7 w-7 text-primary" strokeWidth={1.5} />,
    title: "Assess & Understand",
    desc: "Take our holistic health assessment to determine your body type (Dosha) and current imbalances.",
    step: "01",
  },
  {
    icon: <BookOpenCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />,
    title: "Personalized Plan",
    desc: "Receive a tailored diet, lifestyle, and Yoga regimen designed specifically for your unique biology.",
    step: "02",
  },
  {
    icon: <HeartPulse className="h-7 w-7 text-primary" strokeWidth={1.5} />,
    title: "Heal & Thrive",
    desc: "Follow the plan, consult with our certified experts, and track your journey to sustained wellness.",
    step: "03",
  },
];

/* Silk ease — shared across the landing page */
const silk = [0.16, 1, 0.3, 1] as const;

export function HowItWorks() {
  return (
    <section id="about" className="py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Section heading — enters first */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.68, ease: silk }}
        >
          <h2
            className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 [text-wrap:balance]"
            style={{ letterSpacing: "-0.02em" }}
          >
            How NirogiTanman Works
          </h2>
          <p className="text-muted-foreground md:text-lg [text-wrap:balance] max-w-md mx-auto leading-relaxed">
            A simple, structured approach to integrating holistic wellness into your daily routine.
          </p>
        </motion.div>

        {/* Steps + animated connector */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated connector line — draws in left→right on scroll */}
          <motion.div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px bg-border origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: silk }}
          />
          {/* Connector fill — teal tint draws over the base line with a slight delay */}
          <motion.div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px bg-primary/30 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: silk }}
          />

          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.64,
                  delay: 0.15 + idx * 0.13,
                  ease: silk,
                }}
                className="relative z-10 flex flex-col items-center text-center flex-1"
              >
                {/* Step counter — tiny tracked label above the well */}
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] font-semibold text-primary/50 mb-3 select-none">
                  {step.step}
                </span>

                {/* Double-bezel icon well — outer shell + inner core with inset highlight */}
                {/* Outer shell: tinted bg, hairline border from palette, padding, squircle radius */}
                <div className="p-2 rounded-[1.5rem] bg-primary/8 border border-primary/15 mb-6 shadow-[0_2px_12px_rgba(0,83,70,0.07)]">
                  {/* Inner core: white bg, inset top highlight simulating glass depth */}
                  <div className="w-[5rem] h-[5rem] rounded-[calc(1.5rem-0.5rem)] bg-background flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,83,70,0.05),0_1px_4px_rgba(0,83,70,0.06)]">
                    {step.icon}
                  </div>
                </div>

                <h3
                  className="font-heading text-xl font-bold text-foreground mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px] mx-auto [text-wrap:balance]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
