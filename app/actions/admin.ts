"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth-guard";
import type { ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";

const serviceSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
  category: z.string().trim().min(2).max(60),
  pricePerUnit: z.coerce.number().positive().max(10000),
  unit: z.string().trim().min(2).max(40),
  minimumCharge: z.coerce.number().min(0).max(10000).default(0),
});

function serviceSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function createServiceAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.service.create({
      data: {
        ...parsed.data,
        slug: serviceSlug(parsed.data.name),
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { message: "A service with that name already exists." };
    }
    throw error;
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/pricing");
  return { message: "Service added." };
}

export async function updateServiceAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const parsed = z
    .object({
      id: z.string().min(1),
      name: z.string().trim().min(2).max(80),
      description: z.string().trim().min(10).max(500),
      category: z.string().trim().min(2).max(60),
      pricePerUnit: z.coerce.number().positive().max(10000),
      unit: z.string().trim().min(2).max(40),
      minimumCharge: z.coerce.number().min(0).max(10000),
      active: z.preprocess((value) => value === "on", z.boolean()),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { message: "Check the highlighted service fields.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.service.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        slug: serviceSlug(parsed.data.name),
        description: parsed.data.description,
        category: parsed.data.category,
        pricePerUnit: parsed.data.pricePerUnit,
        unit: parsed.data.unit,
        minimumCharge: parsed.data.minimumCharge,
        active: parsed.data.active,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { message: "A service with that name already exists." };
    }
    throw error;
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/pricing");
  return { message: "Service updated." };
}
