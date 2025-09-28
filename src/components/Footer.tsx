import { Link } from "react-router-dom";
import { Instagram, Youtube, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-8">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-round.png"
                alt="AntiqKart Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Discover timeless antiques and curated collections from across
              India, connecting you to the heart of authentic craftsmanship.
            </p>
            <h3 className="text-white font-semibold tracking-wider text-sm mb-4">
              Join Our Journey
            </h3>
            <form className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-slate-700/60 border border-slate-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-amber-500 text-white p-3 rounded-md hover:bg-amber-600 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold tracking-wider text-sm mb-4">
                  Explore
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      to="/shop"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/states"
                      className="hover:text-amber-400 transition-colors"
                    >
                      States
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/collections"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Collections
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold tracking-wider text-sm mb-4">
                  Company
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-amber-400 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold tracking-wider text-sm mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-amber-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-amber-500 transition-colors"
                    aria-label="Youtube"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AntiqKart. All rights reserved.</p>
          <div className="flex gap-x-4 mt-2 sm:mt-0">
            <Link to="/privacy-policy" className="hover:text-amber-400">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-amber-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
