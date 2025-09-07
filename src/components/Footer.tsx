import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="block mb-4">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Discover timeless antiques and curated collections from across
              India.
            </p>
            <h3 className="text-white font-medium mb-3">Join Our Newsletter</h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-slate-800 text-white rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-slate-900 p-2 rounded-r-md hover:bg-yellow-500 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-white font-medium uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
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
                  Shop by State
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
          <div>
            <h3 className="text-white font-medium uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
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
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
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
      <div className="border-t border-slate-800 py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} AntiqKart. All rights reserved.</p>
        <p className="mt-1">Made with ❤️ in India.</p>
      </div>
    </footer>
  );
};

export default Footer;
