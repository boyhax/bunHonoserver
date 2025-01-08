'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Trash2, Upload, HardDrive, Cloud } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserProducts } from '@/services/product'
import { client } from '@/App'
import { useToast } from '@/hooks/use-toast'



export function ProductManager() {
  const { data: products, refetch } = useUserProducts()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [storageType, setStorageType] = useState<'local' | 's3'>('local')
  const { toast } = useToast()
  console.log('products :>> ', products);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)


    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price: parseFloat(price) }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ variant: 'default', title: 'Product created successfully' })
        refetch()
        setName('')
        setDescription('')
        setPrice('')
      } else {
        toast({ variant: 'default', title: 'Failed to create product' })
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred while creating the product' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadFile = async (productId: string) => {
    if (!file) return

    setIsLoading(true)

    // const formData = new FormData()
    // formData.append('file', file)

    try {
      const response = await client.post(`/storage/upload?productId=${productId}`,
        {}
      )

      const data = await response.json()
      console.log('data :>> ', data);
      if (response.ok) {
        toast({ variant: 'default', title: 'File uploaded successfully' })
        refetch()
      } else {
        toast({ variant: 'destructive', title: 'Upload failed' })
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred during upload' })
    } finally {
      setIsLoading(false)
      setFile(null)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await client.delete(`/account/products/${productId}`, {

      })

      if (response.ok) {
        toast({ variant: 'default', title: 'Product deleted successfully' })
        refetch()
      } else {
        const data = await response.json()
        toast({ variant: 'destructive', title: 'Deletion failed' })
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred during deletion' })
    }
  }

  const handleDeleteFile = async (filename: string) => {
    try {
      const response = await client.delete(`/account/files/${filename}`)

      if (response.ok) {
        toast({ variant: 'default', title: 'File deleted successfully' })
        refetch()
      } else {
        const data = await response.json()
        toast({ variant: 'destructive', title: 'File deletion failed' })
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred during file deletion' })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Product Manager</CardTitle>
        <div className="flex items-center space-x-2">
          <span>Storage Type:</span>
          {storageType === 'local' ? (
            <HardDrive className="h-5 w-5" />
          ) : (
            <Cloud className="h-5 w-5" />
          )}
          <span>{storageType === 'local' ? 'Local Storage' : 'S3 Compatible (MinIO)'}</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateProduct} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Product'
            )}
          </Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          {!products ? null : products.map((product) => (
            <Card key={product._id} className="mb-4">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
                <p className="font-bold mt-2">Price: ${product.price.toFixed(2)}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Media Files</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.files.map((file) => (
                        <TableRow key={file._id}>
                          <TableCell>{file.originalName}</TableCell>
                          <TableCell>{file.mimeType}</TableCell>
                          <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteFile(file.filename)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Label htmlFor={`file-${product._id}`}>Upload File</Label>
                  <Input
                    id={`file-${product._id}`}
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <Button
                    onClick={() => handleUploadFile(product._id)}
                    disabled={!file || isLoading}
                    className="mt-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete Product
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

