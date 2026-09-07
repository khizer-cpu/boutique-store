import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, orderCount, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } })
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <Stat label="Products" value={productCount} />
        <Stat label="Orders" value={orderCount} />
        <Stat label="Revenue" value={`$${Number(revenue._sum.total ?? 0).toFixed(2)}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-line p-6">
      <p className="text-xs uppercase tracking-widest2 text-ink/50 mb-2">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}
