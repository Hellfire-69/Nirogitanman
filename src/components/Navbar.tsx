"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Leaf } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] md:w-auto md:max-w-5xl"
      >
        <nav 
          aria-label="Main Navigation"
          className="flex items-center justify-between gap-8 px-6 py-3 rounded-full bg-background/50 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:bg-background/40"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95 shrink-0">
            <Image 
              src="/nirogitanman_logo.png" 
              alt="NirogiTanman Logo" 
              width={56} 
              height={56} 
              className="object-contain"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-xl md:text-2xl text-primary tracking-tight">
                NirogiTanman
              </span>
              <Leaf className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#programs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Programs
            </Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button variant="ghost" className="rounded-full px-4">
              Log in
            </Button>
            <Button className="rounded-full shadow-sm active:scale-95 transition-all px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link 
                href="#programs" 
                className="text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Programs
              </Link>
              <Link 
                href="#about" 
                className="text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/dashboard" 
                className="text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="outline" className="w-full justify-center rounded-xl">Log in</Button>
                <Button className="w-full justify-center shadow-sm rounded-xl">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
