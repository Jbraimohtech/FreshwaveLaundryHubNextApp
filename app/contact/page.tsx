import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site-ui";
import BookingForm from "@/components/booking-form";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Book a laundry pickup",
  description:
    "Request a FreshWave laundry pickup or get in touch about wash & fold, dry cleaning, and business laundry service.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & booking"
        title="Your next fresh start is a few taps away."
        description="Tell us a little about your laundry and when you’d like us to pick it up. Our team will confirm your service and delivery details."
      />
      <section className="page-shell grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
        <Reveal className="rounded-[22px] border border-[#e5ece7] bg-white p-6 sm:p-9">
          <p className="eyebrow">Request a pickup</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-.05em]">Where should we meet you?</h2>
          <p className="mt-2 mb-7 text-sm leading-6 text-[#63777e]">
            Fields marked with * are required. We’ll follow up to confirm availability.
          </p>
          <BookingForm />
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
              <a href="mailto:hello@freshwavelaundry.com" className="flex items-center gap-3 text-sm font-medium text-[#294952] hover:text-[#116c83]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#116c83]"><Mail size={16} /></span>
                hello@freshwavelaundry.com
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
                title="Google Maps search for FreshWave LaundryHub"
                src="https://www.google.com/maps?q=FreshWave%20LaundryHub&output=embed"
                className="absolute inset-0 h-full w-full border-0 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=FreshWave+LaundryHub"
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
