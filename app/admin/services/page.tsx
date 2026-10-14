import { CreateServiceForm, ServiceSettingsForm } from "@/components/admin-forms";
import { prisma } from "@/lib/prisma";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ active: "desc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-7">
      <section>
        <h2 className="text-xl font-semibold tracking-[-.04em]">Services & pricing</h2>
        <p className="mt-1 text-sm text-[#71847f]">Update prices and availability shown to customers.</p>
      </section>
      <section className="space-y-3">
        {services.map((service) => (
          <article key={service.id} className="rounded-[18px] border border-[#e5ece7] bg-white p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">{service.name}</h3>
                <p className="mt-1 text-xs text-[#82938e]">{service.category} · {service.unit}</p>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-[#71847f]">{service.description}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${service.active ? "bg-[#edf5e9] text-[#477b58]" : "bg-[#f1f2ef] text-[#71847f]"}`}>
                {service.active ? "Available" : "Hidden"}
              </span>
            </div>
            <ServiceSettingsForm
              key={`${service.id}-${service.updatedAt.getTime()}`}
              id={service.id}
              name={service.name}
              description={service.description}
              category={service.category}
              price={service.pricePerUnit.toFixed(2)}
              unit={service.unit}
              minimumCharge={service.minimumCharge.toFixed(2)}
              active={service.active}
            />
          </article>
        ))}
        {services.length === 0 && <p className="rounded-xl border border-dashed border-[#dce6e0] p-5 text-sm text-[#71847f]">There are no services yet. Add one below.</p>}
      </section>
      <section className="rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-7">
        <p className="eyebrow">Expand the menu</p>
        <h3 className="mb-5 mt-2 text-lg font-semibold">Add a service</h3>
        <CreateServiceForm />
      </section>
    </div>
  );
}
