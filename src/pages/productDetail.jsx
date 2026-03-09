import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ShoppingCart, Star, TrendingUp, ArrowLeft, CheckCircle, Loader } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Try Redux first
  const productFromStore = useSelector(s =>
    s.products.all.find(p => p.id === parseInt(id))
  );

  const [product, setProduct] = useState(productFromStore || null);
  const [loading, setLoading] = useState(!productFromStore);
  const [error, setError] = useState(null);

  // If not in store, fetch from backend
  useEffect(() => {
    if (productFromStore) {
      setProduct(productFromStore);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/product/${id}`,
          { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
        );
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, productFromStore]);

  // Loading state
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <Loader className="animate-spin text-[#e22d2c]" size={32} />
      <p className="text-neutral-500 text-sm font-semibold">Loading product...</p>
    </div>
  );

  // Error state
  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <p className="text-5xl">🍹</p>
      <h2 className="text-lg font-black text-neutral-800">Product Not Found</h2>
      <p className="text-sm text-neutral-500">
        This product may no longer be available or the link may be incorrect.
      </p>
      <button
        onClick={() => navigate("/items")}
        className="flex items-center gap-2 bg-[#e22d2c] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c11f1e] transition-all"
      >
        <ArrowLeft size={15} />
        Browse Menu
      </button>
    </div>
  );

  // rest of your detail page UI below...
  const isSoldOut = product.stock === 0;
  const discountedPrice = product.discount > 0
    ? (product.price - (product.price * product.discount) / 100).toFixed(0)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#e22d2c] transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className={`w-full rounded-2xl overflow-hidden h-64 sm:h-80 mb-6 ${isSoldOut ? "grayscale opacity-60" : ""}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {product.isBestSeller && <span className="bg-[#e22d2c] text-white text-xs font-bold px-3 py-1 rounded-full">🔥 Best Seller</span>}
        {product.isNew && <span className="bg-[#64a955] text-white text-xs font-bold px-3 py-1 rounded-full">✨ New</span>}
        {isSoldOut && <span className="bg-neutral-800 text-white text-xs font-bold px-3 py-1 rounded-full">Sold Out</span>}
        <span className="bg-neutral-100 text-neutral-600 text-xs font-semibold px-3 py-1 rounded-full">{product.category}</span>
        <span className="bg-neutral-100 text-neutral-600 text-xs font-semibold px-3 py-1 rounded-full">{product.size}</span>
      </div>

      <h1 className="text-2xl font-black text-neutral-900 mb-2">{product.name}</h1>

      {product.description && (
        <p className="text-sm text-neutral-500 leading-relaxed mb-4">{product.description}</p>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-neutral-700">{product.rating}</span>
          <span className="text-xs text-neutral-400">({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={14} className="text-[#64a955]" />
          <span className="text-sm font-semibold text-[#64a955]">{product.sold.toLocaleString()} sold</span>
        </div>
      </div>

      {product.highlights?.length > 0 && (
        <div className="bg-neutral-50 rounded-2xl p-4 mb-5">
          <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">Highlights</p>
          <div className="grid grid-cols-2 gap-2">
            {product.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-[#64a955] flex-shrink-0" />
                <span className="text-xs font-semibold text-neutral-700">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
        <div>
          {discountedPrice ? (
            <>
              <p className="text-2xl font-black text-[#e22d2c]">Rs {discountedPrice}</p>
              <p className="text-sm text-neutral-400 line-through">Rs {product.price}</p>
            </>
          ) : (
            <p className="text-2xl font-black text-neutral-900">Rs {product.price}</p>
          )}
          {product.stock > 0 && product.stock <= 15 && (
            <p className="text-xs text-orange-500 font-semibold mt-0.5">Only {product.stock} left!</p>
          )}
        </div>
        <button
          disabled={isSoldOut}
          onClick={() => dispatch(addToCart(product))}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
            ${isSoldOut
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-[#e22d2c] hover:bg-[#c11f1e] text-white active:scale-95 shadow-md"
            }`}
        >
          <ShoppingCart size={16} />
          {isSoldOut ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;