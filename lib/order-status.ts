import type { OrderStatus } from "@prisma/client";

export const orderStatuses: OrderStatus[] = [
  "PENDING",
  "PICKED_UP",
  "IN_PROGRESS",
  "READY",
  "DELIVERED",
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PICKED_UP: "Picked up",
  IN_PROGRESS: "In progress",
  READY: "Ready",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "PICKED_UP",
  PICKED_UP: "IN_PROGRESS",
  IN_PROGRESS: "READY",
  READY: "DELIVERED",
};

export function nextOrderStatus(status: OrderStatus) {
  return nextStatus[status];
}
