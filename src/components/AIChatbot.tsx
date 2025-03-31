import React, { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Input, Button, Avatar } from "antd";
import { ShoppingOutlined, SendOutlined } from "@ant-design/icons";

// Import the product data
import { Product } from "../types";

// Predefined product data
const initialProducts: Product[] = [
  // ... (your existing product data array)
];

// Interface for chat messages
interface ChatMessage {
  id: string;
  type: "user" | "ai";

  content: string;
  timestamp: number;
}

const AIChatbot: React.FC = () => {
  // Translation hook
  const { t } = useTranslation();

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      content: t("chatbot.welcome"),
      timestamp: Date.now(),
    },
  ]);

  // Memoized product information for quick access
  const productInfo = useMemo(() => {
    const categories = Array.from(
      new Set(initialProducts.map((p) => p.category))
    );

    return {
      categories: categories,
      totalProducts: initialProducts.length,
      inStockProducts: initialProducts.filter((p) => p.inStock).length,
      priceRange: {
        min: Math.min(...initialProducts.map((p) => p.salePrice)),
        max: Math.max(...initialProducts.map((p) => p.salePrice)),
      },
    };
  }, []);

  // Enhanced response generation logic
  const generateResponse = useCallback(
    (query: string) => {
      const lowercaseQuery = query.toLowerCase().trim();

      // Greeting and small talk responses
      const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "howdy",
        "greetings",
      ];
      if (greetings.some((greeting) => lowercaseQuery.includes(greeting))) {
        return t("chatbot.greetings.response");
      }

      const thankYouResponses = ["thank", "thanks", "thank you", "appreciated"];
      if (thankYouResponses.some((phrase) => lowercaseQuery.includes(phrase))) {
        return t("chatbot.thanks.response");
      }

      const farewellResponses = ["bye", "goodbye", "see you", "take care"];
      if (farewellResponses.some((phrase) => lowercaseQuery.includes(phrase))) {
        return t("chatbot.farewell.response");
      }

      // Emotional/conversational responses
      const emotionalQueries = [
        "how are you",
        "how's it going",
        "feeling",
        "doing today",
      ];
      if (emotionalQueries.some((phrase) => lowercaseQuery.includes(phrase))) {
        return t("chatbot.howAreYou.response");
      }

      // Product availability questions
      if (
        lowercaseQuery.includes("product") ||
        lowercaseQuery.includes("available")
      ) {
        return t("chatbot.productAvailability.response", {
          totalProducts: productInfo.totalProducts,
          categories: productInfo.categories.join(", "),
          inStockProducts: productInfo.inStockProducts,
        });
      }

      // Specific product-related queries
      if (lowercaseQuery.includes("recommend")) {
        const recommendedProduct = initialProducts.find((p) => p.inStock);
        return recommendedProduct
          ? t("chatbot.recommendation.available", {
              productName: recommendedProduct.name,
              category: recommendedProduct.category,
              price: recommendedProduct.salePrice.toLocaleString(),
              colors: recommendedProduct.colors.join(", "),
            })
          : t("chatbot.recommendation.outOfStock");
      }

      // Payment and order questions
      if (
        lowercaseQuery.includes("payment") ||
        lowercaseQuery.includes("installment")
      ) {
        return t("chatbot.payment.response");
      }

      if (
        lowercaseQuery.includes("order") ||
        lowercaseQuery.includes("place")
      ) {
        return t("chatbot.order.response");
      }

      if (
        lowercaseQuery.includes("shipping") ||
        lowercaseQuery.includes("track")
      ) {
        return t("chatbot.shipping.response");
      }

      if (
        lowercaseQuery.includes("return") ||
        lowercaseQuery.includes("policy")
      ) {
        return t("chatbot.returns.response");
      }

      if (
        lowercaseQuery.includes("support") ||
        lowercaseQuery.includes("contact")
      ) {
        return t("chatbot.support.response");
      }

      if (lowercaseQuery.includes("discount")) {
        return t("chatbot.discount.response");
      }

      // Enhanced fallback responses
      const fallbackResponses = t("chatbot.fallbackResponses", {
        returnObjects: true,
      }) as string[];

      return fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
    },
    [t, productInfo]
  );

  // Send message handler
  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: Date.now(),
    };

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      type: "ai",
      content: generateResponse(inputMessage),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInputMessage("");
  }, [inputMessage, generateResponse]);

  // Quick question handler
  const handleQuickQuestion = useCallback(
    (question: string) => {
      setInputMessage(question);
      handleSendMessage();
    },
    [handleSendMessage]
  );

  // Quick questions from translations
  const QUICK_QUESTIONS = useMemo(
    () => t("chatbot.quickQuestions", { returnObjects: true }) as string[],
    [t]
  );

  // Render chatbot button
  const renderChatbotButton = useMemo(
    () => (
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 cursor-pointer"
      >
        <Avatar
          size="large"
          icon={<ShoppingOutlined />}
          className="bg-primary-600 hover:bg-primary-700 shadow-lg"
        />
      </div>
    ),
    []
  );

  // Render chat messages
  const renderChatMessages = useMemo(
    () => (
      <div className="h-full overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "ai" && (
              <Avatar
                icon={<ShoppingOutlined />}
                size="small"
                className="mr-2 self-end"
              />
            )}
            <div
              className={`
              p-2 rounded-lg max-w-[70%]
              ${
                msg.type === "user"
                  ? "bg-primary-100 text-primary-800"
                  : "bg-gray-100 text-gray-800"
              }
            `}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    ),
    [messages]
  );

  // Render quick questions
  const renderQuickQuestions = useMemo(
    () => (
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-600 mb-2">
          {t("chatbot.quickQuestions.title", "Quick Questions")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_QUESTIONS.map((question) => (
            <Button
              key={question}
              type="default"
              className="text-xs h-auto py-1 px-2 whitespace-normal break-words"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    ),
    [handleQuickQuestion, t, QUICK_QUESTIONS]
  );

  // Input key press handler
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {renderChatbotButton}
      <Drawer
        title="Envogue Shopping Assistant"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closeIcon={false}
        footer={
          <div className="flex flex-col">
            <div className="flex mb-2">
              <Input
                placeholder={t(
                  "chatbot.inputPlaceholder",
                  "Ask about products, orders, or shopping..."
                )}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow mr-2"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
              >
                {t("chatbot.send", "Send")}
              </Button>
            </div>
            {renderQuickQuestions}
          </div>
        }
      >
        {renderChatMessages}
      </Drawer>
    </>
  );
};

export default React.memo(AIChatbot);
