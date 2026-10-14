import type { Metadata } from "next";
import { HeartHandshake, Leaf, Sparkles, UsersRound } from "lucide-react";
import { ButtonLink, PageHero, SectionHeading } from "@/components/site-ui";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "About FreshFold Laundry",
  description:
    "Learn about FreshFold Laundry's people-first approach to laundry, thoughtful garment care, and making everyday life a little lighter.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Care, always",
    text: "We treat your clothes, your time, and your trust with the same attention we’d want for our own.",
  },
  {
    icon: Leaf,
    title: "A lighter footprint",
    text: "We look for practical ways to make better choices in our cleaning and day-to-day operations.",
  },
  {
    icon: Sparkles,
    title: "The details matter",
    text: "From your preferences to the last fold, the little things are what make a service feel personal.",
  },
];

const team = [
  {
    name: "The people behind every pickup",
    role: "A friendly local care team",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Thoughtful care, hands-on",
    role: "Our garment care specialists",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Good work, good people",
    role: "The FreshFold crew",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A little about us"
        title="Life’s too full for laundry to take over."
        description="FreshFold Laundry is built around a simple idea: laundry care should make your week feel lighter, never more complicated."
      />
      <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="section-title mt-3">A more human way to do laundry.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-sm leading-7 text-[#63777e]">
            FreshFold began with a familiar feeling: there was always another load to do, and never quite enough time. We set out to make the everyday errand feel different—more considered, more convenient, and a little kinder to your schedule.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#63777e]">
            Today, we bring together thoughtful garment care and the ease of pickup and delivery. We’re here to give you one less thing to think about, and one more reason to enjoy the day ahead.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#63777e]">
            Every neighborhood is different. We’re growing thoughtfully, building service around the people and local businesses we have the pleasure of looking after.
          </p>
        </Reveal>
      </section>
      <section className="bg-[#f2f7f3] py-16 sm:py-24">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What we believe"
            title="A better kind of everyday service."
            description="Good service isn’t complicated. It’s thoughtful, dependable, and made for real life."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <Reveal key={title} className="rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f1e8] text-[#116c83]">
                  <Icon size={21} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#63777e]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="page-shell py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Good people, good care"
            title="It takes a thoughtful team."
            description="The friendly faces and careful hands behind your FreshFold experience."
          />
          <UsersRound size={25} className="mb-1 text-[#116c83]" />
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {team.map((person) => (
            <Reveal key={person.name}>
              <article>
                <div
                  role="img"
                  aria-label={person.name}
                  className="photo-team aspect-[1.12/1] rounded-[20px] bg-[#e4efea]"
                  style={{ backgroundImage: `url("${person.image}")` }}
                />
                <h3 className="mt-4 text-base font-semibold">{person.name}</h3>
                <p className="mt-1 text-sm text-[#758781]">{person.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="page-shell pb-16 sm:pb-24">
        <Reveal className="rounded-[24px] bg-[#123d4b] px-7 py-10 text-center text-white sm:px-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#b9e0c9]">A lighter laundry day starts here</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-medium tracking-[-.06em] sm:text-4xl">
            Let us look after your next load.
          </h2>
          <div className="mt-7">
            <ButtonLink href="/contact" variant="light">Meet your new laundry day</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
