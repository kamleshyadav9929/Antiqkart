import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Home,
  Store,
  Map,
  Layers,
  Sparkles, // New Icon
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";
import { supabase } from "../lib/supabaseClient";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartItems } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "States", href: "/states" },
    { name: "Collections", href: "/collections" },
    // --- NEW FESTIVE LINK ---
    { name: "Festive Specials", href: "/festive-specials", icon: Sparkles },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-black hidden sm:block">
                AntiqKart
              </span>
            </Link>
          </div>
          <ul className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  to={link.href}
                  className={`relative flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-black ${
                    currentPath.startsWith(link.href) && link.href !== "/"
                      ? "text-amber-600"
                      : currentPath === link.href
                      ? "text-black"
                      : "text-gray-800"
                  }`}
                >
                  {link.icon && <link.icon size={16} />}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-gray-800">
            <button
              className="p-2 rounded-full hover:bg-gray-100 hover:text-black transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 hover:text-black transition-colors relative"
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-amber-600 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />
            <div className="flex items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="text-sm font-semibold hover:text-black transition-colors p-2"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </nav>
      </header>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
