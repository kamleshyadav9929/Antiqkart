import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Home,
  Store,
  MapPin,
  Layers,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";
import GooeyNav from "./GooeyNav";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();

  // Desktop ke liye navigation links
  const desktopNavItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "States", href: "/states" },
    { label: "Collections", href: "/collections" },
    { label: "Festive Specials", href: "/festive-specials" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  // Mobile ke dockbar ke liye links
  const mobileNavItems = [
    { label: "Home", href: "/", icon: <Home size={22} /> },
    { label: "Shop", href: "/shop", icon: <Store size={22} /> },
    { label: "States", href: "/states", icon: <MapPin size={22} /> },
    { label: "Collections", href: "/collections", icon: <Layers size={22} /> },
  ];

  return (
    <>
      {/* Desktop aur Tablet ke liye Header */}
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

          {/* Sirf Desktop ke liye Gooey Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            <GooeyNav items={desktopNavItems} />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-gray-300">
            <button
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search kholen"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors relative"
              aria-label="Cart dekhein"
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

      {/* Sirf Mobile ke liye DockBar Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 p-1 z-50">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end // 'end' prop use karein taaki 'Home' sirf root path par active ho
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive ? "text-amber-400" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
