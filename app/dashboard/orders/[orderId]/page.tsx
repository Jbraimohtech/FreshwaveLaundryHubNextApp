import Link from "next/link";
import { ArrowLeft, MapPin, PackageCheck, Shirt } from "lucide-react";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth-guard";
import { orderStatuses, orderStatusLabels } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const user = await requireUser();
  const { orderId } = await params;
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      service: { select: { name: true, unit: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) notFound();

  const isCancelled = order.status === "CANCELLED";
  const currentIndex = orderStatuses.indexOf(order.status);

  return (
    <div className="max-w-3xl">
      <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-xs font-semibold text-[#116c83]">
        <ArrowLeft size={14} /> Back to orders
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4 rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-8">
        <div>
          <p className="eyebrow">Order tracking</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-.05em]">{order.service.name}</h2>
          <p className="mt-2 text-xs text-[#82938e]">Tracking number · {order.trackingCode}</p>
        </div>
        <span className="rounded-full bg-[#edf5e9] px-3 py-1.5 text-xs font-semibold text-[#477b58]">
          {orderStatusLabels[order.status]}
        </span>
      </div>

      <section className="mt-4 rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-8">
        <h3 className="text-base font-semibold">Order progress</h3>
        {isCancelled ? (
          <p className="mt-4 rounded-xl bg-[#fff0ed] p-4 text-sm text-[#9d443b]">This order has been cancelled.</p>
        ) : (
          <ol className="mt-6 space-y-0">
            {orderStatuses.map((status, index) => {
              const reached = index <= currentIndex;
              const update = order.statusHistory.find((entry) => entry.status === status);
              return (
                <li key={status} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < orderStatuses.length - 1 && (
                    <span className={`absolute left-[11px] top-6 h-full w-px ${index < currentIndex ? "bg-[#79ab88]" : "bg-[#e5ece7]"}`} />
                  )}
                  <span className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    reached ? "border-[#4d8a67] bg-[#4d8a67] text-white" : "border-[#dce6e0] bg-white text-transparent"
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${reached ? "text-[#25434b]" : "text-[#97a49f]"}`}>
                      {orderStatusLabels[status]}
                    </span>
                    {update && (
                      <span className="mt-1 block text-xs text-[#82938e]">
                        {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(update.createdAt)}
                        {update.note ? ` · ${update.note}` : ""}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <article className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><Shirt size={16} className="text-[#116c83]" /> Order details</h3>
          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between gap-3"><dt className="text-[#82938e]">Quantity</dt><dd>{order.quantity} {order.service.unit}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-[#82938e]">Total</dt><dd className="font-semibold">${order.total.toFixed(2)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-[#82938e]">Placed</dt><dd>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(order.createdAt)}</dd></div>
          </dl>
        </article>
        <article className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><MapPin size={16} className="text-[#116c83]" /> Pickup & delivery</h3>
          <p className="mt-3 text-xs text-[#82938e]">Pickup scheduled</p>
          <p className="mt-1 text-sm font-medium">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(order.pickupAt)}</p>
          <p className="mt-3 text-xs leading-5 text-[#63777e]">{order.pickupAddress}</p>
        </article>
      </section>
      {order.notes && (
        <p className="mt-4 rounded-[16px] bg-[#f2f7f3] p-4 text-xs leading-5 text-[#63777e]">
          <PackageCheck size={15} className="mb-1 inline text-[#116c83]" /> Your instructions: {order.notes}
        </p>
      )}
    </div>
  );
}
