import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const MobileBottomBar = ({
  searchModelforMobile,set_searchModelforMobile
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeClasses } = useTheme();

  const tabs = [
    {
      id: "home",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Home",
      path: "/",
    },
    {
      id: "items",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
      label: "Categories",
      path: "/items",
    },
    {
      id: "search",
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      label: "Search",
      path: "/search",
    },
    {
      id: "cart",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
      label: "Cart",
      badge: "o",
      path: "/cart",
    },
  ];

  // here if tab.id === to seach we set seach div to opens
  // we have make seach model so on seach click we dont want that it naviagte the seach model opens ok so when path === seach we dont run this function

  const handletabs = (id, path) => {
    if (id === "search" && path === "/search") {
      set_searchModelforMobile(!searchModelforMobile);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className={`border-t border-black/20`}>
        <div className="flex justify-around items-center h-[7dvh] px-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                handletabs(tab.id, tab.path);

                {
                  tab.id === "profile" && LoginHandle();
                }
              }}
              className={`flex flex-col items-center justify-center space-y-0.5 p-2 rounded-xl transition-all duration-200 flex-1 mx-1 ${
                location.pathname === tab.path && `${themeClasses.text.accent}`
              }`}
            >
              <div className="relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={location?.pathname === tab.id ? 2.5 : 2}
                    d={tab.icon}
                  />
                </svg>
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-1 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold 
                   
                    
                    `}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBottomBar;
