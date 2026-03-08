import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Tag,
  Package,
  Loader,
} from "lucide-react";
import logo from "../assets/juicemaxLogo-1.svg";

const SearchModel = ({ searchModelforMobile, set_searchModelforMobile }) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const searchInputRef = useRef(null);
  const modelRef = useRef(null);
  const api = "a";
  const public_key = "a";

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Handle showing content after transition
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

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
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

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${api}/user/search?query=${encodeURIComponent(query)}&limit=8`,
        {
          headers: {
            "x-api-key": public_key,
          },
        },
      );
      const result = await response.json();

      if (result.success) {
        setSearchResults(Array.isArray(result.products) ? result.products : []);
        setSuggestions(
          Array.isArray(result.suggestions) ? result.suggestions : [],
        );
        addToRecentSearches(query);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToRecentSearches = (query) => {
    const newRecentSearches = [
      query,
      ...recentSearches.filter((item) => item !== query),
    ].slice(0, 5); // Keep only 5 most recent

    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text || suggestion);
    searchInputRef.current?.focus();
  };

  const handleProductClick = (product) => {
    set_searchModelforMobile(false);
    navigate(`/product/${product._id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      set_searchModelforMobile(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
    searchInputRef.current?.focus();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case "product":
        return <Package size={16} />;
      case "category":
        return <Tag size={16} />;
      case "trending":
        return <TrendingUp size={16} />;
      default:
        return <Search size={16} />;
    }
  };

  return (
    <>
      {/* Search Model */}
      <div
        ref={modelRef}
        onClick={(e) => e.stopPropagation()}
        className={`${
          searchModelforMobile
            ? "w-full sm:w-[35%] lg:w-[29%] opacity-100"
            : "w-0 opacity-0"
        } h-full bg-white fixed z-50 top-0 left-0 transition-all duration-300 ease-in-out overflow-hidden text-xs`}
      >
        <div className="h-[92%] z-50 relative">
          <div
            className="absolute h-full w-full bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `url(${logo})`,
              opacity: 0.08,
            }}
          />

          {showContent && (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className={`p-4 border-b `}>
                <div className="flex items-center gap-3 z-50">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("ko");
                      set_searchModelforMobile(false);
                    }}
                    className="p-2 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <X size={20} />
                  </div>

                  {/* Search Input */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex-1 relative"
                  >
                    <div className="relative">
                      <Search
                        size={20}
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 
                      
                        `}
                      />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 rounded-lg border
                       
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded 
                         
                          `}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Search Content */}
              <div className={`flex-1 overflow-y-auto `}>
                {/* Loading State */}
                {loading && (
                  <div className="p-4 text-center">
                    <div className=" text-blue-500 mx-auto animate-spin w-fit">
                      <Loader />
                    </div>
                    <p
                      className={`mt-2 text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Searching...
                    </p>
                  </div>
                )}

                {/* Search Results */}
                {!loading && searchQuery && (
                  <>
                    {/* Products Results */}
                    {searchResults.length > 0 && (
                      <div className="p-4">
                        <h3
                          className={`text-xs font-semibold mb-3 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Products ({searchResults.length})
                        </h3>
                        <div className="space-y-2">
                          {searchResults.map((product) => (
                            <button
                              key={product._id}
                              onClick={() => handleProductClick(product)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                theme === "dark"
                                  ? "hover:bg-gray-700 text-gray-300"
                                  : "hover:bg-white text-gray-700 border border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {product.images?.[0] && (
                                  <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {product.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-bold text-green-600">
                                      Rs {product.price.toFixed(2)}
                                    </span>
                                    {product.discount > 0 && (
                                      <span className="text-xs bg-red-100 text-red-600 px-1 rounded">
                                        {product.discount}% OFF
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                        <h3
                          className={`text-sm font-semibold mb-3 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Related Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                                theme === "dark"
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {getSuggestionIcon(suggestion.type)}
                              {suggestion.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {searchResults.length === 0 && suggestions.length === 0 && (
                      <div className="p-8 text-center">
                        <Search
                          size={48}
                          className={`mx-auto mb-4 
                            
                          `}
                        />
                        <h3
                          className={`text-lg font-semibold mb-2
                          
                          `}
                        >
                          No results found
                        </h3>
                        <p
                          className={`text-sm 
                           
                          
                          `}
                        >
                          Try different keywords or check out trending searches
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Recent & Trending Searches */}
                {!loading && !searchQuery && (
                  <div className="p-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <h3 className={`text-sm font-semibold mb-3 `}>
                          Recent Searches
                        </h3>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(search)}
                              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 
                             
                              `}
                            >
                              <Clock size={16} className="text-gray-400" />
                              <span>{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            set_searchModelforMobile(false);
          }}
          className="h-[7%] border-t border-black/20 p-1 flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors"
        >
          <p className="text-sm font-semibold text-[#e22d2c]">Cancel</p>
        </div>
      </div>
    </>
  );
};

export default SearchModel;
