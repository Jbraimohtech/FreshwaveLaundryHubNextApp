import Link from "next/link";
import { ArrowRight, CircleDollarSign, ClipboardList, Users, WashingMachine } from "lucide-react";
import { orderStatusLabels } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default async function AdminDashboardPage() {
  const [orders, users, services, revenue, statusCounts, recentOrders, recentUsers] =
    await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.service.count({ where: { active: true } }),
      prisma.order.aggregate({
        where: { status: "DELIVERED" },
        _sum: { total: true },
      }),
      prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          user: { select: { name: true, email: true } },
          service: { select: { name: true } },
        },
      }),
      prisma.user.findMany({
        where: { role: "USER" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true },
      }),
    ]);

  const statusCount = new Map(statusCounts.map((entry) => [entry.status, entry._count._all]));
  const stats = [
    { label: "All orders", value: orders.toString(), icon: ClipboardList },
    { label: "Customers", value: users.toString(), icon: Users },
    { label: "Active services", value: services.toString(), icon: WashingMachine },
    { label: "Delivered revenue", value: money(revenue._sum.total?.toNumber() ?? 0), icon: CircleDollarSign },
  ];

  return (
    <div className="space-y-7">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf3ec] text-[#116c83]"><Icon size={17} /></span>
            <p className="mt-4 text-xs font-medium text-[#71847f]">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-.05em]">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-[20px] border border-[#e5ece7] bg-white p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Order pipeline</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-[#116c83]">Manage orders</Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {Object.entries(orderStatusLabels).map(([status, label]) => (
              <div key={status} className="rounded-xl bg-[#f5f8f4] p-3">
                <p className="text-[11px] text-[#71847f]">{label}</p>
                <p className="mt-1 text-lg font-semibold">{statusCount.get(status as keyof typeof orderStatusLabels) ?? 0}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[20px] border border-[#e5ece7] bg-white p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">New customers</h2>
            <Link href="/admin/users" className="text-xs font-semibold text-[#116c83]">All customers</Link>
          </div>
          <div className="mt-4 divide-y divide-[#edf1ed]">
            {recentUsers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{customer.name}</span>
                  <span className="block truncate text-xs text-[#82938e]">{customer.email}</span>
                </span>
                <span className="shrink-0 text-[10px] text-[#82938e]">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(customer.createdAt)}</span>
              </div>
            ))}
            {recentUsers.length === 0 && <p className="py-5 text-sm text-[#82938e]">No customer accounts yet.</p>}
          </div>
        </article>
      </section>

      <section className="rounded-[20px] border border-[#e5ece7] bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Latest orders</h2>
          <Link href="/admin/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-[#116c83]">All orders <ArrowRight size={14} /></Link>
        </div>
        <div className="mt-4 divide-y divide-[#edf1ed]">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span>
                <span className="block text-sm font-medium">{order.service.name} · {order.user.name}</span>
                <span className="block text-xs text-[#82938e]">{order.trackingCode} · {order.user.email}</span>
              </span>
              <span className="text-right">
                <span className="block text-sm font-semibold">${order.total.toFixed(2)}</span>
                <span className="block text-xs text-[#71847f]">{orderStatusLabels[order.status]}</span>
              </span>
            </div>
          ))}
          {recentOrders.length === 0 && <p className="py-5 text-sm text-[#82938e]">No orders yet.</p>}
        </div>
      </section>
    </div>
  );
}
