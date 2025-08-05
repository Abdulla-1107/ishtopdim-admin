import React from "react";
import { useParams } from "react-router-dom";
import avatar from "../../../assets/user.jpg";
import { useUsers } from "../service/useUser";
import {
  UserOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Table, Tag } from "antd";

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const { getOneUser } = useUsers();

  const { data: user, isLoading, isError } = getOneUser(id as string);
  console.log(user);

  if (isLoading) {
    return (
      <div className="p-6 text-lg text-gray-600">
        ⏳ Ma'lumotlar yuklanmoqda...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6 text-red-600 text-lg">❌ Foydalanuvchi topilmadi</div>
    );
  }

  const userData = user.data;

  const announcementColumns = [
    {
      title: "Sarlavha",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Narx",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="text-green-600">{price.toLocaleString()} so'm</span>
      ),
    },
    {
      title: "Tur",
      dataIndex: "type",
      key: "type",
      render: (type: string) =>
        type === "job" ? (
          <Tag color="blue">Ish</Tag>
        ) : (
          <Tag color="green">Xizmat</Tag>
        ),
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleDateString("uz-UZ", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={avatar}
            alt={userData.fullName}
            className="w-36 h-36 rounded-full object-cover border border-gray-300 shadow-sm"
          />

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <UserOutlined className="text-blue-500" />
              {userData.fullName}
            </h2>

            <div className="text-gray-700 space-y-2 text-base">
              <p className="flex items-center gap-2">
                <PhoneOutlined className="text-gray-500" />
                <span className="font-medium">Telefon:</span> {userData.phone}
              </p>
              <p className="flex items-center gap-2">
                <SafetyCertificateOutlined className="text-gray-500" />
                <span className="font-medium">Rol:</span> {userData.role}
              </p>
              <p className="flex items-center gap-2">
                <CalendarOutlined className="text-gray-500" />
                <span className="font-medium">Ro'yxatdan o'tgan:</span>{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <NotificationOutlined className="text-gray-500" />
                <span className="font-medium">E'lonlar soni:</span>{" "}
                {userData.announcements?.length ?? 0} ta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* E'lonlar jadvali */}
      {userData.announcements?.length ? (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Foydalanuvchining e'lonlari
          </h3>

          <Table
            dataSource={userData.announcements}
            columns={announcementColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto text-center text-gray-500 mt-8">
          Bu foydalanuvchining hali e’loni mavjud emas.
        </div>
      )}
    </div>
  );
};

export default UserDetail;
