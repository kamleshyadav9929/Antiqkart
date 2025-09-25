import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import FestiveCollections from "../components/FestiveCollections";
import GiTaggedProducts from "../components/GiTaggedProducts";
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
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Layout>{children}</Layout>
    </section>
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* --- FESTIVE SECTION MOVED TO TOP --- */}
        <Section id="festive-specials" className="bg-amber-50/50">
          <FestiveCollections />
        </Section>

        <Section>
          <NewArrivals />
        </Section>

        <Section className="bg-slate-50">
          <FeaturedProducts />
        </Section>

        <Section>
          <TrendingProducts />
        </Section>

        <Section className="bg-slate-50">
          <GiTaggedProducts />
        </Section>

        <Section>
          <StatesGrid />
        </Section>

        <Section className="bg-slate-50">
          <Collections />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
