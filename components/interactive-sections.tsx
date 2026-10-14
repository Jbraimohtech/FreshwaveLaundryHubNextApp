"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type PricingService = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  unit: string;
  minimumCharge: string;
};

const reviews = [
  {
    quote:
      "I got my Sunday evenings back. FreshFold is easy to book, always on time, and my clothes come back beautifully folded.",
    name: "Maya R.",
    detail: "Weekly wash & fold",
    initials: "MR",
  },
  {
    quote:
      "Finally, a cleaner that treats a favorite jacket like a favorite jacket. Thoughtful service from pickup to delivery.",
    name: "Jordan T.",
    detail: "Dry cleaning customer",
    initials: "JT",
  },
  {
    quote:
      "Dependable, friendly, and one less thing on my list. The little delivery updates are a lovely touch, too.",
    name: "Avery L.",
    detail: "FreshFold customer",
    initials: "AL",
  },
];

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const review = reviews[active];
  const move = (direction: number) =>
    setActive((current) => (current + direction + reviews.length) % reviews.length);

  return (
    <div className="mt-10 rounded-[24px] bg-[#eff5ef] p-7 sm:p-11">
      <div className="flex gap-1 text-[#dc9a42]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={15} fill="currentColor" strokeWidth={1} />
        ))}
      </div>
      <blockquote
        key={review.name}
        className="mt-6 max-w-3xl text-2xl font-medium leading-snug tracking-[-.045em] text-[#18343d] sm:text-[32px]"
      >
        “{review.quote}”
      </blockquote>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d5e8dd] text-xs font-bold text-[#386e60]">
            {review.initials}
          </span>
          <span>
            <span className="block text-sm font-semibold">{review.name}</span>
            <span className="block text-xs text-[#71847f]">{review.detail}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e3dc] bg-white text-[#18343d] transition hover:bg-[#e2efe7]"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e3dc] bg-white text-[#18343d] transition hover:bg-[#e2efe7]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PricingChooser({ services }: { services: PricingService[] }) {
  const [business, setBusiness] = useState(false);
  const plans = services.filter((service) => {
    const category = service.category.toLowerCase();
    return business
      ? category.includes("business") || category.includes("commercial")
      : !category.includes("business") && !category.includes("commercial");
  });

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div
          className="inline-flex rounded-full border border-[#e0e9e3] bg-white p-1"
          role="group"
          aria-label="Choose pricing type"
        >
          <button
            type="button"
            aria-pressed={!business}
            onClick={() => setBusiness(false)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              !business ? "bg-[#123d4b] text-white" : "text-[#64777c] hover:text-[#18343d]"
            }`}
          >
            At home
          </button>
          <button
            type="button"
            aria-pressed={business}
            onClick={() => setBusiness(true)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              business ? "bg-[#123d4b] text-white" : "text-[#64777c] hover:text-[#18343d]"
            }`}
          >
            For business
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan, index) => (
          <article
            key={plan.name}
            className="flex h-full flex-col rounded-[22px] border border-[#e5ece7] bg-white p-7"
          >
            <p className="text-sm font-semibold text-[#116c83]">{plan.category}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-.035em]">{plan.name}</h3>
            <p className="mt-5 text-4xl font-medium tracking-[-.07em] text-[#17343d]">
              ${plan.price}
              <span className="ml-1 text-sm font-normal tracking-normal text-[#82938e]">/ {plan.unit.replace(/^per\s+/i, "")}</span>
            </p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-[#63777e]">{plan.description}</p>
            <p className="mt-4 text-xs leading-5 text-[#82938e]">
              {Number(plan.minimumCharge) > 0
                ? `Minimum order ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(plan.minimumCharge))}.`
                : "No minimum service charge."}
            </p>
            <div className="my-6 flex-1 border-t border-[#e8eeea]" />
            <Link
              href="/login?callbackUrl=%2Fdashboard%2Forders%2Fnew"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                index === 0 ? "bg-[#116c83] text-white hover:bg-[#0d5266]" : "border border-[#d8e2dc] text-[#18333c] hover:border-[#97b8af]"
              }`}
            >
              Book this service <ArrowRight size={15} />
            </Link>
          </article>
        ))}
        {plans.length === 0 && (
          <p className="rounded-[18px] border border-dashed border-[#dce6e0] p-6 text-sm text-[#71847f] md:col-span-2 xl:col-span-3">
            {services.length === 0
              ? "Service pricing is being prepared. Please check back soon."
              : "There are no services in this category yet. Contact us to discuss a custom plan."}
          </p>
        )}
      </div>
      <p className="mt-6 text-center text-xs leading-5 text-[#82938e]">
        Specialty items are priced separately. Your confirmed order total is always shared before delivery.
      </p>
    </>
  );
}
