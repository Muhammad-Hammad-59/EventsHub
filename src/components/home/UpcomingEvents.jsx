"use client";

import { motion } from "framer-motion";
import { useLatestEvents } from "@/hooks/useLatestEvents";
import EventCard from "../cards/EventCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function UpcomingEvents() {

  const { data, isLoading, isError } = useLatestEvents();
  
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-20"
    >
      <div className=" w-full bg-backgroundSecondary p-4 sm:p-10 rounded-2xl max-w-7xl mx-auto">
        {/* Heading Section */}
        <motion.div variants={fadeUp} className="mb-12">
          <div className="mb-3">
            <button className="text-sm font-medium text-accent hover:underline">
              Event List
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary leading-snug">
            Explore Upcoming Events with Industry Expert
          </h2>
        </motion.div>

        {/* Event Cards */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-y-8"
        >
          {isLoading && <p>Loading events...</p>}
          {isError && <p>Something went wrong fetching events.</p>}
          {data?.events?.length > 0
            ? data.events.map((event) => (
                <EventCard key={event._id} event={event} color="white" />
              ))
            : !isLoading && <p>No upcoming events found.</p>}
        </motion.div>
      </div>
    </motion.section>
  );
}
