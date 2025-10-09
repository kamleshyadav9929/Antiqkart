import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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
    <section id={id} className={`py-16 md:py-24 ${className} relative`}>
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

        {/* "Festive Specials" is now here */}
        <Section id="festive-specials" className="bg-gray-50">
          <FestiveCollections />
        </Section>

        <Layout>
          <ArtisanSpotlight />
        </Layout>

        {/* "Handpicked Collections" is now below the spotlight */}
        <Section id="collections" className="bg-white">
          <Collections />
        </Section>

        <Section id="trending-products" className="bg-gray-50">
          <TrendingProducts />
        </Section>
        <Section className="bg-white">
          <StatesGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
