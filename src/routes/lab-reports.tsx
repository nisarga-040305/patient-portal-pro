import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusPill } from "@/components/app-shell";
import { labReports } from "@/lib/mock-data";
import { useState } from "react";
import { Download, FlaskConical, Printer } from "lucide-react";

export const Route = createFileRoute("/lab-reports")({
  head: () => ({
    meta: [
      { title: "Laboratory reports — Meridian Health" },
      { name: "description", content: "Diagnostic and laboratory results with clinician summaries." },
    ],
  }),
  component: LabReportsPage,
});

function LabReportsPage() {
  const [activeId, setActiveId] = useState(labReports[0].id);
  const active = labReports.find((r) => r.id === activeId)!;

  return (
    <AppShell>
      <PageHeader
        title="Laboratory reports"
        description="Diagnostics, histology and pathology results."
      />

      <div className="grid gap-6 px-4 py-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">All reports</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {labReports.length}
            </span>
          </header>
          <ul className="divide-y divide-border">
            {labReports.map((r) => {
              const isActive = r.id === activeId;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setActiveId(r.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-primary/5" : "hover:bg-muted/40"
                    }`}
                  >
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-accent/30 text-accent-foreground"
                    }`}>
                      <FlaskConical className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.test}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.patient} · {r.date}
                      </p>
                      <div className="mt-1.5">
                        <StatusPill status={r.status} />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="rounded-2xl border border-border bg-card">
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {active.id}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">{active.test}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Patient: <span className="text-foreground">{active.patient}</span> · Ordering clinician:{" "}
                <span className="text-foreground">{active.doctor}</span> · {active.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={active.status} />
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent/40">
                <Printer className="h-3.5 w-3.5" /> Print
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          </header>

          <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_1.4fr]">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Clinician summary
              </p>
              <p className="mt-2 text-sm leading-relaxed">{active.summary}</p>
              <div className="mt-4 space-y-2 text-xs">
                <Row k="Sample collected" v={active.date} />
                <Row k="Lab" v="Meridian Central Lab" />
                <Row k="Method" v="Standard panel · automated" />
                <Row k="Verified by" v={active.doctor} />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Results
              </p>
              {active.results.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-medium">Marker</th>
                        <th className="px-4 py-2.5 text-left font-medium">Result</th>
                        <th className="px-4 py-2.5 text-left font-medium">Reference</th>
                        <th className="px-4 py-2.5 text-left font-medium">Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {active.results.map((r) => (
                        <tr key={r.marker}>
                          <td className="px-4 py-2.5 font-medium">{r.marker}</td>
                          <td className="px-4 py-2.5">{r.value}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{r.range}</td>
                          <td className="px-4 py-2.5"><StatusPill status={r.flag} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
                  Results not available yet — check back once status is <span className="font-medium">Ready</span>.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}
