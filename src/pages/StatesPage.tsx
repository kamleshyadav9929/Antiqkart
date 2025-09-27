import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import StatesGrid from "../components/StatesGrid";

const StatesPage = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <Layout>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Discover Crafts from Every State
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the unique artistic heritage of India, one state at a
              time. Click on a state to find curated products from its region.
            </p>
          </div>
          <StatesGrid />
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default StatesPage;
