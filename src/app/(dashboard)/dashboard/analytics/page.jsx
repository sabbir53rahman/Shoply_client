"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import { useGetCanclePercentageQuery, useGetLast30DaysEarningsQuery, useGetLast30DaysOrdersCountQuery, useGetLast5MonthsStatsQuery } from "@/redux/features/orderSlice/orderSlice"
import { useGetAllUsersQuery } from "@/redux/features/manageUserSlice/manageUserSlice"
import CountUp from "react-countup"
import { useTopSelling10Query } from "@/redux/features/productSlice/productSlice"
import { Spin } from "antd"
import AdminRoute from "@/components/AdminRoute"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const {data : monthyRevenue} = useGetLast30DaysEarningsQuery()
  const {data : monthlyOrder} = useGetLast30DaysOrdersCountQuery()
  const {data : allUsers} = useGetAllUsersQuery()
  const {data : topSelling , isLoading} = useTopSelling10Query()
  const {data : fiveMonthState , isLoading : fiveMonthLoading} = useGetLast5MonthsStatsQuery()
  const {data : canclePercentage} = useGetCanclePercentageQuery()

  console.log(canclePercentage)

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
          <Card className="hover:bg-emerald-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={monthyRevenue?.totalEarnings} duration={3} /></div>
            </CardContent>
          </Card>

          <Card className="hover:bg-emerald-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={monthlyOrder?.totalOrders} duration={3} /></div>
            </CardContent>
          </Card>

          <Card className="hover:bg-emerald-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={allUsers?.length} duration={3} /></div>
            </CardContent>
          </Card>

          <Card className="hover:bg-emerald-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={3.2} duration={3} />%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-8">
          {/* Top Products */}
          {isLoading && <div className="justify-center w-full h-full items-center"><Spin size="large" /></div>}
          <Card className="xl:col-span-2">
            <div className="pt-3 px-2 mb-1">
              <div className="flex text-[24px] mt-4  font-semibold items-center gap-2">
                <Package className="h-5 w-5" />
                Top Selling Products
              </div>
              <CardDescription className="text-[15px] font-450">Best performing products this month</CardDescription>
            </div>
            <div className="pr-2 py-2">
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
            </div>
          </Card>

          <Card className=" xl:col-span-3">
            <div className="py-2 px-4 mt-5">
              <h3 className="text-2xl font-semibold">Earning Performance</h3>
              <p className="text-[15px] font">Earnings of last five months.</p >
            </div>
            <div className="">
              <div className="w-full h-[400px] bg-white p-4 ">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Monthly Earnings</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fiveMonthState}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* <Bar dataKey="totalOrders" fill="#4ade80" name="Total Orders" /> */}
                  <Bar dataKey="totalEarnings" fill="#60a5fa" name="Total Earnings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            </div>
          </Card>
          <Card className=" xl:col-span-3">
            <div className="py-2 px-4 mt-5">
              <h3 className="text-2xl font-semibold">Order Performance</h3>
              <p className="text-[15px] font">Last five months total Order.</p >
            </div>
            <div className="">
              <div className="w-full h-[400px] bg-white p-4 ">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Monthly Orders.</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fiveMonthState}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalOrders" fill="#4ade80" name="Total Orders" />
                  {/* <Bar dataKey="totalEarnings" fill="#60a5fa" name="Total Earnings" /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
            </div>
          </Card>
          
        </div>

        {/* Cancellation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Order Cancellation Analysis</CardTitle>
            <CardDescription>Reasons for order cancellations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {canclePercentage?.reasons?.map((reason) => (
                <div key={reason.reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{reason.reason}</span>
                    <Badge variant="outline">{reason.count}</Badge>
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
