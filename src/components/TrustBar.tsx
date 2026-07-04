import React from "react";
import { ShieldCheck, Leaf, Stethoscope, Users } from "lucide-react";

export function TrustBar() {
  const items = [
    {
      icon: <Leaf className="h-6 w-6 text-primary" />,
      title: "Integrated Care",
      desc: "Ayurveda & Modern Science",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Safe & Effective",
      desc: "Vetted health protocols",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      title: "Preventive Focus",
      desc: "Treat the root cause",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Trusted Community",
      desc: "Thousands recovering daily",
    },
  ];

  return (
    <section className="bg-muted py-12 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-background rounded-full shadow-sm">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-base">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
