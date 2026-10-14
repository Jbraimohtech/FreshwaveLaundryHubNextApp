import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z
    .string()
    .min(10, "Use at least 10 characters.")
    .max(128)
    .regex(/[a-zA-Z]/, "Include at least one letter.")
    .regex(/[0-9]/, "Include at least one number.")
    .refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
      message: "Password must be at most 72 UTF-8 bytes.",
    }),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Check your details." },
      { status: 400 },
    );
  }

  try {
    const passwordHash = await hash(parsed.data.password, 12);
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        passwordHash,
      },
      select: { id: true },
    });
    return NextResponse.json({ message: "Account created." }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 },
      );
    }
    console.error("Account registration failed.", error);
    return NextResponse.json(
      { message: "We couldn’t create your account right now. Please try again." },
      { status: 500 },
    );
  }
}
