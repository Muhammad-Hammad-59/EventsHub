"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDaysIcon, MapPinIcon, TicketIcon, ArrowRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

const fadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } })
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingRegs, setUpcomingRegs] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/dashboard/my-registrations", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          const regs = data.registrations || [];
          setRegistrations(regs);
          const upcoming = regs.filter(r => r.event && new Date(r.event.timeAndDate) > new Date()).length;
          setUpcomingRegs(upcoming);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-textSecondary font-medium">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pb-6 border-b border-borderColor mb-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">My Registrations</h1>
          <p className="text-textSecondary text-sm mt-2">Events you've registered to attend</p>
        </div>
      </motion.div>

      {/* Stats */}
      {registrations.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { staggerChildren: 0.1 } }}
        >
          <motion.div 
            variants={statVariants}
            className="bg-gradient-to-br from-background to-backgroundSecondary rounded-xl p-6 border border-borderColor hover:border-accent/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textMuted text-xs font-semibold uppercase tracking-wide">Total Registrations</p>
                <p className="text-3xl font-bold text-textPrimary mt-2">{registrations.length}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <TicketIcon className="w-6 h-6 text-accent" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={statVariants}
            className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200 hover:border-green-300 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-xs font-semibold uppercase tracking-wide">Upcoming Events</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{upcomingRegs}</p>
              </div>
              <div className="w-12 h-12 bg-green-200/50 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {registrations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32 bg-gradient-to-br from-background to-backgroundSecondary rounded-2xl border-2 border-dashed border-borderColor"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
            <TicketIcon className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-textPrimary mb-2">No registrations yet</h3>
          <p className="text-textSecondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">Explore and register for events you're interested in. Your registrations will appear here.</p>
          <Link href="/dashboard/explore"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30">
            <SparklesIcon className="w-5 h-5" />
            Explore Events
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { staggerChildren: 0.05 } }}
        >
          {registrations.map((reg, i) => {
            const event = reg.event;
            if (!event) return null;
            
            const isUpcoming = new Date(event.timeAndDate) > new Date();
            const eventDate = new Date(event.timeAndDate);
            const today = new Date();
            const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

            return (
              <motion.div
                key={reg._id}
                custom={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-xl border border-borderColor bg-white hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-backgroundSecondary">
                    {event.coverimage ? (
                      <img 
                        src={event.coverimage} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CalendarDaysIcon className="w-16 h-16 text-textMuted opacity-20" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm transition-all duration-300 ${
                      isUpcoming
                        ? "bg-blue-500/90 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-700/80 text-white shadow-lg shadow-slate-700/20"
                    }`}>
                      {isUpcoming ? "Upcoming" : "Past"}
                    </span>
                    
                    {/* Days remaining badge */}
                    {isUpcoming && daysUntil > 0 && (
                      <span className="absolute top-4 right-4 px-2.5 py-1 bg-orange-500/90 text-white rounded-lg text-[11px] font-bold backdrop-blur-sm">
                        {daysUntil} days left
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase tracking-wide">{event.type}</span>
                        {event.eventformate && (
                          <span className="text-[11px] font-semibold text-textSecondary bg-backgroundSecondary px-2.5 py-1 rounded-full">{event.eventformate}</span>
                        )}
                        {isUpcoming && (
                          <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">✓ Confirmed</span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/events/${event._id}`}>
                        <h3 className="text-lg font-bold text-textPrimary hover:text-accent transition-colors leading-tight mb-2 line-clamp-2">{event.title}</h3>
                      </Link>

                      {/* Description */}
                      <p className="text-sm text-textSecondary mb-3 line-clamp-2">{event.details}</p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <CalendarDaysIcon className="w-4 h-4 text-textMuted flex-shrink-0" />
                          <div>
                            <span className="text-xs text-textMuted font-medium block">Date & Time</span>
                            <span className="text-sm font-semibold text-textPrimary">{eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • {eventDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-textMuted flex-shrink-0" />
                          <div>
                            <span className="text-xs text-textMuted font-medium block">Location</span>
                            <span className="text-sm font-semibold text-textPrimary truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/events/${event._id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-all duration-300">
                        View Event
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                      <div className="text-xs text-textMuted bg-backgroundSecondary px-3 py-2.5 rounded-lg font-medium">
                        Registered {new Date(reg.createdAt || reg.registeredAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
