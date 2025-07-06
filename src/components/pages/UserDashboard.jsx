"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Star, Heart, Clock, User } from "lucide-react";
import Image from "next/image";
import { useGetUserOrderQuery } from "@/redux/features/orderSlice/orderSlice";
import { useGetCurrentUserQuery } from "@/redux/features/manageUserSlice/manageUserSlice";
import useAuth from "@/Firebase/useAuth";
import CountUp from "react-countup";
import { useGetUsersAllReviewsQuery } from "@/redux/features/reviewSlice/reviewSlice";
import { useGetUserWishlistQuery } from "@/redux/features/wishlist/wishlist";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Link from "next/link";

export default function UserDashboard({ currentUser }) {
  const router = useRouter();
  const {data : userOrder ,isLoading : orderLoading } = useGetUserOrderQuery(currentUser?._id)
  const {data : usersAllReviews } = useGetUsersAllReviewsQuery(currentUser?._id)
  const {data : userWishlists } = useGetUserWishlistQuery(currentUser?._id)
  console.log(userOrder,'all review',usersAllReviews,'wishlist',userWishlists)
  console.log('copy copy', userOrder?.products?.productId?.name)

  const userStats = [
    {
      title: "Total Orders",
      value: userOrder?.length || 0,
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Delivered",
      value: "8",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Reviews Given",
      value: usersAllReviews?.length || 0,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Wishlist Items",
      value: userWishlists?.length || 0,
      icon: Heart,
      color: "text-red-600",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      items: "iPhone 15 Pro, Case",
      total: "$1,299.99",
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "#ORD-002",
      items: "Nike Air Max 90",
      total: "$149.50",
      status: "sent_to_courier",
      date: "2024-01-18",
    },
    {
      id: "#ORD-003",
      items: 'MacBook Pro 14"',
      total: "$2,399.99",
      status: "processing",
      date: "2024-01-20",
    },
  ];

  const recommendedProducts = [
    {
      name: "AirPods Pro",
      price: "$249.99",
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "iPad Air",
      price: "$599.99",
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Apple Watch",
      price: "$399.99",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, { currentUser?.name }!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your shopping activity and
            recommendations.
          </p>
        </div>
        <Button onClick={() => router.push("/my-profile")}>
          <User className="w-4 h-4 mr-2" />
          My Profile
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"><CountUp end={stat.value} duration={3} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Recent Orders
            </CardTitle>
            <CardDescription>Your latest purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {
                orderLoading ? <div className="w-full flex justify-center items-center">
                  <Spin  tip="loading" size="large"/>
                  </div> : ''
              }
              { userOrder?.length < 1 && <div className="w-full flex justify-center items-center">
                <p className="py-5">You have no order <Link href='/shop' className="font-semibold text-blue-500">View product</Link></p>
              </div>
              }
              {userOrder?.map((order) => (
                <div
                  key={order?._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-">
                    <p className="text-sm font-medium text-muted-foreground">
                      {order?.products?.map((produt,idx) =><p className="p-3 shadow-sm my-1" key={idx}>
                        {produt?.productId?.name}
                      </p>)
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                        })}
                    </p>
                  </div>
                  <p className="font-medium">{order?.totalPrice}</p>
                  <div className="text-right space-y-1">
                    
                    <Badge
                      variant={
                        order?.status === "delivered"
                          ? "default"
                          : order?.status === "sent_to_courier"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {order?.status?.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.push("/my-orders")}
            >
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recommended for You
            </CardTitle>
            <CardDescription>Based on your purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedProducts?.map((product) => (
                <div
                  key={product?.name}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <Image
                    src={product?.image || "/placeholder.svg"}
                    alt={product?.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product?.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {product?.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {product?.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Add to Cart</Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.push("/favorites")}
            >
              View Favorites
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/my-orders")}
        >
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">My Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/favorites")}
        >
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <p className="font-medium">My Favorites</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/my-profile")}
        >
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">My Profile</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
