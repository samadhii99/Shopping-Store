import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC<{ isDarkMode: boolean }> = ({
  isDarkMode,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: { email: string }) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset email sent to:", values.email);
      message.success(t("forgot_password.email_sent"));
      setLoading(false);
      setEmailSent(true);
      // In a real application, you'd make an API call to send the reset email
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
          {t("forgot_password.title", "Forgot Password")}
        </h1>
        <p
          className={`mt-2 
            ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
        >
          {t(
            "forgot_password.subtitle",
            "Enter your email to reset your password"
          )}
        </p>
      </div>

      {!emailSent ? (
        <Form
          form={form}
          name="forgotPassword"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label={t("forgot_password.email_label", "Email")}
            required={false}
            rules={[
              {
                required: true,
                message: t(
                  "forgot_password.email_required",
                  "Please enter your email"
                ),
              },
              {
                type: "email",
                message: t(
                  "forgot_password.email_invalid",
                  "Please enter a valid email"
                ),
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t(
                "forgot_password.email_placeholder",
                "Enter your email"
              )}
              className={`p-2 
                ${
                  isDarkMode
                    ? "bg-dark-primary-100 border-dark-primary-200"
                    : "bg-white border-primary-200"
                }`}
            />
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
              {loading
                ? t("forgot_password.sending", "Sending...")
                : t("forgot_password.reset_button", "Reset Password")}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="text-center">
          <div
            className={`p-4 mb-4 rounded-md 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 text-dark-primary-700"
                  : "bg-primary-100 text-primary-700"
              }`}
          >
            {t(
              "forgot_password.check_email",
              "Please check your email for password reset instructions."
            )}
          </div>
          <Button
            onClick={() => setEmailSent(false)}
            className={`mt-4 
              ${
                isDarkMode
                  ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                  : "bg-primary-500 hover:bg-primary-600"
              } 
              text-white transition-colors`}
          >
            {t("forgot_password.try_again", "Try another email")}
          </Button>
        </div>
      )}

      <div className="text-center mt-6">
        <p
          className={`
            ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
        >
          {t("forgot_password.remember_password", "Remember your password?")}{" "}
          <Link
            to="/login"
            className={`font-medium 
              ${
                isDarkMode
                  ? "text-dark-primary-600 hover:text-dark-primary-700"
                  : "text-primary-600 hover:text-primary-700"
              }`}
          >
            {t("forgot_password.login_link", "Login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
