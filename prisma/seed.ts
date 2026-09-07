import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const coats = await prisma.category.create({
    data: { name: "Coats", slug: "coats" },
  });

  const tailoring = await prisma.category.create({
    data: { name: "Tailoring", slug: "tailoring" },
  });

  const accessories = await prisma.category.create({
    data: { name: "Accessories", slug: "accessories" },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        name: "Double-Breasted Wool Coat",
        slug: "double-breasted-wool-coat",
        description: "Tailored heavy wool coat with horn buttons and a relaxed silhouette.",
        price: 450.00,
        imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
        stock: 12,
        categoryId: coats.id,
      },
      {
        name: "Structured Blazer",
        slug: "structured-blazer",
        description: "Classic wool blend single-breasted blazer with notch lapels.",
        price: 320.00,
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
        stock: 8,
        categoryId: tailoring.id,
      },
      {
        name: "Leather Tote Bag",
        slug: "leather-tote-bag",
        description: "Minimalist full-grain leather tote designed for daily essentials.",
        price: 210.00,
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
        stock: 15,
        categoryId: accessories.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });