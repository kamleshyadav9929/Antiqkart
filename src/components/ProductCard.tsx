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
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-[var(--border-color)] transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative flex-shrink-0 flex items-center justify-center bg-gray-50 aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </a>

      <div className="flex flex-col flex-grow p-4">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-2"
        >
          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-black transition-colors">
            {name}
          </h3>
        </a>

        <p className="text-lg font-bold text-black mt-auto">{formattedPrice}</p>

        <div className="mt-4 space-y-2">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm font-semibold text-white bg-slate-950 py-2.5 px-3 rounded-md hover:opacity-90 transition-opacity"
          >
            View on Amazon
          </a>
          <button
            onClick={handleCartClick}
            className={`w-full flex items-center justify-center gap-x-2 text-sm font-semibold py-2.5 px-3 rounded-md border transition-colors duration-300 ${
              inCart
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <ShoppingBag size={16} />
            <span className="sm:hidden">
              {inCart ? "In Cart" : "Add to cart"}
            </span>
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
