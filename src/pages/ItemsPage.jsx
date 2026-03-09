import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  setActiveCategory,
} from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  Star,
  TrendingUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";

// ── Skeleton ──────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm animate-pulse">
    <div className="w-full h-40 bg-neutral-200" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3 bg-neutral-200 rounded w-3/4" />
      <div className="h-2 bg-neutral-100 rounded w-full" />
      <div className="h-3 bg-neutral-200 rounded w-1/3 mt-1" />
      <div className="h-8 bg-neutral-200 rounded-xl mt-1" />
    </div>
  </div>
);

// ── Product Card ──────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSoldOut = product.stock === 0;
  const discountedPrice =
    product.discount > 0
      ? (product.price - (product.price * product.discount) / 100).toFixed(0)
      : null;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative rounded-sm sm:rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-[#e22d2c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            🔥 Best Seller
          </span>
        )}
        {isSoldOut && (
          <span className="bg-neutral-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {product.discount > 0 && !isSoldOut && (
        <div className="absolute top-2 right-2 z-10 bg-[#e22d2c] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          -{product.discount}%
        </div>
      )}

      {/* Image */}
      <div
        className={`w-full aspect-square overflow-hidden ${isSoldOut ? "grayscale opacity-60" : ""}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-1 sm:p-3 flex flex-col gap-1 sm:gap-2">
        <h3 className="text-xs font-bold text-neutral-900 line-clamp-1">
          {product.name}
        </h3>

        {/* <div className="flex items-center gap-1">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[11px] font-semibold text-neutral-700">
            {product.rating}
          </span>
          <span className="text-[10px] text-neutral-400">
            ({product.reviews})
          </span>
        </div> */}

        <div className="flex items-center gap-2">
          {discountedPrice ? (
            <>
              <span className="text-base font-black text-[#e22d2c]">
                Rs {discountedPrice}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                Rs {product.price}
              </span>
            </>
          ) : (
            <span className="text-xs sm:text-base font-black text-neutral-900">
              Rs {product.price}
            </span>
          )}
          <div className="sm:flex items-center gap-1 text-[10px] text-neutral-400 hidden ">
            <TrendingUp size={11} className="text-[#64a955]" />
            <span className="font-semibold text-[#64a955]">
              {product.sold.toLocaleString()}
            </span>
            <span>sold</span>
            {product.stock > 0 && product.stock <= 15 && (
              <span className="ml-auto text-orange-500 font-semibold">
                Only {product.stock} left!
              </span>
            )}
          </div>
        </div>

        <button
          disabled={isSoldOut}
          onClick={(e) => {
            e.stopPropagation(); // ← prevent navigating when clicking cart
            dispatch(addToCart(product));
          }}
          className={`mt-1 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200
            ${
              isSoldOut
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-[#e22d2c] hover:bg-[#c11f1e] text-white active:scale-95 shadow-sm"
            }`}
        >
          <ShoppingCart size={13} />
          <p className="hidden sm:block">
            {" "}
            {isSoldOut ? "Sold Out" : "Add to Cart"}
          </p>
        </button>
      </div>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────
const Sidebar = ({ categories, activeCategory, onSelect, onClose }) => (
  <div className="flex flex-col gap-1 p-2">
    <div className="flex items-center justify-between px-2 py-3 border-b border-neutral-100 mb-2">
      <h3 className="font-black text-neutral-900 text-sm">Categories</h3>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-neutral-100"
        >
          <X size={16} />
        </button>
      )}
    </div>

    {/* All */}
    <button
      onClick={() => onSelect("All")}
      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
        ${
          activeCategory === "All"
            ? "bg-[#e22d2c] text-white shadow-sm"
            : "text-neutral-600 hover:bg-neutral-50 hover:text-[#e22d2c]"
        }`}
    >
      🍽️ All Items
    </button>

    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.name)}
        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            activeCategory === cat.name
              ? "bg-[#e22d2c] text-white shadow-sm"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-[#e22d2c]"
          }`}
      >
        {cat.icon} {cat.name}
      </button>
    ))}
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────
const ItemsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // ← add this

  const { all, filtered, categories, activeCategory, loading, error } =
    useSelector((s) => s.products);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (all.length === 0) dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length === 0) return; // wait for categories to load

    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");

    if (categoryFromUrl) {
      // find exact match (case insensitive)
      const match = categories.find(
        (c) => c.name.toLowerCase() === categoryFromUrl.toLowerCase(),
      );
      if (match) {
        dispatch(setActiveCategory(match.name));
      }
    }
  }, [location.search, categories]);

  const handleSelect = (category) => {
    dispatch(setActiveCategory(category));
    setMobileSidebarOpen(false);
  };

  const handleOpenFilter = () => {
    // scroll the actual scrollable parent to top
    const scrollContainer = document.querySelector("main");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => setMobileSidebarOpen(true), 300);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 py-3 w-fit rounded shadow-2xl flex items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-black text-neutral-900">Our Menu</h1>
          <p className="text-xs text-neutral-500">
            {activeCategory === "All"
              ? `${all.length} items`
              : `${filtered.length} items in ${activeCategory}`}
          </p>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={handleOpenFilter}
          className="sm:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-[#e22d2c] hover:text-[#e22d2c] transition-all"
        >
          <SlidersHorizontal size={15} />
          Filter
        </button>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden sm:block w-52 lg:w-60 flex-shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-r border-neutral-100 bg-white">
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleSelect}
          />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40 animate-fadeIn"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 overflow-y-auto shadow-2xl animate-slideIn">
              <Sidebar
                categories={categories}
                activeCategory={activeCategory}
                onSelect={handleSelect}
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* Products Grid */}
        <main className="flex-1 p-1 sm:p-3 sm:p-4">
          {error && (
            <div className="text-center py-10 text-red-500 font-semibold text-sm">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🍹</p>
              <p className="text-neutral-500 font-semibold">
                No items in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItemsPage;
