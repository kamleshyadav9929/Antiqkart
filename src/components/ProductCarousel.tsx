import React from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  affiliate_link: string;
  rating?: number;
}

interface ProductCarouselProps {
  title: string;
  description: string;
  products: Product[];
  loading: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  description,
  products,
  loading,
}) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Don't render the section if there are no products
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-text">
          {title}
        </h2>
        <p className="mt-2 text-muted max-w-2xl">{description}</p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                affiliateLink={product.affiliate_link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
