import React, { useState } from "react";
import { Layout, Input, message } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Footer } = Layout;

interface AppFooterProps {
  isDarkMode?: boolean;
}

const AppFooter: React.FC<AppFooterProps> = ({ isDarkMode = false }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = () => {
    if (!email) {
      message.error(t("footer.newsletter.error_empty"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error(t("footer.newsletter.error_invalid"));
      return;
    }

    message.success(t("footer.newsletter.success"));
    setEmail("");
  };

  // Route mapping object to ensure correct routes
  const routeMapping: Record<string, string> = {
    "About Us": "/about",
    "Contact Us": "/contact",
    FAQs: "/faqs",
    CSR: "/csr",
    "Our Branches": "/branches",
    "Shipping Policy": "/shipping-policy",
    "Returns & Exchanges": "/returns-exchanges",
    "Terms & Conditions": "/terms-conditions",
    "Privacy Policy": "/privacy-policy",
  };

  // Explicitly type the translations and provide fallback
  const shopCategories: string[] = Array.isArray(
    t("footer.categories", { returnObjects: true })
  )
    ? (t("footer.categories", { returnObjects: true }) as string[])
    : [
        "WOMEN",
        "MEN",
        "KIDS",
        "MOTHER & BABY",
        "HOME & LIFESTYLE",
        "HEALTH & BEAUTY",
        "AVURUDU",
        "SALE",
      ];

  const informationLinks: string[] = Array.isArray(
    t("footer.information", { returnObjects: true })
  )
    ? (t("footer.information", { returnObjects: true }) as string[])
    : [
        "Shipping Policy",
        "Returns & Exchanges",
        "Terms & Conditions",
        "Privacy Policy",
      ];

  const companyLinks: string[] = Array.isArray(
    t("footer.company", { returnObjects: true })
  )
    ? (t("footer.company", { returnObjects: true }) as string[])
    : ["About Us", "Contact Us", "FAQs", "CSR", "Our Branches"];

  return (
    <Footer
      className={`
        ${
          isDarkMode
            ? "bg-dark-primary-50 text-dark-text"
            : "bg-primary-100 text-primary-900"
        } 
        py-12`}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Shop Column */}
        <div>
          <h3
            className={`text-xl font-semibold mb-4 
            ${isDarkMode ? "text-dark-primary-700" : "text-primary-700"}`}
          >
            {t("footer.shop_column_title", { defaultValue: "Shop" })}
          </h3>
          <div className="space-y-2">
            {shopCategories.map((item: string) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`block 
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                } 
                transition-colors`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Information Column */}
        <div>
          <h3
            className={`text-xl font-semibold mb-4 
            ${isDarkMode ? "text-dark-primary-700" : "text-primary-700"}`}
          >
            {t("footer.information_column_title", {
              defaultValue: "Information",
            })}
          </h3>
          <div className="space-y-2">
            {informationLinks.map((item: string) => (
              <Link
                key={item}
                to={
                  routeMapping[item] ||
                  `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`block 
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                } 
                transition-colors`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Company Column */}
        <div>
          <h3
            className={`text-xl font-semibold mb-4 
            ${isDarkMode ? "text-dark-primary-700" : "text-primary-700"}`}
          >
            {t("footer.company_column_title", { defaultValue: "Company" })}
          </h3>
          <div className="space-y-2">
            {companyLinks.map((item: string) => (
              <Link
                key={item}
                to={
                  routeMapping[item] ||
                  `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`block 
                ${
                  isDarkMode
                    ? "text-dark-primary-600 hover:text-dark-primary-700"
                    : "text-primary-600 hover:text-primary-700"
                } 
                transition-colors`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3
            className={`text-xl font-semibold mb-4 
            ${isDarkMode ? "text-dark-primary-700" : "text-primary-700"}`}
          >
            {t("footer.newsletter.title")}
          </h3>
          <p
            className={`mb-4 
            ${isDarkMode ? "text-dark-primary-600" : "text-primary-600"}`}
          >
            {t("footer.newsletter.subtitle")}
          </p>
          <div className="flex mb-4">
            <input
              className={`flex-grow px-3 py-2 border 
                ${
                  isDarkMode
                    ? "border-dark-primary-200 bg-dark-primary-100 text-dark-text focus:border-dark-primary-400"
                    : "border-primary-200 bg-white text-primary-900 focus:border-primary-400"
                } 
                focus:outline-none`}
              placeholder={t("footer.newsletter.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleNewsletterSubmit()}
            />
            <button
              className={`
                ${
                  isDarkMode
                    ? "bg-dark-primary-500 hover:bg-dark-primary-600"
                    : "bg-primary-500 hover:bg-primary-600"
                } 
                text-white px-4 py-2 transition-colors`}
              onClick={handleNewsletterSubmit}
            >
              {t("footer.newsletter.submit")}
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="space-x-4">
            {[
              { Icon: FacebookOutlined, href: "https://facebook.com" },
              { Icon: InstagramOutlined, href: "https://instagram.com" },
              { Icon: TikTokOutlined, href: "https://tiktok.com" },
              { Icon: YoutubeOutlined, href: "https://youtube.com" },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl 
                  ${
                    isDarkMode
                      ? "text-dark-primary-600 hover:text-dark-primary-700"
                      : "text-primary-600 hover:text-primary-700"
                  } 
                  transition-colors`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className={`text-center mt-8 pt-4 border-t 
        ${isDarkMode ? "border-dark-primary-200" : "border-primary-200"}`}
      >
        <p
          className={`
          ${isDarkMode ? "text-dark-primary-500" : "text-primary-500"}`}
        >
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </Footer>
  );
};

export default AppFooter;
