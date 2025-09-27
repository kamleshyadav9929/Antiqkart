import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";
import GooeyNav from "./GooeyNav"; // <-- Import the new component

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();

  // Define the navigation items for the GooeyNav
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "States", href: "/states" },
    { label: "Collections", href: "/collections" },
    { label: "Festive Specials", href: "/festive-specials" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-700">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2 flex-wrap">
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

          {/* Gooey Navigation - Centered and allowed to wrap */}
          <div className="flex-grow flex justify-center min-w-0 px-2 sm:px-4 order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0">
            <GooeyNav items={navItems} />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-gray-300 order-2 sm:order-3">
            <button
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors relative"
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block" />
            <div className="flex items-center">
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
