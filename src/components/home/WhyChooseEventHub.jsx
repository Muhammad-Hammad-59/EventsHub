"use client"

import { motion } from "framer-motion";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import WhyEventHubCard from "../cards/WhyEventHubCard";
import { MagnifyingGlassIcon,CalendarDaysIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/outline";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyChooseEventHub() {


    const features = [
        {
            icon: MagnifyingGlassIcon,
            title: "Organize Easily",
            description:
              "Create and manage your events effortlessly with our intuitive dashboard and tools.",
          },
        {
          icon: CalendarDaysIcon,
          title: "Organize Easily",
          description:
            "Create and manage your events effortlessly with our intuitive dashboard and tools.",
        },
        {
          icon: SparklesIcon,
          title: "Discover Events",
          description:
            "Find events that match your interests with our powerful search and recommendation system.",
        },
        {
          icon: UsersIcon,
          title: "Connect with Community",
          description:
            "Engage with like-minded individuals and grow your network through meaningful events.",
        },
        {
            icon: UsersIcon,
            title: "Connect with Community",
            description:
              "Engage with like-minded individuals and grow your network through meaningful events.",
          },
          {
            icon: UsersIcon,
            title: "Connect with Community",
            description:
              "Engage with like-minded individuals and grow your network through meaningful events.",
          }
      ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full bg-backgroundSecondary py-20 px-4 sm:px-6 lg:px-20 lg:pb-44"
    >
      <div className="max-w-7xl p-4 sm:p-10 bg-white rounded-2xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4"
        >
          Why Choose EventHub?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-textSecondary mb-12"
        >
          All the tools you need to discover and create successful events
        </motion.p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-4 sm:gap-y-10">
      {features.map((feature, index) => (
            <WhyEventHubCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
       </div>
      </div>
  

    </motion.section>
  );
}
