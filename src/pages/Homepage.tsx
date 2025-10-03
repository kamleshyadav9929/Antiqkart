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
      <div
        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-${
          className.includes("gray") ? "gray-50" : "white"
        } to-transparent`}
      ></div>
    </section>
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Section className="bg-white">
          <NewArrivals />
        </Section>
        <Section className="bg-gray-50">
          <Collections />
        </Section>
        <Section className="bg-white">
          <FeaturedProducts />
        </Section>
        <Section id="festive-specials" className="bg-gray-50">
          <FestiveCollections />
        </Section>
        <Section className="bg-white">
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
