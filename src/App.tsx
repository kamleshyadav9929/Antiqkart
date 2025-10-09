// src/App.tsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader"; // Import the loader

// Import all page components lazily
const Homepage = lazy(() => import("./pages/Homepage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const AllProductsPage = lazy(() => import("./pages/AllProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const FestivalPage = lazy(() => import("./pages/FestivalPage"));
const FestiveLandingPage = lazy(() => import("./pages/FestiveLandingPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const StatePage = lazy(() => import("./pages/StatePage"));
const StatesPage = lazy(() => import("./pages/StatesPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* All your application routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collections/:collectionName"
            element={<CollectionPage />}
          />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/states/:stateName" element={<StatePage />} />
          <Route path="/festive-specials" element={<FestiveLandingPage />} />
          <Route path="/festive-specials/:slug" element={<FestivalPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
