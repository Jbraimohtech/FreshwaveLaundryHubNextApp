"use client";

import Link from "next/link";
import { LayoutDashboard, MapPin, Package, Plus, Settings, ShieldCheck } from "lucide-react";
import { logoutAction } from "@/app/actions/account";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My orders", href: "/dashboard/orders", icon: Package },
  { label: "Saved addresses", href: "/dashboard/addresses", icon: MapPin },
  { label: "Profile settings", href: "/dashboard/profile", icon: Settings },
];

export function DashboardNavigation({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible" aria-label="Account navigation">
      {links.map(({ label, href, icon: Icon }) => {
        return (
          <Link
            key={href}
            href={href}
            className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#607570] transition hover:bg-[#f1f5f0] hover:text-[#116c83]"
          >
            <Icon size={17} />
            {label}
          </Link>
        );
      })}
      <Link
        href="/dashboard/orders/new"
        className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#607570] transition hover:bg-[#f1f5f0] hover:text-[#116c83]"
      >
        <Plus size={17} />
        Book a pickup
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#607570] transition hover:bg-[#f1f5f0] hover:text-[#116c83] lg:mt-5 lg:border-t lg:border-[#e6ece7] lg:pt-4"
        >
          <ShieldCheck size={17} />
          Admin panel
        </Link>
      )}
      <form action={logoutAction} className="shrink-0 lg:pt-4">
        <button
          type="submit"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#607570] transition hover:bg-[#fff1ed] hover:text-[#9d443b]"
        >
          <span aria-hidden="true">↪</span>
          Sign out
        </button>
      </form>
    </nav>
  );
}
