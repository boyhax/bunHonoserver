import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    shop: "TechVille",
    discount: 20,
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223",
    shop: "Fashion Hub",
    discount: 0,
  },
  {
    id: 3,
    name: "Minimalist Table Lamp",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    shop: "Home Decor Plus",
    discount: 15,
  },
  {
    id: 4,
    name: "Organic Tea Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
    shop: "Gourmet Express",
    discount: 0,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-6 sm:py-8">
      <div className="container px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.shop}</p>
                  <h3 className="font-semibold text-sm sm:text-base mt-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="font-bold text-sm sm:text-base">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-sm sm:text-base">${product.price}</span>
                      )}
                    </div>
                    <Button size="icon" variant="outline" className="h-8 w-8 sm:h-9 sm:w-9">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}