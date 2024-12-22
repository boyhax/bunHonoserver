import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const productSamples = [
  { name: "Handcrafted Mug", price: "$25", image: "https://via.assets.so/img.jpg?w=400&h=600&tc=blue&bg=#cecece" },
  { name: "Wireless Earbuds", price: "$99", image: "https://via.assets.so/img.jpg?w=400&h=600&tc=blue&bg=#cecece" },
  { name: "Leather Wallet", price: "$45", image: "https://via.assets.so/img.jpg?w=400&h=600&tc=blue&bg=#cecece" },
  { name: "Scented Candle", price: "$20", image: "https://via.assets.so/img.jpg?w=400&h=600&tc=blue&bg=#cecece" },
]

export default function ProductSamples() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productSamples.map((product) => (
            <Card key={product.name} className="flex flex-col justify-between">
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
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

