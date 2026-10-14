"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth-guard";
import type { ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";

const addressSchema = z.object({
  label: z.string().trim().min(2).max(40),
  recipient: z.string().trim().min(2).max(80),
  street: z.string().trim().min(4).max(160),
  apartment: z.string().trim().max(80).optional(),
  city: z.string().trim().min(2).max(80),
  region: z.string().trim().min(2).max(80),
  postalCode: z.string().trim().min(2).max(20),
  country: z.string().trim().min(2).max(60).default("US"),
  instructions: z.string().trim().max(500).optional(),
});

export async function addAddressAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = addressSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  const hasDefault = await prisma.address.findFirst({
    where: { userId: user.id, isDefault: true },
    select: { id: true },
  });
  await prisma.address.create({
    data: {
      ...parsed.data,
      apartment: parsed.data.apartment || null,
      instructions: parsed.data.instructions || null,
      userId: user.id,
      isDefault: !hasDefault,
    },
  });

  revalidatePath("/dashboard/addresses");
  revalidatePath("/dashboard/orders/new");
  return { message: "Your address has been saved." };
}

export async function setDefaultAddressAction(formData: FormData) {
  const user = await requireUser();
  const addressId = z.string().min(1).safeParse(formData.get("addressId"));
  if (!addressId.success) return;

  const address = await prisma.address.findFirst({
    where: { id: addressId.data, userId: user.id },
    select: { id: true },
  });
  if (!address) return;

  await prisma.$transaction([
    prisma.address.updateMany({
      where: { userId: user.id },
      data: { isDefault: false },
    }),
    prisma.address.updateMany({
      where: { id: addressId.data, userId: user.id },
      data: { isDefault: true },
    }),
  ]);
  revalidatePath("/dashboard/addresses");
}

export async function deleteAddressAction(formData: FormData) {
  const user = await requireUser();
  const addressId = z.string().min(1).safeParse(formData.get("addressId"));
  if (!addressId.success) return;

  await prisma.$transaction(async (tx) => {
    const address = await tx.address.findFirst({
      where: { id: addressId.data, userId: user.id },
      select: { id: true, isDefault: true },
    });
    if (!address) return;

    await tx.address.delete({ where: { id: address.id } });
    if (address.isDefault) {
      const nextAddress = await tx.address.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        select: { id: true },
      });
      if (nextAddress) {
        await tx.address.update({
          where: { id: nextAddress.id },
          data: { isDefault: true },
        });
      }
    }
  });
  revalidatePath("/dashboard/addresses");
  revalidatePath("/dashboard/orders/new");
}
