import Link from "next/link";
import { connection } from "next/server";
import type { OrderStatus } from "@prisma/client";
import { OrderStatusForm } from "@/components/admin-forms";
import { nextOrderStatus } from "@/lib/order-status";
import { orderStatusLabels } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[];
    page?: string | string[];
  }>;
}) {
  await connection();
  const params = await searchParams;
  const statuses = Object.keys(orderStatusLabels);
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const selectedStatus = statuses.includes(rawStatus ?? "") ? rawStatus : undefined;
  const pageSize = 50;
  const requestedPage = Number.parseInt(rawPage ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const where = selectedStatus ? { status: selectedStatus as OrderStatus } : undefined;
  const total = await prisma.order.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      service: { select: { name: true } },
    },
  });
  const paginationHref = (targetPage: number) => {
    const query = new URLSearchParams();
    if (selectedStatus) query.set("status", selectedStatus);
    query.set("page", targetPage.toString());
    return `/admin/orders?${query.toString()}`;
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-[-.04em]">Manage orders</h2>
          <p className="mt-1 text-sm text-[#71847f]">Update order progress as laundry moves through your team.</p>
        </div>
        <form className="flex items-center gap-2">
          <label htmlFor="status-filter" className="sr-only">Filter orders by status</label>
          <select id="status-filter" name="status" defaultValue={selectedStatus ?? ""} className="input-control w-auto py-2 text-xs">
            <option value="">All statuses</option>
            {statuses.map((status) => <option key={status} value={status}>{orderStatusLabels[status as keyof typeof orderStatusLabels]}</option>)}
          </select>
          <button className="rounded-full border border-[#dce6e0] px-4 py-2 text-xs font-semibold hover:bg-white">Filter</button>
        </form>
      </div>

      <div className="mt-5 overflow-hidden rounded-[18px] border border-[#e5ece7] bg-white">
        {orders.length === 0 ? (
          <p className="p-7 text-sm text-[#71847f]">No orders match this filter.</p>
        ) : (
          <div className="divide-y divide-[#edf1ed]">
            {orders.map((order) => (
              <article key={order.id} className="grid gap-4 p-5 lg:grid-cols-[1.1fr_1fr_.8fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold">{order.service.name}</p>
                  <p className="mt-1 text-xs text-[#82938e]">{order.trackingCode} · {order.quantity} units · ${order.total.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-[#607570]">Pickup {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(order.pickupAt)}</p>
                </div>
                <div className="min-w-0">
                  <Link href={`/admin/users?search=${encodeURIComponent(order.user.email)}`} className="text-sm font-medium text-[#294952] hover:text-[#116c83]">{order.user.name}</Link>
                  <p className="truncate text-xs text-[#82938e]">{order.user.email}{order.user.phone ? ` · ${order.user.phone}` : ""}</p>
                  <p className="mt-1 text-xs text-[#82938e]">{order.pickupAddress}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                  <span className="rounded-full bg-[#edf5e9] px-3 py-1.5 text-[11px] font-semibold text-[#477b58]">{orderStatusLabels[order.status]}</span>
                  <OrderStatusForm
                    key={`${order.id}-${order.status}`}
                    orderId={order.id}
                    nextStatus={nextOrderStatus(order.status)}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#82938e]">Showing {orders.length} of {total} orders. Status updates follow the pickup → cleaning → delivery sequence.</p>
        {totalPages > 1 && (
          <nav aria-label="Order pages" className="flex items-center gap-2">
            {currentPage > 1 && <Link href={paginationHref(currentPage - 1)} className="rounded-full border border-[#dce6e0] px-3 py-1.5 text-xs font-semibold">Previous</Link>}
            <span className="text-xs text-[#71847f]">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && <Link href={paginationHref(currentPage + 1)} className="rounded-full border border-[#dce6e0] px-3 py-1.5 text-xs font-semibold">Next</Link>}
          </nav>
        )}
      </div>
    </section>
  );
}
