import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-12">
      <section className="w-full max-w-md rounded-[24px] border border-[#e5ece7] bg-white p-7 shadow-[0_18px_50px_rgba(25,64,61,.06)] sm:p-9">
        <p className="eyebrow">A lighter laundry day</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-.06em]">Create your account.</h1>
        <p className="mb-7 mt-2 text-sm text-[#63777e]">Save your address and book your first pickup.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
