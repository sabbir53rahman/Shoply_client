"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Package, Upload } from "lucide-react"

export default function ProductManagement({ onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: "$1,299.99",
      stock: 25,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      name: "Nike Air Max 90",
      category: "Footwear",
      price: "$149.50",
      stock: 2,
      rating: 4.6,
      status: "active",
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      category: "Electronics",
      price: "$2,399.99",
      stock: 8,
      rating: 4.9,
      status: "active",
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: "$899.99",
      stock: 0,
      rating: 4.5,
      status: "out_of_stock",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBulkUpload = () => {
    // Create a sample CSV content
    const csvContent = `name,description,category,price,stock,tags
iPhone 15 Pro,Latest iPhone with advanced camera,electronics,1299.99,25,"smartphone,apple,premium"
Nike Air Max 90,Classic running shoes,footwear,149.50,50,"shoes,nike,running"
MacBook Pro 14,Professional laptop for creators,electronics,2399.99,15,"laptop,apple,professional"`

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "product-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Download CSV Template
          </Button>

          <Button onClick={onAddProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products
          </CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock < 5 ? "destructive" : "secondary"}>{product.stock} units</Badge>
                  </TableCell>
                  <TableCell>{product.rating}/5</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "active" ? "default" : "secondary"}>
                      {product.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
