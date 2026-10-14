import type { Metadata } from "next";
import { services } from "@/lib/site-data";
import { ButtonLink, PageHero, ServiceCard } from "@/components/site-ui";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Laundry & dry cleaning services",
  description:
    "Explore FreshWave wash & fold, dry cleaning, wash & press, bedding care, and commercial laundry services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Every garment deserves a little care."
        description="From everyday essentials to the pieces you save for a special day, we’ll find the right way to make them fresh again."
      >
        <div className="mt-7">
          <ButtonLink href="/contact">Book a pickup</ButtonLink>
        </div>
      </PageHero>
      <section className="page-shell py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
        <Reveal className="mt-12 rounded-[22px] bg-[#f2f7f3] p-7 sm:flex sm:items-center sm:justify-between sm:gap-7 sm:p-9">
          <div>
            <p className="eyebrow">Something special?</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-.05em]">
              We’re happy to help with the details.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#63777e]">
              Have a delicate item, a tricky stain, or a larger business order? Tell us about it and we’ll find the right solution.
            </p>
          </div>
          <div className="mt-5 shrink-0 sm:mt-0">
            <ButtonLink href="/contact" variant="secondary">Talk to our team</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
