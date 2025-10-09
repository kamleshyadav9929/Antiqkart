import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Home,
  Store,
  MapPin,
  Layers,
  Sparkles,
  Info,
  Mail,
  User,
  LogOut,
} from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabaseClient";
import GooeyNav from "./GooeyNav";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartProductDetails } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener("open-search-overlay", handleOpenSearch);
    return () =>
      window.removeEventListener("open-search-overlay", handleOpenSearch);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { label: "Home", href: "/", icon: <Home size={22} /> },
    { label: "Shop", href: "/shop", icon: <Store size={22} /> },
    { label: "States", href: "/states", icon: <MapPin size={22} /> },
    { label: "Collections", href: "/collections", icon: <Layers size={22} /> },
    {
      label: "Festive Specials",
      href: "/festive-specials",
      icon: <Sparkles size={22} />,
    },
    { label: "About Us", href: "/about", icon: <Info size={22} /> },
    { label: "Contact Us", href: "/contact", icon: <Mail size={22} /> },
  ];

  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-serif font-semibold text-lg">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              <ul className="flex flex-col gap-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "bg-amber-50 text-amber-600"
                            : "text-gray-600 hover:bg-gray-100 hover:text-slate-900"
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gray-200">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-slate-800"
                    title="Sign Out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-x-2 px-4 py-3 rounded-lg text-base font-semibold transition-colors bg-slate-900 text-white hover:bg-slate-800"
                >
                  <User size={20} />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/new_logo.png"
                alt="AntiqKart Logo" // Add this alt text
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-slate-900 hidden sm:block">
                AntiqKart
              </span>
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center">
            <GooeyNav items={navItems.slice(0, 5)} />
          </div>
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-gray-600">
            <button
              className="p-2 rounded-full hover:bg-gray-100 hover:text-slate-900 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 hover:text-slate-900 transition-colors relative"
              aria-label="View Cart"
            >
              <ShoppingCart size={20} />
              {cartProductDetails && cartProductDetails.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartProductDetails.length}
                </span>
              )}
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                    <span className="hidden lg:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
                  title="Sign In"
                >
                  <User size={16} />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-full hover:bg-gray-100 hover:text-slate-900 transition-colors"
                aria-label="Toggle Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <MobileMenu />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
