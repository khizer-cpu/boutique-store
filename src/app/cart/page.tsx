"use client";

import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear, total } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
      })
    });

    setLoading(false);

    if (res.status === 401) {
      router.push("/login?next=/cart");
      return;
    }

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Checkout failed");
      return;
    }

    clear();
    router.push("/");
  }

  if (items.length === 0) {
    return <p className="text-ink/60">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl mb-8">Your Cart</h1>

      <div className="divide-y divide-line">
        {items.map((item) => (
          <div key={item.productId} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-display text-lg">{item.name}</p>
              <p className="text-sm text-ink/60">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                className="w-16 border border-line px-2 py-1 text-center"
              />
              <button
                onClick={() => removeItem(item.productId)}
                className="text-sm text-burgundy underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-display text-xl">Total: ${total.toFixed(2)}</p>
        <button
          onClick={checkout}
          disabled={loading}
          className="bg-ink text-ivory px-8 py-3 text-sm uppercase tracking-widest2 hover:bg-burgundy transition-colors disabled:opacity-50"
        >
          {loading ? "Placing order…" : "Checkout"}
        </button>
      </div>

      {error && <p className="mt-4 text-burgundy text-sm">{error}</p>}
    </div>
  );
}
