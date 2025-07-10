// components/common/EventCard.js
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EventCard({ event, color }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={fadeUp}
      className={`relative flex flex-col sm:gap-8  p-8 sm:flex-row bg-${color} rounded-xl border border-transparent hover:border-accent 
    shadow-md overflow-hidden hover:shadow-lg transition-all  ease-in-out duration-300 group`}
    >
      <div
        className="pointer-events-none absolute -top-5 -right-5 h-40 w-40 bg-accent blur-2xl opacity-0 
             group-hover:opacity-30 transition-all duration-500 rounded-full z-0"
      />
      {/* Image */}
      {/* <div className="sm:w-2/5 p-4 bg-blue-400 w-full  ">
        <img
          src={event.coverimage}
          alt={event.title}
          className="w-full h-auto  object-cover rounded-lg"
        />
      </div> */}

  <div className="relative w-full sm:w-2/5 aspect-[16/9]">
 {
  event.coverimage ? (
    <Image
    src={event.coverimage || null}
    alt={event?.title || "Event cover image"}
    width={800}
    height={400}
    className="rounded-lg object-cover w-full h-full"
    priority={false} // If this is a hero image
     
  />
  ) :
  (
    <div className="placeholder">No image available</div>
  )
 }


 
</div>  

{/* <div className="relative w-full h-[400px]">
  {event?.coverimage ? (
    <Image
      src={event.coverimage}
      alt={event?.title || "Event cover image"}
      width={800}
      height={400}
      className="rounded-lg object-cover w-full h-full"
      priority={true} // If this is a hero image
      onError={(e) => {
        console.error("Image failed to load:", event.coverimage);
        e.target.onerror = null;
        e.target.src = "/fallback-image.jpg"; // Add a fallback image
      }}
    />
  ) : (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
      No image available
    </div>
  )}
</div> */}

      {/* Description */}
      <div className="sm:w-2/3 sm:ml-6 w-full p-6 flex flex-col gap-4">
        {/* Date-Time Badge */}
        <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium w-fit">
          <span> 
          { 
                new Date(event.timeAndDate).toLocaleDateString("en-US", {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
                }
          </span>
          <span className="w-px h-4 bg-accent/50" />
          <span>
          { 
                     new Date(event.timeAndDate).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })
                }
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-textPrimary">{event.title}</h3>

        {/* Location */}
        <div className="flex items-center text-sm text-textSecondary gap-1">
          <MapPinIcon className="w-4 h-4" />
          {event.venueAddress}
        </div>

        {/* Organizer Info */}
        <div className="flex items-center gap-3 mt-2">
          <img
            // src={event.organizer.image}
            src="./eventimg1.jpg"
            alt={event.title}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col text-sm">
            <span className="font-medium text-textPrimary">{event.title}</span>
            <span className="text-textSecondary">{event.title}</span>
          </div>
        </div>

        <hr className="border-t border-gray-200 my-2" />

        {/* Visit Button */}
        <Link href={`/events/${event._id}`} passHref>
          <div>
            <button className="px-4 py-2 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition">
              Visit Event
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
