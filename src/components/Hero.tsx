import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Users, Gift } from "lucide-react";

// This is a local component now, living inside Hero.tsx
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-4">
    <div className="flex justify-center mb-3">
      <div className="bg-[#D97706]/10 text-[#D97706] p-3 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-md font-semibold text-slate-800">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
  </div>
);

const Hero = () => {
  const scrollToFestive = () => {
    const festiveSection = document.getElementById("festive-specials");
    if (festiveSection) {
      festiveSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#F8F8F8] w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Hero Text */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1F2937] leading-tight">
            Discover Rare & Timeless Treasures, Curated Just for You
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
            AntiqKart brings you authentic, handpicked antique and heritage
            items from across India. Unlike mass marketplaces, we focus on
            uniqueness, tradition, and the stories behind each product.
          </p>
        </div>

        {/* Responsive CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center items-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto bg-[#D97706] text-white px-6 py-3 rounded-full hover:bg-[#b15b02] transition-colors font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Shop Rare Finds <ArrowRight size={18} />
          </Link>
          <Link
            to="/festive-specials" // Changed from a button to a Link
            className="w-full sm:w-auto border border-[#D97706] text-[#D97706] px-6 py-3 rounded-full hover:bg-[#D97706] hover:text-white transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            Explore Festive Specials
          </Link>
        </div>
      </div>
      {/* Integrated Features Section */}
      <div className="max-w-5xl mx-auto mt-16 border-t border-gray-200 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard
            icon={<Award size={24} />}
            title="Curated Collection"
            description="Rare and authentic items, handpicked for quality."
          />
          <FeatureCard
            icon={<BookOpen size={24} />}
            title="Stories Behind Products"
            description="Learn the unique history of every item you purchase."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Support Local Artisans"
            description="Your purchase empowers and sustains skilled artisans."
          />
          <FeatureCard
            icon={<Gift size={24} />}
            title="Limited Editions"
            description="Discover exclusive and one-of-a-kind treasures."
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
