import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const key = "auth"

  const getMe = () => useQuery({
    queryKey: [key],
    queryFn: () => api.get("user/me").then((res) => res.data),
    retry: false
  });

  const login = useMutation({
    mutationFn: (body: any) => api.post("user/login", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    retry: 1
  });

  return { login, getMe };
};
