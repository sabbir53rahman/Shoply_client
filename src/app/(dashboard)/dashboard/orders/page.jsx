"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Truck, CheckCircle, XCircle, ShoppingCart } from "lucide-react"

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      items: "iPhone 15 Pro, Case",
      total: "$1,299.99",
      status: "processing",
      date: "2024-01-15",
      payment: "Credit Card",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      items: "Nike Air Max 90",
      total: "$149.50",
      status: "sent_to_courier",
      date: "2024-01-18",
      payment: "PayPal",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      items: 'MacBook Pro 14"',
      total: "$2,399.99",
      status: "delivered",
      date: "2024-01-20",
      payment: "Credit Card",
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      items: "Samsung Galaxy S24",
      total: "$899.99",
      status: "cancelled",
      date: "2024-01-22",
      payment: "Cash on Delivery",
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(order.status)}
                      {order.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                            <DialogDescription>Manage this order and update its status</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium">Customer</p>
                                <p className="text-sm text-muted-foreground">{order.customer}</p>
                                <p className="text-sm text-muted-foreground">{order.email}</p>
                              </div>
                              <div>
                                <p className="font-medium">Payment Method</p>
                                <p className="text-sm text-muted-foreground">{order.payment}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Items</p>
                              <p className="text-sm text-muted-foreground">{order.items}</p>
                            </div>
                            <div>
                              <p className="font-medium">Total Amount</p>
                              <p className="text-lg font-bold">{order.total}</p>
                            </div>
                            <div className="flex gap-2">
                              {order.status === "processing" && (
                                <Button size="sm">
                                  <Truck className="w-4 h-4 mr-2" />
                                  Mark as Sent
                                </Button>
                              )}
                              {order.status === "sent_to_courier" && (
                                <Button size="sm">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Delivered
                                </Button>
                              )}
                              {order.status !== "cancelled" && order.status !== "delivered" && (
                                <Button variant="destructive" size="sm">
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Cancel Order
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
