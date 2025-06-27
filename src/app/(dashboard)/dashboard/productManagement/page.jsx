"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Package, Upload } from "lucide-react";

import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddCategoryMutation,
  useGetAllCategorysQuery,
  useGetPaginatedProductsQuery,
} from "@/redux/features/productSlice/productSlice";

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";
import Link from "next/link";
import { Select } from "antd";

export default function ProductManagement({ onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    category: "",
    price: "",
    stock : ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products = [], isLoading, isError } = useGetPaginatedProductsQuery(currentPage);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addCategory] = useAddCategoryMutation();

  const { totalPages } = products;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setEditData({
      name: product.name,
      category: product.category,
      price: product.price,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (selectedProduct) {
      await updateProduct({ id: selectedProduct?._id, updatedData: editData });
      setSelectedProduct(null);
      return <DialogClose></DialogClose>
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      await deleteProduct(id);
    }
  };

  const filteredProducts = products?.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBulkUpload = () => {
    if (!products.length) {
      alert("No products found to export.");
      return;
    }

    const headers = ["name", "description", "category", "price", "stock", "tags"];
    const rows = products.map((p) => [
      p.name,
      p.description || "",
      p.category,
      p.price,
      p.stock || 0,
      Array.isArray(p.tags) ? p.tags.join(",") : p.tags || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddCategory = (e) =>{
    e.preventDefault();
    const newCategory = {category : e.target.category.value} ;
    addCategory(newCategory)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "New Category created successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Product Management
          </h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Download CSV Template
          </Button>
          {/* <Button onClick={onAddProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button> */}
          <Link href='/dashboard/addProduct' className="flex text-white justify-center items-center gap-2.5 px-4 py-1.5 rounded bg-emerald-600" >
            <Plus className="w-4 h-4 mr-2 " />
            Add Product
          </Link>

          <Dialog >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white ">
                <DialogHeader>
                  <DialogTitle>Add Category.</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCategory} className="space-y-3 flex flex-col w-full">
                  <p className="text-[13px] ml-2">{"Add New Category :"}</p>
                  <input type="text" className="w-full rounded border py-1.5 px-3 border-gray-200 outline-none" name="category" placeholder="Category" />
                  <input type="submit" className="text-white bg-teal-700 font-bold px-5 py-1.5 rounded " value="Add Category " />
                </form>
              </DialogContent>
            </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products
          </CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading products...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">Failed to load products.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.stock > 0 ? "default" : "secondary"}
                      >
                        {product?.stock > 0 ? product?.stock : "out of stock"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditOpen(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Update product details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3">
                              <p className="text-[13px] ml-2">{"Product's Name :"}</p>
                              <Input
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                              />
                              <p className="text-[13px] ml-2">{"Category :"}</p>
                              <Input
                                name="category"
                                value={editData.category}
                                onChange={handleEditChange}
                                placeholder="Category"
                              />
                              <p className="text-[13px] ml-2">{"Price :"}</p>
                              <Input
                                name="price"
                                value={editData.price}
                                onChange={handleEditChange}
                                placeholder="Price"
                              />
                              <p className="text-[13px] ml-2">{"Stock :"}</p>
                              <Input
                                name="stock"
                                value={editData?.stock}
                                onChange={handleEditChange}
                                placeholder="Stock"
                              />
                              <Button onClick={handleEditSubmit}>
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
                currentPage === page ? 'bg-emerald-600 text-white' : 'bg-gray-200'
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
  );
}
