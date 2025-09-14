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
      <main className="bg-gray-50">
        <Layout>
          <div className="py-16 md:py-24 text-text">
            {/* --- Page Header --- */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
                The Heart of Indian Craftsmanship
              </h1>
              <p className="mt-4 text-lg text-muted">
                A curated journey into the soul of India's artistic heritage,
                bringing timeless treasures to your doorstep.
              </p>
            </div>

            {/* --- Affiliate Disclosure --- */}
            <section className="mb-16 max-w-4xl mx-auto">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <h2 className="font-serif text-2xl text-text mb-2">
                  Affiliate Disclosure
                </h2>
                <div className="prose prose-lg text-muted max-w-none">
                  <p>
                    <strong>
                      As an Amazon Associate, we earn from qualifying purchases.
                    </strong>
                  </p>
                  <p>
                    Here at AntiqKart, our goal is to connect you with the best
                    of Indian artistry. To help support our platform and the
                    extensive research our team conducts, we participate in
                    affiliate marketing programs. This means that when you
                    purchase a product through a link on our site, we may
                    receive a small commission at no extra cost to you. This
                    relationship helps us continue our mission, but it does not
                    influence our curation process. We only recommend products
                    we genuinely believe in.
                  </p>
                </div>
              </div>
            </section>

            {/* --- Our Story Section --- */}
            <section className="mb-16 max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl text-text mb-4">Our Story</h2>
              <div className="prose prose-lg text-muted max-w-none space-y-4">
                <p>
                  AntiqKart was born from a deep-rooted passion for India's
                  incredible artistic traditions. We journey through vibrant
                  villages, bustling city markets, and remote artisan
                  communities to discover timeless treasures. Each piece we
                  feature is handcrafted by skilled artisans who have inherited
                  their craft through generations.
                </p>
                <p>
                  Our mission is twofold: to bring you authentic, high-quality
                  artifacts that tell a story, and to empower the talented
                  artisans who create them. By choosing AntiqKart as your guide,
                  you are not just discovering a product; you are helping to
                  preserve a legacy and support small-scale creators across
                  India.
                </p>
              </div>
            </section>

            {/* --- How We Choose Our Products --- */}
            <section className="mb-16 max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl text-text mb-4">
                Our Curation Process
              </h2>
              <div className="prose prose-lg text-muted max-w-none space-y-4">
                <p>
                  Transparency is at the core of what we do. We are curators and
                  storytellers, not the direct sellers. Our process involves:
                </p>
                <ul>
                  <li>
                    <strong>Extensive Research:</strong> We identify products
                    that exemplify authentic craftsmanship, cultural
                    significance, and high quality.
                  </li>
                  <li>
                    <strong>Verification:</strong> We vet products and sellers
                    to ensure they align with our values of authenticity and
                    fair practice.
                  </li>
                  <li>
                    <strong>Affiliate Linking:</strong> We connect you to these
                    products on established marketplaces like Amazon. This model
                    allows us to focus on discovery and curation while you shop
                    from a secure and familiar platform.
                  </li>
                </ul>
                <p>
                  Every product link on our site is an affiliate link. This
                  means we are providing a recommendation, and if you choose to
                  purchase, the final transaction is handled by the third-party
                  seller (e.g., Amazon).
                </p>
              </div>
            </section>

            {/* --- Our Values Section --- */}
            <section className="mb-16 max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl text-center text-text mb-8">
                Our Guiding Principles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
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
                    We celebrate items genuinely handcrafted by master artisans
                    using traditional techniques.
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-accent/10 rounded-full text-accent">
                      <Heart size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text">
                    Ethical Curation
                  </h3>
                  <p className="mt-2 text-muted">
                    We showcase products from creators and sellers who value
                    fair trade and the preservation of their art.
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
                    We select the finest pieces that are built to last and be
                    cherished for generations.
                  </p>
                </div>
              </div>
            </section>

            {/* --- Call to Action Section --- */}
            <section className="text-center max-w-3xl mx-auto">
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
            </section>
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
