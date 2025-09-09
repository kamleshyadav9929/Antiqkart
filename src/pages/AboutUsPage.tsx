import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Hand, Heart, Gem, ArrowRight } from "lucide-react";

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* --- Hero Section --- */}
        <section className="relative h-80 bg-gray-800">
          <img
            src="https://placehold.co/1600x600/2e2a27/c9a368?text=AntiqKart"
            alt="A collection of Indian handcrafted items"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold">
              The Heart of Indian Craftsmanship
            </h1>
            <p className="mt-4 text-lg max-w-2xl">
              A curated journey into the soul of India's artistic heritage.
            </p>
          </div>
        </section>

        {/* --- Our Story Section --- */}
        <Layout>
          <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-muted max-w-none">
              <h2 className="font-serif text-3xl text-text">Our Story</h2>
              <p>
                AntiqKart was born from a deep-rooted passion for India's
                incredible artistic traditions. We journey through vibrant
                villages and bustling city markets to discover timeless
                treasures—each piece handcrafted by skilled artisans who have
                inherited their craft through generations.
              </p>

              <p>
                Our mission is to bring you authentic, high-quality artifacts
                that tell a story, and to empower the talented artisans who
                create them. By choosing AntiqKart, you are not just buying a
                product; you are preserving a legacy.
              </p>
            </div>
            <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg transform md:rotate-3 transition-transform hover:rotate-0">
              <img
                src="https://placehold.co/600x800/c9a368/2e2a27?text=Artisan's Hands"
                alt="Indian artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Layout>

        {/* --- Our Values Section --- */}
        <section className="bg-gray-50 py-16 md:py-24">
          <Layout>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text">
                Our Values
              </h2>
              <p className="mt-4 text-lg text-muted">
                Three principles guide everything we do.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full text-accent">
                    <Hand size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text">
                  Authentic Craftsmanship
                </h3>
                <p className="mt-2 text-muted">
                  Every item is genuinely handcrafted by master artisans using
                  traditional techniques.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full text-accent">
                    <Heart size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text">
                  Ethical Sourcing
                </h3>
                <p className="mt-2 text-muted">
                  We partner directly with creators, ensuring fair trade and the
                  preservation of their art.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full text-accent">
                    <Gem size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text">
                  Timeless Quality
                </h3>
                <p className="mt-2 text-muted">
                  We select only the finest pieces that are built to last and be
                  cherished for generations.
                </p>
              </div>
            </div>
          </Layout>
        </section>

        {/* --- Call to Action Section --- */}
        <section className="py-16 md:py-24">
          <Layout>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text">
                Explore Our Collection
              </h2>
              <p className="mt-4 text-lg text-muted mb-8">
                Begin your own journey into the rich tapestry of Indian art and
                history.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-x-2 bg-slate-800 text-white font-semibold py-3 px-8 rounded-full hover:bg-slate-700 transition-colors"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
            </div>
          </Layout>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
