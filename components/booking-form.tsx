"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function BookingForm() {
  const [message, setMessage] = useState("");

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const service = String(form.get("service") ?? "");
    const subject = encodeURIComponent(`FreshWave booking request — ${service}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone: ${form.get("phone")}`,
        `Email: ${form.get("email")}`,
        `Service: ${service}`,
        `Pickup address: ${form.get("address")}`,
        `Preferred pickup: ${form.get("pickup")}`,
        "",
        `Notes: ${form.get("message") || "None"}`,
      ].join("\n"),
    );

    setMessage("Your email app is opening with your booking request. Send the email to complete your request.");
    window.location.href = `mailto:hello@freshwavelaundry.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submitBooking} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">Your name *</span>
          <input className="input-control" name="name" autoComplete="name" placeholder="Jamie Smith" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">Phone number *</span>
          <input className="input-control" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" required />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Email address *</span>
        <input className="input-control" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">What can we freshen up? *</span>
          <select className="input-control" name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Wash & fold</option>
            <option>Dry cleaning</option>
            <option>Wash & press</option>
            <option>Bedding & linens</option>
            <option>Commercial laundry</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">Preferred pickup *</span>
          <input className="input-control" name="pickup" type="datetime-local" required />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Pickup address *</span>
        <input className="input-control" name="address" autoComplete="street-address" placeholder="Street address, city, ZIP" required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Anything we should know?</span>
        <textarea className="input-control min-h-28 resize-y" name="message" placeholder="Care preferences, access instructions, or questions…" />
      </label>
      {message && (
        <p role="status" className="flex gap-2 text-sm leading-6 text-[#477b58]">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          {message}
        </p>
      )}
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#116c83] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(17,108,131,.15)] transition hover:-translate-y-0.5 hover:bg-[#0d5266]"
      >
        Request a pickup <ArrowRight size={16} />
      </button>
      <p className="text-center text-xs leading-5 text-[#82938e]">
        Submitting opens your email app so you can send your request. We’ll confirm availability by email.
      </p>
    </form>
  );
}
