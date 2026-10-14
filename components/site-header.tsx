"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Waves, X } from "lucide-react";
import { navigation } from "@/lib/site-data";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6ece7]/90 bg-[#fbfcf8]/95 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="FreshFold Laundry home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#116c83] text-white">
            <Waves size={21} strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-[-.04em] text-[#18343d]">
              FreshFold
            </span>
            <span className="block text-[10px] font-medium tracking-[.11em] text-[#769087]">
              LAUNDRY
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-[#52656b] transition hover:text-[#116c83]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/login?callbackUrl=%2Fdashboard%2Forders%2Fnew"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(17,108,131,.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d5266]"
          >
            Sign in
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe8e1] text-[#18343d] lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-[#e6ece7] bg-[#fbfcf8] px-5 pb-5 pt-2 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-[#edf1ed] py-3.5 text-sm font-medium text-[#52656b] transition hover:text-[#116c83]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#d8e2dc] text-sm font-semibold text-[#18333c]"
          >
            Sign in
          </Link>
          <Link
            href="/login?callbackUrl=%2Fdashboard%2Forders%2Fnew"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266]"
          >
            Book a pickup
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
