"use client";

import { FeatureDietPlan } from "./FeatureDietPlan";
import { FeatureAssistant } from "./FeatureAssistant";
import { FeatureDoctor } from "./FeatureDoctor";
import { FeatureExpert } from "./FeatureExpert";

export function FeaturesShowcase() {
  return (
    <section className="relative overflow-hidden bg-background">
      <FeatureDietPlan />
      <FeatureAssistant />
      <FeatureDoctor />
      <FeatureExpert />
    </section>
  );
}
