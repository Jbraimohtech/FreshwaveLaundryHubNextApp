import { MapPin, Star, Trash2 } from "lucide-react";
import { deleteAddressAction, setDefaultAddressAction } from "@/app/actions/addresses";
import { AddressForm } from "@/components/dashboard-forms";
import { requireUser } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AddressesPage() {
  const user = await requireUser();
  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-[-.04em]">Saved addresses</h2>
        <p className="mt-1 text-sm text-[#71847f]">Keep pickup and delivery details ready for your next order.</p>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        {addresses.map((address) => (
          <article key={address.id} className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf3ec] text-[#116c83]"><MapPin size={17} /></span>
              {address.isDefault && <span className="rounded-full bg-[#edf5e9] px-2.5 py-1 text-[10px] font-semibold text-[#477b58]">Default</span>}
            </div>
            <h3 className="mt-4 text-sm font-semibold">{address.label}</h3>
            <p className="mt-1 text-xs text-[#526a70]">{address.recipient}</p>
            <p className="mt-2 text-xs leading-5 text-[#82938e]">
              {address.street}{address.apartment ? `, ${address.apartment}` : ""}
              <br />{address.city}, {address.region} {address.postalCode}, {address.country}
            </p>
            {address.instructions && <p className="mt-2 text-xs leading-5 text-[#82938e]">Note: {address.instructions}</p>}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#edf1ed] pt-3">
              {!address.isDefault && (
                <form action={setDefaultAddressAction}>
                  <input type="hidden" name="addressId" value={address.id} />
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-[#dce6e0] px-3 py-2 text-[11px] font-semibold text-[#536a70] hover:bg-[#f2f7f3]">
                    <Star size={13} /> Make default
                  </button>
                </form>
              )}
              <form action={deleteAddressAction}>
                <input type="hidden" name="addressId" value={address.id} />
                <button className="inline-flex items-center gap-1.5 rounded-full border border-[#f0dddd] px-3 py-2 text-[11px] font-semibold text-[#a14e47] hover:bg-[#fff3f0]">
                  <Trash2 size={13} /> Remove
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
      {addresses.length === 0 && (
        <p className="rounded-[16px] border border-dashed border-[#dce6e0] bg-white p-5 text-sm text-[#71847f]">
          You don’t have a saved address yet. Add one below to make booking easy.
        </p>
      )}
      <section className="rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-7">
        <p className="eyebrow">Add a location</p>
        <h3 className="mb-5 mt-2 text-lg font-semibold">Save a pickup address</h3>
        <AddressForm />
      </section>
    </div>
  );
}
