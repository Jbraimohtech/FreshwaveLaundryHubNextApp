import Link from "next/link";
import { ArrowRight, Clock3, Package, Plus, Wallet } from "lucide-react";
import { requireUser } from "@/lib/auth-guard";
import { orderStatusLabels } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default async function DashboardPage() {
  const user = await requireUser();
  const [orderCount, upcomingCount, totals, latestOrders] = await Promise.all([
    prisma.order.count({ where: { userId: user.id } }),
    prisma.order.count({
      where: { userId: user.id, status: { notIn: ["DELIVERED", "CANCELLED"] } },
    }),
    prisma.order.aggregate({
      where: { userId: user.id, status: "DELIVERED" },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { service: { select: { name: true } } },
    }),
  ]);

  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "All orders", value: orderCount.toString(), icon: Package },
          { label: "On the way", value: upcomingCount.toString(), icon: Clock3 },
          { label: "Laundry cared for", value: money(totals._sum.total?.toNumber() ?? 0), icon: Wallet },
        ].map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf3ec] text-[#116c83]"><Icon size={17} /></span>
            <p className="mt-4 text-xs font-medium text-[#71847f]">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-.05em]">{value}</p>
          </article>
        ))}
      </div>

      <section className="rounded-[20px] border border-[#e5ece7] bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-[-.03em]">Recent orders</h2>
            <p className="mt-1 text-sm text-[#71847f]">Your latest laundry pickups.</p>
          </div>
          <Link href="/dashboard/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-[#116c83] hover:gap-2">
            All orders <ArrowRight size={14} />
          </Link>
        </div>
        {latestOrders.length === 0 ? (
          <div className="mt-6 rounded-xl bg-[#f5f8f4] p-6 text-center">
            <Package size={24} className="mx-auto text-[#6f9c83]" />
            <p className="mt-3 text-sm font-semibold">Your first fresh start is waiting.</p>
            <p className="mt-1 text-xs text-[#71847f]">Add a pickup address, then book your laundry service.</p>
            <Link href="/dashboard/addresses" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#116c83] px-4 py-2.5 text-xs font-semibold text-white">
              <Plus size={14} /> Add an address
            </Link>
          </div>
        ) : (
          <div className="mt-5 divide-y divide-[#edf1ed]">
            {latestOrders.map((order) => (
              <Link key={order.id} href={`/dashboard/orders/${order.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 transition hover:bg-[#fbfcf8]">
                <span>
                  <span className="block text-sm font-semibold">{order.service.name}</span>
                  <span className="mt-1 block text-xs text-[#82938e]">
                    {order.trackingCode} · {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(order.pickupAt)}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold">{money(order.total.toNumber())}</span>
                  <span className="mt-1 block text-xs text-[#607570]">{orderStatusLabels[order.status]}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
