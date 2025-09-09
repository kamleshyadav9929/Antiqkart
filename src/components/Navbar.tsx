import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Home,
  Store,
  Map,
  Layers,
  Info,
  Mail,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../context/CartContext";

// --- Main Navbar Component (Top Bar for All Screens) ---
const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartItems } = useCart();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "States", href: "/states", icon: Map },
    { name: "Collections", href: "/collections", icon: Layers },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  const DesktopNavLink = ({
    href,
    children,
    icon: Icon,
  }: {
    href: string;
    children: React.ReactNode;
    icon: React.ElementType;
  }) => (
    <li>
      <Link
        to={href}
        className={`relative flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-accent ${
          currentPath === href ? "text-text" : "text-muted"
        }`}
      >
        <Icon size={16} />
        {children}
      </Link>
    </li>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-gray-200/80 bg-white">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left Side: Logo (Responsive) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-9 md:h-10 w-auto"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-text hidden sm:block">
                AntiqKart
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav Links (with Icons) */}
          <ul className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <DesktopNavLink key={link.name} href={link.href} icon={link.icon}>
                {link.name}
              </DesktopNavLink>
            ))}
          </ul>

          {/* Right Side: Icons & Auth */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-muted">
            <button
              className="p-2 rounded-full hover:bg-gray-100 hover:text-text transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 hover:text-text transition-colors relative"
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-accent text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
                  className="text-sm font-semibold hover:text-accent transition-colors p-2"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </nav>
      </header>

      {/* --- Mobile Bottom Navigation --- */}
      <MobileBottomNav />

      {/* --- Search Overlay --- */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

// --- Mobile Bottom Navigation Component ---
const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mobileNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "States", href: "/states", icon: Map },
    { name: "More", href: "/collections", icon: Layers }, // "More" for simplicity on small screens
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-md z-40">
      <ul className="flex justify-around items-center h-16">
        {mobileNavLinks.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <li key={link.name}>
              <Link
                to={link.href}
                className="flex flex-col items-center justify-center gap-1 w-16"
              >
                <link.icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
