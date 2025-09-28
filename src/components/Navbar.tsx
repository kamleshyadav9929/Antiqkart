import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-700">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-white hidden sm:block">
                AntiqKart
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-gray-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-gray-300">
            <button
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors relative"
              aria-label="View Cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block" />
            <div className="hidden md:flex items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="text-sm font-semibold hover:text-white transition-colors p-2"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
            {/* Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full right-4 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
            <ul className="p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "bg-slate-700 text-amber-400"
                          : "text-gray-300 hover:bg-slate-700 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="border-t border-slate-700 mt-2 pt-2">
                <div className="px-3 py-2">
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <Link
                      to="/sign-in"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-x-3 text-gray-300 hover:text-white"
                    >
                      Sign In
                    </Link>
                  </SignedOut>
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
    </>
  );
};

export default Navbar;
