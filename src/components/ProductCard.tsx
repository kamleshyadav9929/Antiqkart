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

  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.floor(rating || 0);
    const partialStarFill = Math.round(((rating || 0) - fullStars) * 100);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={14}
          className="text-yellow-400 fill-yellow-400"
        />
      );
    }
    if (partialStarFill > 0 && fullStars < totalStars) {
      stars.push(
        <div key="partial" className="relative">
          <Star size={14} className="text-gray-300" />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${partialStarFill}%` }}
          >
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }
    const emptyStars = totalStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Taller Image Section */}
      <div className="relative bg-gray-50 flex-shrink-0 h-64 w-full">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full bg-white"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </a>
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

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-shrink-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {collectionName || "Antiqkart"}
          </p>
          <h3
            className="h-10 text-sm font-semibold text-slate-800 mt-1 overflow-hidden"
            title={name}
          >
            {name}
          </h3>
        </div>
        <div className="flex-grow" />
        <div className="flex-shrink-0">
          {/* Rating */}
          <div className="h-[20px] mt-1">
            {rating && rating > 0 && (
              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="text-xs text-gray-500 ml-1">({rating})</span>
              </div>
            )}
          </div>
          {/* Price */}
          <div className="mt-2">
            {price && (
              <p className="text-lg font-semibold text-slate-900 flex items-baseline">
                ₹{price}
                <span className="ml-1 text-[9px] text-gray-400 font-normal whitespace-nowrap">
                  (price may vary)
                </span>
              </p>
            )}
          </div>
          {/* Action Button */}
          <div className="mt-4">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 py-2.5 px-3 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              View on Amazon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
