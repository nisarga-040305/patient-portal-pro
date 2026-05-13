import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard } from "@/components/app-shell";
import {
  Activity,
  Calendar,
  FlaskConical,
  Receipt,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { appointments, doctors, invoices, labReports } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Health — Hospital Management System" },
      {
        name: "description",
        content:
          "All-in-one hospital management system: appointments, doctor and admin dashboards, billing, and laboratory reports.",
      },
    ],
  }),
  component: Overview,
});

const quickLinks = [
  { to: "/login", title: "Login", desc: "Sign in to your account", icon: ShieldCheck },
  { to: "/register", title: "Patient registration", desc: "Create a new patient profile", icon: HeartPulse },
  { to: "/appointments", title: "Book appointment", desc: "Choose a doctor and time slot", icon: Calendar },
  { to: "/doctor", title: "Doctor dashboard", desc: "Today's schedule and patients", icon: Stethoscope },
  { to: "/admin", title: "Admin dashboard", desc: "Hospital-wide operations view", icon: ShieldCheck },
  { to: "/billing", title: "Billing", desc: "Invoices and payments", icon: Receipt },
  { to: "/lab-reports", title: "Lab reports", desc: "Diagnostic results", icon: FlaskConical },
] as const;

function Overview() {
  const todayAppointments = appointments.filter((a) =>
    ["Confirmed", "Pending"].includes(a.status),
  ).length;
  const outstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((s, i) => s + i.amount, 0);
  const labsReady = labReports.filter((r) => r.status === "Ready").length;

  return (
    <AppShell>
      <PageHeader
        title="Welcome back"
        description="Operational snapshot of Meridian Health for today."
      />

      <section className="bg-clinical-gradient">
        <div className="grid gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <StatCard label="Active appointments" value={String(todayAppointments)} hint="Across all clinics" icon={Calendar} />
          <StatCard label="Doctors on staff" value={String(doctors.length)} hint="6 specialties" icon={Stethoscope} tone="accent" />
          <StatCard label="Outstanding billing" value={`$${outstanding.toLocaleString()}`} hint={`${invoices.filter(i=>i.status!=="Paid").length} invoices`} icon={Receipt} tone="warning" />
          <StatCard label="Lab reports ready" value={String(labsReady)} hint="Awaiting review" icon={FlaskConical} tone="success" />
        </div>
      </section>

      <section className="px-4 py-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Jump to
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.to}
                to={q.to}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{q.title}</p>
                    <p className="text-xs text-muted-foreground">{q.desc}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
