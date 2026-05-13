import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, Mail, Lock, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Meridian Health" },
      { name: "description", content: "Sign in to the Meridian Health hospital management portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@meridian.health");
  const [password, setPassword] = useState("demo1234");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-clinical-gradient lg:block">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold">Meridian Health</span>
          </Link>
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              Better care, organized.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Manage patients, appointments, billing and laboratory reports from
              a single, calm interface designed for clinical teams.
            </p>
            <div className="mt-6 flex gap-6 text-xs text-muted-foreground">
              <div>
                <p className="font-display text-xl font-semibold text-foreground">128</p>
                clinicians
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-foreground">12k+</p>
                patients
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-foreground">99.9%</p>
                uptime
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold">Meridian Health</span>
          </div>

          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your hospital credentials to continue.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none ring-ring/40 focus:border-ring focus:ring-2"
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium text-foreground">Password</label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none ring-ring/40 focus:border-ring focus:ring-2"
                  required
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="h-3.5 w-3.5 rounded border-input" defaultChecked />
              Keep me signed in for 30 days
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New patient?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-[11px] text-muted-foreground">
            <p className="font-medium text-foreground">Demo credentials</p>
            admin@meridian.health · demo1234
          </div>
        </form>
      </div>
    </div>
  );
}
