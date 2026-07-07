"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import EventHeading from "@/components/EventPage/EventHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contactInfo = [
  { icon: EnvelopeIcon, title: "Email Us", detail: "support@eventhub.com", sub: "We reply within 24 hours" },
  { icon: PhoneIcon, title: "Call Us", detail: "+1 234 567 890", sub: "Mon – Fri, 9am – 6pm EST" },
  { icon: MapPinIcon, title: "Visit Us", detail: "123 Event Street, New York", sub: "NY 10001, USA" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-backgroundSecondary">
      <EventHeading heading="Contact Us" />

      {/* Info Cards */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="w-full py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {contactInfo.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-textPrimary mb-1">{item.title}</h3>
              <p className="text-accent font-medium text-sm mb-1">{item.detail}</p>
              <p className="text-textSecondary text-xs">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Form */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="w-full pb-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-10">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-textPrimary mb-2 text-center">Send Us a Message</motion.h2>
          <motion.p variants={fadeUp} className="text-textSecondary text-sm sm:text-base mb-8 text-center">Have a question or suggestion? We'd love to hear from you.</motion.p>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-textPrimary mb-2">Message Sent!</h3>
              <p className="text-textSecondary">Thank you! We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-textPrimary mb-1.5">Your Name</label>
                  <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="w-full px-4 py-3 bg-backgroundSecondary border border-borderColor rounded-xl text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-textPrimary mb-1.5">Email</label>
                  <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full px-4 py-3 bg-backgroundSecondary border border-borderColor rounded-xl text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-textPrimary mb-1.5">Subject</label>
                <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" required className="w-full px-4 py-3 bg-backgroundSecondary border border-borderColor rounded-xl text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-textPrimary mb-1.5">Message</label>
                <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us more..." required className="w-full px-4 py-3 bg-backgroundSecondary border border-borderColor rounded-xl text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition duration-300 disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  );
}