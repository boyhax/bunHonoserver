import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const shops = [
  {
    id: 1,
    name: "TechVille",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
    rating: 4.8,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Fashion Hub",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    rating: 4.9,
    category: "Fashion",
  },
  {
    id: 3,
    name: "Home Decor Plus",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e",
    rating: 4.7,
    category: "Home & Living",
  },
  {
    id: 4,
    name: "Gourmet Express",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
    rating: 4.6,
    category: "Food",
  },
];

export default function FeaturedShops() {
  return (
    <section className="py-6 sm:py-8 bg-muted/50">
      <div className="container px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Popular Shops</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 sm:space-x-4 px-1">
            {shops.map((shop) => (
              <Card key={shop.id} className="w-[240px] sm:w-[280px] flex-shrink-0">
                <CardContent className="p-0">
                  <div className="relative h-32 sm:h-40">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      {shop.category}
                    </Badge>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-base sm:text-lg">{shop.name}</h3>
                    <div className="flex items-center mt-1 sm:mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{shop.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}