import { ProfileForm } from "@/components/dashboard-forms";
import { requireUser } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const sessionUser = await requireUser();
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { name: true, email: true, phone: true, createdAt: true },
  });
  if (!user) notFound();

  return (
    <section className="rounded-[20px] border border-[#e5ece7] bg-white p-6 sm:p-8">
      <p className="eyebrow">Account settings</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-.04em]">Your profile</h2>
      <p className="mb-6 mt-1 text-sm text-[#71847f]">
        Member since {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(user.createdAt)}.
      </p>
      <ProfileForm name={user.name} email={user.email} phone={user.phone ?? ""} />
    </section>
  );
}
