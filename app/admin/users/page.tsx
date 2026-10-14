import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { connection } from "next/server";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string | string[];
    page?: string | string[];
  }>;
}) {
  await connection();
  const params = await searchParams;
  const rawSearch = Array.isArray(params.search) ? params.search[0] : params.search;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const search = rawSearch?.trim().slice(0, 100) ?? "";
  const pageSize = 50;
  const requestedPage = Number.parseInt(rawPage ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const where = search
    ? {
        role: "USER" as const,
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : { role: "USER" as const };
  const total = await prisma.user.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      _count: { select: { orders: true, addresses: true } },
    },
  });
  const paginationHref = (targetPage: number) => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    query.set("page", targetPage.toString());
    return `/admin/users?${query.toString()}`;
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-[-.04em]">Customers</h2>
          <p className="mt-1 text-sm text-[#71847f]">Account details, saved addresses, and order counts.</p>
        </div>
        <form className="flex gap-2">
          <label htmlFor="customer-search" className="sr-only">Search customers</label>
          <input id="customer-search" className="input-control w-56 py-2 text-xs" name="search" defaultValue={search} placeholder="Name or email" maxLength={100} />
          <button className="rounded-full border border-[#dce6e0] px-4 text-xs font-semibold hover:bg-white">Search</button>
        </form>
      </div>
      <div className="mt-5 overflow-x-auto rounded-[18px] border border-[#e5ece7] bg-white">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[#f5f8f4] text-[11px] uppercase tracking-[.1em] text-[#71847f]">
            <tr>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Orders</th>
              <th className="px-5 py-3 font-semibold">Addresses</th>
              <th className="px-5 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1ed]">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">
                  <span className="block text-xs">{user.email}</span>
                  <span className="mt-1 block text-xs text-[#82938e]">{user.phone ?? "No phone on file"}</span>
                </td>
                <td className="px-5 py-4 text-xs">{user._count.orders}</td>
                <td className="px-5 py-4 text-xs">{user._count.addresses}</td>
                <td className="px-5 py-4 text-xs text-[#71847f]">{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(user.createdAt)}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-[#82938e]">No customers found.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#82938e]">Showing {users.length} of {total} customers.</p>
        {totalPages > 1 && (
          <nav aria-label="Customer pages" className="flex items-center gap-2">
            {currentPage > 1 && <Link href={paginationHref(currentPage - 1)} className="rounded-full border border-[#dce6e0] px-3 py-1.5 text-xs font-semibold">Previous</Link>}
            <span className="text-xs text-[#71847f]">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && <Link href={paginationHref(currentPage + 1)} className="rounded-full border border-[#dce6e0] px-3 py-1.5 text-xs font-semibold">Next</Link>}
          </nav>
        )}
      </div>
    </section>
  );
}
