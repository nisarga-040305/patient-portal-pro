import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, StatusPill } from "@/components/app-shell";
import { appointments, doctors, invoices } from "@/lib/mock-data";
import { Bed, DollarSign, Stethoscope, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Meridian Health" },
      { name: "description", content: "Hospital-wide operations: occupancy, staff, revenue and bookings." },
    ],
  }),
  component: AdminDashboard,
});

const departments = [
  { name: "Cardiology", patients: 42, occupancy: 78 },
  { name: "Neurology", patients: 28, occupancy: 64 },
  { name: "Pediatrics", patients: 51, occupancy: 88 },
  { name: "Orthopedics", patients: 33, occupancy: 71 },
  { name: "Dermatology", patients: 19, occupancy: 42 },
];

function AdminDashboard() {
  const revenue = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <AppShell>
      <PageHeader
        title="Admin dashboard"
        description="Operational health across departments and clinics."
      />

      <div className="grid gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <StatCard label="Active patients" value="412" hint="↑ 6% week-over-week" icon={Users} />
        <StatCard label="Bed occupancy" value="73%" hint="184 / 252 beds" icon={Bed} tone="accent" />
        <StatCard label="Doctors on duty" value={String(doctors.length)} hint="2 on call" icon={Stethoscope} tone="success" />
        <StatCard label="Collected today" value={`$${revenue.toLocaleString()}`} icon={DollarSign} tone="warning" />
      </div>

      <div className="grid gap-6 px-4 pb-10 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <section className="rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold">Department occupancy</h2>
              <p className="text-xs text-muted-foreground">Live across the hospital</p>
            </div>
          </header>
          <ul className="divide-y divide-border">
            {departments.map((d) => (
              <li key={d.name} className="px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {d.patients} patients · {d.occupancy}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      d.occupancy > 80
                        ? "bg-destructive"
                        : d.occupancy > 65
                          ? "bg-warning"
                          : "bg-primary"
                    }`}
                    style={{ width: `${d.occupancy}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card">
            <header className="border-b border-border px-5 py-4">
              <h2 className="font-semibold">Recent bookings</h2>
            </header>
            <ul className="divide-y divide-border">
              {appointments.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.patient}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.doctor} · {a.date} {a.time}
                    </p>
                  </div>
                  <StatusPill status={a.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">Staff on shift</h2>
            <p className="mt-1 text-xs text-muted-foreground">{doctors.length} clinicians scheduled</p>
            <ul className="mt-3 space-y-2">
              {doctors.slice(0, 4).map((d) => (
                <li key={d.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-2">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/30 text-xs font-medium text-accent-foreground">
                    {d.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.specialty}</p>
                  </div>
                  <span className="text-[11px] font-medium text-success">On duty</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
