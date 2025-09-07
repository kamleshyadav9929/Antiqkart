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
            Our Collections
          </h1>
          {/* We can reuse the Collections component here */}
          <Collections />
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default CollectionsPage;
