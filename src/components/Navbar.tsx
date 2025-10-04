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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Shop", href: "/shop", icon: <Store size={20} /> },
    { label: "States", href: "/states", icon: <MapPin size={20} /> },
    { label: "Collections", href: "/collections", icon: <Layers size={20} /> },
    {
      label: "Festive Specials",
      href: "/festive-specials",
      icon: <Sparkles size={20} />,
    },
    { label: "About Us", href: "/about", icon: <Info size={20} /> },
    { label: "Contact Us", href: "/contact", icon: <Mail size={20} /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2">
          {/* Logo for desktop, hidden on mobile */}
          <div className="hidden sm:flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-slate-900 hidden sm:block">
                AntiqKart
              </span>
            </Link>
          </div>
          {/* GooeyNav for desktop */}
          <div className="hidden md:flex flex-grow justify-center">
            <GooeyNav items={navItems.slice(0, 5)} />
          </div>
          {/* Desktop right section */}
          <div className="hidden md:flex items-center gap-x-2 sm:gap-x-3 text-gray-600">
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
          </div>
          {/* Mobile: Logo + search bar + cart + menu */}
          <div className="flex w-full items-center gap-2 md:hidden">
            {/* Logo always visible on mobile */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
            {/* Hero-style search bar */}
            <button
              className="flex-1 flex items-center bg-white rounded-full px-4 py-2 shadow border border-gray-200 focus:outline-none"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
              style={{ minWidth: 0 }}
            >
              <Search size={20} className="text-amber-500 mr-2" />
              <span className="text-gray-500 text-base font-normal truncate text-left">
                Search for antiques, states, collections...
              </span>
            </button>
            {/* Cart icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="View Cart"
            >
              <ShoppingCart size={22} className="text-gray-600" />
              {cartProductDetails && cartProductDetails.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartProductDetails.length}
                </span>
              )}
            </Link>
            {/* Hamburger menu */}
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full right-4 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
            <ul className="p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
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
              <li className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-3 py-2">
                  {user ? (
                    <div className="flex items-center gap-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-x-3 text-gray-600 hover:text-slate-900 w-full text-left"
                      >
                        <LogOut size={20} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-x-3 text-gray-600 hover:text-slate-900"
                    >
                      <User size={20} />
                      Sign In
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      {/* Bottom Navigation for Small Screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex md:hidden">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                isActive
                  ? "text-amber-600 bg-amber-50"
                  : "text-gray-500 hover:text-amber-600"
              }`
            }
            aria-label={item.label}
          >
            <span>{item.icon}</span>
            <span className="text-[11px] font-medium mt-0.5">{item.label}</span>
          </NavLink>
        ))}
        <NavLink
          to={user ? "/cart" : "/auth"}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              isActive
                ? "text-amber-600 bg-amber-50"
                : "text-gray-500 hover:text-amber-600"
            }`
          }
          aria-label={user ? "Cart" : "Sign In"}
        >
          <span>
            <ShoppingCart size={20} />
            {cartProductDetails && cartProductDetails.length > 0 && (
              <span className="absolute bottom-6 right-4 text-[10px] bg-amber-500 text-white font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartProductDetails.length}
              </span>
            )}
          </span>
          <span className="text-[11px] font-medium mt-0.5">
            {user ? "Cart" : "Sign In"}
          </span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
