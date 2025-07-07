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

import Swal from "sweetalert2";
import AdminRoute from "@/components/AdminRoute";

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateStatusMutation();

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

  const handleStatus = async (e, orderId) => {
    e.preventDefault();
    const status = e.target.status.value;
    console.log(orderId, status);

    try {
      await updateStatus({ orderId, status }).unwrap();

      Swal.fire({
        position: "top-start",
        title: `Status updated as ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("updated");
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-start",
        title: `Can't update status.`,
        showConfirmButton: false,
        timer: 1500,
      });
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
                  <SelectItem value="courier">Sent to Courier</SelectItem>
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
                    <TableCell className="font-medium">
                      #{order?._id.slice(-5)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {order?.userId?.name || "N/A"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order?.userId?.email || "N/A"}
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
                        <DialogContent forceMount className="bg-white">
                          <DialogHeader>
                            <DialogTitle>
                              Order Details - #{order?._id.slice(-5)}
                            </DialogTitle>
                            <DialogDescription>
                              Manage this order and update its status
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div>
                              <strong>Customer :</strong>{" "}
                              {order?.userId?.name || "N/A"}
                            </div>
                            <div className="">
                              <strong>Status : </strong>
                              <form
                                onSubmit={(e) => handleStatus(e, order?._id)}
                                className="flex justify-between items-center gap-2 mt-2.5 m-auto w-[90%]"
                              >
                                {/* <AntSelect
                                    mode=""
                                    placeholder="Change status"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{ width: '90%', height : '35px' }}
                                    options={statusOption?.map(item => ({
                                        value: item.status,
                                        label: item.status,
                                    }))}
                                /> */}
                                <select
                                  defaultValue={order?.status}
                                  placeholder="update status"
                                  name="status"
                                  required
                                  className="w-full border text-gray-800 border-gray-300 rounded-lg px-4 py-2"
                                >
                                  <option value="processing">processing</option>
                                  <option value="courier">courier</option>
                                  <option value="delivered">delivered</option>
                                  <option value="cancelled">cancelled</option>
                                </select>
                                <input
                                  type="submit"
                                  className="bg-emerald-600 rounded p-3 py-2 text-white"
                                  value="update"
                                />
                                {/* <button onClick={()=>handleStatus(order?._id)} className='border bg-emerald-600 hover:bg-emerald-700 rounded p-3 text-white' ><Check/></button> */}
                              </form>
                            </div>
                            <div>
                              <strong>Email :</strong>{" "}
                              {order?.userId?.email || "N/A"}
                            </div>
                            <div>
                              <strong>Item :</strong>
                              {order?.products?.map((product, idx) => (
                                <div
                                  className="shadow-sm py-2 px-2 flex justify-between w-[90%] mx-auto"
                                  key={idx}
                                >
                                  <Link
                                    href={`/products/${product?.productId?._id}`}
                                    className="text-sky-600 hover:text-sky-500"
                                  >
                                    {product?.productId?.name}
                                  </Link>
                                  <p className="text-">
                                    {product?.quantity} Product.
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <strong>Total :</strong> $
                              {order?.totalPrice?.toFixed(2)}
                            </div>
                            <div>
                              <strong>Date :</strong>{" "}
                              {new Date(order?.createdAt).toLocaleDateString()}
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
      </div>
    </AdminRoute>
  );
}
