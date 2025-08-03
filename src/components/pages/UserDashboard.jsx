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
import {
  ShoppingCart,
  Package,
  Star,
  Heart,
  Clock,
  User,
  CircleDashed,
} from "lucide-react";
import Image from "next/image";
import {
  useGetUserOrderDetailsQuery,
  useGetUserOrderQuery,
  useUpdateStatusMutation,
} from "@/redux/features/orderSlice/orderSlice";
import { useGetCurrentUserQuery } from "@/redux/features/manageUserSlice/manageUserSlice";
import useAuth from "@/Firebase/useAuth";
import CountUp from "react-countup";
import { useGetUsersAllReviewsQuery } from "@/redux/features/reviewSlice/reviewSlice";
import { useGetUserWishlistQuery } from "@/redux/features/wishlist/wishlist";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetFeaturedProductsQuery } from "@/redux/features/productSlice/productSlice";
import { useGetUserCartQuery } from "@/redux/features/cartSlice/cartSlice";

export default function UserDashboard({ currentUser }) {
  const router = useRouter();
  const { data: userOrder, isLoading: orderLoading } = useGetUserOrderQuery(
    currentUser?._id
  );
  const { data: userOrderDetails = [], isLoading: orderDetailsLoading } =
    useGetUserOrderDetailsQuery(currentUser?._id);
  const { data: usersAllReviews } = useGetUsersAllReviewsQuery(
    currentUser?._id
  );
  const { data: userWishlists } = useGetUserCartQuery(currentUser?._id);
  const [updateStatus] = useUpdateStatusMutation();
  const { data: recommendedProducts } = useGetFeaturedProductsQuery();

  const userDilevered = userOrderDetails.filter(
    (order) => order.status === "delivered"
  );

  const userStats = [
    {
      title: "Total Orders",
      value: userOrderDetails?.length || 0,
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Delivered",
      value: userDilevered?.length || 0,
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
      title: "Cart Items",
      value: userWishlists?.length || 0,
      icon: Heart,
      color: "text-red-600",
    },
  ];

  const handleCancleOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateStatus({
          orderId: id,
          status: "cancelled",
          cancle: "Customer request",
        }).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your shopping activity and
            recommendations.
          </p>
        </div>
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
              <div className="text-2xl font-bold">
                <CountUp end={stat.value} duration={3} />
              </div>
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
              {orderLoading ? (
                <div className="w-full flex justify-center items-center">
                  <Spin tip="loading" size="large" />
                </div>
              ) : (
                ""
              )}
              {userOrder?.length < 1 && (
                <div className="w-full flex justify-center items-center">
                  <p className="py-5">
                    You have no order{" "}
                    <Link
                      href="/products"
                      className="font-semibold text-blue-500"
                    >
                      View product
                    </Link>
                  </p>
                </div>
              )}
              {userOrder?.map((order) => (
                <div
                  key={order?._id}
                  className="flex items-center bg-emerald-50 text-gray-700 justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-">
                    <p className="text-sm font-medium text-muted-foreground">
                      {order?.products?.map((product, idx) => (
                        <p
                          className="p-1 flex items-center gap-2 shadow-sm my-1"
                          key={idx}
                        >
                          <CircleDashed className="size-3" />{" "}
                          {product?.productId?.name}
                        </p>
                      ))}
                    </p>
                    <p className="text-xs ml-5 text-muted-foreground">
                      {new Date(order?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="font-medium">${order?.totalPrice}</p>
                  <div className="text-right space-y-1">
                    <Badge
                      variant={
                        order?.status === "delivered"
                          ? "default"
                          : order?.status === "courier"
                          ? "secondary"
                          : "default"
                      }
                      className="text-xs border px-3 rounded-full bg-emerald-600 text-white py-1 border-gray-400"
                    >
                      {order?.status?.replace("_", " ")}
                    </Badge>
                  </div>
                  {order?.status === "processing" && (
                    <button
                      onClick={() => handleCancleOrder(order?._id)}
                      className="p-1 px-2.5 mr-4 text-sm font-bold shadow bg-zinc-400 text-white rounded-full border "
                    >
                      Cancle Order
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-emerald-600 text-white"
              onClick={() => router.push("/dashboard/my-orders")}
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
              {recommendedProducts?.slice(0, 3).map((product) => (
                <div
                  key={product?.name}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <Image
                    src={product?.image}
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
                  <Link
                    className="text-sky-400 text-sm font-semibold"
                    href={`/products/${product?._id}`}
                  >
                    View product
                  </Link>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-emerald-600 text-white"
              onClick={() => router.push("/products")}
            >
              View products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
