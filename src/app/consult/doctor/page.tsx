import { getDoctorsWithAvailableSlots } from "@/lib/doctors-data";
import { DoctorCard } from "@/components/consult/DoctorCard";

export default async function DoctorConsultPage() {
  const doctors = await getDoctorsWithAvailableSlots();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          Doctor Consult
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
          Book a doctor consultation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Choose a doctor and pick an available slot. Your booking is confirmed instantly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
