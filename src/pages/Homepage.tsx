import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import FestiveCollections from "../components/FestiveCollections";
import StatesGrid from "../components/StatesGrid";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import NewArrivals from "../components/NewArrivals";
import ArtisanSpotlight from "../components/ArtisanSpotlight";
import HomePageNav from "../components/HomePageNav";

const Homepage = () => {
  const Section = ({
    children,
    className = "bg-white",
    id,
  }: {
    children: React.ReactNode;
    className?: string;
    id?: string;
  }) => (
    <section
      id={id}
      // FIX: 'overflow-hidden' yahan se hata diya gaya hai
      className={`py-16 md:py-24 ${className} relative`}
    >
      <Layout>{children}</Layout>
    </section>
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <HomePageNav />

        <Section id="new-arrivals" className="bg-white">
          <NewArrivals />
        </Section>
        <Section id="collections" className="bg-gray-50">
          <Collections />
        </Section>
        <Section id="featured-products" className="bg-white">
          <FeaturedProducts />
        </Section>

        <Layout>
          <ArtisanSpotlight />
        </Layout>

        <Section id="festive-specials" className="bg-gray-50">
          <FestiveCollections />
        </Section>
        <Section id="trending-products" className="bg-white">
          <TrendingProducts />
        </Section>
        <Section className="bg-gray-50">
          <StatesGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
