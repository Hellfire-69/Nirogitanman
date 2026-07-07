"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Stethoscope, CheckCircle2, Calendar } from "lucide-react";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const silk = [0.16, 1, 0.3, 1] as const;

export function FeatureDoctor() {
  return (
    <section className="py-24 md:py-32 overflow-hidden relative bg-gradient-to-b from-[oklch(0.95_0.02_75)]/30 to-transparent dark:from-white/5">
      {/* Warm sand base glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[oklch(0.7_0.15_60)]/[0.03] blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: silk }}
            className="max-w-xl"
          >
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)]">
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Consultation
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              Clinical expertise, just a click away.
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed max-w-[90%]">
              When you need medical guidance, easily book online sessions with certified Ayurvedic and Allopathic doctors. Our integrated approach ensures you get the right care at the right time.
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                "Certified Ayurvedic & Allopathic specialists",
                "Instant slot booking & confirmation",
                "Seamless video consultations"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground font-medium">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.4_0.1_160)]/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.4_0.1_160)] shadow-[0_0_10px_rgba(0,100,80,0.5)]" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="group inline-flex items-center text-sm font-semibold bg-[oklch(0.4_0.1_160)] text-white pl-7 pr-3 py-3 rounded-full hover:bg-[oklch(0.35_0.1_160)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.4_0.1_160)]/30 shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(0,100,80,0.6)] active:scale-[0.98]"
            >
              Book a Session
              <span className="ml-5 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

          {/* Visual Mockup - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: silk }}
            className="relative lg:h-[600px] flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[oklch(0.4_0.1_160)]/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Doctor Card 1 - Active State */}
            <motion.div 
              className="relative w-full max-w-md z-10"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: silk }}
            >
              <GlassCard className="p-7 border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] bg-white/80 dark:bg-black/80 backdrop-blur-3xl">
                <div className="flex items-start gap-5">
                  <Avatar className="h-16 w-16 ring-4 ring-background shadow-lg">
                    <AvatarFallback className="bg-[oklch(0.4_0.1_160)]/10 text-[oklch(0.4_0.1_160)] font-bold text-xl">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-heading text-xl font-bold text-foreground tracking-tight">
                        Dr. Sarah Mitchell
                      </p>
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <Badge variant="secondary" className="bg-black/5 dark:bg-white/10 text-foreground/80 hover:bg-black/10 dark:hover:bg-white/20 border-transparent px-2.5 py-0.5 rounded-md">
                      Ayurvedic Medicine
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs font-bold uppercase tracking-[0.1em]">
                        Today&apos;s Availability
                      </p>
                    </div>
                    <Badge variant="outline" className="h-5 text-[9px] uppercase font-bold border-[oklch(0.4_0.1_160)]/30 text-[oklch(0.4_0.1_160)] bg-[oklch(0.4_0.1_160)]/10">Available Now</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center px-4 py-2.5 rounded-xl border-2 border-[oklch(0.4_0.1_160)] bg-[oklch(0.4_0.1_160)]/5 text-[oklch(0.4_0.1_160)] text-sm font-semibold shadow-sm transition-all">
                      2:00 PM
                    </button>
                    <button className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-border bg-background hover:border-[oklch(0.4_0.1_160)]/50 hover:bg-[oklch(0.4_0.1_160)]/5 text-foreground text-sm font-medium transition-all">
                      4:30 PM
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Doctor Card 2 - Stacked behind */}
            <motion.div 
              className="relative w-full max-w-md z-0 ml-12 -mt-10 opacity-70 scale-95 origin-bottom hidden sm:block"
              initial={{ y: 0 }}
              whileInView={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: silk }}
            >
              <GlassCard className="p-7 border-white/10 shadow-md bg-white/40 dark:bg-black/40 backdrop-blur-xl pointer-events-none">
                <div className="flex items-start gap-5">
                  <Avatar className="h-16 w-16 ring-4 ring-background shadow-md opacity-80">
                    <AvatarFallback className="bg-[oklch(0.65_0.15_45)]/10 text-[oklch(0.65_0.15_45)] font-bold text-xl">
                      AP
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="font-heading text-xl font-bold text-foreground/80 tracking-tight">
                      Dr. Arjun Patel
                    </p>
                    <Badge variant="secondary" className="mt-1 bg-black/5 dark:bg-white/10 text-foreground/70 border-transparent px-2.5 py-0.5 rounded-md">
                      Internal Medicine
                    </Badge>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-border/40">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 rounded-xl bg-black/5 dark:bg-white/5" />
                    <div className="h-10 rounded-xl bg-black/5 dark:bg-white/5" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
