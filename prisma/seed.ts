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

  const knitwear = await prisma.category.create({
    data: { name: "Knitwear", slug: "knitwear" },
  });

  const dresses = await prisma.category.create({
    data: { name: "Dresses", slug: "dresses" },
  });

  const footwear = await prisma.category.create({
    data: { name: "Footwear", slug: "footwear" },
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
        name: "Longline Trench",
        slug: "longline-trench",
        description: "A sleek trench cut with a slightly oversized drape and storm-flap detail.",
        price: 390.00,
        imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
        stock: 9,
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
        name: "Pleated Trousers",
        slug: "pleated-trousers",
        description: "High-rise wool trousers with a soft pleat and a clean, flattering line.",
        price: 240.00,
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        stock: 11,
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
      {
        name: "Silk Scarf",
        slug: "silk-scarf",
        description: "Printed square scarf in a fluid silk blend for everyday layering.",
        price: 120.00,
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
        stock: 18,
        categoryId: accessories.id,
      },
      {
        name: "Cashmere Crew Knit",
        slug: "cashmere-crew-knit",
        description: "Lightweight cashmere knit with a refined drape and soft texture.",
        price: 260.00,
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
        stock: 14,
        categoryId: knitwear.id,
      },
      {
        name: "Merino Polo",
        slug: "merino-polo",
        description: "A clean merino knit polo with a structured collar and relaxed fit.",
        price: 180.00,
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
        stock: 19,
        categoryId: knitwear.id,
      },
      {
        name: "Bias Slip Dress",
        slug: "bias-slip-dress",
        description: "Minimal bias-cut slip dress in a soft matte finish for effortless layering.",
        price: 280.00,
        imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
        stock: 10,
        categoryId: dresses.id,
      },
      {
        name: "Satin Midi Dress",
        slug: "satin-midi-dress",
        description: "A fluid satin midi designed for day-to-evening transitions.",
        price: 310.00,
        imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
        stock: 7,
        categoryId: dresses.id,
      },
      {
        name: "Leather Loafers",
        slug: "leather-loafers",
        description: "Crafted leather loafers with a slim profile and polished finish.",
        price: 230.00,
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
        stock: 12,
        categoryId: footwear.id,
      },
      {
        name: "Chunky Leather Boots",
        slug: "chunky-leather-boots",
        description: "Durable ankle boots with a modern lug sole and clean minimalist shape.",
        price: 340.00,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        stock: 6,
        categoryId: footwear.id,
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