import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProductPage() {
  const { productId } = useParams({ from: '/products/$productId' });

  // In a real application, you would fetch the product data based on the productId
  const product = {
    id: productId,
    name: `Product ${productId}`,
    description: 'This is a sample product description.',
    price: '$99.99',
    image: "/placeholder.svg?height=400&width=400",
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg mx-auto mb-4"
            />
            <p className="mb-2">{product.description}</p>
            <p className="font-bold">{product.price}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

