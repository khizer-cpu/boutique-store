import type { Metadata } from "next";
// @ts-expect-error CSS is processed by Next.js at build time.
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Atelier No.7",
  description: "A small, considered edit of coats, tailoring, and accessories."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <CartProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
