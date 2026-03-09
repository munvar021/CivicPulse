import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";
import { initScrollReactiveLighting } from "./utils/scrollReactiveLighting";
import ScrollToTop from "./components/ScrollToTop/scrollToTop";
import Home from "./Pages/Home/home";
import AboutUs from "./Pages/AboutUs/aboutUs";
import Contact from "./Pages/Contact/contact";
import RoleSelection from "./Pages/Auth/roleSelection";
import CitizenLogin from "./Pages/Auth/Login/citizenLogin";
import CitizenRegister from "./Pages/Auth/Register/citizenRegister";
import OfficerLogin from "./Pages/Auth/Login/officerLogin";
import AdminLogin from "./Pages/Auth/Login/adminLogin";
import SuperAdminLogin from "./Pages/Auth/Login/superAdminLogin";
import SuperAdminRegister from "./Pages/Auth/Register/superAdminRegister";
import ProtectedRoute from "./routes/protectedRoute";
import NotFound from "./Pages/NotFound/notFound";
import Unauthorized from "./Pages/Unauthorized/unauthorized";
import Toast from "./components/Toast/toast";
import Loader from "./components/Loaders/loader";
import { routesByRole } from "./routes/protectedRoutes";
import "./App.css";

const App = () => {
  const { checkingAuth } = useSelector((state) => state.auth);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const cleanup = initScrollReactiveLighting();
    setAppReady(true);
    return cleanup;
  }, []);

  if (checkingAuth || !appReady) {
    return (
      <>
        <GlobalStyles />
        <Loader fullScreen={true} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<RoleSelection />} />
            <Route path="/citizen/login" element={<CitizenLogin />} />
            <Route path="/citizen/register" element={<CitizenRegister />} />
            <Route path="/officer/login" element={<OfficerLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/sys-admin-portal-x7k9m"
              element={<SuperAdminLogin />}
            />
            <Route
              path="/sys-admin-register-x7k9m"
              element={<SuperAdminRegister />}
            />

            {Object.entries(routesByRole).map(([role, routes]) =>
              routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute roles={[role]}>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              )),
            )}

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
      <Toast />
    </>
  );
};

export default App;
