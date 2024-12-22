import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const featuredShops = [
  { name: "Artisan Crafts", image: "https://images.unsplash.com/photo-1630191631464-24a005b8cfda?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Tech Haven", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Fashion Forward", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  {
    name: "Home Decor", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
]

export default function FeaturedShops() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Featured Shops</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredShops.map((shop) => (
            <Card key={shop.name}>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{shop.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <img
                  src={shop.image}
                  alt={shop.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto aspect-square object-contain"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

