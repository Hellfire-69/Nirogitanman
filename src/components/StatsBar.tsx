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
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-primary-foreground/20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col space-y-2"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-secondary">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium opacity-90 tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
