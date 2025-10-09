import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Zap, Eye } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Product } from "../context/cart-context";
import { useUser } from "../hooks/useUser";

interface ProductCardProps {
  product: Product;
  tag?: string;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  tag,
  onQuickView,
}) => {
  const { addToCart, isItemInCart, removeFromCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const productId = product.id;
  const inWishlist = isItemInCart(productId);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/auth");
      return;
    }

    if (inWishlist) {
      await removeFromCart(productId);
    } else {
      try {
        await addToCart(product);
      } catch (error) {
        console.error("Redirecting to login:", error);
        navigate("/auth");
      }
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const renderStars = () => {
    const rating = product.rating || 0;
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const partialStarFill = Math.round((rating - fullStars) * 100);
    const stars = [];
    const starSize = 14;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={starSize}
          className="text-amber-400 fill-amber-400"
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
            <Star size={starSize} className="text-amber-400 fill-amber-400" />
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
    <div className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative flex-shrink-0 w-full group overflow-hidden rounded-t-2xl aspect-square">
        <a
          href={product.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <img
            alt={product.name}
            src={product.image}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-full shadow-md transition-all duration-200 cursor-pointer ${
              inWishlist && user
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              size={18}
              className={inWishlist && user ? "fill-current" : ""}
              fill={inWishlist && user ? "currentColor" : "none"}
            />
          </button>
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Quick View"
            >
              <Eye size={18} />
            </button>
          )}
        </div>

        {tag && (
          <div className="absolute top-3 left-3 bg-amber-400/90 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-x-1 shadow-sm">
            {tag === "Trending" && <Zap size={12} />}
            <span>{tag}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-2 sm:p-4">
        <div className="flex-shrink-0">
          {product.collections?.name && (
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
              {product.collections.name}
            </p>
          )}
          <h3
            className="text-sm font-semibold text-slate-800 mt-1 min-h-[2.5rem] line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>
        <div className="flex-grow" />
        <div className="flex-shrink-0">
          <div className="h-[20px] mt-1">
            {product.rating && product.rating > 0 && (
              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="text-xs text-gray-600 font-semibold ml-1">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2">
            {product.price && (
              <p className="text-lg sm:text-xl font-semibold text-slate-700 flex items-baseline">
                ₹{product.price}
                <span className="ml-1 text-[9px] text-gray-500 font-normal whitespace-nowrap">
                  (price may vary)
                </span>
              </p>
            )}
          </div>
          <div className="mt-3 sm:mt-4">
            <a
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-xs font-bold text-white bg-slate-800 py-2 px-2 sm:py-2.5 sm:px-3 rounded-lg hover:bg-slate-900 transition-all shadow-md hover:shadow-lg"
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
