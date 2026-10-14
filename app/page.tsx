import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Leaf,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { services, steps } from "@/lib/site-data";
import {
  ButtonLink,
  PriceCard,
  SectionHeading,
  ServiceCard,
  StepCard,
  TextLink,
} from "@/components/site-ui";
import { TestimonialSlider } from "@/components/interactive-sections";
import Reveal from "@/components/reveal";

const trustPoints = [
  { icon: Clock3, label: "On your schedule" },
  { icon: Leaf, label: "Gentler choices" },
  { icon: BadgeCheck, label: "Care you can trust" },
];

const homeSteps = [
  {
    number: steps[0].number,
    title: steps[0].title,
    description: steps[0].description,
    icon: <Clock3 size={20} />,
  },
  {
    number: steps[1].number,
    title: steps[1].title,
    description: steps[1].description,
    icon: <Sparkles size={20} />,
  },
  {
    number: steps[2].number,
    title: steps[2].title,
    description: steps[2].description,
    icon: <PackageCheck size={20} />,
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="page-shell grid items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
          <Reveal className="relative z-10">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7cac82]" />
              Laundry, made lighter
            </p>
            <h1 className="display-title mt-5 max-w-[660px] text-balance">
              Fresh clothes.
              <br />
              <span className="text-[#116c83]">More life.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#63777e] sm:text-lg">
              Thoughtful laundry care, right from your doorstep. We’ll take the
              sorting, washing, and folding off your list—so you can get back to
              the good stuff.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Book a pickup</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#e5ece7] pt-5">
              {trustPoints.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium text-[#61766f]"
                >
                  <Icon size={15} className="text-[#438469]" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[610px]">
            <div className="photo-wash relative aspect-[1.15/1] overflow-hidden rounded-[28px] sm:aspect-[1.16/1]">
              <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-[11px] font-semibold text-[#18343d] shadow-sm backdrop-blur sm:left-7 sm:top-7">
                Your day, a little lighter
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-[20px] border border-white/70 bg-[#fbfcf8]/95 p-4 shadow-[0_14px_50px_rgba(9,43,47,.13)] backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f0e6] text-[#398061]">
                      <Sparkles size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#18343d]">
                        The fresh feeling
                      </p>
                      <p className="text-xs text-[#73847f]">
                        Clean, folded, at your door
                      </p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-[#ecf5ed] px-3 py-1.5 text-[10px] font-semibold text-[#4e805d] sm:inline-flex">
                    Made easy
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-3 -z-10 h-36 w-36 rounded-full bg-[#d9ebdc] blur-2xl sm:-right-7" />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#e7ede8] bg-white py-5">
        <div className="page-shell flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-xs font-medium text-[#667a79] sm:justify-between">
          <p className="flex items-center gap-2">
            <Clock3 size={15} className="text-[#116c83]" /> Easy pickup & delivery
          </p>
          <p className="flex items-center gap-2">
            <Leaf size={15} className="text-[#4d8a67]" /> Thoughtful cleaning options
          </p>
          <p className="flex items-center gap-2">
            <BadgeCheck size={15} className="text-[#116c83]" /> A little care in every fold
          </p>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Good care, for every pile"
            title="Your clothes are in good hands."
            description="From Monday-morning shirts to the sheets you love, get the right care without adding another errand."
          />
          <div className="sm:pb-1">
            <TextLink href="/services">All services</TextLink>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.name} service={service} compact />
          ))}
        </div>
      </section>

      <section className="bg-[#f2f7f3] py-20 sm:py-24">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="One less thing"
              title="Three easy steps to fresh."
              description="Thoughtful laundry care should fit into your life. We make the whole thing feel simple."
            />
            <TextLink href="/how-it-works">See how it works</TextLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {homeSteps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Good value, no guesswork"
            title="A fresh start from $29."
            description="Clear starting prices and pickup included, so it’s easy to plan your next laundry day."
          />
          <TextLink href="/pricing">See all pricing</TextLink>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PriceCard
            name="The essentials"
            price="$29"
            period="/ pickup"
            description="A simple fresh start for your everyday laundry."
            features={["Wash & fold up to 12 lb", "Free pickup & delivery", "Standard 48-hour return"]}
          />
          <PriceCard
            name="The weekly reset"
            price="$49"
            period="/ pickup"
            description="A little more breathing room in your week."
            features={["Wash & fold up to 25 lb", "Free pickup & delivery", "Priority 24-hour return"]}
            featured
          />
          <PriceCard
            name="The whole hamper"
            price="$79"
            period="/ pickup"
            description="Room for busy homes and laundry mountains."
            features={["Wash & fold up to 45 lb", "Free pickup & delivery", "Priority 24-hour return"]}
          />
        </div>
        <p className="mt-5 text-center text-xs text-[#82938e]">
          Specialty cleaning priced by item. No surprise service fees.
        </p>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="page-shell grid items-center gap-4 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Kind words, fresh folds"
            title="A little more time. A lot less laundry."
            description="A few notes from people who made room for something better than laundry day."
          />
          <TestimonialSlider />
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-[#116c83] px-7 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#bce2cc]">
                Make laundry day the easy day
              </p>
              <h2 className="mt-3 text-balance text-3xl font-medium leading-tight tracking-[-.06em] sm:text-4xl">
                More time for the things you’d rather be doing.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/75">
                Pick a time, set out your bag, and leave the laundry to us.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="light">
                Book a pickup
              </ButtonLink>
              <a
                href="mailto:hello@freshwavelaundry.com"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ask us anything <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
