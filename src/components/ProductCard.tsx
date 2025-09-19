import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  id: string;
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

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  const formattedPrice =
    price !== undefined
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
        }).format(Number(price.toString().replace(/[^0-9.-]+/g, "")))
      : "Price upon request";

  return (
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md w-full text-left h-full">
      {/* FIX: Removed padding ('p-4') from this container to eliminate the inner border effect */}
      <div className="relative flex-shrink-0 flex items-center justify-center bg-gray-50 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow p-3">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-2"
        >
          <h3 className="text-sm text-gray-800 line-clamp-3 hover:text-amber-700 hover:underline">
            {name}
          </h3>
        </a>

        <p className="text-lg font-bold text-gray-900 mt-auto">
          {formattedPrice}
        </p>

        <div className="mt-3 space-y-2">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm font-semibold text-gray-900 bg-gradient-to-b from-[#f8e3ad] to-[#eeba37] py-2 px-3 rounded-lg border border-[#c89411] hover:from-[#f7dfa0] hover:to-[#e7b124] shadow-sm whitespace-nowrap"
          >
            View on Amazon
          </a>
          <button
            onClick={handleCartClick}
            className={`w-full flex items-center justify-center gap-x-2 text-sm font-semibold py-2 px-3 rounded-lg border transition-colors duration-300 whitespace-nowrap ${
              inCart
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">
              {inCart ? "In Wishlist" : "Add to Wishlist"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
