"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Package, ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Plus, BarChart3 } from "lucide-react"
import { useGetLowStockQuery } from "@/redux/features/productSlice/productSlice"
import CountUp from "react-countup"

export default function AdminDashboard({ userId }) {
  const router = useRouter()
  const {data : lowStocks} = useGetLowStockQuery()
  console.log( 'low',lowStocks)

  const stats = [
    {
      title: "Total Users",
      value:'2847',
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: '1234',
      change: "+8%",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: '45231',
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Products",
      value: '567',
      change: "+3%",
      icon: Package,
      color: "text-purple-600",
    },
  ]

  const lowStockProducts = [
    { name: "iPhone 15 Pro", stock: 3, category: "Electronics" },
    { name: "Nike Air Max", stock: 2, category: "Footwear" },
    { name: "MacBook Pro", stock: 1, category: "Electronics" },
  ]

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", total: "$299.99", status: "processing" },
    { id: "#ORD-002", customer: "Jane Smith", total: "$149.50", status: "sent_to_courier" },
    { id: "#ORD-003", customer: "Mike Johnson", total: "$89.99", status: "delivered" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <Button onClick={() => router.push("/products")}>
          <Plus className="w-4 h-4 mr-2" />
          Quick Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={stat?.value} duration={3} /></div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStocks?.map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge variant="destructive">{product.stock} left</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/dashboard/productManagement")}>
              Manage Products
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "sent_to_courier"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {order.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/orders")}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/dashboard/productManagement")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Manage Products</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/dashboard/orders")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">View Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/dashboard/users")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Manage Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/dashboard/analytics")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="font-medium">View Analytics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
