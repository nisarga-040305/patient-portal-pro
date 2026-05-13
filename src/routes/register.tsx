import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Patient Registration — Meridian Health" },
      { name: "description", content: "Register as a new patient at Meridian Health." },
    ],
  }),
  component: RegisterPage,
});

const steps = ["Personal", "Contact", "Medical"];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="grid min-h-screen place-items-center bg-clinical-gradient p-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold">Registration complete</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your patient ID has been issued. You can now book your first appointment.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => navigate({ to: "/appointments" })}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Book appointment <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/login"
              className="inline-flex items-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent/40"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clinical-gradient">
      <header className="flex items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold">Meridian Health</span>
        </Link>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
          Already registered? <span className="font-medium text-primary">Sign in</span>
        </Link>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 pb-16">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Patient registration
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Create your patient profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Takes about 2 minutes. All information is encrypted.
          </p>
        </div>

        <ol className="mb-6 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`grid h-7 w-7 place-items-center rounded-full text-xs font-medium ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <form
          onSubmit={next}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" placeholder="Maria" required />
              <Field label="Last name" placeholder="Gomez" required />
              <Field label="Date of birth" type="date" required />
              <SelectField label="Gender" options={["Female", "Male", "Other", "Prefer not to say"]} />
              <Field label="National ID / Passport" placeholder="A12345678" />
              <SelectField label="Blood group" options={["A+","A-","B+","B-","AB+","AB-","O+","O-","Unknown"]} />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" type="email" placeholder="you@example.com" required />
              <Field label="Phone" placeholder="+1 555 123 4567" required />
              <Field label="Address" className="sm:col-span-2" placeholder="221B Baker Street" />
              <Field label="City" placeholder="London" />
              <Field label="Postal code" placeholder="NW1 6XE" />
              <Field label="Emergency contact" className="sm:col-span-2" placeholder="Name · phone · relation" />
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <Field label="Known allergies" placeholder="Penicillin, peanuts…" />
              <Field label="Current medications" placeholder="e.g. Atorvastatin 20mg daily" />
              <Field label="Past surgeries / conditions" placeholder="Brief notes" />
              <SelectField
                label="Preferred clinic"
                options={["Main hospital", "North clinic", "Riverside clinic"]}
              />
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 rounded border-input" />
                I agree to the privacy policy and consent to receive treatment-related notifications.
              </label>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-accent/40"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {step === steps.length - 1 ? "Submit" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/40 focus:border-ring focus:ring-2"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
  className = "",
}: {
  label: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium">{label}</label>
      <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring/40 focus:border-ring focus:ring-2">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
