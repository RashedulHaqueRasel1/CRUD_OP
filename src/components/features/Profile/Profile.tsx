"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
}

export default function Profile() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Remove item from cart
  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <p className="text-center py-10 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {cartItems.map((product) => (
          <Card
            key={product._id}
            className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

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
              <Button
                variant="destructive"
                onClick={() => handleRemove(product._id)}
                className="cursor-pointer"
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
