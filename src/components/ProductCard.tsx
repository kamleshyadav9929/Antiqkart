import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
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
    // --- FIXED LOGIC ---
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  // Simple price formatting, can be expanded
  const formattedPrice =
    price !== undefined
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
        }).format(Number(price.toString().replace(/[^0-9.-]+/g, "")))
      : "Price upon request";

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg border border-gray-200/80">
      <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </a>
        <button
          onClick={handleCartClick}
          className={`absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-in-out ${
            inCart
              ? "bg-amber-600 text-white shadow-md"
              : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-amber-600"
          }`}
          aria-label={inCart ? "Remove from wishlist" : "Add to wishlist"}
        >
          <ShoppingBag size={18} />
        </button>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-serif text-gray-800 line-clamp-2 flex-grow mb-2">
          {name}
        </h3>
        <p className="text-sm font-sans font-semibold text-gray-600 mb-4">
          {formattedPrice}
        </p>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center text-sm font-semibold text-white bg-slate-800 py-2.5 px-4 rounded-lg transition-colors duration-300 hover:bg-slate-700 inline-flex items-center justify-center gap-2"
        >
          Buy Now <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
