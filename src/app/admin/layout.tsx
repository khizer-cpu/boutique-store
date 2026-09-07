import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.role !== "ADMIN") {
    redirect("/login?next=/admin");
  }

  return (
    <div>
      <nav className="flex gap-6 mb-8 text-sm uppercase tracking-widest2 border-b border-line pb-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
      </nav>
      {children}
    </div>
  );
}
