import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import GiTaggedProducts from "../components/GiTaggedProducts";
import StatesGrid from "../components/StatesGrid";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";
import NewArrivals from "../components/NewArrivals";

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Helper component for the angled sections
  const AngledSection = ({
    children,
    className,
    isLast = false,
  }: {
    children: React.ReactNode;
    className: string;
    isLast?: boolean;
  }) => {
    const clipPathStyle = isLast
      ? { clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0% 100%)" }
      : { clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0% 100%)" };

    return (
      <div
        className={`relative -mt-16 md:-mt-24 ${className}`}
        style={clipPathStyle}
      >
        <div className="py-24 md:py-36">
          <Layout>{children}</Layout>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <main>
          <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />
        </main>

        <AngledSection className="bg-white">
          <NewArrivals />
        </AngledSection>

        <AngledSection className="bg-slate-50">
          <FeaturedProducts />
        </AngledSection>

        <AngledSection className="bg-white">
          <TrendingProducts />
        </AngledSection>

        <AngledSection className="bg-white">
          <GiTaggedProducts />
        </AngledSection>

        <AngledSection className="bg-white">
          <StatesGrid />
        </AngledSection>

        <AngledSection className="bg-slate-50" isLast={true}>
          <Collections />
        </AngledSection>
      </div>
      <Footer />
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
      />
    </>
  );
};

export default Homepage;
