"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllProducts = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/products`);
      return res.data;
    },
  });
};
