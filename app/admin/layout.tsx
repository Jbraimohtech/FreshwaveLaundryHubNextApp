import type { ReactNode } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Customers" },
  { href: "/admin/services", label: "Services & pricing" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await connection();
  await requireAdmin();

  return (
    <div className="page-shell py-8 sm:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">FreshFold operations</p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-.06em]">Admin panel</h1>
        </div>
        <Link href="/dashboard" className="text-xs font-semibold text-[#116c83] hover:underline">Back to my account</Link>
      </div>
      <nav aria-label="Admin navigation" className="mb-7 flex gap-2 overflow-x-auto border-b border-[#e5ece7] pb-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 rounded-full border border-[#dce6e0] bg-white px-4 py-2 text-xs font-semibold text-[#526a70] transition hover:border-[#9cbcaf] hover:text-[#116c83]">
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
