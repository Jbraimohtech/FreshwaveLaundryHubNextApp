import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth-form";
import { safeInternalPath } from "@/lib/safe-redirect";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    registered?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const callbackUrl = Array.isArray(params.callbackUrl)
    ? params.callbackUrl[0]
    : params.callbackUrl;
  const redirectTo = safeInternalPath(callbackUrl);

  if (session?.user) redirect(redirectTo);

  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-12">
      <section className="w-full max-w-md rounded-[24px] border border-[#e5ece7] bg-white p-7 shadow-[0_18px_50px_rgba(25,64,61,.06)] sm:p-9">
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-.06em]">Your laundry, in good hands.</h1>
        <p className="mb-7 mt-2 text-sm text-[#63777e]">Sign in to book pickups and follow your orders.</p>
        {params.registered && (
          <p role="status" className="mb-5 rounded-xl bg-[#edf5e9] p-3 text-sm text-[#477b58]">
            Your account is ready. Sign in to get started.
          </p>
        )}
        <LoginForm redirectTo={redirectTo} />
      </section>
    </main>
  );
}
