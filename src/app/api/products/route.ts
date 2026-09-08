import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Replace these categoryId strings with actual Category IDs from your DB
  const categoryIds = {
    coats: "CATEGORY_ID_COATS",
    tailoring: "CATEGORY_ID_TAILORING",
    accessories: "CATEGORY_ID_ACCESSORIES",
  };

  const newProducts = [
    {
      name: "Cashmere Crewneck Sweater",
      slug: "cashmere-crewneck-sweater",
      description: "Ultra-soft 100% cashmere crewneck crafted for effortless layering.",
      price: 280.00,
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      stock: 15,
      categoryId: categoryIds.tailoring,
    },
    {
      name: "Minimalist Leather Loafers",
      slug: "minimalist-leather-loafers",
      description: "Handcrafted supple leather loafers with a cushioned footbed.",
      price: 240.00,
      imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
      stock: 20,
      categoryId: categoryIds.accessories,
    },
    {
      name: "Tailored Linen Trousers",
      slug: "tailored-linen-trousers",
      description: "Breathable high-waisted linen trousers with wide-leg silhouette.",
      price: 195.00,
      imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
      stock: 12,
      categoryId: categoryIds.tailoring,
    },
  ];

  for (const product of newProducts) {
    await prisma.product.create({ data: product });
  }

  console.log("Products added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });