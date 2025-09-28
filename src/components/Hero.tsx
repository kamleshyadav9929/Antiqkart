import { ArrowRight, Layers, MapPin, ThumbsUp, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div className="flex items-start gap-4" variants={itemVariants}>
    <motion.div
      className="flex-shrink-0 mt-1 bg-amber-100 text-amber-600 p-3 rounded-full"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
    </motion.div>
    <div>
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-slate-100">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Text Content */}
        <motion.div
          className="group relative z-10 text-center md:text-left"
          variants={itemVariants}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 leading-tight">
            Beyond the Ordinary: <br />
            <span className="text-amber-600">A Curation of Rare Finds</span>
          </h1>
          <p className="mt-3 md:mt-6 text-base md:text-xl text-slate-700 max-w-lg mx-auto md:mx-0">
            Explore our handpicked selection of authentic Indian handicrafts,
            connecting you to a legacy of masterful art.
          </p>
          <div className="mt-6 md:mt-10">
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-x-2 bg-slate-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-slate-800 text-base"
            >
              Explore Collection{" "}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Features Section */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200/80 space-y-5"
          variants={containerVariants}
        >
          <Feature
            icon={<Layers size={24} />}
            title="Curated Collections"
            description="Discover handcrafted treasures in over 10+ unique categories."
          />
          <Feature
            icon={<MapPin size={24} />}
            title="Shop Your Favorite State"
            description="Explore the rich artistic heritage from every corner of India."
          />
          <Feature
            icon={<Sparkles size={24} />}
            title="Handpicked Products"
            description="Every item is selected by our team for its authenticity and quality."
          />
          <Feature
            icon={<ThumbsUp size={24} />}
            title="Most-Loved by You"
            description="Find popular products that are trending and highly rated by our community."
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
