import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-line p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="font-display text-lg">{order.user.name}</p>
              <p className="text-xs uppercase tracking-widest2 text-ink/50">{order.status}</p>
            </div>
            <ul className="text-sm text-ink/70 mb-3">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.product.name} — ${Number(item.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="font-display">Total: ${Number(order.total).toFixed(2)}</p>
          </div>
        ))}
        {orders.length === 0 && <p className="text-ink/50">No orders yet.</p>}
      </div>
    </div>
  );
}
