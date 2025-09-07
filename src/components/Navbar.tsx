import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Home, Store, Map, Layers } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";

// --- Main Desktop Navbar ---
const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const desktopNavLinks = [
    { name: "Shop", href: "/shop" },
    { name: "States", href: "/states" },
    { name: "Collections", href: "/collections" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const DesktopNavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        to={href}
        className={`relative text-sm font-medium transition-colors hover:text-accent ${
          currentPath === href ? "text-text" : "text-muted"
        }`}
      >
        {children}
        {currentPath === href && (
          <span className="absolute left-1/2 -bottom-2.5 block h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
        )}
      </Link>
    </li>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-gray-200/80">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-serif font-semibold tracking-wide text-text">
                AntiqKart
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-x-10">
            {desktopNavLinks.map((link) => (
              <DesktopNavLink key={link.name} href={link.href}>
                {link.name}
              </DesktopNavLink>
            ))}
          </ul>

          {/* Right Side: Icons & Auth */}
          <div className="flex items-center gap-x-3 text-muted">
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
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="text-sm font-semibold hover:text-accent transition-colors"
              >
                Sign In
              </Link>
            </SignedOut>
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
    { name: "Collections", href: "/collections", icon: Layers },
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
