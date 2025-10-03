// src/pages/Homepage.tsx
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
      className={`py-16 md:py-24 ${className} relative overflow-hidden`}
    >
      <Layout>{children}</Layout>
    </section>
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Section className="bg-white-texture">
          <NewArrivals />
        </Section>
        <Section className="bg-gray-texture">
          <Collections />
        </Section>
        <Section className="bg-subtle-dots">
          <FeaturedProducts />
        </Section>
        <Section id="festive-specials" className="bg-white-texture">
          <FestiveCollections />
        </Section>
        <Section className="bg-subtle-lines">
          <TrendingProducts />
        </Section>
        <Section className="bg-subtle-cross">
          <StatesGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
