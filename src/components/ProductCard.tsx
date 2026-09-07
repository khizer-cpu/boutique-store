import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductCard({ slug, name, price, imageUrl, category }: Props) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-line">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-xs uppercase tracking-widest2 text-ink/50">{category}</p>
      <h3 className="font-display text-xl">{name}</h3>
      <p className="font-body text-sm text-ink/70">${price.toFixed(2)}</p>
    </Link>
  );
}
