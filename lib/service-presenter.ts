import type { Service as DatabaseService } from "@prisma/client";
import {
  BriefcaseBusiness,
  Shirt,
  Sparkles,
  WashingMachine,
  Wind,
} from "lucide-react";
import type { LaundryService } from "@/lib/site-data";

export function presentService(service: DatabaseService): LaundryService {
  const name = service.name.toLowerCase();
  const icon = name.includes("dry")
    ? Shirt
    : name.includes("press")
      ? Sparkles
      : name.includes("bedding") || name.includes("linen")
        ? Wind
        : name.includes("commercial") || name.includes("business")
          ? BriefcaseBusiness
          : WashingMachine;
  const tone = name.includes("dry")
    ? "bg-[#e9eff8]"
    : name.includes("press")
      ? "bg-[#f5ecdf]"
      : name.includes("bedding") || name.includes("linen")
        ? "bg-[#e8f0f3]"
        : name.includes("commercial") || name.includes("business")
          ? "bg-[#e9f1e3]"
          : "bg-[#e4f1ed]";

  return {
    name: service.name,
    shortName: service.category,
    description: service.description,
    detail: service.description,
    price: `$${service.pricePerUnit.toFixed(2)}`,
    unit: service.unit,
    icon,
    tone,
    popular: name.includes("wash") && name.includes("fold"),
  };
}
