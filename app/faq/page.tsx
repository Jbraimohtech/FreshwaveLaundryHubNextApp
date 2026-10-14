import type { Metadata } from "next";
import { ButtonLink, PageHero } from "@/components/site-ui";
import FAQList from "@/components/faq-list";

export const metadata: Metadata = {
  title: "Laundry service FAQs",
  description:
    "Find answers about FreshWave laundry pickup, delivery, cleaning preferences, turnaround times, and pricing.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Good questions. Clear answers."
        description="Here are a few of the things people ask before their first FreshWave pickup. Still wondering? We’re only a message away."
      />
      <section className="page-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="eyebrow">The helpful bits</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-.06em]">Let’s make laundry day easy.</h2>
          <p className="mt-4 text-sm leading-7 text-[#63777e]">
            From scheduling to special care, we want you to feel confident about every step.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="secondary">Talk to our team</ButtonLink>
          </div>
        </div>
        <FAQList />
      </section>
    </>
  );
}
