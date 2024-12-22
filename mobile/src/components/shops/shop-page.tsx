import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShopPage() {
  const { shopId } = useParams({ from: '/shops/$shopId' });

  // In a real application, you would fetch the shop data based on the shopId
  const shop = {
    id: shopId,
    name: `Shop ${shopId}`,
    description: 'This is a sample shop description.',
    image: "/placeholder.svg?height=200&width=200",
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>{shop.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={shop.image}
              alt={shop.name}
              width={200}
              height={200}
              className="rounded-lg mx-auto mb-4"
            />
            <p>{shop.description}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

