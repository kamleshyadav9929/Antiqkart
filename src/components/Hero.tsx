import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  image: string;
  affiliate_link: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image, affiliate_link")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching hero products:", error.message);
      } else if (data && data.length >= 5) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchHeroProducts();
  }, []);

  if (loading || products.length < 5) {
    return (
      <div className="w-full h-[600px] md:h-[550px] bg-gray-100 animate-pulse"></div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-slate-100">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Left Column: Content (Links to main product) --- */}
        <motion.a
          href={products[0].affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-10 text-center md:text-left"
          variants={itemVariants}
        >
          <h1 className="text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 leading-snug">
            Beyond the Ordinary: <br />
            <span className="text-amber-600">A Curation of Rare Finds</span>
          </h1>
          <p className="mt-6 text-xl text-slate-700">
            Explore our handpicked selection of rare items and unique
            collections, sourced for the discerning collector.
          </p>
          <div className="mt-10">
            <div className="inline-flex items-center justify-center gap-x-2 bg-slate-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform group-hover:scale-105 group-hover:bg-slate-800">
              Explore The Feature Collection{" "}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </motion.a>

        {/* --- Right Column: Image Collage (With individual links) --- */}
        <motion.div
          className="grid grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-3 gap-3 h-[350px] md:h-[450px]"
          variants={containerVariants}
        >
          {/* Main Image */}
          <motion.a
            href={products[0].affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group col-span-1 row-span-2 md:col-span-3 md:row-span-3 rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <img
              src={products[0].image}
              alt={products[0].name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.a>
          {/* Side Image 1 */}
          <motion.a
            href={products[1].affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group col-span-1 row-span-1 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <img
              src={products[1].image}
              alt={products[1].name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.a>
          {/* Side Image 2 */}
          <motion.a
            href={products[2].affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group col-span-1 row-span-1 md:col-span-2 md:row-span-1 rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <img
              src={products[2].image}
              alt={products[2].name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
