import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Input, Dropdown, Menu, Badge, Switch } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItemCount, setIsCartOpen } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Language selection menu
  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => i18n.changeLanguage("en")}>
        {t("header.languages.english")}
      </Menu.Item>
      <Menu.Item key="si" onClick={() => i18n.changeLanguage("si")}>
        {t("header.languages.sinhala")}
      </Menu.Item>
      <Menu.Item key="ta" onClick={() => i18n.changeLanguage("ta")}>
        {t("header.languages.tamil")}
      </Menu.Item>
    </Menu>
  );

  // Categories dropdown menu
  const categoriesMenu = (
    <Menu>
      <Menu.SubMenu key="women" title={t("header.categories.women")}>
        <Menu.Item key="women-clothing">
          {t("header.categories.women_clothing")}
        </Menu.Item>
        <Menu.Item key="women-accessories">
          {t("header.categories.women_accessories")}
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="men" title={t("header.categories.men")}>
        <Menu.Item key="men-clothing">
          {t("header.categories.men_clothing")}
        </Menu.Item>
        <Menu.Item key="men-accessories">
          {t("header.categories.men_accessories")}
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="kids" title={t("header.categories.kids")}>
        <Menu.Item key="kids-clothing">
          {t("header.categories.kids_clothing")}
        </Menu.Item>
        <Menu.Item key="kids-toys">
          {t("header.categories.kids_toys")}
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="home-lifestyle">
        {t("header.categories.home_lifestyle")}
      </Menu.Item>
      <Menu.Item key="health-beauty">
        {t("header.categories.health_beauty")}
      </Menu.Item>
    </Menu>
  );

  // Account dropdown menu with routing
  const accountMenu = (
    <Menu>
      <Menu.Item
        key="login"
        icon={<LoginOutlined />}
        onClick={() => navigate("/login")}
      >
        {t("header.account.login")}
      </Menu.Item>
      <Menu.Item
        key="signup"
        icon={<UserAddOutlined />}
        onClick={() => navigate("/signup")}
      >
        {t("header.account.signup")}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="my-account" icon={<UserOutlined />}>
        {t("header.account.my_account")}
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className={`fixed top-0 left-0 right-0 z-50 flex flex-wrap md:flex-nowrap justify-between items-center p-4 
      ${
        isDarkMode
          ? "bg-dark-primary-50 text-dark-text border-dark-primary-100"
          : "bg-primary-50 text-primary-900 border-primary-100"
      }
      md:px-6 lg:px-8 
      shadow-subtle border-b`}
    >
      {/* Logo/Store Name - Centered on mobile, left on desktop */}
      <div className="w-full md:w-auto flex justify-center md:justify-start items-center mb-2 md:mb-0">
        <Link to="/">
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? "text-dark-primary-700" : "text-primary-700"
            } cursor-pointer`}
          >
            {t("header.store_name")}
          </h1>
        </Link>
      </div>

      {/* Search Bar with Categories Dropdown - Full width on mobile, flexible on desktop */}
      <div className="order-last md:order-none w-full md:flex-grow md:mx-4 md:max-w-xl relative mt-2 md:mt-0">
        <Input
          prefix={
            <Dropdown
              overlay={categoriesMenu}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <div className="flex items-center cursor-pointer pr-2 border-r mr-2">
                <AppstoreOutlined
                  className={`
                  ${
                    isDarkMode
                      ? "text-dark-primary-500 hover:text-dark-primary-600"
                      : "text-primary-500 hover:text-primary-600"
                  }`}
                />
              </div>
            </Dropdown>
          }
          suffix={
            <SearchOutlined
              className={`
              ${
                isDarkMode
                  ? "text-dark-primary-500 hover:text-dark-primary-600"
                  : "text-primary-500 hover:text-primary-600"
              }`}
            />
          }
          placeholder={t("header.search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full 
            ${
              isDarkMode
                ? "bg-dark-primary-100 border-dark-primary-200 text-dark-text focus:border-dark-primary-400 focus:ring-dark-primary-300"
                : "bg-white border-primary-200 text-primary-900 focus:border-primary-400 focus:ring-primary-300"
            }`}
        />
      </div>

      {/* Right Side Actions - Centered on mobile, right on desktop */}
      <div className="w-full md:w-auto flex justify-center md:justify-end items-center space-x-2 md:space-x-4">
        {/* Language Dropdown */}
        <Dropdown overlay={languageMenu} placement="bottomRight">
          <Button
            variant="ghost"
            className={`flex items-center 
              ${
                isDarkMode
                  ? "text-dark-primary-600 hover:text-dark-primary-700 hover:bg-dark-primary-100"
                  : "text-primary-600 hover:text-primary-700 hover:bg-primary-100"
              } 
              transition-colors`}
          >
            <GlobalOutlined className="mr-2" />
            {i18n.language.toUpperCase()}
          </Button>
        </Dropdown>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>

        {/* Account Dropdown */}
        <Dropdown overlay={accountMenu} placement="bottomRight">
          <Button
            variant="ghost"
            className={`flex items-center 
              ${
                isDarkMode
                  ? "text-dark-primary-600 hover:text-dark-primary-700 hover:bg-dark-primary-100"
                  : "text-primary-600 hover:text-primary-700 hover:bg-primary-100"
              } 
              transition-colors`}
          >
            <UserOutlined className="mr-2" />
            {t("header.my_account")}
          </Button>
        </Dropdown>

        {/* Cart */}
        <Badge count={cartItemCount} showZero>
          <Button
            variant="outline"
            className={`flex items-center 
              ${
                isDarkMode
                  ? "text-dark-primary-600 border-dark-primary-200 hover:bg-dark-primary-100 hover:text-dark-primary-700"
                  : "text-primary-600 border-primary-200 hover:bg-primary-100 hover:text-primary-700"
              } 
              transition-colors`}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCartOutlined className="mr-2" />
            {t("header.cart")}
          </Button>
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderComponent;
