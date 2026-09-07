import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  });

  if (!product) notFound();

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] bg-line overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="max-w-md">
        <p className="text-xs uppercase tracking-widest2 text-burgundy mb-2">
          {product.category.name}
        </p>
        <h1 className="font-display text-4xl mb-3">{product.name}</h1>
        <p className="text-xl mb-6">${Number(product.price).toFixed(2)}</p>
        <p className="text-ink/70 mb-8">{product.description}</p>

        <AddToCartButton
          product={{
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl
          }}
          inStock={product.stock > 0}
        />

        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-3 text-sm text-burgundy">Only {product.stock} left</p>
        )}
      </div>
    </div>
  );
}
