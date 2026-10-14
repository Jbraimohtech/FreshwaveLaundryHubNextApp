import { hash } from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const starterServices = [
  {
    name: "Wash & fold",
    slug: "wash-and-fold",
    description: "Everyday essentials, washed gently and neatly folded.",
    category: "Residential",
    pricePerUnit: "2.25",
    unit: "per lb",
    minimumCharge: "29.00",
  },
  {
    name: "Dry cleaning",
    slug: "dry-cleaning",
    description: "Careful cleaning for your favorite and delicate garments.",
    category: "Residential",
    pricePerUnit: "8.00",
    unit: "per item",
    minimumCharge: "0.00",
  },
  {
    name: "Wash & press",
    slug: "wash-and-press",
    description: "Freshly cleaned shirts and linens with a crisp pressed finish.",
    category: "Residential",
    pricePerUnit: "4.00",
    unit: "per item",
    minimumCharge: "0.00",
  },
  {
    name: "Bedding & linens",
    slug: "bedding-and-linens",
    description: "Thoughtful care for sheets, duvet covers, and household linens.",
    category: "Residential",
    pricePerUnit: "18.00",
    unit: "per set",
    minimumCharge: "0.00",
  },
  {
    name: "Commercial laundry",
    slug: "commercial-laundry",
    description: "Reliable recurring laundry service for local businesses.",
    category: "Commercial",
    pricePerUnit: "1.75",
    unit: "per lb",
    minimumCharge: "99.00",
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (
    !email ||
    !password ||
    password.length < 10 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    throw new Error(
      "Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 10 characters and at most 72 UTF-8 bytes before seeding.",
    );
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { role: Role.ADMIN },
    create: {
      name: process.env.ADMIN_NAME?.trim() || "FreshFold Admin",
      email,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  for (const service of starterServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.info(`Seeded ${starterServices.length} services and configured the admin account ${email}.`);
}

main()
  .catch((error: unknown) => {
    console.error("Database seeding failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
