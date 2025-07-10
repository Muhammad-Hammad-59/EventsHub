// components/home/BrowseByCategory.js
"use client"
import { motion } from "framer-motion";
 
import GlowEffect from "../tailwind-lib/GlowEffect";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function BrowseByCategory() {
  const categories = [
    "Music & Concerts",
    "Business & Networking",
    "Food & Drinks",
    "Arts & Culture",
    "Sports & Fitness",
    "Tech & Innovation",
    "Health & Wellness",
    "Education",
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full bg-backgroundSecondary py-20 px-4 relative overflow-hidden z-10 sm:px-6 lg:px-20"
    >
 
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4"
        >
          Browse Events by Category
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeUp}
          className="text-textSecondary text-base sm:text-lg mb-10"
        >
          Explore events that match your interests and passions
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category, idx) => (
            <motion.span
              key={idx}
              variants={fadeUp}
              className="px-4 py-2 text-sm sm:text-base rounded-full bg-white text-accent font-medium 
                         shadow-sm hover:shadow-md hover:bg-accent hover:text-white 
                         transition-all duration-300 ease-in-out"
            >
              {category}
            </motion.span>
          ))}

        </motion.div>
      </div>
         <GlowEffect/>
    </motion.section>
  );
}
