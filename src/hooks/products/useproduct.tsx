import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";



export function useProducts() {
   return useQuery({
    queryKey: ["getproduct"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.products;
    },
  });
}
