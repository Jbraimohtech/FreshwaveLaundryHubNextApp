import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Shirt,
  Sparkles,
  WashingMachine,
  Wind,
} from "lucide-react";

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export type LaundryService = {
  name: string;
  shortName: string;
  description: string;
  detail: string;
  price: string;
  unit: string;
  icon: LucideIcon;
  tone: string;
  popular?: boolean;
};

export const services: LaundryService[] = [
  {
    name: "Wash & fold",
    shortName: "Everyday laundry",
    description: "Your weekly laundry, washed gently and folded just right.",
    detail:
      "Everyday essentials get sorted by color, washed with care, then neatly folded and ready to put away.",
    price: "$2.25",
    unit: "per lb",
    icon: WashingMachine,
    tone: "bg-[#e4f1ed]",
    popular: true,
  },
  {
    name: "Dry cleaning",
    shortName: "Special care",
    description: "A little extra care for the pieces you love most.",
    detail:
      "From workwear to occasionwear, our specialists choose the right cleaning method for every garment.",
    price: "$8",
    unit: "per item",
    icon: Shirt,
    tone: "bg-[#e9eff8]",
  },
  {
    name: "Wash & press",
    shortName: "Crisp & ready",
    description: "Freshly cleaned, beautifully pressed, ready for your week.",
    detail:
      "Shirts, blouses, and linens come back with a smooth, polished finish and a little more room in your day.",
    price: "$4",
    unit: "per item",
    icon: Sparkles,
    tone: "bg-[#f5ecdf]",
  },
  {
    name: "Bedding & linens",
    shortName: "Room to reset",
    description: "A fresh start for sheets, duvet covers, and everyday linens.",
    detail:
      "Bulky bedding gets a thorough, gentle clean and comes back fresh, soft, and ready for a good night’s sleep.",
    price: "$18",
    unit: "per set",
    icon: Wind,
    tone: "bg-[#e8f0f3]",
  },
  {
    name: "Commercial laundry",
    shortName: "For local business",
    description: "Reliable laundry support that keeps your team moving.",
    detail:
      "Flexible recurring pickups, consistent quality, and custom service for hospitality, wellness, and local teams.",
    price: "Let’s talk",
    unit: "custom plans",
    icon: BriefcaseBusiness,
    tone: "bg-[#e9f1e3]",
  },
];

export const steps = [
  {
    number: "01",
    title: "Choose a time",
    description:
      "Book a pickup online in a few taps. We’ll come to your door on your schedule.",
    icon: "calendar",
  },
  {
    number: "02",
    title: "We make it fresh",
    description:
      "Your clothes are cleaned with care, using the right process for every piece.",
    icon: "sparkles",
  },
  {
    number: "03",
    title: "Back at your door",
    description:
      "Everything arrives fresh, folded, and ready to wear—right when we promised.",
    icon: "package",
  },
];

export const testimonials = [
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

export const faqs = [
  {
    question: "How does pickup and delivery work?",
    answer:
      "Choose a pickup window when you book and leave your laundry in a laundry bag at your door. We’ll collect it, clean it, and bring it back in your selected delivery window.",
  },
  {
    question: "When will my laundry be ready?",
    answer:
      "Most wash & fold orders are returned within 24–48 hours. Some specialty items may need a little more time; we’ll confirm the expected return when we receive your order.",
  },
  {
    question: "Do I need to be home for pickup?",
    answer:
      "Not at all. Add clear pickup instructions to your booking and leave your bag in the agreed spot. We’ll send an update when your order is on its way.",
  },
  {
    question: "Can I request a detergent or care preference?",
    answer:
      "Absolutely. Add preferences such as fragrance-free detergent or hang-dry items in the booking notes. We’ll follow your instructions and reach out if we need clarification.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Wash & fold is priced by weight, while dry cleaning and specialty care are priced per item. Your final total is confirmed before delivery, with no surprise service fees.",
  },
  {
    question: "Do you offer recurring or business service?",
    answer:
      "Yes. We can arrange a pickup cadence that works for your home or business. Contact us and we’ll put together a flexible plan around your volume and schedule.",
  },
];
