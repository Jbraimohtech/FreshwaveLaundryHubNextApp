"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { loginAction } from "@/app/actions/account";
import { emptyActionState } from "@/lib/action-state";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState(loginAction, emptyActionState);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Email address</span>
        <input className="input-control" type="email" name="email" autoComplete="email" required maxLength={254} />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Password</span>
        <input className="input-control" type="password" name="password" autoComplete="current-password" required maxLength={128} />
      </label>
      {state.message && <p role="alert" className="text-sm text-[#ad4b43]">{state.message}</p>}
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:cursor-wait disabled:opacity-70"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoaderCircle className="animate-spin" size={18} /> : <>Sign in <ArrowRight size={16} /></>}
      </button>
      <p className="text-center text-sm text-[#71847f]">
        New to FreshFold? <Link className="font-semibold text-[#116c83] hover:underline" href="/register">Create an account</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(result.message ?? "We couldn’t create your account. Please try again.");
        return;
      }
      router.push("/login?registered=1");
    } catch {
      setError("We couldn’t reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Your name</span>
        <input className="input-control" name="name" autoComplete="name" minLength={2} maxLength={80} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Email address</span>
        <input className="input-control" type="email" name="email" autoComplete="email" maxLength={254} required />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-[#35505a]">Password</span>
        <input className="input-control" type="password" name="password" autoComplete="new-password" minLength={10} maxLength={128} required />
        <span className="mt-1.5 block text-xs text-[#82938e]">At least 10 characters, including a letter and a number.</span>
      </label>
      {error && <p role="alert" className="text-sm text-[#ad4b43]">{error}</p>}
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#116c83] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5266] disabled:cursor-wait disabled:opacity-70"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoaderCircle className="animate-spin" size={18} /> : <>Create account <ArrowRight size={16} /></>}
      </button>
      <p className="text-center text-sm text-[#71847f]">
        Already have an account? <Link className="font-semibold text-[#116c83] hover:underline" href="/login">Sign in</Link>
      </p>
    </form>
  );
}
