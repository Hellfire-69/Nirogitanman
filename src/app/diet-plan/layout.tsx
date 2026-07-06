import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DietPlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="md:pl-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
