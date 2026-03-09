import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../store/slices/productsSlice";
import { Search, X, Clock, TrendingUp, Tag, Package, Loader } from "lucide-react";
import logo from "../assets/juicemaxLogo-1.svg";

const SearchModel = ({ searchModelforMobile, set_searchModelforMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { all: allProducts, categories } = useSelector(s => s.products);

  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const searchInputRef = useRef(null);
  const modelRef = useRef(null);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Show content after open animation
  useEffect(() => {
    let timeout;
    if (searchModelforMobile) {
      timeout = setTimeout(() => {
        setShowContent(true);
        searchInputRef.current?.focus();
      }, 300);
    } else {
      setShowContent(false);
      setSearchQuery("");
      setSearchResults([]);
    }
    return () => clearTimeout(timeout);
  }, [searchModelforMobile]);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        set_searchModelforMobile(false);
      }
    };
    if (searchModelforMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [searchModelforMobile, set_searchModelforMobile]);

  // Debounced search — NO history save here
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, allProducts]);

  // ── Search: frontend first, backend fallback ──
  const performSearch = async (query) => {
    const q = query.toLowerCase();

    if (allProducts.length > 0) {
      const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 8);
      setSearchResults(results);
      return; // skip backend
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/search?query=${encodeURIComponent(query)}&limit=8`,
        { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
      );
      const result = await res.json();
      if (result.success) {
        setSearchResults(Array.isArray(result.products) ? result.products : []);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Save history only on intentional actions ──
  const addToRecentSearches = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(i => i !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // ── Handlers ──
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery.trim()); // ✅ save on submit
      set_searchModelforMobile(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductClick = (product) => {
    addToRecentSearches(searchQuery.trim()); // ✅ save on product click
    set_searchModelforMobile(false);
    navigate(`/product/${product.id}`);
  };

  const handleRecentClick = (search) => {
    addToRecentSearches(search); // ✅ save on recent click
    setSearchQuery(search);
    searchInputRef.current?.focus();
  };
const handleCategoryClick = (catName) => {
  set_searchModelforMobile(false);
  navigate(`/items?category=${encodeURIComponent(catName)}`);
};

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const removeRecentSearch = (e, search) => {
    e.stopPropagation();
    const updated = recentSearches.filter(i => i !== search);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div
      ref={modelRef}
      onClick={(e) => e.stopPropagation()}
      className={`${
        searchModelforMobile
          ? "w-full sm:w-[35%] lg:w-[29%] opacity-100"
          : "w-0 opacity-0"
      } h-full bg-white fixed z-50 top-0 left-0 transition-all duration-300 ease-in-out overflow-hidden text-xs`}
    >
      {/* BG Logo */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${logo})`, opacity: 0.08 }}
      />

      {/* Main Content */}
      <div className="h-[92%] relative z-10 flex flex-col">
        {showContent && (
          <div className="h-full flex flex-col">

            {/* Header */}
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div
                  onClick={(e) => { e.stopPropagation(); set_searchModelforMobile(false); }}
                  className="p-2 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </div>
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search juices, shakes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#e22d2c]/30 focus:border-[#e22d2c]"
                    />
                    {searchQuery && (
                      <button type="button" onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#e22d2c]">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">

              {/* Loading */}
              {loading && (
                <div className="p-6 text-center">
                  <Loader className="animate-spin text-[#e22d2c] mx-auto" size={22} />
                  <p className="mt-2 text-neutral-500 text-xs">Searching...</p>
                </div>
              )}

              {/* Search Results */}
              {!loading && searchQuery && (
                <>
                  {searchResults.length > 0 ? (
                    <div className="p-3">
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">
                        Results ({searchResults.length})
                      </p>
                      <div className="space-y-1">
                        {searchResults.map(product => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors flex items-center gap-3"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-neutral-900 truncate">{product.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-[#e22d2c]">Rs {product.price}</span>
                                <span className="text-[10px] text-neutral-400">{product.category}</span>
                              </div>
                            </div>
                            {product.isBestSeller && (
                              <span className="text-[9px] bg-[#e22d2c]/10 text-[#e22d2c] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                                🔥 Top
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search size={40} className="mx-auto mb-3 text-neutral-300" />
                      <p className="font-semibold text-neutral-700 text-sm">No results found</p>
                      <p className="text-neutral-400 text-xs mt-1">Try a different keyword</p>
                    </div>
                  )}
                </>
              )}

              {/* Default State */}
              {!loading && !searchQuery && (
                <div className="p-3 flex flex-col gap-5">

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Recent</p>
                        <button
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.removeItem("recentSearches");
                          }}
                          className="text-[10px] text-[#e22d2c] font-semibold hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => handleRecentClick(search)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors group"
                          >
                            <Clock size={14} className="text-neutral-400 flex-shrink-0" />
                            <span className="text-sm text-neutral-700 flex-1">{search}</span>
                            <span
                              onClick={(e) => removeRecentSearch(e, search)}
                              className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-[#e22d2c] transition-all"
                            >
                              <X size={12} />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mini Categories */}
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-1">
                      Browse Categories
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.slice(0, 8).map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.name)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-neutral-100 bg-neutral-50 hover:border-[#e22d2c] hover:bg-[#e22d2c]/5 hover:text-[#e22d2c] transition-all text-left"
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-xs font-semibold text-neutral-700 truncate">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cancel */}
      <div
        onClick={(e) => { e.stopPropagation(); set_searchModelforMobile(false); }}
        className="h-[8%] border-t border-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors"
      >
        <p className="text-sm font-semibold text-[#e22d2c]">Cancel</p>
      </div>
    </div>
  );
};

export default SearchModel;