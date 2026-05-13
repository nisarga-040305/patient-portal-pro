import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatCard, StatusPill } from "@/components/app-shell";
import { invoices } from "@/lib/mock-data";
import { useState } from "react";
import { CreditCard, Download, Receipt, Wallet } from "lucide-react";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Meridian Health" },
      { name: "description", content: "Hospital invoices, outstanding balances and payment history." },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const [filter, setFilter] = useState<"All" | "Paid" | "Unpaid" | "Overdue">("All");

  const list = invoices.filter((i) => filter === "All" || i.status === filter);
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <AppShell>
      <PageHeader
        title="Billing"
        description="Track invoices, payments and outstanding balances."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Receipt className="h-4 w-4" /> New invoice
          </button>
        }
      />

      <div className="grid gap-4 px-4 py-6 sm:grid-cols-3 lg:px-8">
        <StatCard label="Total billed" value={`$${total.toLocaleString()}`} icon={Wallet} />
        <StatCard label="Outstanding" value={`$${outstanding.toLocaleString()}`} hint={`${invoices.filter(i=>i.status!=="Paid").length} invoices`} icon={CreditCard} tone="warning" />
        <StatCard label="Overdue" value={`$${overdue.toLocaleString()}`} icon={Receipt} tone="success" />
      </div>

      <div className="px-4 pb-10 lg:px-8">
        <div className="rounded-2xl border border-border bg-card">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-1 rounded-lg border border-input bg-background p-1 text-xs">
              {(["All", "Paid", "Unpaid", "Overdue"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Invoice</th>
                  <th className="px-5 py-3 text-left font-medium">Patient</th>
                  <th className="px-5 py-3 text-left font-medium">Service</th>
                  <th className="px-5 py-3 text-left font-medium">Date</th>
                  <th className="px-5 py-3 text-right font-medium">Amount</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{inv.id}</td>
                    <td className="px-5 py-3">{inv.patient}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.service}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.date}</td>
                    <td className="px-5 py-3 text-right font-medium">${inv.amount.toLocaleString()}</td>
                    <td className="px-5 py-3"><StatusPill status={inv.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-medium text-primary hover:underline">
                        {inv.status === "Paid" ? "View" : "Charge"}
                      </button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No invoices in this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
