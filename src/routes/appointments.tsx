import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { doctors, specialties } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Calendar, Clock, Search, Star, Video, MapPin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an appointment — Meridian Health" },
      { name: "description", content: "Find a doctor and book an appointment in minutes." },
    ],
  }),
  component: AppointmentsPage,
});

const timeSlots = ["08:30", "09:15", "10:00", "10:45", "11:30", "13:30", "14:15", "15:00", "15:45", "16:30"];

function AppointmentsPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [type, setType] = useState<"In-person" | "Video">("In-person");
  const [doctorId, setDoctorId] = useState(doctors[0].id);
  const [date, setDate] = useState("2026-05-15");
  const [slot, setSlot] = useState("10:00");
  const [confirmed, setConfirmed] = useState(false);

  const filtered = useMemo(
    () =>
      doctors.filter(
        (d) =>
          (specialty === "All" || d.specialty === specialty) &&
          (d.name.toLowerCase().includes(query.toLowerCase()) ||
            d.specialty.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, specialty],
  );

  const doctor = doctors.find((d) => d.id === doctorId)!;

  return (
    <AppShell>
      <PageHeader
        title="Book an appointment"
        description="Choose a clinician, time and visit type."
      />

      {confirmed ? (
        <div className="px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-lg rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Appointment confirmed</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {doctor.name} · {doctor.specialty}
              <br />
              {date} at {slot} · {type}
            </p>
            <button
              onClick={() => setConfirmed(false)}
              className="mt-5 rounded-lg border border-input bg-background px-4 py-2 text-sm hover:bg-accent/40"
            >
              Book another
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 px-4 py-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search doctors or specialty"
                  className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-ring"
              >
                <option>All</option>
                {specialties.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((d) => {
                const active = d.id === doctorId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDoctorId(d.id)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/30 font-medium text-accent-foreground">
                      {d.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.specialty}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {d.rating}
                        </span>
                        <span>{d.experience} yrs</span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="col-span-full rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No doctors match your search.
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border bg-card p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Selected
              </p>
              <p className="mt-1 font-medium">{doctor.name}</p>
              <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium">Visit type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["In-person", "Video"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium ${
                      type === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input bg-background text-muted-foreground hover:bg-accent/30"
                    }`}
                  >
                    {t === "Video" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium">Date</label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" /> Available slots
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`rounded-md border px-2 py-1.5 text-xs font-medium ${
                      slot === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background hover:bg-accent/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Confirm booking
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              You'll receive a confirmation by email.
            </p>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
