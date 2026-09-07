"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";

type Props = {
  product: { productId: string; name: string; price: number; imageUrl: string };
  inStock: boolean;
};

export default function AddToCartButton({ product, inStock }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button disabled className="bg-ink/20 text-ink/50 px-8 py-3 text-sm uppercase tracking-widest2">
        Out of stock
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="bg-ink text-ivory px-8 py-3 text-sm uppercase tracking-widest2 hover:bg-burgundy transition-colors"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
