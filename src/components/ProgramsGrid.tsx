"use client";

import React from "react";
import { motion } from "motion/react";
import { Placeholder } from "./Placeholder";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Immunity Booster",
    desc: "Strengthen your natural defenses through personalized Ayurvedic diets and holistic practices.",
  },
  {
    title: "Digestive Wellness",
    desc: "Heal your gut, optimize metabolism, and solve chronic digestive issues permanently.",
  },
  {
    title: "Stress & Mental Balance",
    desc: "Find calm and focus with guided Yoga, meditation, and nervine tonics.",
  },
  {
    title: "Weight Management",
    desc: "Sustainable fat loss combining modern nutritional science with Ayurvedic body-typing.",
  },
  {
    title: "Skin & Hair Care",
    desc: "Rejuvenate naturally with targeted internal detox and topical herbal regimens.",
  },
];

export function ProgramsGrid() {
  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground [text-wrap:balance]">
            Targeted Healing Paths
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg [text-wrap:balance]">
            Choose a specialized wellness program tailored to your unique biology and lifestyle goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <Placeholder name={`Image: ${program.title}`} className="w-full h-full border-0 rounded-none bg-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">
                  {program.desc}
                </p>
                <Link
                  href="/consult/expert"
                  className="inline-flex items-center text-sm font-semibold text-secondary group-hover:text-primary transition-colors"
                >
                  Consult Expert
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
