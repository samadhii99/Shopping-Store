import React, { useState } from "react";
import { Row, Col, Typography, Form, Input, Button, Card, message } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ContactUsPageProps {
  isDarkMode: boolean;
}

const ContactUsPage: React.FC<ContactUsPageProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      title: t("contact.info.phone.title", "Phone"),
      details: ["+94 11 234 5678", "+94 76 123 4567"],
    },
    {
      icon: <MailOutlined />,
      title: t("contact.info.email.title", "Email"),
      details: ["info@timelessstore.lk", "support@timelessstore.lk"],
    },
    {
      icon: <EnvironmentOutlined />,
      title: t("contact.info.address.title", "Address"),
      details: [
        t("contact.info.address.main", "123 Fashion Street,"),
        t("contact.info.address.city", "Colombo 03, Sri Lanka"),
      ],
    },
    {
      icon: <ClockCircleOutlined />,
      title: t("contact.info.hours.title", "Business Hours"),
      details: [
        t("contact.info.hours.weekdays", "Mon-Fri: 9:00 AM - 6:00 PM"),
        t("contact.info.hours.weekend", "Sat-Sun: 10:00 AM - 4:00 PM"),
      ],
    },
  ];

  const handleSubmit = (values: any) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success(
        t(
          "contact.form.success_message",
          "Thank you for your message! We'll get back to you soon."
        )
      );
      form.resetFields();
    }, 1500);
  };

  return (
    <div
      className={`container mx-auto px-4 py-12 mt-16 ${
        isDarkMode ? "text-dark-text" : "text-primary-900"
      }`}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <Typography.Title
          level={1}
          className={`${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          }`}
        >
          {t("contact.title", "Contact Us")}
        </Typography.Title>
        <Typography.Paragraph
          className={`${
            isDarkMode ? "text-dark-primary-600" : "text-primary-600"
          } text-lg max-w-2xl mx-auto`}
        >
          {t(
            "contact.subtitle",
            "Have questions, feedback, or need assistance? We're here to help! Choose the most convenient way to reach us below."
          )}
        </Typography.Paragraph>
      </div>

      {/* Contact Info Cards */}
      <Row gutter={[24, 24]} className="mb-12">
        {contactInfo.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              className={`h-full text-center ${
                isDarkMode
                  ? "bg-dark-primary-100 border-dark-primary-200"
                  : "bg-white border-primary-200"
              }`}
              bordered
            >
              <div
                className={`text-3xl mb-4 ${
                  isDarkMode ? "text-dark-primary-500" : "text-primary-500"
                }`}
              >
                {item.icon}
              </div>
              <Typography.Title
                level={4}
                className={`${
                  isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                }`}
              >
                {item.title}
              </Typography.Title>
              {item.details.map((detail, idx) => (
                <Typography.Paragraph
                  key={idx}
                  className={`${
                    isDarkMode ? "text-dark-primary-600" : "text-primary-600"
                  } mb-1`}
                >
                  {detail}
                </Typography.Paragraph>
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Map and Contact Form */}
      <Row gutter={[32, 32]}>
        {/* Map */}
        <Col xs={24} lg={12}>
          <Card
            className={`h-full ${
              isDarkMode
                ? "bg-dark-primary-100 border-dark-primary-200"
                : "bg-white border-primary-200"
            }`}
            title={
              <Typography.Title
                level={3}
                className={`${
                  isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                } mb-0`}
              >
                {t("contact.map.title", "Find Us")}
              </Typography.Title>
            }
          >
            <div className="h-[400px] relative overflow-hidden">
              {/* This is a placeholder for the map. 
                  In a real implementation, you'd use a component like Google Maps or Leaflet */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31736.17666771684!2d79.8336311611328!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591614537dc1%3A0x45c2650696848472!2sColombo%2003%2C%20Colombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1635774483386!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                  title="Store Location"
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col xs={24} lg={12}>
          <Card
            className={`h-full ${
              isDarkMode
                ? "bg-dark-primary-100 border-dark-primary-200"
                : "bg-white border-primary-200"
            }`}
            title={
              <Typography.Title
                level={3}
                className={`${
                  isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                } mb-0`}
              >
                {t("contact.form.title", "Send Us a Message")}
              </Typography.Title>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    label={t("contact.form.first_name", "First Name")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "contact.form.required",
                          "This field is required"
                        ),
                      },
                    ]}
                  >
                    <Input
                      className={`${
                        isDarkMode
                          ? "bg-dark-primary-50 border-dark-primary-300 text-dark-text"
                          : "bg-white border-primary-300 text-primary-900"
                      }`}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    label={t("contact.form.last_name", "Last Name")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "contact.form.required",
                          "This field is required"
                        ),
                      },
                    ]}
                  >
                    <Input
                      className={`${
                        isDarkMode
                          ? "bg-dark-primary-50 border-dark-primary-300 text-dark-text"
                          : "bg-white border-primary-300 text-primary-900"
                      }`}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label={t("contact.form.email", "Email Address")}
                rules={[
                  {
                    required: true,
                    message: t(
                      "contact.form.required",
                      "This field is required"
                    ),
                  },
                  {
                    type: "email",
                    message: t(
                      "contact.form.invalid_email",
                      "Please enter a valid email"
                    ),
                  },
                ]}
              >
                <Input
                  className={`${
                    isDarkMode
                      ? "bg-dark-primary-50 border-dark-primary-300 text-dark-text"
                      : "bg-white border-primary-300 text-primary-900"
                  }`}
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label={t("contact.form.subject", "Subject")}
                rules={[
                  {
                    required: true,
                    message: t(
                      "contact.form.required",
                      "This field is required"
                    ),
                  },
                ]}
              >
                <Input
                  className={`${
                    isDarkMode
                      ? "bg-dark-primary-50 border-dark-primary-300 text-dark-text"
                      : "bg-white border-primary-300 text-primary-900"
                  }`}
                />
              </Form.Item>

              <Form.Item
                name="message"
                label={t("contact.form.message", "Message")}
                rules={[
                  {
                    required: true,
                    message: t(
                      "contact.form.required",
                      "This field is required"
                    ),
                  },
                ]}
              >
                <Input.TextArea
                  rows={5}
                  className={`${
                    isDarkMode
                      ? "bg-dark-primary-50 border-dark-primary-300 text-dark-text"
                      : "bg-white border-primary-300 text-primary-900"
                  }`}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SendOutlined />}
                  className={`
                    ${
                      isDarkMode
                        ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                        : "bg-primary-500 hover:bg-primary-600"
                    }
                    text-white px-6 h-10
                  `}
                >
                  {t("contact.form.submit", "Send Message")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <div className="mt-16">
        <Typography.Title
          level={2}
          className={`${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          } text-center mb-8`}
        >
          {t("contact.faq.title", "Frequently Asked Questions")}
        </Typography.Title>

        <Row gutter={[24, 24]}>
          {[
            {
              question: t(
                "contact.faq.shipping.question",
                "How long does shipping take?"
              ),
              answer: t(
                "contact.faq.shipping.answer",
                "Standard shipping within Sri Lanka takes 2-4 business days. International shipping typically takes 7-14 business days depending on the destination."
              ),
            },
            {
              question: t(
                "contact.faq.returns.question",
                "What is your return policy?"
              ),
              answer: t(
                "contact.faq.returns.answer",
                "We offer a 30-day return policy for unworn items in original condition with tags attached. Please see our Returns & Exchanges page for full details."
              ),
            },
            {
              question: t(
                "contact.faq.payment.question",
                "What payment methods do you accept?"
              ),
              answer: t(
                "contact.faq.payment.answer",
                "We accept Visa, Mastercard, American Express, PayPal, and bank transfers. We also offer cash on delivery for orders within Colombo."
              ),
            },
            {
              question: t(
                "contact.faq.size.question",
                "How do I find my size?"
              ),
              answer: t(
                "contact.faq.size.answer",
                "Each product page includes detailed size information. You can also refer to our Size Guide for general measurements across different brands."
              ),
            },
          ].map((faq, index) => (
            <Col xs={24} md={12} key={index}>
              <Card
                className={`h-full ${
                  isDarkMode
                    ? "bg-dark-primary-100 border-dark-primary-200"
                    : "bg-white border-primary-200"
                }`}
                bordered
              >
                <Typography.Title
                  level={4}
                  className={`${
                    isDarkMode ? "text-dark-primary-700" : "text-primary-700"
                  }`}
                >
                  {faq.question}
                </Typography.Title>
                <Typography.Paragraph
                  className={`${
                    isDarkMode ? "text-dark-primary-600" : "text-primary-600"
                  } mb-0`}
                >
                  {faq.answer}
                </Typography.Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ContactUsPage;
