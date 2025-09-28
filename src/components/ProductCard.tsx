import React from "react";
import { Heart, Star, Zap } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  collectionName?: string;
  affiliateLink: string;
  price?: string;
  rating?: number;
  tag?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  collectionName,
  affiliateLink,
  price,
  rating,
  tag,
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
    const starSize = 14;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={starSize}
          className="text-yellow-400 fill-yellow-400"
        />
      );
    }
    if (partialStarFill > 0 && fullStars < totalStars) {
      stars.push(
        <div key="partial" className="relative">
          <Star size={starSize} className="text-gray-300" />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${partialStarFill}%` }}
          >
            <Star size={starSize} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }
    const emptyStars = totalStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={starSize} className="text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative bg-gray-100 flex-shrink-0 h-48 sm:h-64 w-full group">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full p-2"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
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

        {tag && (
          <div className="absolute top-3 left-3 bg-amber-400/90 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-x-1 shadow-sm">
            {tag === "Trending" && <Zap size={12} />}
            <span>{tag}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-2 sm:p-4">
        <div className="flex-shrink-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
            {collectionName || "Antiqkart"}
          </p>
          <h3
            className="h-10 text-sm font-semibold text-slate-800 mt-1 overflow-hidden line-clamp-2"
            title={name}
          >
            {name}
          </h3>
        </div>
        <div className="flex-grow" />
        <div className="flex-shrink-0">
          {/* Responsive Rating Display */}
          <div className="h-[20px] mt-1">
            {rating && rating > 0 && (
              <>
                {/* Compact rating for mobile */}
                <div className="flex items-center gap-1 sm:hidden">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs text-gray-600 font-semibold">
                    {rating.toFixed(1)}
                  </span>
                </div>
                {/* Full stars for sm and up */}
                <div className="hidden sm:flex items-center gap-1">
                  {renderStars()}
                  <span className="text-xs text-gray-500 ml-1">({rating})</span>
                </div>
              </>
            )}
          </div>
          {/* Price */}
          <div className="mt-2">
            {price && (
              <p className="text-base sm:text-lg font-semibold text-slate-900 flex items-baseline">
                ₹{price}
                <span className="ml-1 text-[9px] text-gray-400 font-normal whitespace-nowrap hidden sm:inline">
                  (price may vary)
                </span>
              </p>
            )}
          </div>
          {/* Button */}
          <div className="mt-3 sm:mt-4">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-xs font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 py-2 px-2 sm:py-2.5 sm:px-3 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
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
