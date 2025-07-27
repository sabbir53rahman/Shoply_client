"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Slider, Pagination } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Upload,
  Camera,
  X,
} from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AdminRoute from "@/components/AdminRoute";
import { Toast } from "@/components/ui/message";
import axios from "axios";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const PRODUCTS_PER_PAGE = 10;

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [color, setColor] = useState("#1677ff");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Fetch all products filtered by price range and search term (assuming this query supports search)
  // If not, you can filter search manually
  const {
    data: filteredData = [],
    isLoading,
    isError,
  } = useGetProductsByPriceRangeQuery({
    min: priceRange[0],
    max: priceRange[1],
    search: searchTerm.trim(),
  });

  // Extract products array safely
  const products = filteredData.products || filteredData || [];

  // Pagination calculation
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // Products to display on current page
  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const [updateIsFeatured] = useUpdateIsFeaturedMutation();

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    if (!selectedProduct) return;
    try {
      await updateProduct({
        id: selectedProduct._id,
        updatedData: editData,
      }).unwrap();
      setEditModalOpen(false);
      setSelectedProduct(null);
      Toast.fire({ icon: "success", title: "Product updated successfully" });
    } catch {
      Toast.fire({ icon: "error", title: "Failed to update product" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id).unwrap();
      Toast.fire({ icon: "success", title: "Product deleted successfully" });
    } catch {
      Toast.fire({ icon: "error", title: "Failed to delete product" });
    }
  };

  const handleBulkUpload = () => {
    if (!products.length) {
      alert("No products found to export.");
      return;
    }
    const headers = [
      "name",
      "description",
      "category",
      "price",
      "stock",
      "tags",
    ];
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const imageFile = e.target.photo.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const newCategory = {
          category: e.target.category.value,
          image: res.data.data.display_url,
          color,
        };

        await addCategory(newCategory).unwrap();

        Toast.fire({
          icon: "success",
          title: "New category created successfully",
        });
        e.target.reset();
        setOpen(false);
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      Toast.fire({ icon: "error", title: "Can't create category." });
    } finally {
      setDisabled(false);
    }
  };

  const handleUpdateFeatured = async ({ isFeature, productId }) => {
    try {
      await updateIsFeatured({ isFeature, productId }).unwrap();
      Toast.fire({ icon: "success", title: "Feature updated!" });
    } catch {
      Toast.fire({ icon: "error", title: "Can't update feature!" });
    }
  };

  return (
    <AdminRoute role="admin">
      <div className="p-6 space-y-6">
        {/* Filter and buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-medium mb-1">Filter by Price Range</h4>
            <Slider
              range
              min={0}
              max={2000}
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
              tooltip={{ formatter: (v) => `$${v}` }}
            />
            <div className="text-sm text-muted-foreground">
              Price range: ${priceRange[0]} — ${priceRange[1]}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <Button variant="outline" onClick={handleBulkUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Download CSV Template
            </Button>

            <Link
              href="/dashboard/addProduct"
              className="flex text-white justify-center items-center gap-2.5 px-4 py-1.5 rounded bg-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add category
                </Button>
              </DialogTrigger>

              <DialogContent
                modal={false}
                onInteractOutside={(e) => e.preventDefault()}
                className="bg-white"
              >
                <DialogHeader>
                  <DialogTitle>Add Category.</DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={handleAddCategory}
                  className="flex flex-col w-full space-y-4"
                >
                  <p className="text-[13px] ml-2">Add New Category :</p>

                  <input
                    type="text"
                    className="w-full rounded border py-1.5 px-3 border-gray-200 outline-none"
                    name="category"
                    placeholder="Category"
                    required
                  />

                  <div className="flex justify-center my-4 gap-4 items-center">
                    <div className="w-full">
                      <label className="block text-gray-700 text-sm mb-2">
                        Category Image
                      </label>
                      <div className="relative">
                        <input
                          name="photo"
                          type="file"
                          required
                          className="w-full px-4 py-1 border-2 border-dashed border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors group-hover:border-gray-400 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700"
                        />
                        <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm">BG color.</p>
                      <div className="flex border mt-2 rounded px-3 pr-6 items-center gap-3">
                        <input
                          type="color"
                          name="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-9 h-9 rounded cursor-pointer shadow"
                        />
                        <span className="font-medium">{color}</span>
                      </div>
                    </div>
                  </div>

                  <input
                    disabled={disabled}
                    type="submit"
                    className={`text-white cursor-pointer ${
                      disabled ? "bg-gray-400" : "bg-teal-700"
                    } font-bold mt-8 px-5 py-1.5 rounded`}
                    value="Add Category"
                  />
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products
            </CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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

            {/* Loading / Error */}
            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading products...
              </p>
            ) : isError ? (
              <p className="text-sm text-red-500">Failed to load products.</p>
            ) : products.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No matching products
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
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
                        {!product.isFeatured ? (
                          <button
                            onClick={() =>
                              handleUpdateFeatured({
                                isFeature: true,
                                productId: product._id,
                              })
                            }
                            className="py-1 border border-fuchsia-200 px-2.5 rounded"
                          >
                            Make Featured
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleUpdateFeatured({
                                isFeature: false,
                                productId: product._id,
                              })
                            }
                            className="py-1 border text-white bg-emerald-400 border-fuchsia-200 px-2.5 rounded"
                          >
                            Remove Featured
                          </button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog
                            open={editModalOpen}
                            onOpenChange={setEditModalOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditOpen(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="bg-white max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4">
                                <label className="text-sm font-medium">
                                  Product Name
                                </label>
                                <Input
                                  name="name"
                                  placeholder="Product Name"
                                  value={editData.name}
                                  onChange={handleEditChange}
                                />
                                <label className="text-sm font-medium">
                                  Category
                                </label>
                                <Input
                                  name="category"
                                  placeholder="Category"
                                  value={editData.category}
                                  onChange={handleEditChange}
                                />
                                <label className="text-sm font-medium">
                                  Price
                                </label>
                                <Input
                                  name="price"
                                  placeholder="Price"
                                  value={editData.price}
                                  onChange={handleEditChange}
                                />
                                <label className="text-sm font-medium">
                                  Stock
                                </label>
                                <Input
                                  name="stock"
                                  placeholder="Stock"
                                  value={editData.stock}
                                  onChange={handleEditChange}
                                />
                                <Button
                                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                                  onClick={handleEditSubmit}
                                >
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={PRODUCTS_PER_PAGE}
                  total={totalProducts}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  );
}
