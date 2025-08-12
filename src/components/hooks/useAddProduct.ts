"use client";

import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

type ProductFormValues = z.infer<
  ReturnType<typeof z.object<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodString;
    image: z.ZodType<File>;
  }>>
>;

export default function useAddProduct() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return useMutation({
    mutationFn: async (values: ProductFormValues) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", values.image);

      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      return res.json();
    },
  });
}
