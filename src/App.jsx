import Layout1 from "./layout/Layout1";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestRoutes from "./Routes/GuestRoutes";
import Home from "./pages/Home";

const App = () => {
  return (
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

        {/* No Page Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
