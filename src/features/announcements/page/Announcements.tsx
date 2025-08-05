import React from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import { useAnnouncements } from "../service/useAnnouncement";
import AnnouncementTable from "../components/AnnouncementTable";

const Announcements = () => {
  const { getAnnouncements } = useAnnouncements();

  const { data, isLoading, isError } = getAnnouncements({
    page: "1",
    limit: "10",
    sortBy: "createdAt",
    order: "desc",
  });

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        ❌ Xatolik yuz berdi. Maʼlumotlarni olishda muammo.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileSearchOutlined className="text-blue-600 text-3xl" />
            E’lonlar ro‘yxati
          </h2>
        </div>

        <div className="overflow-x-auto">
          <AnnouncementTable data={data?.data || []} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Announcements);
