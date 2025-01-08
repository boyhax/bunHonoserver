import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background pt-8 sm:pt-16 pb-8 sm:pb-12">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Discover Amazing Products from{" "}
            <span className="text-primary">Local Shops</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
            Shop from thousands of unique stores and find the perfect items you've been looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
              />
            </div>
            <Button className="w-full sm:w-auto">Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
}