"use client";

import { useActionState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { createServiceAction, updateServiceAction } from "@/app/actions/admin";
import { updateOrderStatusAction } from "@/app/actions/orders";
import { emptyActionState } from "@/lib/action-state";
import type { OrderStatus } from "@prisma/client";

function ActionNotice({ message, errors }: { message: string; errors?: Record<string, string[]> }) {
  if (!message && !errors) return null;
  const errorMessages = errors ? Object.values(errors).flat() : [];
  return (
    <p
      role={errorMessages.length ? "alert" : "status"}
      className={`text-xs leading-5 ${errorMessages.length ? "text-[#ad4b43]" : "text-[#477b58]"}`}
    >
      {message} {errorMessages.join(" ")}
    </p>
  );
}

export function CreateServiceForm() {
  const [state, action, pending] = useActionState(createServiceAction, emptyActionState);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-semibold text-[#35505a]">
        Service name
        <input className="input-control mt-2" name="name" required minLength={2} maxLength={80} />
      </label>
      <label className="text-xs font-semibold text-[#35505a]">
        Category
        <input className="input-control mt-2" name="category" defaultValue="Residential" required maxLength={60} />
      </label>
      <label className="text-xs font-semibold text-[#35505a]">
        Unit price ($)
        <input className="input-control mt-2" name="pricePerUnit" type="number" min="0.01" max="10000" step="0.01" required />
      </label>
      <label className="text-xs font-semibold text-[#35505a]">
        Price unit
        <input className="input-control mt-2" name="unit" placeholder="per lb" required maxLength={40} />
      </label>
      <label className="text-xs font-semibold text-[#35505a] sm:col-span-2">
        Description
        <textarea className="input-control mt-2 min-h-20" name="description" minLength={10} maxLength={500} required />
      </label>
      <label className="text-xs font-semibold text-[#35505a]">
        Minimum charge ($)
        <input className="input-control mt-2" name="minimumCharge" type="number" min="0" max="10000" step="0.01" defaultValue="0" required />
      </label>
      <div className="flex flex-col items-start justify-end gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:opacity-70"
        >
          {pending ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
          Add service
        </button>
        <ActionNotice message={state.message} errors={state.errors} />
      </div>
    </form>
  );
}

export function ServiceSettingsForm({
  id,
  name,
  description,
  category,
  price,
  unit,
  minimumCharge,
  active,
}: {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  unit: string;
  minimumCharge: string;
  active: boolean;
}) {
  const [state, action, pending] = useActionState(updateServiceAction, emptyActionState);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs font-semibold text-[#607570]">
          Name
          <input className="input-control mt-1.5 w-48" name="name" defaultValue={name} minLength={2} maxLength={80} required />
        </label>
        <label className="text-xs font-semibold text-[#607570]">
          Category
          <input className="input-control mt-1.5 w-32" name="category" defaultValue={category} minLength={2} maxLength={60} required />
        </label>
        <label className="text-xs font-semibold text-[#607570]">
          Unit price
          <input className="input-control mt-1.5 w-28" name="pricePerUnit" type="number" min="0.01" max="10000" step="0.01" defaultValue={price} required />
        </label>
        <label className="text-xs font-semibold text-[#607570]">
          Unit
          <input className="input-control mt-1.5 w-28" name="unit" defaultValue={unit} minLength={2} maxLength={40} required />
        </label>
        <label className="text-xs font-semibold text-[#607570]">
          Minimum
          <input className="input-control mt-1.5 w-28" name="minimumCharge" type="number" min="0" max="10000" step="0.01" defaultValue={minimumCharge} required />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-xs font-semibold text-[#607570]">
          <input type="checkbox" name="active" defaultChecked={active} className="h-4 w-4 accent-[#116c83]" />
          Available
        </label>
        <button type="submit" disabled={pending} aria-label="Save service settings" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dce6e0] text-[#116c83] transition hover:bg-[#eef5ee] disabled:opacity-70">
          {pending ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
        </button>
      </div>
      <label className="block max-w-2xl text-xs font-semibold text-[#607570]">
        Description
        <textarea className="input-control mt-1.5 min-h-16" name="description" defaultValue={description} minLength={10} maxLength={500} required />
      </label>
      <ActionNotice message={state.message} errors={state.errors} />
    </form>
  );
}

export function OrderStatusForm({
  orderId,
  nextStatus,
}: {
  orderId: string;
  nextStatus: OrderStatus | undefined;
}) {
  const [state, action, pending] = useActionState(updateOrderStatusAction, emptyActionState);
  if (!nextStatus) return <span className="text-xs text-[#82938e]">No further status</span>;

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="status" value={nextStatus} />
      <label className="sr-only">
        Status update note
        <input name="note" maxLength={300} placeholder="Optional note" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#d8e2dc] px-3 text-xs font-semibold text-[#116c83] transition hover:bg-[#edf5ef] disabled:opacity-70"
      >
        {pending ? <LoaderCircle size={13} className="animate-spin" /> : null}
        Mark {nextStatus === "IN_PROGRESS" ? "in progress" : nextStatus.toLowerCase().replace("_", " ")}
      </button>
      <ActionNotice message={state.message} errors={state.errors} />
    </form>
  );
}
