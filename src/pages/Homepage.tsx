import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import StatesGrid from "../components/StatesGrid";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import SearchOverlay from "../components/SearchOverlay";

const Homepage = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearchClick={() => setIsSearchOverlayOpen(true)} />
        <Layout>
          <FeaturedProducts />
          <StatesGrid />
          <Collections />
        </Layout>
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
