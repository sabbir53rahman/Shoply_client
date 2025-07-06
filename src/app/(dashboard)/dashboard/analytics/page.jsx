"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import { useGetLast30DaysEarningsQuery, useGetLast30DaysOrdersCountQuery } from "@/redux/features/orderSlice/orderSlice"
import { useGetAllUsersQuery } from "@/redux/features/manageUserSlice/manageUserSlice"
import CountUp from "react-countup"
import { useTopSelling10Query } from "@/redux/features/productSlice/productSlice"
import { Spin } from "antd"
import AdminRoute from "@/components/AdminRoute"

export default function Analytics() {
  const {data : monthyRevenue} = useGetLast30DaysEarningsQuery()
  const {data : monthlyOrder} = useGetLast30DaysOrdersCountQuery()
  const {data : allUsers} = useGetAllUsersQuery()
  const {data : topSelling , isLoading} = useTopSelling10Query()


  console.log(monthyRevenue)

  const monthlyStats = [
    { month: "Jan", orders: 45, revenue: 12500 },
    { month: "Feb", orders: 52, revenue: 15200 },
    { month: "Mar", orders: 48, revenue: 13800 },
    { month: "Apr", orders: 61, revenue: 18900 },
    { month: "May", orders: 55, revenue: 16700 },
    { month: "Jun", orders: 67, revenue: 21300 },
  ]

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 234, revenue: "$304,566", trend: "up" },
    { name: 'MacBook Pro 14"', sales: 156, revenue: "$374,844", trend: "up" },
    { name: "Nike Air Max 90", sales: 189, revenue: "$28,245", trend: "down" },
    { name: "Samsung Galaxy S24", sales: 98, revenue: "$88,200", trend: "up" },
    { name: "AirPods Pro", sales: 267, revenue: "$66,675", trend: "up" },
  ]

  const categoryPerformance = [
    { category: "Electronics", percentage: 65, revenue: "$892,340" },
    { category: "Footwear", percentage: 20, revenue: "$274,120" },
    { category: "Accessories", percentage: 10, revenue: "$137,060" },
    { category: "Clothing", percentage: 5, revenue: "$68,530" },
  ]

  const cancellationReasons = [
    { reason: "Out of Stock", count: 12, percentage: 40 },
    { reason: "Customer Request", count: 8, percentage: 27 },
    { reason: "Payment Issues", count: 6, percentage: 20 },
    { reason: "Address Issues", count: 4, percentage: 13 },
  ]

  return (
    <AdminRoute role={"admin"}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into your store&apos;s performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={monthyRevenue?.totalEarnings} duration={3} /></div>
              {/* <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5%
                </span>
                from last month
              </p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={monthlyOrder?.totalOrders} duration={3} /></div>
              {/* <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +21.8%
                </span>
                from last month
              </p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={allUsers?.length} duration={3} /></div>
              {/* <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.2%
                </span>
                from last month
              </p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={3.2} duration={3} />%</div>
              {/* <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -0.5%
                </span>
                from last month
              </p> */}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Products */}
          {isLoading && <div className="justify-center w-full h-full items-center"><Spin size="large" /></div>}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Top Selling Products
              </CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSelling?.map((product, index) => (
                  <div key={product?.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">{product?.sold} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product?.revenue}</p>
                      <div className="flex items-center gap-1">
                        {product?.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Revenue breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">{category.revenue}</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">{category.percentage}% of total revenue</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Orders and revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center font-medium">
                      {stat.month}
                    </div>
                    <div>
                      <p className="font-medium">{stat.orders} Orders</p>
                      <p className="text-sm text-muted-foreground">${stat.revenue.toLocaleString()} Revenue</p>
                    </div>
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(stat.orders / 70) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Order Cancellation Analysis</CardTitle>
            <CardDescription>Reasons for order cancellations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cancellationReasons.map((reason) => (
                <div key={reason.reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{reason.count}</Badge>
                    <span className="font-medium">{reason.reason}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${reason.percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{reason.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  )
}
