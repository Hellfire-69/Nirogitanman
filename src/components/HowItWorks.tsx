"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardList, BookOpenCheck, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: "1. Assess & Understand",
    desc: "Take our holistic health assessment to determine your body type (Dosha) and current imbalances.",
  },
  {
    icon: <BookOpenCheck className="h-8 w-8 text-primary" />,
    title: "2. Personalized Plan",
    desc: "Receive a tailored diet, lifestyle, and Yoga regimen designed specifically for your unique biology.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: "3. Heal & Thrive",
    desc: "Follow the plan, consult with our certified experts, and track your journey to sustained wellness.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How NirogiTanman Works
          </h2>
          <p className="text-stone-500 md:text-lg text-balance max-w-md mx-auto">
            A simple, structured approach to integrating holistic wellness into your daily routine.
          </p>
        </div>

        <div className="relative z-0 flex flex-col md:flex-row justify-between items-start w-full gap-8 max-w-5xl mx-auto">
          {/* Connector Line (Absolute) */}
          <div className="hidden md:block absolute top-[3rem] left-[15%] right-[15%] h-[2px] bg-gray-200 z-[-1] -translate-y-1/2"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center flex-1"
            >
              <div className="relative z-10 w-24 h-24 rounded-full bg-background border-2 border-gray-200 flex items-center justify-center shadow-sm mb-6">
                {step.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-stone-500 text-sm max-w-[250px] mx-auto text-balance">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
