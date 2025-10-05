import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import StatesGrid from "../components/StatesGrid";

const StatesPage = () => {
  return (
    <>
      <Navbar />
      <main className="py-12 md:py-16 bg-gray-50">
        <Layout>
          <StatesGrid />
        </Layout>
      </main>
    </>
  );
};

export default StatesPage;
