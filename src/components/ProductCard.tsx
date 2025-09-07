import React from "react";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price?: string;
  affiliateLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  affiliateLink,
}) => {
  return (
    <div className="group relative flex flex-col bg-white border border-gray-200/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Product Image */}
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden aspect-[4/3] bg-gray-50"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </a>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4">
        {/* Set a fixed height for the title area to ensure consistency */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
          {name}
        </h3>

        <div className="mt-4">
          {price && (
            <p className="text-lg font-semibold text-gray-900 mb-3">₹{price}</p>
          )}

          <div className="flex items-center space-x-2">
            {/* Buy Now Button */}
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-semibold text-white bg-slate-800 py-2 px-4 rounded-lg transition-colors hover:bg-slate-700"
            >
              Buy Now
            </a>

            {/* Add to Cart Button */}
            <button
              className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg text-gray-700 transition-colors hover:bg-gray-100"
              aria-label="Add to cart"
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
