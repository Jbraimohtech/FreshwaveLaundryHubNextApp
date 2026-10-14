import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { OrderBookingForm } from "@/components/dashboard-forms";
import { requireUser } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function NewOrderPage() {
  const user = await requireUser();
  const [services, addresses] = await Promise.all([
    prisma.service.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, pricePerUnit: true, unit: true },
    }),
    prisma.address.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const serviceOptions = services.map((service) => ({
    id: service.id,
    name: service.name,
    price: service.pricePerUnit.toFixed(2),
    unit: service.unit,
  }));
  const addressOptions = addresses.map((address) => ({
    id: address.id,
    label: address.label,
    isDefault: address.isDefault,
    summary: `${address.street}, ${address.city}`,
  }));

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-[#116c83]">
        <ArrowLeft size={14} /> Back to orders
      </Link>
      <section className="mt-5 rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-8">
        <p className="eyebrow">New pickup</p>
        <h2 className="mt-2 text-2xl font-medium tracking-[-.05em]">Let’s get your laundry fresh.</h2>
        <p className="mb-6 mt-2 text-sm leading-6 text-[#63777e]">Choose your service, pickup time, and saved address.</p>
        {addresses.length === 0 ? (
          <div className="rounded-xl bg-[#f2f7f3] p-5">
            <MapPin size={20} className="text-[#116c83]" />
            <p className="mt-3 text-sm font-semibold">Add a pickup address first.</p>
            <p className="mt-1 text-xs leading-5 text-[#71847f]">Your address is saved securely to your account and can be reused for future orders.</p>
            <Link href="/dashboard/addresses" className="mt-4 inline-flex rounded-full bg-[#116c83] px-4 py-2.5 text-xs font-semibold text-white">
              Add a saved address
            </Link>
          </div>
        ) : services.length === 0 ? (
          <p className="rounded-xl bg-[#fff7e9] p-4 text-sm text-[#865d26]">No services are currently available. Please check back shortly.</p>
        ) : (
          <OrderBookingForm services={serviceOptions} addresses={addressOptions} />
        )}
      </section>
    </div>
  );
}
