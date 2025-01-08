import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ShoppingBag, Utensils, Laptop, Shirt, Home, Gift } from "lucide-react";

const categories = [
    {
        name: "Fashion",
        icon: Shirt,
        color: "bg-pink-500",
    },
    {
        name: "Electronics",
        icon: Laptop,
        color: "bg-blue-500",
    },
    {
        name: "Home & Living",
        icon: Home,
        color: "bg-green-500",
    },
    {
        name: "Food",
        icon: Utensils,
        color: "bg-yellow-500",
    },
    {
        name: "Gifts",
        icon: Gift,
        color: "bg-purple-500",
    },
    {
        name: "Others",
        icon: ShoppingBag,
        color: "bg-gray-500",
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-6 sm:py-8">
            <div className="container px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shop by Category</h2>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-3 sm:space-x-4 px-1">
                        {categories.map((category) => (
                            <Card key={category.name} className="w-[110px] sm:w-[140px] flex-shrink-0">
                                <CardContent className="p-3 sm:p-4">
                                    <div className={`${category.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto`}>
                                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <p className="text-center text-sm sm:text-base font-medium">{category.name}</p>
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