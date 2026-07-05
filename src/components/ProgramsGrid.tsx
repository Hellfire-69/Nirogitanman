"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import Image from "next/image";
import { ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Immunity Booster",
    desc: "Strengthen your natural defenses through personalized Ayurvedic diets and holistic practices.",
    image: "/programs/immunity-booster.png",
  },
  {
    title: "Digestive Wellness",
    desc: "Heal your gut, optimize metabolism, and solve chronic digestive issues permanently.",
    image: "/programs/digestive-wellness.png",
  },
  {
    title: "Stress & Mental Balance",
    desc: "Find calm and focus with guided Yoga, meditation, and nervine tonics.",
    image: "/programs/stress-mental.png",
  },
  {
    title: "Weight Management",
    desc: "Sustainable fat loss combining modern nutritional science with Ayurvedic body-typing.",
    image: "/programs/weight-management.png",
  },
  {
    title: "Skin & Hair Care",
    desc: "Rejuvenate naturally with targeted internal detox and topical herbal regimens.",
    image: "/programs/skin-hair.png",
  },
];

const AnimatedProgramCard = ({ 
  program, 
  idx, 
  scrollYProgress, 
  activeIndex, 
  total 
}: { 
  program: any, 
  idx: number, 
  scrollYProgress: MotionValue<number>, 
  activeIndex: number, 
  total: number 
}) => {
  const start = idx / total;
  const end = (idx + 1) / total;
  
  // Crossfade mapping: fade in before it's active, fade out after
  const fadeInStart = Math.max(0, start - 0.1);
  const fadeOutEnd = Math.min(1, end + 0.1);

  // Memoize input range to prevent continuous hook recalculation and garbage collection overhead
  const inputRange = useMemo(() => [fadeInStart, start, end, fadeOutEnd], [fadeInStart, start, end, fadeOutEnd]);

  // GPU-accelerated motion values with added depth cues (scale/rotation)
  const opacity = useTransform(scrollYProgress, inputRange, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, inputRange, [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, inputRange, [0.92, 1, 1, 1.05]);
  const rotate = useTransform(scrollYProgress, inputRange, [3, 0, 0, -3]);

  const isActive = activeIndex === idx;

  return (
    <motion.div 
      style={{ 
        opacity, 
        y,
        scale,
        rotate,
        pointerEvents: isActive ? "auto" : "none" 
      }}
      className="absolute inset-0 flex items-center justify-center p-8 will-change-transform"
      aria-hidden={!isActive}
    >
      <div className="w-full max-w-[550px] aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-border/50 bg-background">
        <Image 
          src={program.image} 
          alt={program.title} 
          fill 
          className="object-cover"
          priority={idx === 0}
          sizes="(max-width: 1200px) 50vw, 550px" 
        />
        {/* Brand-tinted deep teal scrim ensures 4.5:1 contrast while remaining intentional and premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#005346]/95 via-[#005346]/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-12 z-10">
          <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">{program.title}</h3>
          <p className="text-white/90 mb-8 text-lg leading-relaxed drop-shadow-sm">{program.desc}</p>
          
          {/* Nested CTA Architecture (Button-in-Button) */}
          <Link 
            href="/consult/expert" 
            tabIndex={isActive ? 0 : -1}
            className="group inline-flex items-center text-sm font-semibold bg-white text-black pl-6 pr-2 py-2 rounded-full hover:bg-gray-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-primary shadow-xl active:scale-[0.98]"
          >
            Consult Expert 
            <span className="ml-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export function ProgramsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * programs.length), programs.length - 1);
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const handleScrollTo = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
    const targetProgress = index / programs.length + (0.5 / programs.length);
    const targetY = containerTop + scrollableDistance * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {/* DESKTOP: Split Scroll-Driven Layout */}
      <section 
        ref={containerRef} 
        id="programs-desktop" 
        className="relative hidden md:block bg-background" 
        style={{ height: `${programs.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 flex h-full py-32">
            
            {/* Left Column: Sticky Sidebar */}
            <div className="w-[40%] flex flex-col justify-center pr-12 lg:pr-24 relative z-20">
              <div className="mb-6 inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary/10 text-primary">
                Our Programs
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Targeted <br />Healing Paths
              </h2>
              <p className="text-muted-foreground text-lg mb-16 leading-relaxed">
                Choose a specialized wellness program tailored to your unique biology and lifestyle goals.
              </p>
              
              {/* Progress Indicator */}
              <div className="flex flex-col space-y-10 relative pl-2">
                <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-border/60 z-0"></div>
                
                {programs.map((p, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleScrollTo(i)}
                    className="flex items-center gap-6 z-10 relative text-left group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                    aria-label={`Jump to ${p.title}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm ${
                      activeIndex === i 
                        ? 'bg-primary ring-4 ring-primary/20 text-primary-foreground scale-110' 
                        : 'bg-background border-[3px] border-border text-muted-foreground group-hover:border-primary/50'
                    }`}>
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className={`text-xl lg:text-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      activeIndex === i 
                        ? 'font-bold text-foreground tracking-tight translate-x-2' 
                        : 'text-muted-foreground font-medium group-hover:text-foreground/80'
                    }`}>
                      {p.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Scroll-Linked Cards */}
            <div className="w-[60%] h-full relative flex items-center justify-center">
              {programs.map((program, idx) => (
                <AnimatedProgramCard 
                  key={idx}
                  program={program}
                  idx={idx}
                  scrollYProgress={scrollYProgress}
                  activeIndex={activeIndex}
                  total={programs.length}
                />
              ))}
            </div>
            
            {/* Manual Controls */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
              <button 
                onClick={() => handleScrollTo(Math.max(activeIndex - 1, 0))}
                disabled={activeIndex === 0}
                aria-label="Scroll to previous program"
                className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleScrollTo(Math.min(activeIndex + 1, programs.length - 1))}
                disabled={activeIndex === programs.length - 1}
                aria-label="Scroll to next program"
                className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* MOBILE: Standard Vertical Stack Layout */}
      <section id="programs-mobile" className="md:hidden py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary/10 text-primary">
              Our Programs
            </div>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Targeted Healing Paths</h2>
            <p className="text-muted-foreground text-lg px-2">
              Choose a specialized wellness program tailored to your unique biology and lifestyle goals.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            {programs.map((program, idx) => (
              <div key={idx} className="w-full max-w-[400px] mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-xl ring-1 ring-border/50">
                <Image 
                  src={program.image} 
                  fill 
                  className="object-cover" 
                  alt={program.title}
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw"
                />
                {/* Brand-tinted deep teal scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#005346]/95 via-[#005346]/60 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 z-10">
                  <h3 className="font-heading text-3xl font-bold text-white mb-3 drop-shadow-sm">{program.title}</h3>
                  <p className="text-white/90 mb-8 text-base leading-relaxed drop-shadow-sm">{program.desc}</p>
                  
                  {/* Nested CTA Architecture (Button-in-Button) */}
                  <Link 
                    href="/consult/expert" 
                    className="group inline-flex items-center text-sm font-semibold bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full hover:bg-gray-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] w-fit focus:outline-none focus-visible:ring-4 focus-visible:ring-primary shadow-xl active:scale-[0.98]"
                  >
                    Consult Expert 
                    <span className="ml-3 w-7 h-7 rounded-full bg-black/5 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
