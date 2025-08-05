import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { api } from "../../../shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type AnnouncementTableProps = {
  data: any[];
  loading: boolean;
};

const AnnouncementTable: React.FC<AnnouncementTableProps> = ({
  data,
  loading,
}) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAnnouncement,
    isPending,
    variables,
  } = useMutation({
    mutationFn: (id: string) =>
      api.delete(`announcement/${id}`).then((res) => res.data),
    onSuccess: () => {
      message.success("E’lon o‘chirildi");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: () => {
      message.error("Xatolik yuz berdi");
    },
  });

  const columns = [
    {
      title: "📌 Sarlavha",
      dataIndex: "title",
      key: "title",
      render: (text: string, item: any) => (
        <Link
          to={`/announcement/${item.id}`}
          className="text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },

    {
      title: "📝 Tavsif",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-gray-600">
          {text ? text.slice(0, 60) + "..." : "-"}
        </span>
      ),
    },
    {
      title: "💰 Narx",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="text-green-600 font-medium">
          {price.toLocaleString()} so'm
        </span>
      ),
    },
    {
      title: "🏙 Shahar",
      key: "city",
      render: (_: any, record: any) => (
        <span className="text-blue-600">{record.City?.name || "-"}</span>
      ),
    },
    {
      title: "📍 Tuman",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "👤 Foydalanuvchi",
      key: "user",
      render: (_: any, record: any) => (
        <div>
          <div className="font-medium text-gray-800">
            {record.user?.fullName}
          </div>
          <div className="text-gray-500 text-sm">{record.user?.phone}</div>
        </div>
      ),
    },
    // {
    //   title: "📂 Tur",
    //   dataIndex: "type",
    //   key: "type",
    //   render: (type: string) =>
    //     type === "job" ? (
    //       <Tag color="blue">Ish</Tag>
    //     ) : (
    //       <Tag color="green">Xizmat</Tag>
    //     ),
    // },
    {
      title: "📅 Sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span className="text-gray-500">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "⚙️ Amallar",
      key: "actions",
      render: (_: any, record: any) => (
        <Popconfirm
          title="E’lonni o‘chirmoqchimisiz?"
          onConfirm={() => deleteAnnouncement(record.id)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button
            danger
            size="small"
            loading={isPending && variables === record.id}
          >
            O‘chirish
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
      bordered
      className="shadow-sm rounded-lg"
      locale={{
        emptyText: loading ? "⏳ Yuklanmoqda..." : "📭 E’lonlar topilmadi",
      }}
    />
  );
};

export default AnnouncementTable;
