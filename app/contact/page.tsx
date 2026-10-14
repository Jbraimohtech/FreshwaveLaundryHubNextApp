import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink, PageHero } from "@/components/site-ui";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Book a laundry pickup",
  description:
    "Get in touch with FreshFold Laundry or sign in to request a wash & fold, dry cleaning, or business laundry pickup.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & booking"
        title="Your next fresh start is a few taps away."
        description="Book a pickup from your account, or get in touch with our team about the right care for your laundry."
      />
      <section className="page-shell grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
        <Reveal className="flex flex-col items-start justify-center rounded-[22px] border border-[#e5ece7] bg-white p-6 sm:p-9">
          <p className="eyebrow">Ready for a fresh start?</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-.05em]">Book a pickup from your account.</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#63777e]">
            Save your pickup address, choose a service and a time, and keep an eye on every order from your FreshFold dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/login?callbackUrl=%2Fdashboard%2Forders%2Fnew">Book a pickup</ButtonLink>
            <Link href="/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8e2dc] px-5 text-sm font-semibold text-[#18333c] hover:bg-[#f8fbf8]">
              Create an account
            </Link>
          </div>
          <p className="mt-7 border-t border-[#edf1ed] pt-5 text-xs leading-5 text-[#82938e]">
            Have a question about the service? We’re here to help.
          </p>
        </Reveal>

        <div className="space-y-5">
          <Reveal className="rounded-[22px] bg-[#f2f7f3] p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-.03em]">We’re happy to help.</h2>
            <p className="mt-2 text-sm leading-6 text-[#63777e]">
              Have a question before booking? Reach out and our team will be in touch.
            </p>
            <div className="mt-5 space-y-4">
              <a href="tel:+15550142024" className="flex items-center gap-3 text-sm font-medium text-[#294952] hover:text-[#116c83]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#116c83]"><Phone size={16} /></span>
                +1 (555) 014-2024
              </a>
              <a href="mailto:hello@freshfoldlaundry.com" className="flex items-center gap-3 text-sm font-medium text-[#294952] hover:text-[#116c83]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#116c83]"><Mail size={16} /></span>
                hello@freshfoldlaundry.com
              </a>
              <p className="flex items-center gap-3 text-sm font-medium text-[#294952]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#116c83]"><Clock3 size={16} /></span>
                Hours confirmed with your pickup
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[245px] overflow-hidden rounded-[22px] border border-[#e0e9e3] bg-[#eaf2ee]">
              <iframe
                title="Google Maps search for FreshFold Laundry"
                src="https://www.google.com/maps?q=FreshFold%20Laundry&output=embed"
                className="absolute inset-0 h-full w-full border-0 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=FreshFold+Laundry"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#294952] shadow-sm"
              >
                <MapPin size={14} className="text-[#116c83]" />
                Check your service area
              </a>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#82938e]">
              Add your confirmed service address and coverage area to Google Maps before launch.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
