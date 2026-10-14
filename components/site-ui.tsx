import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, Check } from "lucide-react";
import type { LaundryService } from "@/lib/site-data";
import Reveal from "./reveal";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-[#116c83] text-white hover:bg-[#0d5266] shadow-[0_8px_20px_rgba(17,108,131,.15)]",
    secondary:
      "border border-[#d8e2dc] bg-white text-[#18333c] hover:border-[#97b8af] hover:bg-[#f8fbf8]",
    light:
      "bg-white text-[#123846] hover:bg-[#e8f4ed] shadow-[0_8px_20px_rgba(0,0,0,.08)]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3 text-balance">{title}</h2>
      {description && (
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#63777e]">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[#e5ece7] bg-[#f2f7f3] py-16 sm:py-24">
      <div className="page-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-4 text-balance text-[clamp(2.7rem,6vw,5rem)]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#63777e] sm:text-lg">
            {description}
          </p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCard({
  service,
  compact = false,
}: {
  service: LaundryService;
  compact?: boolean;
}) {
  const Icon = service.icon;
  return (
    <Reveal className="h-full">
      <article className="group flex h-full flex-col rounded-[20px] border border-[#e5ece7] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#bed7cd] hover:shadow-[0_18px_50px_rgba(25,64,61,.07)]">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.tone}`}
          >
            <Icon size={21} strokeWidth={1.7} className="text-[#116c83]" />
          </span>
          {service.popular && (
            <span className="rounded-full bg-[#edf5e9] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#477b58]">
              Customer favorite
            </span>
          )}
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.12em] text-[#739087]">
          {service.shortName}
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-[-.035em]">
          {service.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#63777e]">
          {compact ? service.description : service.detail}
        </p>
        <div className="mt-6 flex items-end justify-between border-t border-[#edf1ed] pt-4">
          <div>
            <p className="text-lg font-semibold tracking-[-.04em] text-[#183d49]">
              {service.price}
            </p>
            <p className="text-xs text-[#859692]">{service.unit}</p>
          </div>
          <Link
            href="/login?callbackUrl=%2Fdashboard%2Forders%2Fnew"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#116c83] transition group-hover:gap-2"
          >
            Book <ArrowRight size={15} />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Reveal className="relative h-full">
      <article className="h-full rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-[.12em] text-[#7e9c91]">
            {number}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ee] text-[#116c83]">
            {icon}
          </span>
        </div>
        <h3 className="mt-8 text-xl font-semibold tracking-[-.04em]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#63777e]">{description}</p>
      </article>
    </Reveal>
  );
}

export function PriceCard({
  name,
  price,
  period,
  description,
  features,
  featured = false,
  href = "/contact",
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  href?: string;
}) {
  return (
    <Reveal className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-[22px] border p-7 ${
          featured
            ? "border-[#116c83] bg-[#123d4b] text-white shadow-[0_24px_60px_rgba(18,61,75,.15)]"
            : "border-[#e5ece7] bg-white"
        }`}
      >
        {featured && (
          <span className="absolute right-6 top-6 rounded-full bg-[#d0ead8] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#285c45]">
            Most popular
          </span>
        )}
        <p
          className={`text-sm font-semibold ${featured ? "text-[#a9d9c2]" : "text-[#116c83]"}`}
        >
          {name}
        </p>
        <p
          className={`mt-5 text-4xl font-medium tracking-[-.07em] ${featured ? "text-white" : "text-[#17343d]"}`}
        >
          {price}
          <span
            className={`ml-1 text-sm font-normal tracking-normal ${featured ? "text-white/60" : "text-[#82938e]"}`}
          >
            {period}
          </span>
        </p>
        <p
          className={`mt-3 min-h-12 text-sm leading-6 ${featured ? "text-white/70" : "text-[#63777e]"}`}
        >
          {description}
        </p>
        <div
          className={`my-6 border-t ${featured ? "border-white/15" : "border-[#e8eeea]"}`}
        />
        <ul className="flex-1 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className={`flex gap-2 text-sm ${featured ? "text-white/85" : "text-[#536a70]"}`}
            >
              <Check
                size={17}
                className={`mt-0.5 shrink-0 ${featured ? "text-[#a9d9c2]" : "text-[#52936c]"}`}
              />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 ${
            featured
              ? "bg-white text-[#123d4b] hover:bg-[#e9f5eb]"
              : "border border-[#d8e2dc] text-[#18333c] hover:border-[#97b8af]"
          }`}
        >
          Get started <ArrowRight size={15} />
        </Link>
      </article>
    </Reveal>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#116c83] transition hover:gap-3"
    >
      {children}
      <ArrowDownRight size={16} />
    </Link>
  );
}
