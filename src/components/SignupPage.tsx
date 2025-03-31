import React, { useState } from "react";
import { Form, Input, Checkbox, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface SignupFormValues {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const SignupPage: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: SignupFormValues) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Signup form values:", values);
      message.success(t("signup.success_message"));
      setLoading(false);
      // Here you would typically redirect to login page or home page
      // using navigation from your router
    }, 1500);
  };

  return (
    <div
      className={`w-full max-w-md mx-auto my-12 p-8 rounded-lg shadow-md 
        ${
          isDarkMode
            ? "bg-dark-primary-50 text-dark-text"
            : "bg-white text-primary-900"
        }`}
    >
      <div className="text-center mb-8">
        <h1
          className={`text-2xl font-bold 
            ${isDarkMode ? "text-dark-primary-700" : "text-primary-700"}`}
        >
          {t("signup.title")}
        </h1>
        <p
          className={`mt-2 
            ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
        >
          {t("signup.subtitle")}
        </p>
      </div>

      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label={t("signup.name_label")}
          required={false}
          rules={[
            {
              required: true,
              message: t("signup.name_required"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t("signup.name_placeholder")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("signup.email_label")}
          required={false}
          rules={[
            {
              required: true,
              message: t("signup.email_required"),
            },
            {
              type: "email",
              message: t("signup.email_invalid"),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder={t("signup.email_placeholder")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("signup.phone_label")}
          rules={[
            {
              pattern: /^\+?[0-9]{10,15}$/,
              message: t("signup.phone_invalid"),
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder={t("signup.phone_placeholder")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("signup.password_label")}
          required={false}
          rules={[
            {
              required: true,
              message: t("signup.password_required"),
            },
            {
              min: 8,
              message: t("signup.password_min_length"),
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t("signup.password_placeholder")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={t("signup.confirm_password_label")}
          required={false}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("signup.confirm_password_required"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("signup.passwords_not_match"))
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t("signup.confirm_password_placeholder")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <div className="flex justify-end mb-4">
          <Link
            to="/forgot-password"
            className={`text-sm 
              ${
                isDarkMode
                  ? "text-dark-primary-600 hover:text-dark-primary-700"
                  : "text-primary-600 hover:text-primary-700"
              }`}
          >
            {t("signup.forgot_password", "Forgot password?")}
          </Link>
        </div>

        <Form.Item
          name="agreeTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("signup.agree_terms_required"))),
            },
          ]}
        >
          <Checkbox
            className={`
              ${isDarkMode ? "text-dark-primary-600" : "text-primary-600"}`}
          >
            {t("signup.agree_terms_part1")}{" "}
            <a
              href="/terms"
              className={`
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                }`}
            >
              {t("signup.terms_link")}
            </a>{" "}
            {t("signup.and")}{" "}
            <a
              href="/privacy"
              className={`
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                }`}
            >
              {t("signup.privacy_link")}
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="submit"
            className={`w-full py-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                  : "bg-primary-500 hover:bg-primary-600"
              } 
              text-white transition-colors`}
            disabled={loading}
          >
            {loading ? t("signup.signing_up") : t("signup.signup_button")}
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <p
            className={`
              ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
          >
            {t("signup.have_account")}{" "}
            <Link
              className={`font-medium 
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                }`}
              to="/login"
            >
              {t("signup.login_link")}
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
