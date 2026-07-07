"use client";

import { motion } from "framer-motion";
import EventRegistrationForm from "@/components/form/EventRegistrationForm";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function DashboardCreateEventPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 pb-6 border-b border-borderColor"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-textPrimary">Create New Event</h1>
        </div>
        <p className="text-textSecondary text-sm mt-3">Fill in the details to create an engaging event. Add speakers, set pricing, and more.</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <EventRegistrationForm />
      </motion.div>
    </motion.div>
  );
}
