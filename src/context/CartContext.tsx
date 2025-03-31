import React, { createContext, useState, useContext, useCallback } from "react";
import { Product, CartItem } from "../types";
import { message } from "antd";
import { useTranslation } from "react-i18next";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setCartItems((currentItems) => {
        // Check if item already exists in cart
        const existingItemIndex = currentItems.findIndex(
          (i) => i.id === product.id
        );

        if (existingItemIndex > -1) {
          // If item exists, increase quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity:
              (updatedItems[existingItemIndex].quantity || 0) + quantity,
          };
          return updatedItems;
        }

        // If item doesn't exist, add new item
        const newItem: CartItem = {
          ...product,
          quantity,
          selectedColor:
            product.selectedColor ||
            (product.colors.length > 0 ? product.colors[0] : undefined),
        };

        message.success(
          t("cart.add_to_cart", "{{name}} added to cart", {
            name: product.name,
          })
        );
        return [...currentItems, newItem];
      });

      // Open cart when item is added
      setIsCartOpen(true);
    },
    [t]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
      message.success(t("cart.remove_from_cart", "Item removed from cart"));
    },
    [t]
  );

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity < 1) {
        // Remove item if quantity becomes 0
        removeFromCart(id);
      } else {
        setCartItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      }
    },
    [removeFromCart]
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
