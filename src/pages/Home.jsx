import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useState } from "react";
import bannerImg2 from "../assets/banner2.svg";
import bannerImg1 from "../assets/banner1.svg";
import CardsSection from "../components/ui/CardsSection";
import { fetchHomeData } from "../store/slices/homeSlice";


// ─── Skeleton Card ───────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm animate-pulse">
    <div className="w-full h-44 bg-neutral-200" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3 bg-neutral-200 rounded w-3/4" />
      <div className="h-2 bg-neutral-100 rounded w-full" />
      <div className="h-2 bg-neutral-100 rounded w-2/3" />
      <div className="h-3 bg-neutral-200 rounded w-1/3 mt-1" />
      <div className="h-8 bg-neutral-200 rounded-xl mt-1" />
    </div>
  </div>
);

// ─── Skeleton Section ─────────────────────────────────────────────
const SkeletonSection = ({ heading }) => (
  <section className="py-8 px-2 sm:px-4 w-full">
    <div className="mb-5 px-1">
      <div className="h-5 w-40 bg-neutral-200 rounded animate-pulse" />
      <div className="h-1 w-12 bg-neutral-200 rounded-full mt-2 animate-pulse" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  </section>
);

// ─── Home ─────────────────────────────────────────────────────────
const Home = () => {
  const { themeClasses } = useTheme();
  const dispatch = useDispatch();
  const { bestSellers, justLanded, dealsOfTheDay, loading, error } =
    useSelector((s) => s.home);

  const images = [bannerImg1, bannerImg2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

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
      className={`cursor-pointer flex my-10 gap-10 items-center flex-col ${themeClasses.text.primary}`}
    >
      {/* ── Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl w-full"
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
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
                className={`w-full object-cover ${
                  index === current ? "opacity-100" : "opacity-0"
                } transition-all duration-500`}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>
          ))}
        </div>

        {/* Dots */}
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
                className={`h-1.5 w-1.5 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
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

      {/* ── Error ── */}
      {error && (
        <div className="w-full text-center py-6 text-red-500 text-sm font-semibold">
          {error} — please try refreshing the page.
        </div>
      )}

      {/* ── Best Sellers ── */}
      {loading ? (
        <SkeletonSection />
      ) : (
        <CardsSection data={bestSellers} heading="Our Best Sellers" />
      )}

      {/* ── Just Landed ── */}
      {loading ? (
        <SkeletonSection />
      ) : (
        <CardsSection data={justLanded} heading="Just Landed ✨" />
      )}

      {/* ── Deal of the Day ── */}
      {loading ? (
        <SkeletonSection />
      ) : (
        dealsOfTheDay.length > 0 && (
          <CardsSection data={dealsOfTheDay} heading="Deal of the Day 🔥" />
        )
      )}
    </div>
  );
};

export default Home;
