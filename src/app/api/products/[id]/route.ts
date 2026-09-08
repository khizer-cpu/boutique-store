import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

// GET /api/products?category=outerwear
export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  const products = await prisma.product.findMany({
    where: category ? { category: { slug: category } } : undefined,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string(),
});

// POST /api/products — admin only
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: parsed.data,
      include: { category: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}