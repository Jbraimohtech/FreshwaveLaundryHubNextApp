import type { ReactNode } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireUser } from "@/lib/auth-guard";
import { DashboardNavigation } from "@/components/dashboard-navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await connection();
  const user = await requireUser();

  return (
    <div className="page-shell py-8 sm:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your FreshFold account</p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-.06em]">
            Hello, {user.name?.split(" ")[0] ?? "there"}.
          </h1>
        </div>
        <Link
          href="/dashboard/orders/new"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266]"
        >
          Book a pickup
        </Link>
      </div>
      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DashboardNavigation isAdmin={user.role === "ADMIN"} />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
