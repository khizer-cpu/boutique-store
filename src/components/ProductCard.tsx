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
    <Link href={`/products/${slug}`} className="product-card group block">
      <div className="relative aspect-[3/4] overflow-hidden border border-line bg-line shadow-[0_14px_32px_rgba(28,28,26,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-burgundy/20 group-hover:shadow-[0_22px_46px_rgba(28,28,26,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.52),transparent_46%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={800}
          className="product-card__image h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="product-card__shine absolute inset-0 translate-x-[-120%] opacity-0 transition-all duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
        <span className="product-card__badge absolute bottom-3 left-3 translate-y-2 border border-ink/10 bg-ivory/90 px-3 py-2 text-[10px] uppercase tracking-widest2 text-ink backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View piece
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest2 text-ink/50">{category}</p>
          <h3 className="font-display text-xl leading-tight text-ink transition-colors duration-300 group-hover:text-burgundy">{name}</h3>
        </div>
        <p className="shrink-0 pt-1 text-sm text-ink/70 transition-transform duration-300 group-hover:translate-x-0.5">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
