"use client";

import { useState } from "react";
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
} from "lucide-react";

import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddCategoryMutation,
  useGetAllCategorysQuery,
  useGetPaginatedProductsQuery,
  useUpdateIsFeaturedMutation,
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
import { ColorPicker, Select } from "antd";
import AdminRoute from "@/components/AdminRoute";
import { Toast } from "@/components/ui/message";
import axios from "axios";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function ProductManagement({ onAddProduct }) {
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
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetPaginatedProductsQuery(currentPage);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const [updateIsFeatured] = useUpdateIsFeaturedMutation();

  const { totalPages } = products;

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
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
      return <DialogClose></DialogClose>;
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
    const imageFile = { image: e.target.photo.files[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      const newCategory = {
        category: e.target.category.value,
        image: res?.data?.data?.display_url,
        color: color,
      };

      if (res.data.success === true) {
        await addCategory(newCategory).unwrap();
        Toast.fire({
          icon: "success",
          title: "New category created successfully",
        });
        e.target.reset();
        setOpen(false);
      }
    } catch (error) {
      setDisabled(false);
      Toast.fire({
        icon: "error",
        title: "Can't make category .",
      });
      setOpen(false);
    }
  };

  const handleUpdateFeatured = async ({ isFeature, productId }) => {
    console.log(isFeature, productId);
    try {
      await updateIsFeatured({
        isFeature: isFeature,
        productId: productId,
      }).unwrap();
      Toast.fire({
        icon: "success",
        title: "Feature updated!",
      });
    } catch (error) {
      Toast.fire({
        icon: "success",
        title: "Can't update feature!",
      });
    }
  };

  return (
    <AdminRoute role={"admin"}>
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
            <Link
              href="/dashboard/addProduct"
              className="flex text-white justify-center items-center gap-2.5 px-4 py-1.5 rounded bg-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2 " />
              Add Product
            </Link>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add category
                </Button>
              </DialogTrigger>
              <DialogContent
                modal={false}
                onInteractOutside={(e) => e.preventDefault()}
                className="bg-white "
              >
                <DialogHeader>
                  <DialogTitle>Add Category.</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleAddCategory}
                  className="space flex flex-col w-full"
                >
                  <p className="text-[13px] ml-2">{"Add New Category :"}</p>
                  <input
                    type="text"
                    className="w-full rounded border py-1.5 px-3 border-gray-200 outline-none"
                    name="category"
                    placeholder="Category"
                  />
                  <div className="flex justify-center my-4 gap-4 items-center">
                    <div className="w-full">
                      <label className="block text-gray-700 text-sm  mb-2">
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
                    <div className="">
                      <p className="text-sm">BG color.</p>
                      <div className="flex border mt-2 rounded px-3 pr-6 items-center gap-3">
                        <input
                          type="color"
                          name="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-9 h-9  rounded cursor-pointer shadow"
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
                    } font-bold mt-8 px-5 py-1.5 rounded `}
                    value="Add Category "
                  />
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
              <p className="text-sm text-muted-foreground">
                Loading products...
              </p>
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
                    <TableHead>Featured</TableHead>
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
                      <TableCell>
                        ${parseFloat(product.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock > 0 ? "default" : "secondary"}
                        >
                          {product?.stock > 0 ? product?.stock : "out of stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {!product?.isFeatured && (
                          <button
                            onClick={() =>
                              handleUpdateFeatured({
                                isFeature: true,
                                productId: product?._id,
                              })
                            }
                            className="py-1 border border-fuchsia-200 px-2.5 rounded bg"
                          >
                            Make Featured
                          </button>
                        )}
                        {product?.isFeatured && (
                          <button
                            onClick={() =>
                              handleUpdateFeatured({
                                isFeature: false,
                                productId: product?._id,
                              })
                            }
                            className="py-1 border text-white bg-emerald-400 border-fuchsia-200 px-2.5 rounded bg"
                          >
                            Remove Featured
                          </button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
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
                                <p className="text-[13px] ml-2">
                                  {"Product's Name :"}
                                </p>
                                <Input
                                  name="name"
                                  value={editData.name}
                                  onChange={handleEditChange}
                                  placeholder="Name"
                                />
                                <p className="text-[13px] ml-2">
                                  {"Category :"}
                                </p>
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
