"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrashIcon, UsersIcon, PencilSquareIcon, CalendarDaysIcon, MapPinIcon, TicketIcon, ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.3 } }),
};

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch("/api/dashboard/my-events", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setEvents(data.events || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyEvents(); }, []);

  const handleDelete = async (eventId, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    const toastId = toast.loading("Deleting event...");
    try {
      const res = await fetch(`/api/events?id=${eventId}`, { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
        toast.update(toastId, { render: "Event deleted successfully!", type: "success", isLoading: false, autoClose: 2000 });
      } else {
        const data = await res.json();
        toast.update(toastId, { render: data.message || "Delete failed", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch {
      toast.update(toastId, { render: "Delete failed", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const upcomingCount = events.filter(e => new Date(e.timeAndDate) > new Date()).length;
  const pastCount = events.filter(e => new Date(e.timeAndDate) <= new Date()).length;
  const totalRegs = events.reduce((sum, e) => sum + (e.registrationCount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-textSecondary font-medium">Loading your events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4 pb-6 border-b border-borderColor"
      >
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">My Events</h1>
          <p className="text-textSecondary text-sm mt-2">Create, manage, and track all your events in one place</p>
        </div>
        <Link href="/dashboard/create-event"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 shadow-md shadow-accent/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
          Create New Event
        </Link>
      </motion.div>

      {/* Quick Stats */}
      {events.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { staggerChildren: 0.1 } }}
        >
          <motion.div 
            custom={0}
            variants={statVariants}
            className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textMuted text-xs font-semibold uppercase tracking-wide">Total Events</p>
                <p className="text-3xl font-bold text-textPrimary mt-2">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-accent" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={1}
            variants={statVariants}
            className="bg-gradient-to-br from-green-50/50 to-green-100/30 rounded-xl p-6 border border-green-200/50 hover:border-green-300/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-xs font-semibold uppercase tracking-wide">Upcoming</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{upcomingCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100/70 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={2}
            variants={statVariants}
            className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-xl p-6 border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-xs font-semibold uppercase tracking-wide">Total Registrations</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalRegs}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100/70 rounded-xl flex items-center justify-center">
                <TicketIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            custom={3}
            variants={statVariants}
            className="bg-gradient-to-br from-purple-50/50 to-purple-100/30 rounded-xl p-6 border border-purple-200/50 hover:border-purple-300/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-xs font-semibold uppercase tracking-wide">Past Events</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{pastCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100/70 rounded-xl flex items-center justify-center">
                <ExclamationCircleIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32 bg-gradient-to-br from-background to-backgroundSecondary rounded-2xl border-2 border-dashed border-borderColor"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
            <CalendarDaysIcon className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-textPrimary mb-2">No events yet</h3>
          <p className="text-textSecondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">Get started by creating your first event. You'll be able to manage registrations and track attendance here.</p>
          <Link href="/dashboard/create-event"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
            Create Your First Event
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { staggerChildren: 0.05 } }}
        >
          {events.map((event, i) => {
            const isUpcoming = new Date(event.timeAndDate) > new Date();
            return (
              <motion.div
                key={event._id}
                custom={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-xl border border-borderColor bg-white hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/0 group-hover:from-accent/2 group-hover:to-accent/1 transition-all duration-300 pointer-events-none" />

                <div className="relative flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-backgroundSecondary">
                    {event.coverimage ? (
                      <img 
                        src={event.coverimage} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-textMuted">
                        <CalendarDaysIcon className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm transition-all duration-300 ${
                      isUpcoming
                        ? "bg-green-500/90 text-white shadow-lg shadow-green-500/20"
                        : "bg-slate-700/80 text-white shadow-lg shadow-slate-700/20"
                    }`}>
                      {isUpcoming ? "Upcoming" : "Past"}
                    </span>
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
                        {event.isFree ? (
                          <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">FREE</span>
                        ) : (
                          <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">${event.price}</span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/events/${event._id}`}>
                        <h3 className="text-lg font-bold text-textPrimary hover:text-accent transition-colors leading-tight mb-2 line-clamp-2">{event.title}</h3>
                      </Link>

                      {/* Description */}
                      <p className="text-sm text-textSecondary mb-3 line-clamp-2">{event.details}</p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <CalendarDaysIcon className="w-4 h-4 text-textMuted flex-shrink-0" />
                          <span className="text-xs text-textSecondary font-medium">{new Date(event.timeAndDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-textMuted flex-shrink-0" />
                          <span className="text-xs text-textSecondary font-medium truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-textMuted flex-shrink-0" />
                          <span className="text-xs text-textSecondary font-medium">{event.registrationCount || 0} registrations</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/events/${event._id}`}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-center text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-all duration-300">
                        View Details
                      </Link>
                      <Link href={`/dashboard/edit-event/${event._id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-textSecondary bg-backgroundSecondary rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300">
                        <PencilSquareIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id, event.title)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-300">
                        <TrashIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
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
