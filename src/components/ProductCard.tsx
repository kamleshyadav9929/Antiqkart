import React from "react";
import { Heart, Star } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  collectionName?: string;
  affiliateLink: string;
  price?: string;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  collectionName,
  affiliateLink,
  price,
  rating,
}) => {
  const { addToCart, isItemInCart, removeFromCart } = useCart();
  const inWishlist = isItemInCart(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* --- Image Section --- */}
      <div className="relative bg-gray-50 aspect-square flex items-center justify-center">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </a>
        {/* Wishlist Floating */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {collectionName || "Antiqkart"}
        </p>

        {/* Name (Single line) */}
        <h3
          className="text-sm font-semibold text-slate-800 mt-1 truncate"
          title={name}
        >
          {name}
        </h3>

        {/* Rating */}
        {rating && rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Price */}
        {price && (
          <p className="mt-2 text-lg font-semibold text-slate-900 flex items-baseline">
            ₹{price}
            <span className="ml-1 text-[10px] text-gray-400 font-normal">
              (price may vary)
            </span>
          </p>
        )}

        <div className="flex-grow" />

        {/* --- Action --- */}
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 py-2.5 px-3 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg mt-4"
        >
          View on Amazon
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
