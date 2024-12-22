import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const productSamples = [
  {
    id: 1, name: "Handcrafted Mug", price: "$25", image: "https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece"
  },
  { id: 2, name: "Wireless Earbuds", price: "$99", image: "https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece" },
  { id: 3, name: "Leather Wallet", price: "$45", image: "https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece" },
  { id: 4, name: "Scented Candle", price: "$20", image: "https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece" },
];

export default function ProductsPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productSamples.map((product) => (
            <Card key={product.id} className="flex flex-col justify-between">
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <p className="text-gray-500 dark:text-gray-400">{product.price}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/products/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

