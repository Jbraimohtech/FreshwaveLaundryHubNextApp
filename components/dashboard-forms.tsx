"use client";

import { useActionState } from "react";
import { LoaderCircle, MapPin, PackageCheck } from "lucide-react";
import {
  addAddressAction,
} from "@/app/actions/addresses";
import { createOrderAction } from "@/app/actions/orders";
import { updateProfileAction } from "@/app/actions/account";
import { emptyActionState } from "@/lib/action-state";

type SelectOption = { id: string; name: string; price: string; unit: string };
type AddressOption = { id: string; label: string; summary: string; isDefault: boolean };

function FormNotice({
  message,
  errors,
}: {
  message: string;
  errors?: Record<string, string[]>;
}) {
  if (!message && !errors) return null;
  const errorList = errors ? Object.values(errors).flat() : [];
  return (
    <div
      role={errorList.length ? "alert" : "status"}
      className={`rounded-xl p-3 text-sm leading-6 ${
        errorList.length ? "bg-[#fff0ed] text-[#9d443b]" : "bg-[#edf5e9] text-[#477b58]"
      }`}
    >
      {message}
      {errorList.length > 0 && (
        <ul className="mt-1 list-inside list-disc">
          {errorList.map((error) => <li key={error}>{error}</li>)}
        </ul>
      )}
    </div>
  );
}

export function OrderBookingForm({
  services,
  addresses,
}: {
  services: SelectOption[];
  addresses: AddressOption[];
}) {
  const [state, action, pending] = useActionState(createOrderAction, emptyActionState);

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Laundry service *</span>
        <select className="input-control" name="serviceId" defaultValue="" required>
          <option value="" disabled>Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} — ${service.price} {service.unit}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Pickup address *</span>
        <select className="input-control" name="addressId" defaultValue="" required>
          <option value="" disabled>Select a saved address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.label}{address.isDefault ? " (default)" : ""} — {address.summary}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">Pickup date & time *</span>
          <input className="input-control" type="datetime-local" name="pickupAt" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-[#35505a]">Quantity (lb/items) *</span>
          <input className="input-control" type="number" name="quantity" min={1} max={100} defaultValue={1} required />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Pickup instructions</span>
        <textarea className="input-control min-h-24 resize-y" name="notes" maxLength={1000} placeholder="Access instructions or care preferences…" />
      </label>
      <FormNotice message={state.message} errors={state.errors} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <LoaderCircle className="animate-spin" size={18} /> : <><PackageCheck size={17} /> Place laundry order</>}
      </button>
    </form>
  );
}

export function AddressForm() {
  const [state, action, pending] = useActionState(addAddressAction, emptyActionState);

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Address label *</span>
        <input className="input-control" name="label" placeholder="Home, Work…" minLength={2} maxLength={40} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Recipient name *</span>
        <input className="input-control" name="recipient" autoComplete="name" minLength={2} maxLength={80} required />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Street address *</span>
        <input className="input-control" name="street" autoComplete="street-address" minLength={4} maxLength={160} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Apartment / unit</span>
        <input className="input-control" name="apartment" maxLength={80} />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">City *</span>
        <input className="input-control" name="city" autoComplete="address-level2" minLength={2} maxLength={80} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">State / region *</span>
        <input className="input-control" name="region" autoComplete="address-level1" minLength={2} maxLength={80} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">ZIP / postal code *</span>
        <input className="input-control" name="postalCode" autoComplete="postal-code" minLength={2} maxLength={20} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Country code</span>
        <input className="input-control" name="country" defaultValue="US" maxLength={60} required />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Delivery notes</span>
        <textarea className="input-control min-h-20 resize-y" name="instructions" maxLength={500} placeholder="Gate code, safe place, or other instructions…" />
      </label>
      <div className="sm:col-span-2">
        <FormNotice message={state.message} errors={state.errors} />
        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:opacity-70"
        >
          {pending ? <LoaderCircle className="animate-spin" size={17} /> : <><MapPin size={16} /> Save address</>}
        </button>
      </div>
    </form>
  );
}

export function ProfileForm({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const [state, action, pending] = useActionState(updateProfileAction, emptyActionState);

  return (
    <form action={action} className="max-w-xl space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Full name</span>
        <input className="input-control" name="name" defaultValue={name} minLength={2} maxLength={80} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Email address</span>
        <input className="input-control bg-[#f6f8f5] text-[#81918c]" value={email} readOnly />
        <span className="mt-1 block text-xs text-[#82938e]">Email changes are not available yet.</span>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Phone number</span>
        <input className="input-control" type="tel" name="phone" defaultValue={phone} autoComplete="tel" maxLength={30} />
      </label>
      <FormNotice message={state.message} errors={state.errors} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:opacity-70"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
