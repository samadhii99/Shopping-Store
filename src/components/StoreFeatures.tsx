import React from "react";
import { Row, Col } from "antd";
import {
  ShoppingOutlined,
  GlobalOutlined,
  CarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface StoreFeaturesProps {
  isDarkMode: boolean;
}

const StoreFeatures: React.FC<StoreFeaturesProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShoppingOutlined className="text-4xl" />,
      title: t("store_features.comprehensive_selection.title"),
      description: t("store_features.comprehensive_selection.description"),
    },
    {
      icon: <CarOutlined className="text-4xl" />,
      title: t("store_features.delivery.title"),
      description: t("store_features.delivery.description"),
    },
    {
      icon: <CustomerServiceOutlined className="text-4xl" />,
      title: t("store_features.support.title"),
      description: t("store_features.support.description"),
    },
    {
      icon: <GlobalOutlined className="text-4xl" />,
      title: t("store_features.exchange.title"),
      description: t("store_features.exchange.description"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Row justify="center" gutter={[24, 24]} className="w-full">
        {features.map((feature, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={6}
            className="flex justify-center"
          >
            <div
              className={`
              text-center max-w-xs p-6 rounded-lg
              ${
                isDarkMode
                  ? "bg-dark-primary-50 text-dark-primary-800 hover:bg-dark-primary-100"
                  : "bg-primary-50 text-primary-800 hover:bg-primary-100"
              } transition-all duration-300 ease-in-out
            `}
            >
              <div
                className={`
                mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full
                ${
                  isDarkMode
                    ? "bg-dark-primary-100 text-dark-primary-600"
                    : "bg-primary-100 text-primary-600"
                }
              `}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70">{feature.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StoreFeatures;
