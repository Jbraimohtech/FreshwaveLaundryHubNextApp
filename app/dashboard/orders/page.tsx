import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import { requireUser } from "@/lib/auth-guard";
import { orderStatusLabels } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

export default async function DashboardOrdersPage() {
  const user = await requireUser();
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: [{ pickupAt: "desc" }, { createdAt: "desc" }],
    include: { service: { select: { name: true } } },
  });
  const active = orders.filter((order) => !["DELIVERED", "CANCELLED"].includes(order.status));
  const past = orders.filter((order) => ["DELIVERED", "CANCELLED"].includes(order.status));

  function orderCard(order: (typeof orders)[number]) {
    return (
      <Link key={order.id} href={`/dashboard/orders/${order.id}`} className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[#e5ece7] bg-white p-5 transition hover:border-[#bed7cd] hover:shadow-sm">
        <div>
          <p className="text-sm font-semibold">{order.service.name}</p>
          <p className="mt-1 text-xs text-[#82938e]">
            {order.trackingCode} · Pickup {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(order.pickupAt)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-right">
            <span className="block text-sm font-semibold">${order.total.toFixed(2)}</span>
            <span className="mt-1 block text-xs text-[#607570]">{orderStatusLabels[order.status]}</span>
          </span>
          <ArrowRight size={16} className="text-[#116c83]" />
        </div>
      </Link>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-[-.04em]">Your orders</h2>
          <p className="mt-1 text-sm text-[#71847f]">Track pickups and revisit past orders.</p>
        </div>
        <Link href="/dashboard/orders/new" className="rounded-full bg-[#116c83] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0d5266]">New order</Link>
      </div>
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-[#71847f]">Upcoming & in progress</h3>
        <div className="space-y-3">
          {active.length ? active.map(orderCard) : <EmptyOrders text="No active orders. When you book a pickup, you’ll find it here." />}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-[#71847f]">Past orders</h3>
        <div className="space-y-3">
          {past.length ? past.map(orderCard) : <EmptyOrders text="Completed orders will appear here." />}
        </div>
      </section>
    </div>
  );
}

function EmptyOrders({ text }: { text: string }) {
  return (
    <div className="rounded-[16px] border border-dashed border-[#dce6e0] bg-white p-6 text-center">
      <PackageOpen size={22} className="mx-auto text-[#739087]" />
      <p className="mt-2 text-sm text-[#71847f]">{text}</p>
    </div>
  );
}
