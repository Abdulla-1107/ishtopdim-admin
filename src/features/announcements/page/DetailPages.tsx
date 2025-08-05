import React from "react";
import { useParams } from "react-router-dom";
import { useAnnouncements } from "../service/useAnnouncement";
import {
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams();
  const { getOneAnnouncement } = useAnnouncements();

  const {
    data: announcement,
    isLoading,
    isError,
  } = getOneAnnouncement(id as string);

  if (isLoading) {
    return (
      <div className="p-6 text-xl text-gray-600">
        ⏳ Ma'lumotlar yuklanmoqda...
      </div>
    );
  }

  if (isError || !announcement?.data) {
    return (
      <div className="p-6 text-red-600 text-xl">
        ❌ Eʼlon topilmadi yoki xatolik yuz berdi.
      </div>
    );
  }

  const data = announcement.data;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-10">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
            <InfoCircleOutlined className="text-blue-600 text-4xl" />
            {data.title}
          </h1>
          <p className="text-lg text-gray-600">{data.description}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg text-gray-800">
          <div className="flex items-center gap-3">
            <DollarOutlined className="text-green-600 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">Narx</div>
              <div className="text-green-700 font-bold text-xl">
                {data.price.toLocaleString()} so'm
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tag color={data.type === "job" ? "blue" : "green"} className="text-base px-4 py-1">
              {data.type === "job" ? "Ish" : "Xizmat"}
            </Tag>
          </div>

          <div className="flex items-center gap-3">
            <EnvironmentOutlined className="text-red-500 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">Joylashuv</div>
              <div className="font-semibold">
                Shahar : Toshkent, Tuman: {data.district}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarOutlined className="text-gray-500 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">E'lon berilgan sana</div>
              <div className="font-semibold">
                 {new Date(announcement?.data?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">E’lon egasi</h2>

          <div className="flex items-center gap-6 text-lg">
            <UserOutlined className="text-purple-500 text-3xl" />
            <div>
              <div className="font-bold text-gray-800">{data.user?.fullName}</div>
              <div className="flex items-center gap-2 text-gray-600 text-base">
                <PhoneOutlined />
                {data.user?.phone}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Roʻyxatdan oʻtgan:{" "}
                {new Date(data.user?.createdAt).toLocaleDateString("uz-UZ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnnouncementDetail);
