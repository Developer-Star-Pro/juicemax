import Layout1 from "./layout/Layout1";
import { Routes, Route, Navigate ,useLocation} from "react-router-dom";
import GuestRoutes from "./Routes/GuestRoutes";
import Home from "./pages/Home";
import ItemsPage from "./pages/ItemsPage";
import ProductDetail from "./pages/productDetail";
import CartPage from "./pages/Cart";
import AboutPage from "./pages/AboutUs";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ scroll the actual scroll container in Layout1
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Layout Route */}
        <Route element={<Layout1 />}>
          <Route
            path={`/`}
            element={
              <GuestRoutes>
                <Home />
              </GuestRoutes>
            }
          />
          <Route
            path={`/items`}
            element={
              <GuestRoutes>
                <ItemsPage />
              </GuestRoutes>
            }
          />
          <Route
            path={`/product/:id`}
            element={
              <GuestRoutes>
                <ProductDetail />
              </GuestRoutes>
            }
          />
          <Route
            path={`/cart`}
            element={
              <GuestRoutes>
                <CartPage />
              </GuestRoutes>
            }
          />
          <Route
            path={`/about`}
            element={
              <GuestRoutes>
                <AboutPage />
              </GuestRoutes>
            }
          />

          {/* No Page Found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
