import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import bannerImg2 from "../assets/banner2.svg";
import bannerImg1 from "../assets/banner1.svg";
import CardsSection from "../components/ui/CardsSection";

const Home = () => {
  const { themeClasses } = useTheme();
  const images = [bannerImg1, bannerImg2];
  const [current, setCurrent] = useState(0);

  const bestSellers = [
    {
      id: 1,
      name: "Tropical Pineapple Juice",
      description:
        "Sweet and tangy pineapple juice packed with Vitamin C and natural enzymes.",
      price: 350,
      discount: 0,
      sold: 1240,
      stock: 48,
      isNew: false,
      isBestSeller: true,
      rating: 4.8,
      reviews: 320,
      image: "https://placehold.co/300x300/FFD700/white?text=Pineapple",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 2,
      name: "Pure Mango Delight",
      description:
        "Rich, creamy mango juice made from handpicked Alphonso mangoes.",
      price: 400,
      discount: 10,
      sold: 980,
      stock: 0, // sold out
      isNew: false,
      isBestSeller: true,
      rating: 4.9,
      reviews: 210,
      image: "https://placehold.co/300x300/FF8C00/white?text=Mango",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 3,
      name: "Mixed Fruit Punch",
      description:
        "A refreshing blend of orange, apple, and guava for the perfect everyday drink.",
      price: 320,
      discount: 15,
      sold: 870,
      stock: 22,
      isNew: false,
      isBestSeller: true,
      rating: 4.7,
      reviews: 185,
      image: "https://placehold.co/300x300/e22d2c/white?text=Mixed+Fruit",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 4,
      name: "Fresh Orange Squeeze",
      description:
        "Cold-pressed orange juice with no added sugar, straight from the farm.",
      price: 280,
      discount: 0,
      sold: 760,
      stock: 35,
      isNew: true,
      isBestSeller: true,
      rating: 4.6,
      reviews: 140,
      image: "https://placehold.co/300x300/FF6600/white?text=Orange",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 5,
      name: "Green Detox Smoothie",
      description:
        "A powerful mix of spinach, cucumber, lemon and ginger to cleanse your body.",
      price: 450,
      discount: 20,
      sold: 540,
      stock: 10,
      isNew: true,
      isBestSeller: false,
      rating: 4.5,
      reviews: 98,
      image: "https://placehold.co/300x300/64a955/white?text=Detox",
      category: "Detox Drinks",
      size: "400ml",
    },
    {
      id: 6,
      name: "Watermelon Splash",
      description:
        "Light, hydrating and naturally sweet watermelon juice perfect for summer.",
      price: 300,
      discount: 5,
      sold: 430,
      stock: 60,
      isNew: true,
      isBestSeller: false,
      rating: 4.4,
      reviews: 76,
      image: "https://placehold.co/300x300/FF4D6D/white?text=Watermelon",
      category: "Seasonal Specials",
      size: "500ml",
    },
  ];
  const justLanded = [
    {
      id: 7,
      name: "Strawberry Burst",
      description:
        "Freshly pressed strawberry juice bursting with natural sweetness and antioxidants.",
      price: 370,
      discount: 0,
      sold: 120,
      stock: 40,
      isNew: true,
      isBestSeller: false,
      rating: 4.7,
      reviews: 28,
      image: "https://placehold.co/300x300/FF6B9D/white?text=Strawberry",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 8,
      name: "Coconut Refresh",
      description:
        "Pure coconut water blended with a hint of lime for ultimate hydration.",
      price: 420,
      discount: 10,
      sold: 95,
      stock: 30,
      isNew: true,
      isBestSeller: false,
      rating: 4.8,
      reviews: 19,
      image: "https://placehold.co/300x300/E8F5E9/333?text=Coconut",
      category: "Fresh Juices",
      size: "400ml",
    },
    {
      id: 9,
      name: "Beetroot Power",
      description:
        "Energy-boosting beetroot juice mixed with ginger and lemon for a powerful kick.",
      price: 390,
      discount: 0,
      sold: 80,
      stock: 25,
      isNew: true,
      isBestSeller: false,
      rating: 4.5,
      reviews: 14,
      image: "https://placehold.co/300x300/9C1D6A/white?text=Beetroot",
      category: "Detox Drinks",
      size: "400ml",
    },
    {
      id: 10,
      name: "Lychee Bliss",
      description:
        "Exotic lychee juice with a floral sweetness that feels like a tropical getaway.",
      price: 450,
      discount: 15,
      sold: 60,
      stock: 0,
      isNew: true,
      isBestSeller: false,
      rating: 4.6,
      reviews: 11,
      image: "https://placehold.co/300x300/FFB3C6/white?text=Lychee",
      category: "Seasonal Specials",
      size: "500ml",
    },
    {
      id: 11,
      name: "Guava Glow",
      description:
        "Vitamin-rich guava juice with a smooth texture and naturally sweet aftertaste.",
      price: 310,
      discount: 0,
      sold: 45,
      stock: 55,
      isNew: true,
      isBestSeller: false,
      rating: 4.4,
      reviews: 9,
      image: "https://placehold.co/300x300/F9A825/white?text=Guava",
      category: "Fresh Juices",
      size: "500ml",
    },
    {
      id: 12,
      name: "Blue Lagoon Cooler",
      description:
        "A unique blend of blueberry and mint for a refreshing and antioxidant-rich drink.",
      price: 480,
      discount: 20,
      sold: 30,
      stock: 18,
      isNew: true,
      isBestSeller: false,
      rating: 4.9,
      reviews: 7,
      image: "https://placehold.co/300x300/1565C0/white?text=Blueberry",
      category: "Smoothies",
      size: "400ml",
    },
  ];
  const dealOfTheDay = [
    {
  id: 13,
  name: "Tropical Mango Pineapple Fusion",
  description:
    "A premium blend of sun-ripened mangoes and fresh pineapple, cold-pressed to lock in maximum nutrients and flavor. No preservatives, no added sugar — just pure tropical goodness in every sip.",
  price: 550,
  discount: 30,
  sold: 3200,
  stock: 8,
  isNew: false,
  isBestSeller: true,
  rating: 4.9,
  reviews: 876,
  image: "https://placehold.co/600x400/FF8C00/white?text=Mango+Pineapple",
  category: "Fresh Juices",
  size: "750ml",
  expiresAt: new Date(new Date().setHours(23, 59, 59, 0)), // ends tonight
  tag: "🔥 Deal of the Day",
  highlights: [
    "100% Natural Ingredients",
    "Cold Pressed",
    "No Added Sugar",
    "Rich in Vitamin C",
  ],
}
  ];

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`cursor-pointer flex my-10  gap-10 items-center flex-col ${themeClasses.text.primary}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl w-full"
      >
        <div
          className="flex  transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full flex-shrink-0 h-full relative"
            >
              <img
                src={img}
                alt=""
                className={`w-full  object-cover ${
                  index === current ? "opacity-100" : "opacity-0"
                } transition-all duration-500`}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced dots with multiple animations */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`h-1.5 w-1.5 sm:w-2.5 sm:h-2.5  rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-[#e22d2c]"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                animate={current === index ? pulseAnimation.animate : {}}
              />
              {current === index && (
                <motion.span
                  className="absolute -inset-1 rounded-full border-2 border-[#b88a2c]/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <CardsSection data={bestSellers} heading={"Our Best Sellers"} />
      <CardsSection data={justLanded} heading={"Just Landed"} />
      <CardsSection data={dealOfTheDay} heading={"Deal of the Day"} />
    </div>
  );
};

export default Home;
