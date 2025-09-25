import React from "react";
import { Hand, Heart, Gem } from "lucide-react";

const Feature = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100/50 text-amber-700">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold font-serif text-slate-800">{title}</h3>
    <p className="mt-2 text-gray-600 max-w-xs mx-auto">{children}</p>
  </div>
);

const BrandPromise = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Our Guiding Principles
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every piece in our collection is chosen with a deep respect for
            tradition, quality, and the artisans behind the art.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature icon={<Hand size={32} />} title="Authentic Craftsmanship">
            We celebrate items genuinely handcrafted by master artisans using
            traditional, time-honored techniques.
          </Feature>
          <Feature icon={<Heart size={32} />} title="Ethical Curation">
            We are committed to fair trade, ensuring that artisans are
            compensated fairly for their skill and dedication.
          </Feature>
          <Feature icon={<Gem size={32} />} title="Timeless Quality">
            We select the finest pieces that are not just beautiful, but are
            built to last and be cherished for generations.
          </Feature>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
