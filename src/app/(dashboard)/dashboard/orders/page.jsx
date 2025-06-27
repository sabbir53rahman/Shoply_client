"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Truck, CheckCircle, XCircle, ShoppingCart } from "lucide-react"
import { useGetAllOrdersQuery } from "@/redux/features/orderSlice/orderSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery()

  const filteredOrders = orders?.filter((order) => {
    const idMatch = order?._id?.toLowerCase().includes(searchTerm.toLowerCase())
    const customerMatch = order?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSearch = idMatch || customerMatch
    const matchesStatus = statusFilter === "all" || order?.status === statusFilter
    return matchesSearch && matchesStatus
  })
  console.log(orders)

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <ShoppingCart className="w-4 h-4" />
      case "sent_to_courier":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <ShoppingCart className="w-4 h-4" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "processing":
        return "outline"
      case "sent_to_courier":
        return "secondary"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading orders...</div>
  if (isError) return <div className="p-6 text-destructive">Failed to load orders.</div>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </CardTitle>
          <CardDescription>Manage customer orders and update their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="sent_to_courier">Sent to Courier</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.map((order) => (
                <TableRow key={order?._id}>
                  <TableCell className="font-medium">#{order?._id.slice(-5)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order?.userId?.name || "N/A"}</p>
                      <p className="text-sm text-muted-foreground">{order?.userId?.email || "N/A"}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order?.productId?.name || "N/A"}</TableCell>
                  <TableCell className="font-medium">${order?.price?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order?.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(order?.status)}
                      {order.status?.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Order Details - #{order?._id.slice(-5)}</DialogTitle>
                          <DialogDescription>Manage this order and update its status</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm">
                          <div><strong>Customer:</strong> {order?.customerName || "N/A"}</div>
                          <div><strong>Email:</strong> {order?.email || "N/A"}</div>
                          <div><strong>Item:</strong> {order?.productName || "N/A"}</div>
                          <div><strong>Total:</strong> ${order?.price?.toFixed(2)}</div>
                          <div><strong>Date:</strong> {new Date(order?.createdAt).toLocaleDateString()}</div>
                          <div><strong>Status:</strong> {order?.status}</div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
