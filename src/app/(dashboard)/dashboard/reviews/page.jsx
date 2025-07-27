"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, Star, Trash2, Eye, X } from "lucide-react";
import {
  useDeleteReviewMutation,
  useGetPaginatedReviewsQuery,
  useGetProductReviewsQuery,
} from "@/redux/features/reviewSlice/reviewSlice";
import AdminRoute from "@/components/AdminRoute";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { success } from "@/components/ui/message";
import ProductTableSkeleton from "@/components/ui/tableSkelton";

export default function ReviewsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useGetPaginatedReviewsQuery({ page: currentPage, search: searchTerm });
  const user = useSelector((state) => state?.user?.user);
  const [deleteReview] = useDeleteReviewMutation();

  const totalPages = reviews.totalPages || 1;

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });
    if (!confirm.isConfirmed) return;

    try {
      await deleteReview({
        id: reviewId,
        userId: user._id,
        role: user.role,
      }).unwrap();
      success("Review deleted successfully");
      refetch();
    } catch (err) {
      console.log("Failed delete:", err);
      Swal.fire("Error", "Failed to delete review.", "error");
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  if (isError) {
    return (
      <p className="p-6 w-full h-screen text-red-500">
        Failed to fetch reviews
      </p>
    );
  }
  return (
    <AdminRoute role={"admin"}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reviews Management
          </h1>
          <p className="text-muted-foreground">
            Moderate and manage customer product reviews
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Customer Reviews
            </CardTitle>
            <CardDescription>
              Review and moderate customer feedback
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
                  className="pl-8 pr-8"
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
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <ProductTableSkeleton />}
                {reviews?.reviews?.map((review) => (
                  <TableRow key={review?._id}>
                    <TableCell className="font-medium">
                      {review?.product?.name}
                    </TableCell>
                    <TableCell>{review?.user?.name}</TableCell>
                    <TableCell>{renderStars(review?.rating)}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{review?.comment}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(review?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Review Details</DialogTitle>
                              <DialogDescription>
                                Full review information and moderation options
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Product</h4>
                                <p className="text-sm text-muted-foreground">
                                  {review?.product?.name}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Customer</h4>
                                <p className="text-sm text-muted-foreground">
                                  {review?.user?.name}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Rating</h4>
                                {renderStars(review?.rating)}
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Review</h4>
                                <p className="text-sm line-clamp-1 text-muted-foreground">
                                  {review?.comment}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Date</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(
                                    review?.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <button
                          onClick={() => handleDeleteReview(review?._id)}
                          className="flex gap-2 px-3 py-1.5 rounded-lg bg-emerald-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
