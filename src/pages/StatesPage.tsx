import React from "react";
import Navbar from "../components/Navbar";
import StatesGrid from "../components/StatesGrid";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

const StatesPage = () => {
  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-12 text-center">
            Discover by State
          </h1>
          {/* Re-using the existing StatesGrid component */}
          <StatesGrid />
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default StatesPage;
