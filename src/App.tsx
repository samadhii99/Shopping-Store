import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, ConfigProvider, theme } from "antd";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AppFooter from "./components/AppFooter";
import StoreFeatures from "./components/StoreFeatures";
import HeaderComponent from "./components/HeaderComponent";
import TimelessCarousel from "./components/TimelessCarousel";
import AIChatbot from "./components/AIChatbot";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import AboutUsPage from "./components/AboutUsPage";
import ContactUsPage from "./components/ContactUsPage";

const { Content } = Layout;
const { darkAlgorithm, defaultAlgorithm } = theme;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: isDarkMode ? "#5E81F7" : "#3B82F6",
          colorBgBase: isDarkMode ? "#121826" : "#f0f9ff",
          colorTextBase: isDarkMode ? "#E0E6ED" : "#1E3A8A",
        },
      }}
    >
      <CartProvider>
        <Router>
          <Layout className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <HeaderComponent
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TimelessCarousel />
                    <Content
                      className={`p-6 ${
                        isDarkMode ? "bg-dark-background" : "bg-gray-50"
                      }`}
                    >
                      <ProductList />
                      <Cart />
                    </Content>
                    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden mt-16">
                      <img
                        src="/images/products/koko.webp"
                        alt="Koko"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <StoreFeatures isDarkMode={isDarkMode} />
                  </>
                }
              />

              <Route
                path="/login"
                element={
                  <Content
                    className={`p-6 pt-24 ${
                      isDarkMode ? "bg-dark-background" : "bg-gray-50"
                    }`}
                  >
                    <LoginPage isDarkMode={isDarkMode} />
                  </Content>
                }
              />

              <Route
                path="/signup"
                element={
                  <Content
                    className={`p-6 pt-24 ${
                      isDarkMode ? "bg-dark-background" : "bg-gray-50"
                    }`}
                  >
                    <SignupPage isDarkMode={isDarkMode} />
                  </Content>
                }
              />

              <Route
                path="/forgot-password"
                element={
                  <Content
                    className={`p-6 pt-24 ${
                      isDarkMode ? "bg-dark-background" : "bg-gray-50"
                    }`}
                  >
                    <ForgotPasswordPage isDarkMode={isDarkMode} />
                  </Content>
                }
              />

              <Route path="/product/:id" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={<CheckoutPage isDarkMode={isDarkMode} />}
              />

              {/* Routes for About Us and Contact Us pages */}
              <Route
                path="/about"
                element={
                  <Content
                    className={`${
                      isDarkMode ? "bg-dark-background" : "bg-gray-50"
                    }`}
                  >
                    <AboutUsPage isDarkMode={isDarkMode} />
                  </Content>
                }
              />

              <Route
                path="/contact"
                element={
                  <Content
                    className={`${
                      isDarkMode ? "bg-dark-background" : "bg-gray-50"
                    }`}
                  >
                    <ContactUsPage isDarkMode={isDarkMode} />
                  </Content>
                }
              />

              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <AppFooter isDarkMode={isDarkMode} />
            <AIChatbot />
          </Layout>
        </Router>
      </CartProvider>
    </ConfigProvider>
  );
};

export default App;
