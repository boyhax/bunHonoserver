'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserProducts } from "@/services/product"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Edit } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Product } from "@/types"
import { Button } from "../ui/button"
import { Link } from "@tanstack/react-router"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { apiurl } from "@/lib/api"

export function MyProducts() {
  const { data: products, isLoading, error } = useUserProducts()

  if (isLoading) return <ProductsSkeleton />
  if (error) return <ErrorMessage />
  console.log('products :>> ', products);
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Products</CardTitle>
        <Link to="/account/products">
          <Button >Manage <Edit /></Button>

        </Link>
      </CardHeader>
      <CardContent>
        {!products ? (
          <p className="text-center text-muted-foreground">You haven't added any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square relative">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {product.images?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img
                    src={apiimage(image)}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {Math.round((product.discount / product.price) * 100)}% OFF
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">${(product.price - (product.discount || 0)).toFixed(2)}</p>
          {product.discount && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex items-center mt-2">
          {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" /> */}
          {/* <span className="text-sm">{product.rating.toFixed(1)}</span> */}
        </div>
      </CardContent>
    </Card>
  )
}

function ProductsSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-64" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ErrorMessage() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        There was a problem loading your products. Please try again later.
      </AlertDescription>
    </Alert>
  )
}

function apiimage(path: string) {

  return path.includes("http") ? path : apiurl().replace('api', "") + path
}