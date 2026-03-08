import React from "react";
import { ShoppingCart, Star, TrendingUp } from "lucide-react";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.discount > 0
      ? (product.price - (product.price * product.discount) / 100).toFixed(0)
      : null;

  const isSoldOut = product.stock === 0;

  return (
    <div className="relative rounded sm:rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Badges */}
      <div className="absolute hidden  top-2 left-2 z-10 sm:flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-[#e22d2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            🔥 Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#64a955] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✨ New
          </span>
        )}
        {isSoldOut && (
          <span className="bg-neutral-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {/* Discount Badge */}
      {product.discount > 0 && !isSoldOut && (
        <div className="absolute top-2 right-2 z-10 bg-[#e22d2c] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          -{product.discount}%
        </div>
      )}

      {/* Image */}
      <div
        className={`w-full overflow-hidden ${isSoldOut ? "grayscale opacity-60" : ""}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-1 sm:p-3 flex flex-col gap-1 sm:gap-2">
        {/* Name */}
        <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-neutral-500 hidden sm:block line-clamp-1 lg:line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 sm:gap-2 ">
          {discountedPrice ? (
            <>
              <span className="text-xs sm:text-base font-black text-[#e22d2c]">
                Rs {discountedPrice}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 line-through">
                Rs {product.price}
              </span>
            </>
          ) : (
            <span className="text-xs font-black text-neutral-900">
              Rs {product.price}
            </span>
          )}

          {/* Sold Count */}
          <div className="flex items-center gap-1 text-[10px] text-neutral-400 hidden sm:block">
            <TrendingUp size={11} className="text-[#64a955]" />
            <span>
              <span className="font-semibold text-[#64a955]">
                {product.sold.toLocaleString()}
              </span>{" "}
              sold
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          disabled={isSoldOut}
          className={`mt-1 hidden w-full sm:flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200
            ${
              isSoldOut
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-[#e22d2c] hover:bg-[#c11f1e] text-white active:scale-95 shadow-sm hover:shadow-md"
            }`}
        >
          <ShoppingCart size={13} />
          <p className="hidden sm:block">
            {isSoldOut ? "Sold Out" : "Add to Cart"}
          </p>{" "}
        </button>
      </div>
    </div>
  );
};

const CardsSection = ({ data, heading }) => {
  return (
    <section className="py-8 px-2 sm:px-4">
      {/* Heading */}
      <div className="mb-5 px-1">
        <h2 className="text-lg sm:text-2xl font-black text-neutral-900">
          {heading}
        </h2>
        <div className="h-1 w-12 bg-[#e22d2c] rounded-full mt-1" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
