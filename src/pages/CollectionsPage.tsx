import React from "react";
import Navbar from "../components/Navbar";
import Collections from "../components/Collections";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

const CollectionsPage = () => {
  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-12 text-center">
            All Curated Collections
          </h1>
          {/* We reuse the Collections component, but tell it to show everything */}
          <Collections showAll={true} />
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default CollectionsPage;
