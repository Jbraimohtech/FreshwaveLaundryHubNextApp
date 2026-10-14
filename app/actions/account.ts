"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { requireUser } from "@/lib/auth-guard";
import type { ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { safeInternalPath } from "@/lib/safe-redirect";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  password: z.string().min(1, "Enter your password.").max(128),
  redirectTo: z.string().startsWith("/").default("/dashboard"),
});

export async function loginAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: safeInternalPath(parsed.data.redirectTo),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "That email and password combination wasn’t recognized." };
    }
    throw error;
  }

  return { message: "Sign-in could not be completed." };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = z
    .object({
      name: z.string().trim().min(2, "Enter at least 2 characters.").max(80),
      phone: z.string().trim().max(30).optional(),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name, phone: parsed.data.phone || null },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  return { message: "Your profile has been updated." };
}
