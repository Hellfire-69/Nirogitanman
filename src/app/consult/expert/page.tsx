import { getExperts } from "@/lib/experts-data";
import { ExpertCard } from "@/components/consult/ExpertCard";
import { RequestSessionForm } from "@/components/consult/RequestSessionForm";

export default async function ExpertConsultPage() {
  const experts = await getExperts();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          Expert Consult
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
          Meet our wellness experts
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Non-medical wellness and lifestyle coaches to support your daily routines.
          Request a session below and their team will confirm a time with you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>

      <RequestSessionForm experts={experts} />
    </div>
  );
}
