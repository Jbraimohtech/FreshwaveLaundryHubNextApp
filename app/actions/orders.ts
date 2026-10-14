"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin, requireUser } from "@/lib/auth-guard";
import type { ActionState } from "@/lib/action-state";
import { nextOrderStatus } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

const createOrderSchema = z.object({
  serviceId: z.string().min(1, "Choose a service."),
  addressId: z.string().min(1, "Choose a saved pickup address."),
  pickupAt: z.coerce.date().refine((date) => date.getTime() > Date.now(), "Choose a future pickup time."),
  quantity: z.coerce.number().int().min(1).max(100),
  notes: z.string().trim().max(1000).optional(),
});

export async function createOrderAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = createOrderSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }

  const [service, address] = await Promise.all([
    prisma.service.findUnique({
      where: { id: parsed.data.serviceId, active: true },
      select: { id: true, pricePerUnit: true, minimumCharge: true },
    }),
    prisma.address.findFirst({
      where: { id: parsed.data.addressId, userId: user.id },
    }),
  ]);

  if (!service || !address) {
    return { message: "That service or pickup address is no longer available. Refresh and try again." };
  }

  const itemTotal = service.pricePerUnit.mul(parsed.data.quantity);
  const total = itemTotal.greaterThan(service.minimumCharge)
    ? itemTotal
    : service.minimumCharge;
  const addressText = [
    address.street,
    address.apartment,
    `${address.city}, ${address.region} ${address.postalCode}`,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      serviceId: service.id,
      addressId: address.id,
      pickupAt: parsed.data.pickupAt,
      quantity: parsed.data.quantity,
      unitPrice: service.pricePerUnit,
      total,
      notes: parsed.data.notes || null,
      pickupAddress: addressText,
      deliveryAddress: addressText,
      statusHistory: {
        create: {
          status: OrderStatus.PENDING,
          changedBy: user.id,
          note: "Order placed.",
        },
      },
    },
    select: { id: true },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/orders");
  redirect(`/dashboard/orders/${order.id}`);
}

export async function updateOrderStatusAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = z
    .object({
      orderId: z.string().min(1),
      status: z.nativeEnum(OrderStatus),
      note: z.string().trim().max(300).optional(),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { message: "The requested order update is invalid." };
  }

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: parsed.data.orderId },
      select: { id: true, status: true },
    });
    if (!order || nextOrderStatus(order.status) !== parsed.data.status) return false;

    const updated = await tx.order.updateMany({
      where: { id: order.id, status: order.status },
      data: { status: parsed.data.status },
    });
    if (updated.count !== 1) return false;

    await tx.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: parsed.data.status,
        changedBy: admin.id,
        note: parsed.data.note || null,
      },
    });
    return true;
  });
  if (!result) {
    return { message: "This order has changed or can’t move to that status. Refresh and try again." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/dashboard/orders/${parsed.data.orderId}`);
  revalidatePath("/dashboard/orders");
  return { message: "Order status updated." };
}
