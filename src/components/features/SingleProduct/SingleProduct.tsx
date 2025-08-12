"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Product = {
  image: { url: string; public_id: string };
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  __v: number;
};

export default function SingleProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
        );
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    router.push(`/edit-product/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Product deleted successfully!");
        router.push("/all-products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Add to Cart Handler
  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Product Image */}
        {product?.image?.url ? (
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={product.image.url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded-xl">
            No Image Available
          </div>
        )}

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-100 cursor-pointer"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>

              {/* Delete with AlertDialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-100 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete{" "}
                      <strong>{product.name}</strong>? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 cursor-pointer"
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-blue-600">${product.price}</p>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={() => handleAddToCart(product)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
            >
              Buy Now
            </Button>
          </div>

          {/* Created Date */}
          <p className="text-sm text-gray-400">
            Added on {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
