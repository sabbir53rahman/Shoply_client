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

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useSelector((state) => state?.user?.user);
  const [statusFilter, setStatusFilter] = useState("all");
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
