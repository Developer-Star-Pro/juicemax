import React, { useContext, useRef, useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileBottomBar from "../components/MobileBottomBar";
import SearchModel from "../components/SearchModel";
import Footer from "../components/Footer";

const Layout1 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define your routes for swipe navigation
  const routes = ["/", "/items", "/cart", "/profile"];
  const currentIndex = routes.indexOf(location.pathname);

  // Swipe navigation states
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const gestureLock = useRef(null);

  // UI states
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [searchModelforMobile, set_searchModelforMobile] = useState(false);

  const mainRef = useRef(null);

  // Tutorial effect
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("seenTutorial");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic height calculation
  const navbarHeight = isMobile ? "7dvh" : "9dvh";
  const bottomBarHeight = "7dvh";

  const mainContentHeight = isMobile
    ? isNavbarVisible && isBottomBarVisible
      ? "86dvh" // Both visible
      : isNavbarVisible && !isBottomBarVisible
        ? "92dvh" // Only navbar visible
        : !isNavbarVisible && isBottomBarVisible
          ? "92dvh" // Only bottom bar visible
          : "100dvh" // Both hidden
    : isNavbarVisible
      ? "91dvh" // Navbar visible (desktop)
      : "100dvh"; // Navbar hidden (desktop)

  // Scroll detection for hide/show bars
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      const scrollDistance = Math.abs(currentScrollY - lastScrollY);

      // Only trigger hide/show if scrolled more than 10px to prevent flickering
      if (scrollDistance > 10) {
        if (scrollDirection === "down" && currentScrollY > 50) {
          // Scrolling down - hide both bars
          // setIsNavbarVisible(false);
          if (isMobile) setIsBottomBarVisible(false);
        } else {
          // Scrolling up - show both bars
          // setIsNavbarVisible(true);
          if (isMobile) setIsBottomBarVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    mainElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isMobile]);

  const handleTouchStart = (e) => {
    if (location.pathname.startsWith("/admin")) return;

    // ✅ Check if touch started inside a horizontally scrollable element
    const target = e.target.closest('[data-scroll="x"]');
    if (target) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    gestureLock.current = null;
    setIsSwiping(false);
    setDeltaX(0);
  };

  const handleTouchMove = (e) => {
    if (location.pathname.startsWith("/admin")) return;
    if (location.pathname.startsWith("/product")) return;
    if (!touchStartX.current || !touchStartY.current) return; // ✅ This now exits if touchStart was blocked

    const moveX = e.touches[0].clientX;
    const moveY = e.touches[0].clientY;

    const diffX = moveX - touchStartX.current;
    const diffY = moveY - touchStartY.current;

    if (!gestureLock.current) {
      if (Math.abs(diffY) > 8 && Math.abs(diffY) > Math.abs(diffX)) {
        gestureLock.current = "vertical";
        return;
      } else if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
        gestureLock.current = "horizontal";
      }
    }

    if (gestureLock.current === "vertical") return;

    setIsSwiping(true);

    const resistance = 0.5;
    let adjustedX = diffX;

    if (
      (currentIndex === 0 && diffX > 0) ||
      (currentIndex === routes.length - 1 && diffX < 0)
    ) {
      adjustedX = diffX * resistance;
    }

    const maxSwipeDistance = 150;
    if (Math.abs(adjustedX) > maxSwipeDistance) {
      adjustedX = adjustedX > 0 ? maxSwipeDistance : -maxSwipeDistance;
    }

    setDeltaX(adjustedX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current) return;

    if (gestureLock.current === "vertical") {
      resetSwipeState();
      return;
    }

    if (!isSwiping) {
      resetSwipeState();
      return;
    }

    // Navigate if swipe distance is sufficient
    const swipeThreshold = 80;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0 && currentIndex < routes.length - 1) {
        // Swipe left - go to next page
        navigate(routes[currentIndex + 1]);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous page
        navigate(routes[currentIndex - 1]);
      }
    }

    resetSwipeState();
  };

  const resetSwipeState = () => {
    setDeltaX(0);
    setIsSwiping(false);
    touchStartX.current = null;
    touchStartY.current = null;
    gestureLock.current = null;
  };

  return (
    <>
      <div
        className={`min-h-screen transition-all duration-300 overflow-hidden `}
      >
        <div
          className={`transition-all lg:w-[85%] mx-auto duration-300 ${
            isNavbarVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          style={{
            height: isNavbarVisible ? navbarHeight : "0dvh",
          }}
        >
          <Navbar
            set_searchModelforMobile={set_searchModelforMobile}
            searchModelforMobile={searchModelforMobile}
          />
        </div>

        {/* Main Content Area */}
        <main
          ref={mainRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full lg:w-[78%] mx-auto overflow-y-auto touch-pan-y relative transition-all duration-300 p-1 sm:p-2"
          style={{
            height: mainContentHeight,
            transform: `translateX(${deltaX}px)`,
            transition: isSwiping ? "none" : "transform 0.3s ease-out",
          }}
        >
          <Outlet />

          {isSwiping && Math.abs(deltaX) > 30 && (
            <div
              className={`fixed top-1/2 ${
                deltaX > 0 ? "left-4" : "right-4"
              } transform -translate-y-1/2 text-2xl opacity-50 z-30
               
              `}
            >
              {deltaX > 0 ? "←" : "→"}
            </div>
          )}
          <Footer />
        </main>

        <SearchModel
          set_searchModelforMobile={set_searchModelforMobile}
          searchModelforMobile={searchModelforMobile}
        />

        {/* Backdrop - put this in Layout1 NOT in SearchModel */}
        {searchModelforMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => set_searchModelforMobile(false)}
          />
        )}

        {/* Mobile Bottom Navigation Bar - Hide on scroll down */}
        {isMobile && (
          <div
            className={`transition-all duration-300 ${
              isBottomBarVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{
              height: isBottomBarVisible ? bottomBarHeight : "0dvh",
            }}
          >
            <MobileBottomBar
              searchModelforMobile={searchModelforMobile}
              set_searchModelforMobile={set_searchModelforMobile}
            />
          </div>
        )}

        {/* Tutorial Overlay */}
        {showTutorial && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 text-white p-6 text-center">
            <div className="max-w-sm">
              <h2 className="text-xl font-bold mb-3">👋 Welcome!</h2>
              <p className="text-sm mb-5 leading-relaxed">
                You can{" "}
                <span className="font-semibold text-[#5de586]">
                  swipe left and right
                </span>{" "}
                to move between pages.
                <br />
                Try swiping now to explore!
              </p>
              <button
                onClick={() => {
                  setShowTutorial(false);
                  localStorage.setItem("seenTutorial", "true");
                }}
                className="bg-[#7de55d] px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                Got it 👍
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout1;
