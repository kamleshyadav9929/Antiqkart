import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; // Import the useCart hook

interface ProductCardProps {
  id: string; // Product ID is now required
  image: string;
  name: string;
  price?: string | number;
  affiliateLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  affiliateLink,
}) => {
  const { addToCart, isItemInCart, removeFromCart } = useCart();
  const inCart = isItemInCart(id);

  const formattedPrice =
    price != null
      ? String(price).startsWith("₹")
        ? String(price)
        : `₹${String(price)}`
      : null;

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white border border-gray-200/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden aspect-[1/1] bg-gray-50"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </a>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 flex-grow">
          {name}
        </h3>
        <div className="mt-4">
          {formattedPrice && (
            <p className="text-lg font-semibold text-gray-900 mb-3">
              {formattedPrice}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs sm:text-sm font-semibold text-white bg-slate-800 py-2 px-3 rounded-lg transition-colors hover:bg-slate-700"
            >
              Buy Now
            </a>
            {/* Updated Cart Button */}
            <button
              onClick={handleCartClick}
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-colors border ${
                inCart
                  ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              aria-label={inCart ? "Remove from wishlist" : "Add to wishlist"}
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
