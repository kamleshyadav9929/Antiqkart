import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1: Brand Info (larger on desktop) */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              Discover timeless antiques and curated collections from across
              India, connecting you to the heart of authentic craftsmanship.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-white font-medium uppercase tracking-wider text-sm mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/states"
                  className="hover:text-white transition-colors"
                >
                  States
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-white font-medium uppercase tracking-wider text-sm mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="md:col-span-12 lg:col-span-2 lg:text-right">
            <h3 className="text-white font-medium uppercase tracking-wider text-sm mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4 lg:justify-end">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AntiqKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
