import type { Metadata } from "next";
import { CircleHelp, ShieldCheck } from "lucide-react";
import { connection } from "next/server";
import { ButtonLink, PageHero, SectionHeading } from "@/components/site-ui";
import { PricingChooser } from "@/components/interactive-sections";
import Reveal from "@/components/reveal";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Laundry service pricing",
  description:
    "Explore clear FreshFold residential and commercial laundry pricing with pickup and delivery included.",
};

export default async function PricingPage() {
  await connection();
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      pricePerUnit: true,
      unit: true,
      minimumCharge: true,
    },
  });
  const pricingServices = services.map((service) => ({
    ...service,
    price: service.pricePerUnit.toFixed(2),
    minimumCharge: service.minimumCharge.toFixed(2),
  }));

  return (
    <>
      <PageHero
        eyebrow="Simple, honest pricing"
        title="A fresh start, without the guesswork."
        description="Pick the plan that fits your week. Every package includes pickup and delivery, with your total confirmed before anything comes back to your door."
      />
      <section className="page-shell py-12 sm:py-16">
        <PricingChooser services={pricingServices} />
      </section>
      <section className="border-y border-[#e6ece7] bg-white py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeading
            eyebrow="The little details"
            title="No surprises. Just good care."
            description="Our packages are a helpful starting point. For specialty garments and custom service, we’ll share a clear quote before getting started."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Clear totals", text: "We confirm the price before your order is returned." },
              { icon: CircleHelp, title: "Need a hand?", text: "Our team can help you choose the right service." },
              { icon: CircleHelp, title: "Different needs?", text: "Ask us about bedding, delicate items, or recurring pickups." },
            ].map(({ icon: Icon, title, text }) => (
              <Reveal key={title} className="rounded-[18px] border border-[#e5ece7] bg-[#fbfcf8] p-5">
                <Icon size={20} className="text-[#116c83]" />
                <h2 className="mt-4 text-base font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#63777e]">{text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/faq" variant="secondary">Visit our FAQs</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
