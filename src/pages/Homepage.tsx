import React, { useState } from "react";
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

// A simple divider component for visual separation
const SectionDivider = () => (
  <div className="py-8 md:py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <hr className="border-t border-gray-200" />
    </div>
  </div>
);

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />

        <SectionDivider />

        <section className="pb-16 md:pb-24">
          <Layout>
            <FeaturedProducts />
          </Layout>
        </section>

        <SectionDivider />

        <section className="pb-16 md:pb-24">
          <Layout>
            <TrendingProducts />
          </Layout>
        </section>

        <SectionDivider />

        <section className="pb-16 md:pb-24">
          <Layout>
            <GiTaggedProducts />
          </Layout>
        </section>

        <SectionDivider />

        <section className="pb-16 md:pb-24">
          <Layout>
            <StatesGrid />
          </Layout>
        </section>

        <SectionDivider />

        <section className="pb-16 md:pb-24">
          <Layout>
            <Collections />
          </Layout>
        </section>
      </main>
      <Footer />
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
      />
    </>
  );
};

export default Homepage;
