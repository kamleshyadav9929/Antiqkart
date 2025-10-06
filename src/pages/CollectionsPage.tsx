import Navbar from "../components/Navbar";
import Collections from "../components/Collections";
import Layout from "../components/Layout";

const CollectionsPage = () => {
  return (
    <>
      <Navbar />
      <main className="py-12">
        <Layout>
          <Collections showAll={true} />
        </Layout>
      </main>
    </>
  );
};

export default CollectionsPage;
