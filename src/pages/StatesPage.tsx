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
          {/* Re-using the existing StatesGrid component */}
          <StatesGrid />
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default StatesPage;
