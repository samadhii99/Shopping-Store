import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ProceedToCheckoutButtonProps {
  isDarkMode: boolean;
}

const ProceedToCheckoutButton: React.FC<ProceedToCheckoutButtonProps> = ({
  isDarkMode,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Navigate to the checkout page
    navigate("/checkout");
  };

  return (
    <Button
      type="button"
      onClick={handleProceedToCheckout}
      className={`w-full py-2 mb-2 ${
        isDarkMode
          ? "bg-dark-primary-500 hover:bg-dark-primary-600"
          : "bg-primary-500 hover:bg-primary-600"
      } text-white transition-colors`}
    >
      {t("cart.proceed_to_checkout")}
    </Button>
  );
};

export default ProceedToCheckoutButton;
