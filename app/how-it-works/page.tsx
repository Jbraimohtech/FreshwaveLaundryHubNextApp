import type { Metadata } from "next";
import { CalendarDays, PackageCheck, Sparkles, ArrowRight, Clock3 } from "lucide-react";
import { steps } from "@/lib/site-data";
import {
  ButtonLink,
  PageHero,
  SectionHeading,
  StepCard,
} from "@/components/site-ui";
import Reveal from "@/components/reveal";

const icons = [CalendarDays, Sparkles, PackageCheck];

export const metadata: Metadata = {
  title: "How FreshFold pickup & delivery works",
  description:
    "See how easy FreshFold makes laundry day: schedule a pickup, let us clean with care, and get fresh laundry delivered.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Easy as 1, 2, fresh"
        title="We’ll take it from here."
        description="No sorting piles, no laundromat runs, no lost weekend. A few thoughtful steps and laundry is handled."
      >
        <div className="mt-7">
          <ButtonLink href="/contact">Schedule a pickup</ButtonLink>
        </div>
      </PageHero>
      <section className="page-shell py-16 sm:py-24">
        <SectionHeading
          eyebrow="The FreshFold rhythm"
          title="From your doorstep to your drawer."
          description="We keep every step clear, so you always know what’s next."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={<Icon size={20} />}
              />
            );
          })}
        </div>
      </section>
      <section className="bg-[#f2f7f3] py-16 sm:py-20">
        <div className="page-shell grid items-center gap-8 lg:grid-cols-2">
          <Reveal className="min-h-[300px] rounded-[24px] sm:min-h-[390px]">
            <div className="photo-fold min-h-[300px] rounded-[24px] sm:min-h-[390px]" />
          </Reveal>
          <Reveal className="lg:pl-8">
            <p className="eyebrow">Little things, done thoughtfully</p>
            <h2 className="section-title mt-3">Good care is in the details.</h2>
            <p className="mt-5 text-sm leading-7 text-[#63777e]">
              We keep your preferences close, separate orders, and treat each item according to its care needs. If something needs a little extra attention, we’ll get in touch before we proceed.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#455f65]">
              {[
                "Care preferences travel with your order",
                "Separate orders, thoughtfully handled",
                "Clear updates along the way",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#438469]">
                    <ArrowRight size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="page-shell py-16 text-center sm:py-20">
        <Clock3 size={24} className="mx-auto text-[#116c83]" />
        <h2 className="section-title mt-4">Ready for your first pickup?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#63777e]">
          Pick a time that works for you and we’ll take it from there.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact">Let’s get started</ButtonLink>
        </div>
      </section>
    </>
  );
}
