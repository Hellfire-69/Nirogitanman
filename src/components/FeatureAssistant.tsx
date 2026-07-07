"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, User } from "lucide-react";


const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureAssistant() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-[oklch(0.97_0.02_45)]/40 dark:bg-black/20">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Visual Mockup - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="relative lg:h-[600px] flex items-center justify-center order-2 lg:order-1"
          >
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[oklch(0.65_0.15_45)]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md flex flex-col gap-5 px-4 md:px-0">
                
                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: silk }}
                  className="flex items-end gap-3 flex-row-reverse"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/80 dark:bg-white/90 text-white dark:text-black shadow-lg">
                    <User className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="rounded-[1.75rem] rounded-br-sm px-6 py-4 text-[15px] leading-relaxed max-w-[85%] bg-black dark:bg-white text-white dark:text-black shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]">
                    I&apos;ve been feeling sluggish in the afternoons lately. Any Ayurvedic tips?
                  </div>
                </motion.div>

                {/* Assistant Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7, ease: silk }}
                  className="flex items-start gap-3 mt-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.65_0.15_45)] text-white shadow-lg ring-4 ring-white/50 dark:ring-black/50">
                    <Sparkles className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="rounded-[1.75rem] rounded-tl-sm px-6 py-4 text-[15px] leading-relaxed max-w-[85%] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/40 dark:border-white/10 text-foreground shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                    Afternoon sluggishness often relates to a Kapha imbalance after lunch. Try sipping warm ginger tea and taking a brief 10-minute walk after your meal to stimulate digestion.
                  </div>
                </motion.div>

                {/* Suggestion Chips */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2, ease: silk }}
                  className="flex flex-wrap gap-2 mt-4 ml-[3.25rem]"
                >
                  {["Ginger tea recipe", "More Kapha tips"].map((chip, idx) => (
                    <motion.button
                      key={chip}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.3 + idx * 0.1, ease: silk }}
                      className="text-xs font-medium px-4 py-2 rounded-full bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/10 text-foreground/80 hover:bg-white dark:hover:bg-black hover:shadow-sm transition-all"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
            </div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: silk }}
            className="max-w-xl order-1 lg:order-2"
          >
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)]">
              <MessageSquare className="w-3.5 h-3.5" />
              AI Assistant
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              Your personal daily wellness companion.
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed max-w-[90%]">
              Have a quick question about herbal remedies, sleep routines, or dosha balancing? Our smart AI assistant provides instant, personalized guidance grounded in authentic Ayurvedic principles to help you navigate everyday health queries.
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                "Conversational lifestyle guidance",
                "Instant answers to everyday wellness queries",
                "Personalized recommendations based on your profile"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground font-medium">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.65_0.15_45)]/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.15_45)] shadow-[0_0_10px_rgba(200,80,60,0.5)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.65_0.15_45)] text-white pl-7 pr-3 py-3 rounded-full hover:bg-[oklch(0.60_0.15_45)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.65_0.15_45)]/30 shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(200,80,60,0.6)] active:scale-[0.98]"
            >
              Ask a Question
              <span className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
