import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const TimelessCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/products/1.webp",
      alt: "Timeless Collection Image 1",
    },
    {
      image: "/images/products/2.jpg",
      alt: "Timeless Collection Image 2",
    },
    {
      image: "/images/products/3.jpg",
      alt: "Timeless Collection Image 3",
    },
    {
      image: "/images/products/4.webp",
      alt: "Timeless Collection Image 4",
    },
    {
      image: "/images/products/5.webp",
      alt: "Timeless Collection Image 5",
    },
    {
      image: "/images/products/6.jpg",
      alt: "Timeless Collection Image 6",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden mt-16">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-12 right-8 z-10">
              <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-md">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition z-20"
      >
        <LeftOutlined />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition z-20"
      >
        <RightOutlined />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            } hover:bg-white transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelessCarousel;
