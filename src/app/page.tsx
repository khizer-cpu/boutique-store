import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <section className="mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-widest2 text-burgundy mb-3">
          The Autumn Edit
        </p>
        <h1 className="font-display text-5xl leading-tight mb-4">
          Pieces chosen for how they wear, not just how they photograph.
        </h1>
        <p className="text-ink/70">
          A small, considered edit of coats, tailoring, and accessories — restocked in
          short runs rather than mass produced.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            slug={p.slug}
            name={p.name}
            price={Number(p.price)}
            imageUrl={p.imageUrl}
            category={p.category.name}
          />
        ))}
      </section>

      {products.length === 0 && (
        <p className="text-ink/50">
          No products yet — run <code>npm run seed</code> to add sample stock.
        </p>
      )}
    </div>
  );
}
