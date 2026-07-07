"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, User } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureAssistant() {
  return (
    <section className="py-24 overflow-hidden relative bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Mockup - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="relative lg:h-[500px] flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[oklch(0.65_0.15_45)]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md">
              <GlassCard className="p-6 border-white/20 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl flex flex-col gap-4">
                
                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, ease: silk }}
                  className="flex items-start gap-3 flex-row-reverse"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.4_0.1_160)] text-white shadow-sm">
                    <User className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="rounded-[1.5rem] rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed max-w-[85%] bg-[oklch(0.4_0.1_160)] text-white shadow-md">
                    I&apos;ve been feeling sluggish in the afternoons lately. Any Ayurvedic tips?
                  </div>
                </motion.div>

                {/* Assistant Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7, ease: silk }}
                  className="flex items-start gap-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.65_0.15_45)]/20 text-[oklch(0.65_0.15_45)] ring-1 ring-[oklch(0.65_0.15_45)]/30 shadow-sm">
                    <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="rounded-[1.5rem] rounded-tl-sm px-5 py-3.5 text-sm leading-relaxed max-w-[85%] bg-white dark:bg-black border border-border/50 text-foreground shadow-sm">
                    Afternoon sluggishness often relates to a Kapha imbalance after lunch. Try sipping warm ginger tea and taking a brief 10-minute walk after your meal to stimulate digestion.
                  </div>
                </motion.div>

                {/* Typing Indicator */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.5, ease: silk }}
                  className="flex items-start gap-3 mt-2"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.65_0.15_45)]/20 text-[oklch(0.65_0.15_45)] ring-1 ring-[oklch(0.65_0.15_45)]/30 shadow-sm">
                    <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="rounded-[1.5rem] rounded-tl-sm px-5 py-3.5 text-sm bg-white dark:bg-black border border-border/50 text-muted-foreground shadow-sm flex items-center gap-1.5">
                    Thinking
                    <span className="flex gap-0.5">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }}>.</motion.span>
                    </span>
                  </div>
                </motion.div>
                
              </GlassCard>
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
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)]">
              <MessageSquare className="w-3.5 h-3.5" />
              AI Assistant
            </div>
            
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Your personal daily wellness companion.
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Have a quick question about herbal remedies, sleep routines, or dosha balancing? Our smart AI assistant provides instant, personalized guidance grounded in authentic Ayurvedic principles to help you navigate everyday health queries.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Conversational lifestyle guidance",
                "Instant answers to everyday wellness queries",
                "Personalized recommendations based on your profile"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[oklch(0.65_0.15_45)]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.15_45)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.65_0.15_45)] text-white pl-6 pr-2 py-2 rounded-full hover:bg-[oklch(0.60_0.15_45)] transition-all duration-300 ease-out w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.65_0.15_45)]/30 shadow-lg hover:shadow-xl active:scale-[0.98]"
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
