import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchOrders } from "@/services/order"

export function MyOrders() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  if (isLoading) return <div>Loading orders...</div>
  if (error) return <div>Error loading orders</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders?.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders?.map((order) => (
              <li key={order.id} className="flex justify-between">
                <span>{new Date(order.date).toLocaleDateString()}</span>
                <span>${order.total.toFixed(2)}</span>
                <span className="capitalize">{order.status}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

