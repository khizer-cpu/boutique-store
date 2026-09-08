import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="pb-20">
      <section className="hero-panel mb-20 overflow-hidden border border-line bg-ivory">
        <div className="grid min-h-[28rem] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <div className="mb-12 flex items-center gap-3 text-xs uppercase tracking-widest2 text-burgundy">
                <span className="h-2 w-2 rounded-full bg-clay" />
                The Autumn Edit
              </div>
              <h1 className="max-w-3xl font-display text-5xl leading-[0.94] sm:text-7xl">
                Dress for the <em className="text-burgundy">in-between.</em>
              </h1>
            </div>
            <div className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <p className="max-w-sm text-sm leading-7 text-ink/70">
                Pieces chosen for how they wear, not just how they photograph. Small
                runs, considered materials, and room to make them your own.
              </p>
              <span className="font-display text-6xl leading-none text-sage/70">07</span>
            </div>
          </div>
          <div className="hero-art relative flex min-h-[18rem] items-end overflow-hidden bg-burgundy p-7 text-ivory sm:p-10">
            <div className="hero-sun absolute -right-20 -top-24 h-72 w-72 rounded-full border-[3rem] border-clay/30" />
            <div className="absolute right-8 top-8 max-w-[8rem] text-right text-xs uppercase leading-5 tracking-widest2 text-ivory/70">
              Made to move through the season
            </div>
            <div className="relative">
              <p className="mb-3 text-xs uppercase tracking-widest2 text-clay">Field note / 01</p>
              <p className="max-w-xs font-display text-4xl leading-none sm:text-5xl">
                Soft structure. Sharp instinct.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 flex items-end justify-between border-b border-line pb-4">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest2 text-burgundy">The collection</p>
          <h2 className="font-display text-4xl">Current pieces</h2>
        </div>
        <p className="text-right text-xs uppercase tracking-widest2 text-ink/50">
          {products.length.toString().padStart(2, "0")} / available now
        </p>
      </section>

      <section className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3">
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
