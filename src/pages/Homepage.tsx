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
import NewArrivals from "../components/NewArrivals";
// REMOVED: No longer importing QuickViewModal or useQuickView

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  // REMOVED: All state and logic for quick view

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-bg">
        <div className="relative bg-[#f0ebe5] overflow-hidden">
          <ShapeOne style={{ transform: `translateY(${offsetY * 0.3}px)` }} />
          <ShapeTwo style={{ transform: `translateY(${offsetY * 0.5}px)` }} />
          <main className="relative z-10">
            <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />
          </main>
        </div>

        {/* REMOVED: The 'onProductClick' prop has been removed from all these components */}
        <section className="py-16 md:py-24">
          <Layout>
            <NewArrivals />
          </Layout>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <Layout>
            <FeaturedProducts />
          </Layout>
        </section>

        <section className="py-16 md:py-24">
          <Layout>
            <TrendingProducts />
          </Layout>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <Layout>
            <GiTaggedProducts />
          </Layout>
        </section>

        <section className="py-16 md:py-24">
          <Layout>
            <StatesGrid />
          </Layout>
        </section>

        <section className="py-16 md:py-24 bg-white">
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
      {/* REMOVED: The QuickViewModal component has been deleted from here */}
    </>
  );
};

export default Homepage;
