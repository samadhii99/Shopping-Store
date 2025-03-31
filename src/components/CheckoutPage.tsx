import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  Select,
  Divider,
  Steps,
  Radio,
  List,
  Row,
  Col,
  Alert,
} from "antd";
import {
  ShoppingOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;

type PaymentMethod = "creditCard" | "paypal" | "bankTransfer" | "cod";

interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
  saveInfo: boolean;
}

const CheckoutPage: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Calculate subtotal, shipping, tax, and total
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.salePrice * (item.quantity || 0),
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 1000 ? 0 : 150; // Free shipping for orders > 1000
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + shipping + tax;

  const handleNextStep = async () => {
    try {
      if (currentStep === 0) {
        // Validate shipping info
        await form.validateFields([
          "fullName",
          "email",
          "phone",
          "address1",
          "city",
          "state",
          "postalCode",
          "country",
        ]);
        setCurrentStep(1);
      } else if (currentStep === 1) {
        // Validate payment info
        const paymentMethod = form.getFieldValue("paymentMethod");
        if (paymentMethod === "creditCard") {
          await form.validateFields([
            "cardNumber",
            "cardName",
            "expiry",
            "cvv",
          ]);
        }
        setCurrentStep(2);
      } else if (currentStep === 2) {
        // Process order
        await processOrder();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const processOrder = async () => {
    setLoading(true);
    try {
      // Simulate API call for order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate random order number
      const generatedOrderNumber = `ORD-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setOrderNumber(generatedOrderNumber);
      setOrderComplete(true);

      // Clear cart after successful order
      cartItems.forEach((item) => removeFromCart(item.id));

      // Reset form
      form.resetFields();
    } catch (error) {
      console.error("Order processing failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnToHome = () => {
    navigate("/");
  };

  // Shipping information form
  const renderShippingForm = () => (
    <div className="my-6">
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDarkMode ? "text-dark-primary-600" : "text-primary-600"
        }`}
      >
        {t("checkout.shipping_info")}
      </h2>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="fullName"
            label={t("checkout.full_name")}
            rules={[
              { required: true, message: t("checkout.full_name_required") },
            ]}
          >
            <Input placeholder={t("checkout.full_name_placeholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            name="email"
            label={t("checkout.email")}
            rules={[
              { required: true, message: t("checkout.email_required") },
              { type: "email", message: t("checkout.email_invalid") },
            ]}
          >
            <Input placeholder={t("checkout.email_placeholder")} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            name="phone"
            label={t("checkout.phone")}
            rules={[{ required: true, message: t("checkout.phone_required") }]}
          >
            <Input placeholder={t("checkout.phone_placeholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address1"
            label={t("checkout.address1")}
            rules={[
              { required: true, message: t("checkout.address1_required") },
            ]}
          >
            <Input placeholder={t("checkout.address1_placeholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="address2" label={t("checkout.address2")}>
            <Input placeholder={t("checkout.address2_placeholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            name="city"
            label={t("checkout.city")}
            rules={[{ required: true, message: t("checkout.city_required") }]}
          >
            <Input placeholder={t("checkout.city_placeholder")} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            name="state"
            label={t("checkout.state")}
            rules={[{ required: true, message: t("checkout.state_required") }]}
          >
            <Input placeholder={t("checkout.state_placeholder")} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            name="postalCode"
            label={t("checkout.postal_code")}
            rules={[
              { required: true, message: t("checkout.postal_code_required") },
            ]}
          >
            <Input placeholder={t("checkout.postal_code_placeholder")} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            name="country"
            label={t("checkout.country")}
            rules={[
              { required: true, message: t("checkout.country_required") },
            ]}
          >
            <Select placeholder={t("checkout.country_placeholder")}>
              <Option value="srilanka">Sri Lanka</Option>
              <Option value="india">India</Option>
              <Option value="usa">United States</Option>
              <Option value="uk">United Kingdom</Option>
              <Option value="canada">Canada</Option>
              <Option value="australia">Australia</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

  // Payment method form
  const renderPaymentForm = () => (
    <div className="my-6">
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDarkMode ? "text-dark-primary-600" : "text-primary-600"
        }`}
      >
        {t("checkout.payment_method")}
      </h2>

      <Form.Item
        name="paymentMethod"
        rules={[
          { required: true, message: t("checkout.payment_method_required") },
        ]}
        initialValue="creditCard"
      >
        <Radio.Group className="w-full">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Radio.Button
                value="creditCard"
                className="w-full h-auto p-4 flex items-start"
              >
                <div>
                  <div className="font-medium">{t("checkout.credit_card")}</div>
                  <div className="text-sm text-gray-500">
                    {t("checkout.credit_card_description")}
                  </div>
                </div>
              </Radio.Button>
            </Col>
            <Col span={24}>
              <Radio.Button
                value="paypal"
                className="w-full h-auto p-4 flex items-start"
              >
                <div>
                  <div className="font-medium">{t("checkout.paypal")}</div>
                  <div className="text-sm text-gray-500">
                    {t("checkout.paypal_description")}
                  </div>
                </div>
              </Radio.Button>
            </Col>
            <Col span={24}>
              <Radio.Button
                value="bankTransfer"
                className="w-full h-auto p-4 flex items-start"
              >
                <div>
                  <div className="font-medium">
                    {t("checkout.bank_transfer")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("checkout.bank_transfer_description")}
                  </div>
                </div>
              </Radio.Button>
            </Col>
            <Col span={24}>
              <Radio.Button
                value="cod"
                className="w-full h-auto p-4 flex items-start"
              >
                <div>
                  <div className="font-medium">
                    {t("checkout.cash_on_delivery")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("checkout.cash_on_delivery_description")}
                  </div>
                </div>
              </Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>

      {form.getFieldValue("paymentMethod") === "creditCard" && (
        <div className="mt-6 p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-4">
            {t("checkout.card_details")}
          </h3>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="cardNumber"
                label={t("checkout.card_number")}
                rules={[
                  {
                    required: true,
                    message: t("checkout.card_number_required"),
                  },
                ]}
              >
                <Input placeholder="XXXX XXXX XXXX XXXX" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="cardName"
                label={t("checkout.card_name")}
                rules={[
                  { required: true, message: t("checkout.card_name_required") },
                ]}
              >
                <Input placeholder={t("checkout.card_name_placeholder")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                name="expiry"
                label={t("checkout.expiry_date")}
                rules={[
                  {
                    required: true,
                    message: t("checkout.expiry_date_required"),
                  },
                ]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                name="cvv"
                label={t("checkout.cvv")}
                rules={[
                  { required: true, message: t("checkout.cvv_required") },
                ]}
              >
                <Input placeholder="XXX" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      )}

      <Form.Item name="saveInfo" valuePropName="checked" className="mt-4">
        <Radio>{t("checkout.save_payment_info")}</Radio>
      </Form.Item>
    </div>
  );

  // Order review component
  const renderOrderReview = () => (
    <div className="my-6">
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDarkMode ? "text-dark-primary-600" : "text-primary-600"
        }`}
      >
        {t("checkout.order_review")}
      </h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">{t("checkout.shipping_address")}</h3>
        <div className="p-4 bg-gray-100 rounded-md">
          <p>{form.getFieldValue("fullName")}</p>
          <p>{form.getFieldValue("address1")}</p>
          {form.getFieldValue("address2") && (
            <p>{form.getFieldValue("address2")}</p>
          )}
          <p>
            {form.getFieldValue("city")}, {form.getFieldValue("state")}{" "}
            {form.getFieldValue("postalCode")}
          </p>
          <p>{form.getFieldValue("country")}</p>
          <p>{form.getFieldValue("phone")}</p>
          <p>{form.getFieldValue("email")}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">{t("checkout.payment_method")}</h3>
        <div className="p-4 bg-gray-100 rounded-md">
          {form.getFieldValue("paymentMethod") === "creditCard" && (
            <p>
              {t("checkout.credit_card")} (**** **** ****{" "}
              {form.getFieldValue("cardNumber")?.slice(-4)})
            </p>
          )}
          {form.getFieldValue("paymentMethod") === "paypal" && (
            <p>{t("checkout.paypal")}</p>
          )}
          {form.getFieldValue("paymentMethod") === "bankTransfer" && (
            <p>{t("checkout.bank_transfer")}</p>
          )}
          {form.getFieldValue("paymentMethod") === "cod" && (
            <p>{t("checkout.cash_on_delivery")}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">{t("checkout.order_items")}</h3>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <div className="flex w-full">
                <div className="w-16 h-16 mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">{item.name}</h4>
                  {item.selectedColor && (
                    <p className="text-sm text-gray-500">
                      {t("cart.color")}: {item.selectedColor}
                    </p>
                  )}
                  <p className="text-sm">
                    {item.quantity} x {t("cart.price")}{" "}
                    {item.salePrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {t("cart.price")}{" "}
                    {(item.salePrice * (item.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Alert
        message={t("checkout.order_confirmation_message")}
        type="info"
        showIcon
        className="mb-6"
      />
    </div>
  );

  // Order confirmation component
  const renderOrderConfirmation = () => (
    <div className="my-12 text-center">
      <CheckCircleOutlined
        className={`text-6xl ${
          isDarkMode ? "text-dark-primary-600" : "text-green-500"
        } mb-4`}
      />
      <h2 className="text-2xl font-semibold mb-2">
        {t("checkout.order_placed")}
      </h2>
      <p className="text-gray-500 mb-6">
        {t("checkout.order_number")}: {orderNumber}
      </p>

      <div className="max-w-md mx-auto p-6 border rounded-md mb-8">
        <h3 className="font-medium mb-4">{t("checkout.order_details")}</h3>
        <div className="flex justify-between mb-2">
          <span>{t("checkout.subtotal")}:</span>
          <span>
            {t("cart.price")} {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t("checkout.shipping")}:</span>
          <span>
            {shipping === 0
              ? t("checkout.free")
              : `${t("cart.price")} ${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t("checkout.tax")}:</span>
          <span>
            {t("cart.price")} {tax.toFixed(2)}
          </span>
        </div>
        <Divider />
        <div className="flex justify-between font-semibold">
          <span>{t("checkout.total")}:</span>
          <span>
            {t("cart.price")} {total.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="mb-6">
        {t("checkout.confirmation_email_sent")} {form.getFieldValue("email")}
      </p>

      <Button
        type="button"
        onClick={handleReturnToHome}
        className={`py-2 px-6 ${
          isDarkMode
            ? "bg-dark-primary-500 hover:bg-dark-primary-600"
            : "bg-primary-500 hover:bg-primary-600"
        } text-white transition-colors`}
      >
        {t("checkout.continue_shopping")}
      </Button>
    </div>
  );

  // Order summary component
  const OrderSummary = () => (
    <div
      className={`p-6 rounded-lg ${
        isDarkMode ? "bg-dark-primary-50" : "bg-gray-50"
      } sticky top-6`}
    >
      <h2 className="text-xl font-semibold mb-4">
        {t("checkout.order_summary")}
      </h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex">
            <div className="w-16 h-16 mr-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {t("cart.price")}{" "}
                {(item.salePrice * (item.quantity || 0)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>{t("checkout.subtotal")}:</span>
          <span>
            {t("cart.price")} {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("checkout.shipping")}:</span>
          <span>
            {shipping === 0
              ? t("checkout.free")
              : `${t("cart.price")} ${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("checkout.tax")} (18%):</span>
          <span>
            {t("cart.price")} {tax.toFixed(2)}
          </span>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>{t("checkout.total")}:</span>
        <span>
          {t("cart.price")} {total.toFixed(2)}
        </span>
      </div>

      {shipping === 0 && (
        <Alert
          message={t("checkout.free_shipping_message")}
          type="success"
          showIcon
          className="mb-4"
        />
      )}

      {currentStep < 3 && (
        <>
          <Button
            type="button"
            onClick={handleNextStep}
            className={`w-full py-2 mb-2 ${
              isDarkMode
                ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                : "bg-primary-500 hover:bg-primary-600"
            } text-white transition-colors ${loading ? "opacity-70" : ""}`}
            disabled={loading}
          >
            {loading && (
              <span className="mr-2 inline-block">
                {/* You can use a simple CSS spinner or an SVG */}
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
            {currentStep === 2
              ? t("checkout.place_order")
              : t("checkout.continue")}
          </Button>

          {currentStep > 0 && (
            <Button
              type="button"
              onClick={handlePrevStep}
              className="w-full py-2"
              variant="outline"
              disabled={loading}
            >
              {t("checkout.back")}
            </Button>
          )}
        </>
      )}
    </div>
  );

  // If cart is empty, redirect to home
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <Content
        className={`p-6 min-h-screen ${
          isDarkMode ? "bg-dark-background" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center py-12">
          <ShoppingOutlined className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            {t("checkout.empty_cart")}
          </h2>
          <p className="text-gray-500 mb-6">{t("checkout.add_items")}</p>
          <Button
            type="button"
            onClick={handleReturnToHome}
            className={`py-2 px-6 ${
              isDarkMode
                ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                : "bg-primary-500 hover:bg-primary-600"
            } text-white transition-colors`}
          >
            {t("checkout.browse_products")}
          </Button>
        </div>
      </Content>
    );
  }

  return (
    <Content
      className={`p-6 min-h-screen ${
        isDarkMode ? "bg-dark-background" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-dark-primary-700" : "text-primary-700"
          }`}
        >
          {t("checkout.title")}
        </h1>

        {!orderComplete && (
          <Steps
            current={currentStep}
            className="mb-8"
            items={[
              {
                title: t("checkout.shipping"),
                icon: <ShoppingOutlined />,
              },
              {
                title: t("checkout.payment"),
                icon: <CreditCardOutlined />,
              },
              {
                title: t("checkout.review"),
                icon: <CheckCircleOutlined />,
              },
            ]}
          />
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            {orderComplete ? (
              renderOrderConfirmation()
            ) : (
              <Form
                form={form}
                layout="vertical"
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-dark-primary-50" : "bg-white"
                } shadow-sm`}
              >
                {currentStep === 0 && renderShippingForm()}
                {currentStep === 1 && renderPaymentForm()}
                {currentStep === 2 && renderOrderReview()}
              </Form>
            )}
          </div>

          {!orderComplete && (
            <div className="md:w-96">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

export default CheckoutPage;
