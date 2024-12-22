import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

const featuredShops = [
  { id: 1, name: "Artisan Crafts", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Tech Haven", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Fashion Forward", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Home Decor", image: "/placeholder.svg?height=100&width=100" },
];

export default function ShopsPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Our Shops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredShops.map((shop) => (
            <Link key={shop.id} to={`/shops/${shop.id}`}>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{shop.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

