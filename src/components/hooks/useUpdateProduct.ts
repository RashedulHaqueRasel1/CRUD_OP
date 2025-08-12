import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type UpdateProductPayload = {
  name: string;
  description: string;
  price: string;
  image?: File;
};

export default function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  return useMutation({
    mutationFn: async (data: UpdateProductPayload) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await axios.put(
        `${baseUrl}/products/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}
