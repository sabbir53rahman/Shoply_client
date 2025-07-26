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
  X,
} from "lucide-react";
import {
  useGetAllOrdersQuery,
  useGetPaginatedOrdersQuery,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

import AdminRoute from "@/components/AdminRoute";
import { Label } from "@/components/ui/label";
import { errorMessage, success } from "@/components/ui/message";

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cancleReason, setCancleReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetPaginatedOrdersQuery({ page: currentPage, search: searchTerm });
  const [updateStatus] = useUpdateStatusMutation();

  console.log(orders);

  const totalPages = orders?.totalPages || 1;

  // const filteredOrders = orders?.filter((order) => {
  //   const idMatch = order?._id
  //     ?.toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const customerMatch = order?.userId?.name
  //     ?.toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesSearch = idMatch || customerMatch;
  //   const matchesStatus =
  //     statusFilter === "all" || order?.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });

  const handleStatus = async (e, orderId) => {
    e.preventDefault();
    const status = e.target.status.value;
    const cancle = e?.target?.cancle?.value || "empty";
    console.log(status, cancle);

    try {
      await updateStatus({ orderId, status, cancle }).unwrap();
      success(`Status updated to ${status}`);
      setCancleReason("");
      console.log("updated");
    } catch (error) {
      console.log(error);
      errorMessage("Failed to update status");
    }
  };

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

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading)
    return <div className="p-6 text-muted-foreground">Loading orders...</div>;
  if (isError)
    return <div className="p-6 text-destructive">Failed to load orders.</div>;

  return (
    <AdminRoute role={"admin"}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage customer orders
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Orders
            </CardTitle>
            <CardDescription>
              Manage customer orders and update their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-8" // ডান পাশে স্পেস যাতে cross টা বসে
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-2.5 text-muted-foreground hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
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
                {orders?.orders?.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell className="font-medium">
                      #{order?._id.slice(-5)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {order?.user?.name || "N/A"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order?.user?.email || "N/A"}
                        </p>
                      </div>
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
                            {/* Customer Info */}
                            <div>
                              <Label className="text-base font-semibold">
                                Customer
                              </Label>
                              <p className="mt-1">
                                {order?.user?.name || "N/A"}
                              </p>
                            </div>

                            {/* Status Update */}
                            <div>
                              <Label className="text-base font-semibold">
                                Status
                              </Label>
                              <form
                                onSubmit={(e) => handleStatus(e, order?._id)}
                                className="mt-2 grid gap-4 md:grid-cols-3 items-center"
                              >
                                {/* Main Status Selector */}
                                <Select
                                  defaultValue={order?.status}
                                  name="status"
                                  required
                                  onValueChange={(val) => setCancleReason(val)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Update status" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="processing">
                                      Processing
                                    </SelectItem>
                                    <SelectItem value="courier">
                                      Courier
                                    </SelectItem>
                                    <SelectItem value="delivered">
                                      Delivered
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                      Cancelled
                                    </SelectItem>
                                  </SelectContent>
                                </Select>

                                {/* Cancel Reason Selector */}
                                {cancleReason === "cancelled" && (
                                  <Select
                                    name="cancle"
                                    defaultValue="Out of stock"
                                    required
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Reason for cancellation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Out of stock">
                                        Out of Stock
                                      </SelectItem>
                                      <SelectItem value="Address issues">
                                        Address Issue
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}

                                <Button
                                  type="submit"
                                  className="w-full text-white bg-emerald-600 hover:bg-emerald-700"
                                >
                                  Update
                                </Button>
                              </form>
                            </div>

                            {/* Email */}
                            <div>
                              <Label className="text-base font-semibold">
                                Email
                              </Label>
                              <p className="mt-1">
                                {order?.user?.email || "N/A"}
                              </p>
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
                                      href={`/products/${product?.productData?._id}`}
                                      className="text-sky-600 hover:underline"
                                    >
                                      {product?.productData?.name}
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
          </CardContent>
        </Card>
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminRoute>
  );
}
