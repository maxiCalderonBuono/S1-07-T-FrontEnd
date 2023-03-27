import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../screens/Home";
import { PrivateRoutes } from "./PrivateRoutes";
import { UserActiveRouter } from "./UserActiveRouter";
import { PrivateDashboard } from "./PrivateDashborad";
import Footer from "../components/organisms/Footer";
import { NavBar } from "../components/organisms/NavBar";
import { useDispatch } from "react-redux";
import { startIsAuth } from "../actions/auth";
import { AboutUs } from "../components/organisms/aboutUs";
import NotFound from "../screens/NotFound";
import { Toaster } from "react-hot-toast";
import BeLogged from "../screens/BeLogged";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startIsAuth());
  }, [dispatch]);

  return (
    <Router>
      <Toaster />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/auth/verify/:uid" element={<UserActiveRouter />} />
        <Route path="/aboutUS" element={<AboutUs />} />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <PrivateDashboard />
            </PrivateRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
