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
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md border border-gray-200/80 w-full text-left h-full">
      {/* Image Container */}
      <div className="relative flex-shrink-0 flex items-center justify-center p-4 bg-gray-50 aspect-square">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-grow p-3">
        {/* Product Title */}
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

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mt-auto">
          {formattedPrice}
        </p>

        <div className="mt-3 space-y-2">
          {/* Main CTA Button */}
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm font-semibold text-gray-900 bg-gradient-to-b from-[#f8e3ad] to-[#eeba37] py-2 px-3 rounded-lg border border-[#c89411] hover:from-[#f7dfa0] hover:to-[#e7b124] shadow-sm"
          >
            View on Amazon
          </a>

          {/* Wishlist Button */}
          <button
            onClick={handleCartClick}
            className={`w-full flex items-center justify-center gap-x-2 text-sm font-semibold py-2 px-3 rounded-lg border transition-colors duration-300 ${
              inCart
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag size={16} />
            {inCart ? "In Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
