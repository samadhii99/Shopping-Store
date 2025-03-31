import React, { useState, useRef } from "react";
import { Form, Input, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onFinish = (values: LoginFormValues) => {
    if (!captchaToken) {
      message.error(
        t("login.captcha_required", "Please complete the reCAPTCHA")
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login form values:", values);
      console.log("reCAPTCHA token:", captchaToken);
      message.success(t("login.success_message", "Login successful!"));
      setLoading(false);
      // Here you would typically redirect to home page or dashboard
      // using navigation from your router
    }, 1500);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
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
          {t("login.title", "Login")}
        </h1>
        <p
          className={`mt-2 
            ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
        >
          {t("login.subtitle", "Sign in to your account")}
        </p>
      </div>

      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ rememberMe: true }}
      >
        <Form.Item
          name="email"
          label={t("login.email_label", "Email")}
          required={false}
          rules={[
            {
              required: true,
              message: t("login.email_required", "Please enter your email"),
            },
            {
              type: "email",
              message: t("login.email_invalid", "Please enter a valid email"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t("login.email_placeholder", "Enter your email")}
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
          label={t("login.password_label", "Password")}
          required={false}
          rules={[
            {
              required: true,
              message: t(
                "login.password_required",
                "Please enter your password"
              ),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t("login.password_placeholder", "Enter your password")}
            className={`p-2 
              ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-4">
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox
              className={`
                ${isDarkMode ? "text-dark-primary-600" : "text-primary-600"}`}
            >
              {t("login.remember_me", "Remember me")}
            </Checkbox>
          </Form.Item>

          <Link
            to="/forgot-password"
            className={`text-sm 
              ${
                isDarkMode
                  ? "text-dark-primary-600 hover:text-dark-primary-700"
                  : "text-primary-600 hover:text-primary-700"
              }`}
          >
            {t("login.forgot_password", "Forgot password?")}
          </Link>
        </div>

        {/* reCAPTCHA */}
        <div className="mb-4 flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            theme={isDarkMode ? "dark" : "light"}
          />
        </div>

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
            disabled={loading || !captchaToken}
          >
            {loading
              ? t("login.logging_in", "Logging in...")
              : t("login.login_button", "Login")}
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <p
            className={`
              ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
          >
            {t("login.no_account", "Don't have an account?")}{" "}
            <Link
              className={`font-medium 
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                }`}
              to="/signup"
            >
              {t("login.signup_link", "Sign up")}
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
