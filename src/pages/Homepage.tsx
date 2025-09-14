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
import { ShapeOne, ShapeTwo } from "../components/DecorativeShapes";

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  // Scroll handler for parallax effect
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-bg">
        {/* Hero Section with Parallax Background */}
        <div className="relative bg-[#f0ebe5] overflow-hidden">
          <ShapeOne style={{ transform: `translateY(${offsetY * 0.3}px)` }} />
          <ShapeTwo style={{ transform: `translateY(${offsetY * 0.5}px)` }} />
          <main className="relative z-10">
            <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />
          </main>
        </div>

        {/* Section 1: Featured Products (Default Background) */}
        <section className="py-16 md:py-24">
          <Layout>
            <FeaturedProducts />
          </Layout>
        </section>

        {/* Section 2: Trending Products (White Background) */}
        <section className="py-16 md:py-24 bg-white">
          <Layout>
            <TrendingProducts />
          </Layout>
        </section>

        {/* Section 3: GI-Tagged Products (Default Background) */}
        <section className="py-16 md:py-24">
          <Layout>
            <GiTaggedProducts />
          </Layout>
        </section>

        {/* Section 4: Shop by State (White Background) */}
        <section className="py-16 md:py-24 bg-white">
          <Layout>
            <StatesGrid />
          </Layout>
        </section>

        {/* Section 5: Collections (Default Background) */}
        <section className="py-16 md:py-24">
          <Layout>
            <Collections />
          </Layout>
        </section>
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
