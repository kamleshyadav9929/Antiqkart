import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow p-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200 rounded-lg"></div>

      {/* Text Skeleton */}
      <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>

      {/* Price Skeleton */}
      <div className="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Button Skeleton */}
      <div className="mt-2 w-full bg-gray-200 h-8 rounded-lg"></div>
    </div>
  );
};

export default SkeletonCard;
