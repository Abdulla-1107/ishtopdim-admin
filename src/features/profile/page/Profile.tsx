import React from "react";
import { useUsers } from "../../user/service/useUser";
import {
  UserOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import avatar from "../../../assets/user.jpg";

const Profile: React.FC = () => {
  const { getMe } = useUsers();
  const { data, isLoading, isError } = getMe;

  if (isLoading) {
    return <div className="p-6 text-lg text-gray-600">⏳ Yuklanmoqda...</div>;
  }

  if (isError || !data?.data) {
    return (
      <div className="p-6 text-red-600 text-lg">
        ❌ Profil ma'lumotlarini olishda xatolik yuz berdi.
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <img
            src={avatar}
            alt={avatar}
            className="w-40 h-40 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <UserOutlined className="text-blue-500" />
              {user.fullName}
            </h2>

            <div className="text-gray-700 space-y-3 text-lg">
              <p className="flex items-center gap-2">
                <PhoneOutlined className="text-gray-500" />
                <span className="font-medium">Telefon:</span> {user.phone}
              </p>

              <p className="flex items-center gap-2">
                <SafetyCertificateOutlined className="text-gray-500" />
                <span className="font-medium">Rol:</span>{" "}
                <span className="uppercase font-semibold">{user.role}</span>
              </p>

              <p className="flex items-center gap-2">
                <CalendarOutlined className="text-gray-500" />
                <span className="font-medium">Ro'yxatdan o'tgan:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString("uz-UZ", {
                 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
