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
import { Search, Star, Trash2, Eye } from "lucide-react";
import { useGetAllReviewsQuery } from "@/redux/features/reviewSlice/reviewSlice";

export default function ReviewsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: reviews = [], isLoading, isError } = useGetAllReviewsQuery();
  console.log(reviews)

  const filteredReviews = reviews?.filter(
    (review) =>
      review?.productId?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      review?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (isLoading) return <p className="p-6">Loading reviews...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to fetch reviews</p>;

  return (
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
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews?.map((review) => (
                <TableRow key={review?._id}>
                  <TableCell className="font-medium">
                    {review?.productId?.name}
                  </TableCell>
                  <TableCell>{review?.userId?.name}</TableCell>
                  <TableCell>{renderStars(review?.rating)}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{review?.comment}</p>
                  </TableCell>
                  <TableCell>
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">pending</Badge>
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
                                {review?.productId?.name}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Customer</h4>
                              <p className="text-sm text-muted-foreground">
                                {review?.userId?.name}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Rating</h4>
                              {renderStars(review?.rating)}
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Review</h4>
                              <p className="text-sm text-muted-foreground">
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
                            <div className="flex gap-2 pt-4 border-t">
                              <Button size="sm">Approve Review</Button>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Review
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
