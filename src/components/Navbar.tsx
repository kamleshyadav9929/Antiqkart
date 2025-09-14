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
} from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart"; // This hook provides the cart data
import { supabase } from "../lib/supabaseClient";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { cartItems } = useCart(); // We get the list of cart items here

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Shop",
      href: "/shop",
      dropdown: true,
      menu: <ShopMegaMenu />,
    },
    {
      name: "States",
      href: "/states",
      dropdown: true,
      menu: <StatesMegaMenu />,
    },
    { name: "Collections", href: "/collections" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
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
          <ul className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  to={link.href}
                  className={`relative flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-accent ${
                    currentPath === link.href ? "text-text" : "text-muted"
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="ml-1" />}
                </Link>
                {link.dropdown && link.menu}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-x-2 sm:gap-x-3 text-muted">
            <button
              className="p-2 rounded-full hover:bg-gray-100 hover:text-text transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            {/* --- THIS IS THE CART ICON WITH THE NUMBER BADGE --- */}
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 hover:text-text transition-colors relative"
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
                  className="text-sm font-semibold hover:text-accent transition-colors p-2"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </nav>
      </header>
      <MobileBottomNav />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

// ... (ShopMegaMenu, StatesMegaMenu, and MobileBottomNav components remain the same)

interface Collection {
  id: string;
  name: string;
  image: string;
}

const ShopMegaMenu = () => {
  const [featuredCollections, setFeaturedCollections] = useState<Collection[]>(
    []
  );

  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("id, name, image")
        .limit(3);

      if (error) {
        console.error("Error fetching featured collections:", error.message);
      } else {
        setFeaturedCollections(data || []);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 pt-4">
      <div className="bg-white rounded-lg shadow-2xl w-[600px] border border-gray-100">
        <div className="p-6 grid grid-cols-3 gap-6">
          {featuredCollections.length > 0
            ? featuredCollections.map((item) => (
                <Link
                  key={item.id}
                  to={`/collections/${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block group/item"
                >
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-800 group-hover/item:text-accent">
                    {item.name}
                  </h4>
                </Link>
              ))
            : // Skeleton loaders
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <Link
            to="/shop"
            className="text-sm font-semibold text-accent hover:underline"
          >
            View All Products &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

interface State {
  id: string;
  name: string;
}

const StatesMegaMenu = () => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      const { data, error } = await supabase
        .from("states")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching states:", error);
      } else {
        setStates(data || []);
      }
    };
    fetchStates();
  }, []);

  const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 pt-4">
      <div className="bg-white rounded-lg shadow-2xl w-[700px] border border-gray-100 p-6">
        <div className="grid grid-cols-4 gap-x-6 gap-y-4">
          {states.length > 0
            ? states.map((state) => (
                <Link
                  key={state.id}
                  to={`/states/${slugify(state.name)}`}
                  className="block text-sm text-muted hover:text-accent hover:font-semibold transition-all duration-200"
                >
                  {state.name}
                </Link>
              ))
            : Array.from({ length: 28 }).map((_, index) => (
                <div
                  key={index}
                  className="h-5 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <Link
            to="/states"
            className="text-sm font-semibold text-accent hover:underline"
          >
            View All States &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mobileNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "States", href: "/states", icon: Map },
    { name: "More", href: "/collections", icon: Layers },
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
