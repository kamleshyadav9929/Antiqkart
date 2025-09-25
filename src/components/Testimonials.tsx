import React from "react";

const TestimonialCard = ({
  children,
  author,
  location,
}: {
  children: React.ReactNode;
  author: string;
  location: string;
}) => (
  <figure className="p-8 bg-white rounded-lg shadow-md">
    <blockquote className="text-lg text-gray-700 leading-relaxed">
      <p>"{children}"</p>
    </blockquote>
    <figcaption className="mt-6">
      <div className="font-semibold text-slate-800">{author}</div>
      <div className="text-gray-500 text-sm">{location}</div>
    </figcaption>
  </figure>
);

const Testimonials = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Voices of Our Collectors
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from those who have brought a piece of Indian heritage into
            their homes through AntiqKart.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard author="Priya S." location="Mumbai, IN">
            The craftsmanship is simply breathtaking. The piece I received is
            even more beautiful than the photos and has become the centerpiece
            of my living room.
          </TestimonialCard>
          <TestimonialCard author="David L." location="London, UK">
            An incredible find. The entire process was seamless, and the quality
            of the artifact is a testament to the artisan's skill. I'll be a
            returning customer.
          </TestimonialCard>
          <TestimonialCard author="Aisha K." location="Dubai, UAE">
            I was looking for something unique and authentic, and AntiqKart
            delivered. It feels like I own a real piece of history. Highly
            recommended.
          </TestimonialCard>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
