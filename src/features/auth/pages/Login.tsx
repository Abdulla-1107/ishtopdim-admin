import React, { useState } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { useAuth } from "../service/useAuth";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth.slice";

type FieldType = {
  phone?: string;
  password?: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { isPending, isError } = login;

  const [showRoleError, setShowRoleError] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login.mutate(values, {
      onSuccess: (res) => {
        if (res.user?.role === "ADMIN") {
          dispatch(setToken(res.token));
        } else {
          setShowRoleError(true);
        }
      },
    });
  };

  return (
    <div className="w-full h-screen bg-base-bg grid place-items-center">
      <div className="max-w-[400px] w-full bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Tizimga kirish</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ phone: "+998" }}
        >
          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* Auth error */}
          {isError && (
            <div className="mb-2">
              <Alert message={"Phone or password is incorrect"} type="error" />
            </div>
          )}

          {/* Role error */}
          {showRoleError && (
            <div className="mb-4">
              <Alert
                message="Bu tizimga faqat ADMIN foydalanuvchilar kira oladi"
                type="error"
              />
            </div>
          )}

          <Form.Item style={{ margin: 0 }} label={null}>
            <Button
              loading={isPending}
              type="primary"
              className="w-full"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Login);
