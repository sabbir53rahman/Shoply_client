"use client";

import { useState } from "react";
import Link from "next/link";
import { Slider, Modal } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Package, Upload } from "lucide-react";

import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddCategoryMutation,
  useUpdateIsFeaturedMutation,
  useGetProductsByPriceRangeQuery,
} from "@/redux/features/productSlice/productSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";
import AdminRoute from "@/components/AdminRoute";

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const perPage = 10;

  const { data: priceFiltered = [], isLoading, isError } =
    useGetProductsByPriceRangeQuery({
      min: priceRange[0],
      max: priceRange[1],
    });

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const [updateIsFeatured] = useUpdateIsFeaturedMutation();

  const filtered = priceFiltered.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const changePage = (n) =>
    setCurrentPage(n >= 1 && n <= totalPages ? n : currentPage);

  const handleEditOpen = (product) => {
    setEditModalOpen(true);
    setSelectedProduct(product);
    setEditData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (selectedProduct) {
      await updateProduct({ id: selectedProduct._id, updatedData: editData });
      setEditModalOpen(false);
      setSelectedProduct(null);
      Swal.fire("Updated!", "Product updated successfully.", "success");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: async () => {
        await deleteProduct(id);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      },
    });
  };

  return (
    <AdminRoute role="admin">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-medium mb-1">Filter by Price Range</h4>
            <Slider
              range
              min={0}
              max={2000}
              value={priceRange}
              onChange={(val) => {
                setPriceRange(val);
                setCurrentPage(1);
              }}
              tooltip={{ formatter: (v) => `$${v}` }}
            />
            <div className="text-sm text-muted-foreground">
              Price range: ${priceRange[0]} — ${priceRange[1]}
            </div>
          </div>

          <Link
            href="/dashboard/addProduct"
            className="flex items-center gap-2 px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>

        <div className="relative flex items-center gap-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8"
          />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" /> Products
              </CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Featured</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.length > 0 ? (
                    pageData.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          ${parseFloat(product.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={product.stock > 0 ? "default" : "secondary"}
                          >
                            {product.stock > 0 ? product.stock : "out of stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() =>
                              updateIsFeatured({
                                isFeature: !product.isFeatured,
                                productId: product._id,
                              })
                                .unwrap()
                                .then(() => Swal.fire("Updated!", "", "success"))
                            }
                            className={`py-1 px-2.5 rounded border ${
                              product.isFeatured
                                ? "bg-emerald-400 text-white"
                                : "border-fuchsia-200"
                            }`}
                          >
                            {product.isFeatured ? "Remove Featured" : "Make Featured"}
                          </button>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditOpen(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No matching products</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => changePage(currentPage - 1)}
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
                      onClick={() => changePage(page)}
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
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="bg-white max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                name="name"
                placeholder="Product Name"
                value={editData.name}
                onChange={handleEditChange}
              />
              <label className="text-sm font-medium">Category</label>
              <Input
                name="category"
                placeholder="Category"
                value={editData.category}
                onChange={handleEditChange}
              />
              <label className="text-sm font-medium">Price</label>
              <Input
                name="price"
                placeholder="Price"
                value={editData.price}
                onChange={handleEditChange}
              />
              <label className="text-sm font-medium">Stock</label>
              <Input
                name="stock"
                placeholder="Stock"
                value={editData.stock}
                onChange={handleEditChange}
              />
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminRoute>
  );
}