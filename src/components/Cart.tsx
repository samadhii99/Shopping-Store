import React from "react";
import { Layout, Row, Col, Button, Drawer } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Add this
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.salePrice * (item.quantity || 0), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    // Close the cart drawer
    setIsCartOpen(false);
    // Navigate to checkout page
    navigate("/checkout");
  };

  return (
    <Drawer
      title={t("cart.title", "Shopping Cart")}
      placement="right"
      onClose={() => setIsCartOpen(false)}
      open={isCartOpen}
      width={400}
    >
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ShoppingCartOutlined className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500">
            {t("cart.empty", "Your cart is empty")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Scrollable Cart Items */}
          <div className="flex-grow overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <Row key={item.id} className="mb-4 pb-4 border-b last:border-b-0">
                <Col span={6}>
                  <img
                    src={item.image}
                    alt={item.name || "Product Image"}
                    className="w-full h-auto object-cover rounded"
                  />
                </Col>
                <Col span={18} className="pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500">
                        {t("cart.price", "Rs")} {item.salePrice.toFixed(2)}
                      </p>
                      {item.selectedColor && (
                        <p className="text-gray-500">
                          {t("cart.color", "Color")}: {item.selectedColor}
                        </p>
                      )}
                    </div>
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 0) - 1)
                      }
                    />
                    <span className="mx-2">{item.quantity || 0}</span>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 0) + 1)
                      }
                    />
                  </div>
                  <div className="text-right mt-2">
                    <strong>
                      {t("cart.price", "Rs")}
                      {(item.salePrice * (item.quantity || 0) || 0).toFixed(2)}
                    </strong>
                  </div>
                </Col>
              </Row>
            ))}
          </div>

          {/* Fixed Total and Buttons Section */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="text-lg">{t("cart.total", "Total")}:</span>
              <strong className="text-xl">
                {t("cart.price", "Rs")} {calculateTotal()}
              </strong>
            </div>
            <Button type="primary" block onClick={handleCheckout}>
              {t("cart.checkout", "Proceed to Checkout")}
            </Button>
            <Button block className="mt-2" onClick={() => setIsCartOpen(false)}>
              {t("cart.continue_shopping", "Continue Shopping")}
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default Cart;
