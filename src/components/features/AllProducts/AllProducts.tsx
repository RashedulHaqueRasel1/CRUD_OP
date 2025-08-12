"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useAllProducts } from "@/components/hooks/useAllProduct";
import Link from "next/link";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
  createdAt: string;
}

export default function AllProducts() {
  const { data, isLoading, isError } = useAllProducts();

  // Add to Cart Handler
  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load data.</p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data?.data?.map((product: Product) => (
          <Card
            key={product._id}
            className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Product Image */}
            <div className="relative w-full h-48">
              <Image
                src={product?.image?.url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <CardHeader>
              <CardTitle className="text-lg font-semibold truncate">
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 flex-grow">
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="font-bold text-lg text-blue-600">
                ${product.price}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <Link href={`/products/${product._id}`}>
                  <Button
                    size="lg"
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg px-5 py-3 cursor-pointer"
                  >
                    <Eye className="h-5 w-5" />
                    <span>View Details</span>
                  </Button>
                </Link>

                <Button
                  size="lg"
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-lg px-5 py-3 cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
