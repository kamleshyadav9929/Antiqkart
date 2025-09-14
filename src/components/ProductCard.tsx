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
    e.preventDefault(); // Prevent navigating when clicking the button
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
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md border border-gray-200/80 w-full text-left">
      <div className="relative overflow-hidden aspect-square">
        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      </div>

      <div className="flex flex-col flex-grow p-3">
        <h3 className="text-sm font-serif text-gray-800 line-clamp-2 flex-grow h-10">
          {name}
        </h3>
        <p className="text-sm font-sans font-semibold text-gray-700 mt-1">
          {formattedPrice}
        </p>
        <div className="mt-3 flex items-center gap-x-2">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow text-center text-xs font-bold text-white bg-slate-800 py-2.5 px-3 rounded-md transition-colors duration-300 hover:bg-slate-700"
          >
            Buy Now
          </a>
          <button
            onClick={handleCartClick}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-300 ease-in-out border ${
              inCart
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-800 border-gray-300 hover:bg-gray-100"
            }`}
            aria-label={inCart ? "Remove from wishlist" : "Add to wishlist"}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
