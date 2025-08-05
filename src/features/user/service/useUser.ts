import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";

export interface IParams {
  page?: string;
  limit?: string;
  search?: string;
  role: string;
}

export const useUsers = () => {
  const queryClient = useQueryClient();
  // 🔹 Barcha foydalanuvchilarni olish
  const getUsers = (params: IParams) =>
    useQuery({
      queryKey: ["users", params],
      queryFn: () => api.get("user", { params }).then((res) => res.data),
    });

  const getMe = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("user/me").then((res) => res.data),
  });

  // 🔹 Bitta foydalanuvchini ID orqali olish
  const getOneUser = (id: string) =>
    useQuery({
      queryKey: ["users", id],
      queryFn: () => api.get(`user/${id}`).then((res) => res.data),
      enabled: !!id, // faqat id mavjud bo‘lsa ishga tushadi
    });

  const deleteUser = useMutation({
    mutationFn: (id: string) =>
      api.delete(`user/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { getUsers, getOneUser, deleteUser, getMe };
};
