import React from "react";
import { IParams, useUsers } from "../service/useUser";
import { useParamsHook } from "../../../shared/hooks/useParamsHook";
import Users from "../components/Users";

const User = () => {
  const { getUsers } = useUsers();
  const { getParam } = useParamsHook();

  const page = getParam("page") || "1";
  const search = getParam("search") || "";

  const query: IParams = { role: "user", page, search };
  const { data, isLoading, isError } = getUsers(query);

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Xatolik yuz berdi. Foydalanuvchilarni olishda muammo bor.
      </div>
    );
  }

  return (
    <div className="p-4">
      <Users
        data={{
          data: data?.data ?? [],
          isLoading,
        }}
      />
    </div>
  );
};

export default React.memo(User);
