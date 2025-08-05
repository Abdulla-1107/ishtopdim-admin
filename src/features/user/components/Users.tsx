import React from "react";
import { Table, Button, message, Popconfirm, Tag } from "antd";
import { Link } from "react-router-dom";
import { useUsers } from "../service/useUser";
import { UserOutlined } from "@ant-design/icons";

type User = {
  id: string;
  fullName: string;
  phone: string;
  role: string;
};

type UsersProps = {
  data: {
    data: User[];
    isLoading?: boolean;
  };
};

const Users: React.FC<UsersProps> = ({ data }) => {
  const users = data?.data || [];
  const { deleteUser } = useUsers();

  const handleDelete = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        message.success("Foydalanuvchi o‘chirildi");
      },
      onError: () => {
        message.error("Xatolik yuz berdi");
      },
    });
  };

  const columns = [
    {
      title: "👤 Ismi",
      dataIndex: "fullName",
      key: "fullName",
      render: (_: any, item: User) => (
        <Link
          to={`/user/${item.id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          {item.fullName}
        </Link>
      ),
    },
    {
      title: "📞 Telefon",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => <span className="text-gray-700">{phone}</span>,
    },
    {
      title: "🎖 Roli",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color =
          role === "ADMIN" ? "red" : role === "MODERATOR" ? "blue" : "green";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "⚙️ Amallar",
      key: "action",
      render: (_: any, item: User) => (
        <Popconfirm
          title="Foydalanuvchini o‘chirishni istaysizmi?"
          onConfirm={() => handleDelete(item.id)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button
            danger
            size="small"
            loading={deleteUser.isPending && deleteUser.variables === item.id}
          >
            O‘chirish
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UserOutlined className="text-blue-500 text-3xl" />
            Foydalanuvchilar roʻyxati
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            loading={data?.isLoading}
            bordered
            scroll={{ x: true }}
            locale={{
              emptyText: data?.isLoading
                ? "⏳ Yuklanmoqda..."
                : "📭 Foydalanuvchilar topilmadi",
            }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Users);
