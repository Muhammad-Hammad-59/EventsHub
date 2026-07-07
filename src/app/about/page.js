"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SparklesIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import EventHeading from "@/components/EventPage/EventHeading";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const values = [
  {
    icon: SparklesIcon,
    title: "Innovation First",
    description:
      "We constantly push boundaries to deliver cutting-edge event management tools and features.",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Reach",
    description:
      "Connect with communities worldwide — host virtual, in-person, or hybrid events effortlessly.",
  },
  {
    icon: UserGroupIcon,
    title: "Community Driven",
    description:
      "Built for people, by people. Every feature is shaped by our vibrant user community.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trust & Security",
    description:
      "Your data and events are protected with industry-leading security standards.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Seamless Planning",
    description:
      "From scheduling to registration, we make every step of event planning intuitive and smooth.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Built to Scale",
    description:
      "Whether it's 10 attendees or 10,000, our platform scales to match your ambition.",
  },
];

const stats = [
  { value: "10K+", label: "Events Hosted" },
  { value: "50K+", label: "Users" },
  { value: "120+", label: "Cities" },
  { value: "98%", label: "Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="bg-backgroundSecondary">
      {/* Hero Heading */}
      <EventHeading heading="About EventHub" />

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="w-full py-20 px-4 sm:px-6 lg:px-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6"
          >
            Our Mission
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-base sm:text-lg leading-relaxed"
          >
            EventHub was born from a simple idea: everyone should have the power
            to discover, create, and share memorable events. We believe that
            bringing people together — whether in-person or online — creates
            lasting connections, sparks new ideas, and builds stronger
            communities. Our platform is designed to remove the friction from
            event management so organizers can focus on what truly matters:
            delivering unforgettable experiences.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-full bg-white py-16 px-4 sm:px-6 lg:px-20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="text-center p-6 rounded-2xl bg-backgroundSecondary"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-accent mb-2">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-textSecondary font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="w-full py-20 px-4 sm:px-6 lg:px-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4 text-center"
          >
            Our Values
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-base sm:text-lg mb-12 text-center"
          >
            The principles that guide everything we build
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary mb-2">
                  {item.title}
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-full bg-white py-20 px-4 sm:px-6 lg:px-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-base sm:text-lg mb-8"
          >
            Join thousands of event creators and attendees who trust EventHub
            to bring their events to life.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-full text-white bg-accent hover:bg-accent/90 transition duration-300 hover:scale-105"
            >
              Explore Events
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-full text-accent bg-accent/10 hover:bg-accent/20 transition duration-300 hover:scale-105"
            >
              Create Account
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}