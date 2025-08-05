// 📁 src/entities/announcement/api/announcementService.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";

// 🔒 type faqat quyidagilardan biri bo'lishi kerak
export type AnnouncementType = "job" | "service" | "";

export interface AnnouncementQueryParams {
  type?: AnnouncementType;
  cityId?: string;
  district?: string;
  search?: string;
  userId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
}

export const useAnnouncements = () => {
  const queryClient = useQueryClient();

  const getAnnouncements = (params: AnnouncementQueryParams) =>
    useQuery({
      queryKey: ["announcements", params],
      queryFn: () =>
        api.get("/announcement", { params }).then((res) => res.data),
    });

  const getOneAnnouncement = (id: string) =>
    useQuery({
      queryKey: ["announcements", id],
      queryFn: () => api.get(`announcement/${id}`).then((res) => res),
      enabled: !!id, // faqat id mavjud bo‘lsa ishga tushadi
    });

  const deleteAnnouncement = useMutation({
    mutationFn: (id: string) =>
      api.delete(`announcement/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });

  return { getAnnouncements, deleteAnnouncement, getOneAnnouncement };
};
