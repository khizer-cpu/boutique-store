import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyToken, AUTH_COOKIE_NAME, JwtPayload } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  
  const payload: JwtPayload | null = token ? await verifyToken(token) : null;

  if (!payload || payload.role !== "ADMIN") {
    redirect("/login?next=/admin");
  }

  return (
    <div>
      <nav className="flex gap-6 mb-8 text-sm uppercase tracking-widest border-b border-line pb-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
      </nav>
      {children}
    </div>
  );
}