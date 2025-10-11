import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart, // Changed from Heart
  Menu,
  User,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

// Interfaces for dropdown content
interface DropdownItem {
  id: string | number;
  name: string;
  slug: string;
}

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);

  // State for dropdown content
  const [states, setStates] = useState<DropdownItem[]>([]);
  const [collections, setCollections] = useState<DropdownItem[]>([]);
  const [festivals, setFestivals] = useState<DropdownItem[]>([]);

  const { cartProductDetails } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const exploreMenuRef = useRef<HTMLDivElement>(null);

  // Fetch data for the explore dropdown
  useEffect(() => {
    const fetchDropdownData = async () => {
      const [statesRes, collectionsRes, festivalsRes] = await Promise.all([
        supabase.from("states").select("id, name").limit(5).order("name"),
        supabase.from("collections").select("id, name").limit(5).order("name"),
        supabase
          .from("festivals")
          .select("id, name, slug")
          .limit(5)
          .order("start_date", { ascending: false }),
      ]);

      if (statesRes.data)
        setStates(
          statesRes.data.map((s) => ({
            ...s,
            slug: s.name.toLowerCase().replace(/\s+/g, "-"),
          }))
        );
      if (collectionsRes.data)
        setCollections(
          collectionsRes.data.map((c) => ({
            ...c,
            slug: c.name.toLowerCase().replace(/\s+/g, "-"),
          }))
        );
      if (festivalsRes.data) setFestivals(festivalsRes.data);
    };
    fetchDropdownData();
  }, []);

  // Effect for closing menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exploreMenuRef.current &&
        !exploreMenuRef.current.contains(event.target as Node)
      ) {
        setIsExploreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open search overlay event listener
  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener("open-search-overlay", handleOpenSearch);
    return () =>
      window.removeEventListener("open-search-overlay", handleOpenSearch);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const DropdownColumn = ({
    title,
    items,
    basePath,
    viewAllPath,
  }: {
    title: string;
    items: DropdownItem[];
    basePath: string;
    viewAllPath: string;
  }) => (
    <div>
      <h3 className="font-semibold text-sm text-gray-800 tracking-wider uppercase mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={`${basePath}/${item.slug}`}
              onClick={() => setIsExploreMenuOpen(false)}
              className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={viewAllPath}
        onClick={() => setIsExploreMenuOpen(false)}
        className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 mt-4"
      >
        View All <ArrowRight size={14} />
      </Link>
    </div>
  );

  const UserAvatar = ({ size = "w-8 h-8" }: { size?: string }) => {
    if (!user) return null;

    const avatarUrl = user.user_metadata?.avatar_url;

    return avatarUrl ? (
      <img
        src={avatarUrl}
        alt={user.user_metadata?.full_name || "User"}
        className={`${size} rounded-full object-cover`}
      />
    ) : (
      <div
        className={`${size} rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm`}
      >
        {user.email?.charAt(0).toUpperCase() || "A"}
      </div>
    );
  };

  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 flex flex-col"
          >
            <div className="p-4 flex-grow overflow-y-auto">
              <ul className="flex flex-col gap-y-1">
                {mainNavItems.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                          isActive
                            ? "bg-amber-50 text-amber-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-4">
                  <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase">
                    Explore
                  </h3>
                </li>
                <li>
                  <Link
                    to="/states"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100"
                  >
                    States
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/festive-specials"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Festive Specials
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4 border-t">
              {user ? (
                <div className="flex items-center gap-x-3">
                  <UserAvatar size="w-10 h-10" />
                  <div className="flex-grow truncate">
                    <p className="font-semibold text-sm truncate">
                      {user.email}
                    </p>
                    <button
                      onClick={handleSignOut}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-x-2 py-3 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800"
                >
                  <User size={20} />
                  Sign In / Sign Up
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
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        {/* Full width bar with no extra outer margins - logo/text flush left, actions flush right */}
        <nav className="relative w-full flex items-center justify-between h-12 sm:h-12 lg:h-14 px-3 sm:px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="./logo.png"
                alt="AntiqKart Logo"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-sm"
              />
              <span className="text-xl md:text-2xl font-serif font-semibold text-slate-900 tracking-tight">
                AntiqKart
              </span>
            </Link>
          </div>

          {/* center / desktop nav - centered */}
          <div className="hidden md:flex items-center gap-x-1 lg:gap-x-2 absolute left-1/2 transform -translate-x-1/2">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-amber-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div
              ref={exploreMenuRef}
              onMouseEnter={() => setIsExploreMenuOpen(true)}
              onMouseLeave={() => setIsExploreMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isExploreMenuOpen
                    ? "text-amber-600 bg-amber-50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Explore</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isExploreMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isExploreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-full max-w-4xl left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                      <DropdownColumn
                        title="Explore by State"
                        items={states}
                        basePath="/states"
                        viewAllPath="/states"
                      />
                      <DropdownColumn
                        title="Curated Collections"
                        items={collections}
                        basePath="/collections"
                        viewAllPath="/collections"
                      />
                      <DropdownColumn
                        title="Festive Specials"
                        items={festivals}
                        basePath="/festive-specials"
                        viewAllPath="/festive-specials"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* actions - flush right */}
          <div className="flex items-center gap-x-2 sm:gap-x-3 ml-auto">
            <button
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-slate-800 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-slate-800 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cartProductDetails.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartProductDetails.length}
                </span>
              )}
            </Link>
            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-slate-800 transition-colors"
                  aria-label="Sign Out"
                >
                  <UserAvatar />
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-slate-800 transition-colors"
                  aria-label="Sign In"
                >
                  <User size={22} />
                </Link>
              )}
            </div>
            <button
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
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
