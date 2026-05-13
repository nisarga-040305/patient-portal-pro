import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, StatusPill } from "@/components/app-shell";
import { appointments, labReports } from "@/lib/mock-data";
import { CalendarCheck2, FlaskConical, Users, Video, MapPin, FileText } from "lucide-react";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Doctor dashboard — Meridian Health" },
      { name: "description", content: "Today's schedule, patients, and pending lab results for clinicians." },
    ],
  }),
  component: DoctorDashboard,
});

function DoctorDashboard() {
  const mine = appointments.filter((a) => a.doctor === "Dr. Aarav Mehta" || a.specialty === "Cardiology");
  const upcoming = mine.filter((a) => a.status === "Confirmed" || a.status === "Pending");
  const myLabs = labReports.filter((r) => r.doctor === "Dr. Aarav Mehta");

  return (
    <AppShell>
      <PageHeader
        title="Dr. Aarav Mehta"
        description="Cardiology · Wednesday, May 13 · 6 patients today"
      />

      <div className="grid gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <StatCard label="Today's patients" value={String(upcoming.length)} hint="2 video, rest in-person" icon={Users} />
        <StatCard label="Completed" value="3" hint="Avg. 18 min/visit" icon={CalendarCheck2} tone="success" />
        <StatCard label="Lab reports to review" value={String(myLabs.filter(r=>r.status==="Ready").length)} icon={FlaskConical} tone="warning" />
        <StatCard label="Messages" value="4" hint="2 urgent" icon={FileText} tone="accent" />
      </div>

      <div className="grid gap-6 px-4 pb-10 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <section className="rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold">Today's schedule</h2>
              <p className="text-xs text-muted-foreground">Sorted by time</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">View week →</button>
          </header>
          <ol className="divide-y divide-border">
            {mine.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-16 shrink-0 text-center">
                  <p className="font-display text-lg font-semibold">{a.time}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{a.date.slice(5)}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{a.patient}</p>
                  <p className="text-xs text-muted-foreground">{a.specialty} · 30 min</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {a.type === "Video" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                  {a.type}
                </span>
                <StatusPill status={a.status} />
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card">
            <header className="border-b border-border px-5 py-4">
              <h2 className="font-semibold">Pending lab results</h2>
              <p className="text-xs text-muted-foreground">Awaiting your sign-off</p>
            </header>
            <ul className="divide-y divide-border">
              {myLabs.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.test}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.patient} · {r.id}</p>
                  </div>
                  <StatusPill status={r.status} />
                </li>
              ))}
              {myLabs.length === 0 && (
                <li className="px-5 py-6 text-center text-xs text-muted-foreground">
                  No labs pending.
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">Quick notes</h2>
            <p className="mt-1 text-xs text-muted-foreground">Drafted for the next visit.</p>
            <textarea
              defaultValue="Mrs. Gomez: review lipid trend, discuss exercise plan. Confirm prescription refill."
              className="mt-3 h-28 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-ring"
            />
            <button className="mt-2 w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Save note
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
