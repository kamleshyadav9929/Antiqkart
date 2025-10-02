import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Import all page components
import Homepage from "./pages/Homepage";
import AboutUsPage from "./pages/AboutUsPage";
import AllProductsPage from "./pages/AllProductsPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import ContactUsPage from "./pages/ContactUsPage";
import FestivalPage from "./pages/FestivalPage";
import FestiveLandingPage from "./pages/FestiveLandingPage";
import SearchPage from "./pages/SearchPage";
import ShopPage from "./pages/ShopPage";
import StatePage from "./pages/StatePage";
import StatesPage from "./pages/StatesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    // The <BrowserRouter> tags have been removed from this file
    <>
      <ScrollToTop />
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
    </>
  );
}

export default App;
