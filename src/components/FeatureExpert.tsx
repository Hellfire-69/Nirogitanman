"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureExpert() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-gradient-to-b from-transparent to-[oklch(0.4_0.1_160)]/[0.03]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Mockup - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="relative lg:h-[600px] flex flex-col items-center justify-center gap-6 order-2 lg:order-1"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[oklch(0.65_0.15_45)]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md">
              <div className="flex gap-3 mb-8 justify-center lg:justify-start pl-4 md:pl-10">
                {["Ayurveda", "Yoga", "Lifestyle"].map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: silk }}
                  >
                    <Badge variant="outline" className="h-8 px-4 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm text-foreground/80 border-border/50">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="relative w-full">
                {/* Expert Card 1 */}
                <motion.div 
                  className="relative z-10 w-[90%] md:w-[85%] mx-auto lg:mx-0 lg:ml-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: silk }}
                >
                  <GlassCard className="p-5 md:p-6 border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] bg-white/70 dark:bg-black/70 backdrop-blur-2xl">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Avatar className="h-16 w-16 md:h-18 md:w-18 ring-4 ring-background shadow-md">
                          <AvatarFallback className="bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)] font-bold text-xl">
                            RK
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Indicator */}
                        <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-background rounded-full shadow-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-heading text-xl font-bold text-foreground tracking-tight truncate pr-2">
                            Rahul Khanna
                          </p>
                          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-[oklch(0.65_0.15_45)] bg-[oklch(0.65_0.15_45)]/10 px-2 py-1 rounded-md">
                            <Sparkles className="w-3 h-3" />
                            Top Rated
                          </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Certified Yoga Instructor</p>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="secondary" className="bg-black/5 dark:bg-white/10 text-xs">Vinyasa</Badge>
                          <Badge variant="secondary" className="bg-black/5 dark:bg-white/10 text-xs">Breathwork</Badge>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Expert Card 2 - Staggered */}
                <motion.div 
                  className="relative z-20 w-[90%] md:w-[85%] mx-auto lg:mx-0 lg:-ml-4 -mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7, ease: silk }}
                >
                  <GlassCard className="p-5 md:p-6 border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] bg-white/80 dark:bg-black/80 backdrop-blur-3xl">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Avatar className="h-16 w-16 md:h-18 md:w-18 ring-4 ring-background shadow-md">
                          <AvatarFallback className="bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)] font-bold text-xl">
                            ND
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Indicator */}
                        <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-background rounded-full shadow-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-xl font-bold text-foreground tracking-tight mb-1">
                          Neha Desai
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">Ayurvedic Lifestyle Coach</p>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="secondary" className="bg-black/5 dark:bg-white/10 text-xs">Nutrition</Badge>
                          <Badge variant="secondary" className="bg-black/5 dark:bg-white/10 text-xs">Sleep</Badge>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

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
              <Leaf className="w-3.5 h-3.5" />
              Expert Consultation
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              Holistic coaching for mind and body.
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed max-w-[90%]">
              Transform your daily habits with guidance from certified wellness experts. Whether you need to refine your yoga practice, manage stress, or improve your sleep hygiene, our coaches provide the practical support you need.
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                "Personalized Ayurvedic lifestyle coaching",
                "Guided Yoga and meditation sessions",
                "Actionable routines for sleep and stress management"
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
              Meet Our Experts
              <span className="ml-5 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
