import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetProduct(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/products/${id}`);
      return res.data;
    },
    select: (data) => data?.data
  });
}
