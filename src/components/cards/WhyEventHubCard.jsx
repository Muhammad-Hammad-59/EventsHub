// components/cards/WhyEventHubCard.js
import { motion } from "framer-motion";

export default function WhyEventHubCard({ icon: Icon, title, description }) {
  return (
     
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-backgroundSecondary rounded-2xl p-6 shadow-md hover:shadow-lg   hover:ring-2 hover:ring-accent transition-all duration-300 text-center"
    >
      <div className="flex justify-center mb-4 text-accent">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-semibold text-textPrimary mb-2">
        {title}
      </h3>
      <p className="text-sm text-textSecondary">{description}</p>
    </motion.div>
    
  );
}
