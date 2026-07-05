import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1.5 font-heading font-bold text-xl text-primary mb-4">
              <span>NirogiTanman</span>
              <Leaf className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              An integrative wellness platform bridging Ayurveda, Yoga, and Modern Medicine for a balanced, healthy life.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-xs">Explore</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#programs" className="hover:text-primary transition-colors">Programs</Link></li>
              <li><Link href="/consult/expert" className="hover:text-primary transition-colors">Expert Consult</Link></li>
              <li><Link href="/consult/doctor" className="hover:text-primary transition-colors">Doctor Consult</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NirogiTanman. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Not a substitute for professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
