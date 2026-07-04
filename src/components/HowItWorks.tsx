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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 [text-wrap:balance]">
            How NirogiTanman Works
          </h2>
          <p className="text-muted-foreground md:text-lg [text-wrap:balance]">
            A simple, structured approach to integrating holistic wellness into your daily routine.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <h3 className="font-heading text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
