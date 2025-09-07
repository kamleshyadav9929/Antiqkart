import React from "react";
import { motion } from "framer-motion";

// Updated variants for a simple, smooth fade
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

// Updated transition for a faster, smoother feel
const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.3,
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
