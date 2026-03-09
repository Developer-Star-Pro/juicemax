import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Tag,
} from "lucide-react";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);

  const subtotal = items.reduce((acc, item) => {
    const price =
      item.discount > 0
        ? item.price - (item.price * item.discount) / 100
        : item.price;
    return acc + price * item.quantity;
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = subtotal >= 500 ? 0 : 100;
  const total = subtotal + deliveryFee;

  // ── Empty State ──
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-[#e22d2c]/10 flex items-center justify-center">
          <ShoppingCart size={40} className="text-[#e22d2c]" />
        </div>
        <div>
          <h2 className="text-xl font-black text-neutral-900">Your cart is empty</h2>
          <p className="text-sm text-neutral-500 mt-1">Add some delicious juices to get started!</p>
        </div>
        <button
          onClick={() => navigate("/items")}
          className="bg-[#e22d2c] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#c11f1e] transition-all active:scale-95 shadow-md"
        >
          Browse Menu 🍹
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-neutral-200 hover:border-[#e22d2c] hover:text-[#e22d2c] transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-black text-neutral-900">My Cart</h1>
            <p className="text-xs text-neutral-500">{totalItems} item{totalItems > 1 ? "s" : ""}</p>
          </div>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#e22d2c] border border-neutral-200 hover:border-[#e22d2c] px-3 py-2 rounded-xl transition-all"
        >
          <Trash2 size={13} />
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Cart Items ── */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item) => {
            const discountedPrice =
              item.discount > 0
                ? (item.price - (item.price * item.discount) / 100).toFixed(0)
                : null;
            const itemTotal = (
              (discountedPrice ? parseFloat(discountedPrice) : item.price) * item.quantity
            ).toFixed(0);

            return (
              <div
                key={item.id}
                className="bg-white border border-neutral-100 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="text-sm font-bold text-neutral-900 line-clamp-2 cursor-pointer hover:text-[#e22d2c] transition-colors"
                      >
                        {item.name}
                      </h3>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-[#e22d2c] text-neutral-400 transition-all flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full">
                        {item.size}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-[10px] text-[#e22d2c] bg-[#e22d2c]/10 font-bold px-2 py-0.5 rounded-full">
                          -{item.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price + Qty */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {discountedPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-black text-[#e22d2c]">
                            Rs {discountedPrice}
                          </span>
                          <span className="text-xs text-neutral-400 line-through">
                            Rs {item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-black text-neutral-900">
                          Rs {item.price}
                        </span>
                      )}
                      <p className="text-[10px] text-neutral-400">
                        Total: <span className="font-bold text-neutral-700">Rs {itemTotal}</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl p-1">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#e22d2c] hover:text-white text-neutral-600 transition-all active:scale-90"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-black text-neutral-900 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#e22d2c] hover:text-white text-neutral-600 transition-all active:scale-90"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Continue Shopping */}
          <button
            onClick={() => navigate("/items")}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-neutral-200 text-sm font-semibold text-neutral-500 hover:border-[#e22d2c] hover:text-[#e22d2c] transition-all"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:w-80 flex flex-col gap-3">

          {/* Delivery Banner */}
          {deliveryFee > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 flex items-center gap-3">
              <Tag size={16} className="text-orange-500 flex-shrink-0" />
              <p className="text-xs text-orange-700 font-semibold">
                Add <span className="font-black">Rs {(500 - subtotal).toFixed(0)}</span> more for free delivery!
              </p>
            </div>
          )}
          {deliveryFee === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-3">
              <Tag size={16} className="text-green-500 flex-shrink-0" />
              <p className="text-xs text-green-700 font-semibold">
                🎉 You unlocked <span className="font-black">free delivery!</span>
              </p>
            </div>
          )}

          {/* Summary Card */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-sm font-black text-neutral-900 mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-neutral-900">Rs {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="font-semibold text-[#64a955]">FREE</span>
                ) : (
                  <span className="font-semibold text-neutral-900">Rs {deliveryFee}</span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Packing Charge</span>
                <span className="font-semibold text-neutral-900">Rs 40</span>
              </div>

              <div className="border-t border-neutral-100 pt-3 flex justify-between">
                <span className="font-black text-neutral-900">Total</span>
                <span className="font-black text-lg text-[#e22d2c]">Rs {(total + 40).toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-[#e22d2c] hover:bg-[#c11f1e] text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout →
            </button>

            <p className="text-center text-[10px] text-neutral-400 mt-3">
              Minimum order Rs 500 • Extra packing Rs 40
            </p>
          </div>

          {/* Branch Info */}
          <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4">
            <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">Our Branches</p>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-neutral-600">
                <p className="font-semibold">📍 Sector A, Bahria Enclave</p>
                <p className="text-neutral-400">0320-1579889 • 0332-0005015</p>
              </div>
              <div className="text-xs text-neutral-600">
                <p className="font-semibold">📍 Jinnah Garden Phase I</p>
                <p className="text-neutral-400">0335-0000566</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;