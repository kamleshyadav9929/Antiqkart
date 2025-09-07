import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import your new animation wrapper
import AnimatedPage from "./components/AnimatedPage";

// Import all your page components
import Homepage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import StatesPage from "./pages/StatesPage";
import StatePage from "./pages/StatePage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionPage from "./pages/CollectionPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

/**
 * This new component manages the animation logic.
 * AnimatePresence detects when a page changes and applies our animations.
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Homepage />
            </AnimatedPage>
          }
        />
        <Route
          path="/shop"
          element={
            <AnimatedPage>
              <ShopPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/states"
          element={
            <AnimatedPage>
              <StatesPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/states/:stateName"
          element={
            <AnimatedPage>
              <StatePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/collections"
          element={
            <AnimatedPage>
              <CollectionsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/collections/:collectionName"
          element={
            <AnimatedPage>
              <CollectionPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <AboutUsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatedPage>
              <ContactUsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/sign-in"
          element={
            <AnimatedPage>
              <SignInPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AnimatedPage>
              <SignUpPage />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
