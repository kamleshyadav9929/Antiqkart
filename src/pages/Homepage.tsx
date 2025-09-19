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

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      {/* DESIGN UPGRADE: Main background is now our warmer off-white */}
      <div className="bg-[var(--bg-primary)]">
        {/* DESIGN UPGRADE: Hero section has a lighter, secondary accent background */}
        <div className="relative bg-[var(--accent-secondary)]/20 overflow-hidden">
          <ShapeOne style={{ transform: `translateY(${offsetY * 0.3}px)` }} />
          <ShapeTwo style={{ transform: `translateY(${offsetY * 0.5}px)` }} />
          <main className="relative z-10">
            <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />
          </main>
        </div>

        {/* DESIGN UPGRADE: Consistent, spacious padding for all sections */}
        <section className="py-20 md:py-28">
          <Layout>
            <NewArrivals />
          </Layout>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <Layout>
            <FeaturedProducts />
          </Layout>
        </section>

        <section className="py-20 md:py-28">
          <Layout>
            <TrendingProducts />
          </Layout>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <Layout>
            <GiTaggedProducts />
          </Layout>
        </section>

        <section className="py-20 md:py-28">
          <Layout>
            <StatesGrid />
          </Layout>
        </section>

        <section className="py-20 md:py-28 bg-white">
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
