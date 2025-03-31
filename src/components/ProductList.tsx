import React, { useState } from "react";
import { Card, Tag, Tooltip } from "antd";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import { useTranslation } from "react-i18next";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    brand: "Envogue",
    salePrice: 3250.0,
    installmentPrice: 1083.33,
    image: "/images/products/tshirt.jpg",
    colors: ["White"],
    inStock: false,
    category: "Casual",
  },
  {
    id: 2,
    name: "Denim Jacket",
    brand: "Envogue",
    salePrice: 9750.0,
    installmentPrice: 3250.0,
    image: "/images/products/denim-jacket.jpg",
    colors: ["Black", "White"],
    inStock: true,
    category: "Casual",
  },
  {
    id: 3,
    name: "Sneakers",
    brand: "Envogue",
    salePrice: 8750.0,
    installmentPrice: 2916.67,
    image: "/images/products/sneaker.jpg",
    colors: ["Black", "Blue"],
    inStock: true,
    category: "Casual",
  },
  {
    id: 4,
    name: "Backpack",
    brand: "Envogue",
    salePrice: 6750.0,
    installmentPrice: 2250.0,
    image: "/images/products/backpack.jpg",
    colors: ["Black", "Purple"],
    inStock: false,
    category: "Formal",
  },
  {
    id: 5,
    name: "Hoodie",
    brand: "Envogue",
    salePrice: 5625.0,
    installmentPrice: 1875.0,
    image: "/images/products/hoodie.jpg",
    colors: ["Brown"],
    inStock: true,
    category: "Formal",
  },
  {
    id: 6,
    name: "Running Shoes",
    brand: "Envogue",
    salePrice: 11250.0,
    installmentPrice: 3750.0,
    image: "/images/products/running shoes.jpg",
    colors: ["Brown", "Maroon"],
    inStock: true,
    category: "Formal",
  },
  {
    id: 7,
    name: "Leather Wallet",
    brand: "Envogue",
    salePrice: 4500.0,
    installmentPrice: 1500.0,
    image: "/images/products/wallet.jpg",
    colors: ["White"],
    inStock: false,
    category: "Casual",
  },
  {
    id: 8,
    name: "Sunglasses",
    brand: "Envogue",
    salePrice: 3125.0,
    installmentPrice: 1041.67,
    image: "/images/products/sunglasses.jpg",
    colors: ["Black", "Brown"],
    inStock: true,
    category: "Casual",
  },
  {
    id: 9,
    name: "Smartwatch",
    brand: "Envogue",
    salePrice: 14000.0,
    installmentPrice: 4666.67,
    image: "/images/products/Smartwatch.jpg",
    colors: ["Black", "Brown"],
    inStock: true,
    category: "Casual",
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    brand: "Envogue",
    salePrice: 6750.0,
    installmentPrice: 2250.0,
    image: "/images/products/earbuds.jpg",
    colors: ["Black", "Brown"],
    inStock: false,
    category: "Formal",
  },
  {
    id: 11,
    name: "Gym Bag",
    brand: "Envogue",
    salePrice: 5000.0,
    installmentPrice: 1666.67,
    image: "/images/products/gym-bag.jpg",
    colors: ["Brown"],
    inStock: true,
    category: "Formal",
  },
  {
    id: 12,
    name: "Casual Watch",
    brand: "Envogue",
    salePrice: 8125.0,
    installmentPrice: 2708.33,
    image: "/images/products/casual-watch.jpg",
    colors: ["Brown", "Maroon"],
    inStock: true,
    category: "Formal",
  },
  {
    id: 13,
    name: "Beanie",
    brand: "Envogue",
    salePrice: 2500.0,
    installmentPrice: 833.33,
    image: "/images/products/beanie.jpg",
    colors: ["Black", "Brown"],
    inStock: true,
    category: "Casual",
  },
  {
    id: 14,
    name: "Laptop Sleeve",
    brand: "Envogue",
    salePrice: 2000.0,
    installmentPrice: 666.67,
    image: "/images/products/laptop-sleeve.jpg",
    colors: ["Black", "Brown"],
    inStock: false,
    category: "Formal",
  },
  {
    id: 15,
    name: "Water Bottle",
    brand: "Envogue",
    salePrice: 2000.0,
    installmentPrice: 666.67,
    image: "/images/products/water-bottle.jpg",
    colors: ["Brown"],
    inStock: true,
    category: "Formal",
  },
  {
    id: 16,
    name: "Leather Belt",
    brand: "Envogue",
    salePrice: 3250.0,
    installmentPrice: 1083.33,
    image: "/images/products/leather-belt.jpg",
    colors: ["Brown", "Maroon"],
    inStock: true,
    category: "Formal",
  }, // ... rest of the products from the original array
];

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState<{
    [key: number]: string;
  }>({});

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const handleAddToCart = (product: Product) => {
    // Automatically select the first color if no color is selected
    const color =
      selectedColors[product.id] ||
      (product.colors.length > 0 ? product.colors[0] : undefined);

    if (color) {
      addToCart({
        ...product,
        selectedColor: color,
        quantity: 1, // Default quantity
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialProducts.map((product) => (
          <Card
            key={product.id}
            hoverable
            cover={
              <div className="relative">
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-64 w-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    {t("product.sold_out")}
                  </div>
                )}
              </div>
            }
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">{product.name}</span>
                <span className="text-lg font-bold text-primary-600">
                  Rs {product.salePrice.toLocaleString()}
                </span>
              </div>

              <div className="text-sm text-gray-500">{product.brand}</div>

              <div className="text-xs text-gray-500 flex items-center">
                {t("product.installment")} <span className="mx-1"></span>
                <strong>Rs {product.installmentPrice.toLocaleString()}</strong>
                <span className="mx-1"></span> with
                <img
                  src="/images/products/qq.png"
                  alt="Koko Logo"
                  className="h-4 ml-2"
                />
              </div>

              <div className="flex items-center space-x-2 mt-2">
                {product.colors.map((color) => (
                  <Tooltip key={color} title={color}>
                    <button
                      onClick={() => handleColorSelect(product.id, color)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColors[product.id] === color
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "white"
                            ? "white"
                            : color.toLowerCase() === "black"
                            ? "black"
                            : color.toLowerCase() === "brown"
                            ? "#8B4513"
                            : color.toLowerCase() === "maroon"
                            ? "#800000"
                            : "gray",
                      }}
                    />
                  </Tooltip>
                ))}
              </div>

              <div className="mt-2">
                {product.inStock ? (
                  <Tag color="green">{t("product.in_stock")}</Tag>
                ) : (
                  <Tag color="red">{t("product.sold_out")}</Tag>
                )}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className={`w-full py-2 rounded mt-2 ${
                  product.inStock
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("product.add_to_cart")}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
