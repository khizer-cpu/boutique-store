"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

type Me = { id: string; name: string; role: "CUSTOMER" | "ADMIN" } | null;

export default function Navbar() {
  const router = useRouter();
  const { items } = useCart();
  const [me, setMe] = useState<Me>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setMe(d.user))
      .catch(() => setMe(null));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    router.refresh();
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="border-b border-line bg-ivory sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide">
          Atelier&nbsp;No.7
        </Link>

        <nav className="flex items-center gap-6 font-body text-sm uppercase tracking-widest2">
          <Link href="/">Shop</Link>
          <Link href="/cart">Cart {itemCount > 0 && `(${itemCount})`}</Link>
          {me?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
          {me ? (
            <div className="flex items-center gap-4">
              <span className="text-ink/60 normal-case tracking-normal">Hi, {me.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-widest hover:underline text-ink/80"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}