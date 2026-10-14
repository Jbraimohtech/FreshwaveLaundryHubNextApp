import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Waves } from "lucide-react";
import { navigation } from "@/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="bg-[#123843] text-white">
      <div className="page-shell grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-[#b9e0c9]">
              <Waves size={21} />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-bold tracking-[-.04em]">
                FreshWave
              </span>
              <span className="block text-[10px] font-medium tracking-[.11em] text-white/50">
                LAUNDRYHUB
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            A little more time for what matters. We make laundry feel easy,
            thoughtful, and fresh from start to finish.
          </p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="FreshWave on Instagram"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <Camera size={17} />
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[.14em] text-[#b9e0c9]">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[.14em] text-[#b9e0c9]">
            Say hello
          </h2>
          <p className="mt-5 text-sm text-white/60">
            Our service area and hours are confirmed when you book.
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:hello@freshwavelaundry.com"
                className="flex items-center gap-3 text-sm text-white/80 transition hover:text-white"
              >
                <Mail size={15} className="text-[#b9e0c9]" />
                hello@freshwavelaundry.com
              </a>
            </li>
            <li>
              <a
                href="tel:+15550142024"
                className="flex items-center gap-3 text-sm text-white/80 transition hover:text-white"
              >
                <Phone size={15} className="text-[#b9e0c9]" />
                +1 (555) 014-2024
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/65">
              <MapPin size={15} className="text-[#b9e0c9]" />
              Your neighborhood, our delivery route
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© FreshWave LaundryHub. Made for easier days.</p>
          <p>Thoughtful care. Lighter footprint.</p>
        </div>
      </div>
    </footer>
  );
}
