import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useRoutes } from "react-router-dom";
import ProtectRoute from "../shared/components/ProtectRoute";
import MainLayout from "../layout/MainLayout";
import GuestRoute from "../shared/components/GuestRoute";
import Login from "../features/auth/pages/Login";
import User from "../features/user/page/User";
import DetailPage from "../features/user/page/DetailPage";
import Announcements from "../features/announcements/page/Announcements";
import Profile from "../features/profile/page/Profile";
import DetailPages from "../features/announcements/page/DetailPages";

const AppRouter = () => {
  const isAuth = !!useSelector((state: RootState) => state.auth.token);
  return useRoutes([
    {
      path: "/",
      element: (
        <ProtectRoute isAuth={isAuth}>
          <MainLayout />
        </ProtectRoute>
      ),
      children: [
        {
          path: "",
          element: <User />,
        },
        {
          path: "/announcement",
          element: <Announcements />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/user/:id",
          element: <DetailPage />,
        },
        {
          path: "/announcement/:id",
          element: <DetailPages />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <GuestRoute isAuth={isAuth}>
          <Login />
        </GuestRoute>
      ),
    },
  ]);
};

export default React.memo(AppRouter);
