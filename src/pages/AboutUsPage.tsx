import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <Layout>
          <div className="py-16 md:py-24">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-text">
                Our Story
              </h1>
              <p className="mt-4 text-lg text-muted">
                Connecting India's rich heritage of craftsmanship with the
                world.
              </p>
            </div>

            {/* Content Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg text-muted max-w-none">
                <h2 className="font-serif text-3xl text-text">
                  From the Heart of India, to Your Home
                </h2>
                <p>
                  AntiqKart was born from a deep-rooted passion for India's
                  incredible artistic traditions. We journey through the vibrant
                  lanes of rural villages and bustling city markets to discover
                  timeless treasures—each piece handcrafted by skilled artisans
                  who have inherited their craft through generations.
                </p>
                [Image of a beautifully crafted Indian wooden box]
                <p>
                  Our mission is twofold: to bring you authentic, high-quality
                  artifacts that tell a story, and to empower the talented
                  artisans who create them. By choosing AntiqKart, you are not
                  just buying a product; you are preserving a legacy and
                  supporting a community of creators.
                </p>
                <p>
                  We believe that every home deserves a piece of history, a
                  touch of elegance, and a story to tell. Thank you for joining
                  us on this journey.
                </p>
              </div>
              <div className="h-96 md:h-full rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://placehold.co/600x800/c9a368/2e2a27?text=Artisan's Hands"
                  alt="Indian artisan at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Layout>
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
