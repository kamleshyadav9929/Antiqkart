import { BrowserRouter, Routes, Route } from "react-router-dom";

// Helper component to scroll to top on page change
import ScrollToTop from "./components/ScrollToTop";

// Import all page components from your 'pages' directory
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
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StatePage from "./pages/StatePage";
import StatesPage from "./pages/StatesPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Product Discovery Routes */}
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route
          path="/collections/:collectionName"
          element={<CollectionPage />}
        />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/states" element={<StatesPage />} />
        <Route path="/states/:stateId" element={<StatePage />} />

        {/* Festive Special Routes */}
        <Route path="/festive-specials" element={<FestiveLandingPage />} />
        <Route path="/festive-specials/:slug" element={<FestivalPage />} />

        {/* Authentication Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
