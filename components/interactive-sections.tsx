"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";

const reviews = [
  {
    quote:
      "I got my Sunday evenings back. FreshWave is easy to book, always on time, and my clothes come back beautifully folded.",
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
    detail: "FreshWave customer",
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

export function PricingChooser() {
  const [business, setBusiness] = useState(false);
  const residentialPlans = [
    {
      name: "The essentials",
      price: "$29",
      period: "/ pickup",
      description: "A simple fresh start for your everyday laundry.",
      features: ["Wash & fold up to 12 lb", "Free pickup & delivery", "Standard 48-hour return"],
    },
    {
      name: "The weekly reset",
      price: "$49",
      period: "/ pickup",
      description: "A little more breathing room in your week.",
      features: ["Wash & fold up to 25 lb", "Free pickup & delivery", "Priority 24-hour return"],
      featured: true,
    },
    {
      name: "The whole hamper",
      price: "$79",
      period: "/ pickup",
      description: "Room for busy homes and laundry mountains.",
      features: ["Wash & fold up to 45 lb", "Free pickup & delivery", "Priority 24-hour return"],
    },
  ];

  const businessPlans = [
    {
      name: "Small team",
      price: "$99",
      period: "/ week",
      description: "A dependable start for a growing local business.",
      features: ["Up to 50 lb weekly", "One scheduled pickup", "Consistent turnaround"],
    },
    {
      name: "Steady service",
      price: "$229",
      period: "/ week",
      description: "Built around your team’s regular laundry rhythm.",
      features: ["Up to 150 lb weekly", "Two scheduled pickups", "Priority turnaround"],
      featured: true,
    },
    {
      name: "Custom care",
      price: "Let’s talk",
      period: "",
      description: "Flexible support for more complex laundry needs.",
      features: ["Volume-based pricing", "Pickup schedule that fits", "Dedicated service plan"],
    },
  ];
  const plans = business ? businessPlans : residentialPlans;

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
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex h-full flex-col rounded-[22px] border p-7 ${
              plan.featured
                ? "border-[#116c83] bg-[#123d4b] text-white shadow-[0_24px_60px_rgba(18,61,75,.15)]"
                : "border-[#e5ece7] bg-white"
            }`}
          >
            {plan.featured && (
              <span className="absolute right-6 top-6 rounded-full bg-[#d0ead8] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#285c45]">
                Most popular
              </span>
            )}
            <p className={`text-sm font-semibold ${plan.featured ? "text-[#a9d9c2]" : "text-[#116c83]"}`}>
              {plan.name}
            </p>
            <p className={`mt-5 text-4xl font-medium tracking-[-.07em] ${plan.featured ? "text-white" : "text-[#17343d]"}`}>
              {plan.price}
              <span className={`ml-1 text-sm font-normal tracking-normal ${plan.featured ? "text-white/60" : "text-[#82938e]"}`}>
                {plan.period}
              </span>
            </p>
            <p className={`mt-3 min-h-12 text-sm leading-6 ${plan.featured ? "text-white/70" : "text-[#63777e]"}`}>
              {plan.description}
            </p>
            <div className={`my-6 border-t ${plan.featured ? "border-white/15" : "border-[#e8eeea]"}`} />
            <ul className="flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className={`flex gap-2 text-sm ${plan.featured ? "text-white/85" : "text-[#536a70]"}`}>
                  <Check size={17} className={`mt-0.5 shrink-0 ${plan.featured ? "text-[#a9d9c2]" : "text-[#52936c]"}`} />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                plan.featured
                  ? "bg-white text-[#123d4b] hover:bg-[#e9f5eb]"
                  : "border border-[#d8e2dc] text-[#18333c] hover:border-[#97b8af]"
              }`}
            >
              Get started <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-xs leading-5 text-[#82938e]">
        Specialty items are priced separately. Your confirmed order total is always shared before delivery.
      </p>
    </>
  );
}
