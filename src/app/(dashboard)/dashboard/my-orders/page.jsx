"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Check,
} from "lucide-react";
import {
  useGetAllOrdersQuery,
  useGetUserOrderDetailsQuery,
  useUpdateStatusMutation,
} from "@/redux/features/orderSlice/orderSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AdminRoute from "@/components/AdminRoute";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { success } from "@/components/ui/message";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useSelector((state) => state?.user?.user);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updateStatus] = useUpdateStatusMutation();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetUserOrderDetailsQuery(currentUser?._id);

  console.log(orders);

  const filteredOrders = orders?.filter((order) => {
    const idMatch = order?._id
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const customerMatch = order?.userId?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSearch = idMatch || customerMatch;
    const matchesStatus =
      statusFilter === "all" || order?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <ShoppingCart className="w-4 h-4" />;
      case "courier":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "processing":
        return "outline";
      case "courier":
        return "secondary";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isLoading)
    return (
      <div
        className="p-6 w-full h-screen
     text-muted-foreground"
      >
        Loading orders...
      </div>
    );
  if (isError)
    return (
      <div
        className="p-6 w-full h-screen
     text-destructive"
      >
        Failed to load orders.
      </div>
    );

  const handleCancleOrder = async (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
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
        success("Order cancelled successfully!");
      }
    });
  };

  return (
    <AdminRoute role={"user"}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Orders Details .
          </h1>
          <p className="text-muted-foreground">
            Get all order details here and do orders
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              All Orders Details
            </CardTitle>
            <CardDescription>
              Your all orders detials and update their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders?.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell className="font-medium">
                      #{order?._id.slice(-5)}
                    </TableCell>
                    <TableCell>{order?.products?.length} products</TableCell>
                    <TableCell className="font-medium">
                      ${order?.totalPrice?.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(order?.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {getStatusIcon(order?.status)}
                        {order.status?.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          forceMount
                          className="bg-white rounded-xl shadow-lg px-6 py-8 max-w-2xl"
                        >
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                              Order Details - #{order?._id.slice(-5)}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                              Manage this order and update its status
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 mt-6 text-sm text-gray-700">
                            {/* Status Update */}
                            <div>
                              <Label className="text-base mx-3 font-semibold">
                                Status
                              </Label>
                              {order?.status === "processing" ? (
                                <button
                                  onClick={() => handleCancleOrder(order?._id)}
                                  className="p-1 my-3 px-2.5 mr-4 block text-sm font-bold shadow bg-emerald-500 text-white rounded-full border "
                                >
                                  Cancel Order
                                </button>
                              ) : (
                                <Badge
                                  variant={getStatusVariant(order?.status)}
                                  className="flex my-3 items-center gap-1 w-fit"
                                >
                                  {getStatusIcon(order?.status)}
                                  {order.status?.replace("_", " ")}
                                </Badge>
                              )}
                            </div>

                            {/* Products */}
                            <div>
                              <Label className="text-base font-semibold mb-1 block">
                                Items
                              </Label>
                              <div className="space-y-2">
                                {order?.products?.map((product, idx) => (
                                  <div
                                    className="border rounded-lg px-4 py-2 flex justify-between items-center bg-muted"
                                    key={idx}
                                  >
                                    <Link
                                      href={`/products/${product?.productId?._id}`}
                                      className="text-sky-600 hover:underline"
                                    >
                                      {product?.productId?.name}
                                    </Link>
                                    <span className="text-muted-foreground">
                                      {product?.quantity} pcs
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between">
                              <Label className="text-base font-semibold">
                                Total
                              </Label>
                              <p>${order?.totalPrice?.toFixed(2)}</p>
                            </div>

                            {/* Date */}
                            <div className="flex justify-between">
                              <Label className="text-base font-semibold">
                                Date
                              </Label>
                              <p>
                                {new Date(
                                  order?.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!orders?.length && (
              <p className="text-lg font-semibold py-8 text-center text-emerald-600 mx-auto">
                You do not have any order.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  );
}
