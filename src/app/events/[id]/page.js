"use client";

import ErrorPage from "@/components/ErrorPage";
import AgendaTable from "@/components/EventPage/EventDetail/AgendaTable";
import SmallCountdownBadge from "@/components/EventPage/EventDetail/CountdownTimer";
import CountdownTimer from "@/components/EventPage/EventDetail/CountdownTimer";
import LocationCard from "@/components/EventPage/EventDetail/LocationCard";
import OrganizerCard from "@/components/EventPage/EventDetail/OrganizerCard";
import SpeakerCard from "@/components/EventPage/EventDetail/SpeakerCard";
import SpeakerCarousel from "@/components/EventPage/EventDetail/SpeakerCarousel";
import EventHeading from "@/components/EventPage/EventHeading";
import LoadingPage from "@/components/LoadingPage";
import FancyButton from "@/components/tailwind-lib/Newbutton";
import { useSingleEventQuery } from "@/hooks/useLatestEvents";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function EventDetailPage( ) {

const params = useParams(); 
const id = params?.id
const { data: events  , isLoading, isError}  = useSingleEventQuery(id);
console.log("Event data:", events?.title); 
const router = useRouter();

if (isLoading) return <LoadingPage/>;
if (isError || !events) return <ErrorPage message="Event not found" />;


  // Dummy data - replace with fetched data
  const event = {
    title: "Tech Conference 2025",
    image: "/eventimg1.jpg",
    date: "April 30, 2025",
    time: "10:00 AM",
    address: "street 15, westridge 3 rawalpindi, Pakistan",
    description:
      "Join us for a full-day conference featuring top minds in tech But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure",
    speaker: [
      {
        name: "Jane Doe",
        title: "CTO, TechCorp",
        image: "/eventimg1.jpg",
      },
      {
        name: "Jane Doe",
        title: "CTO, TechCorp",
        image: "/eventimg1.jpg",
      },
      {
        name: "Jane Doe",
        title: "CTO, TechCorp",
        image: "/eventimg1.jpg",
      },
      {
        name: "Jane Doe",
        title: "CTO, TechCorp",
        image: "/eventimg1.jpg",
      },
      {
        name: "Jane Doe",
        title: "CTO, TechCorp",
        image: "/eventimg1.jpg",
      },
    ],
    agenda: [
      {
        time: "10:00 AM",
        speaker: "Jane Doe",
        subject: "Future of AI",
        venue: "Main Hall",
      },
      {
        time: "11:00 AM",
        speaker: "John Smith",
        subject: "Web3 Trends",
        venue: "Room B",
      },
    ],
    organizer: {
      name: "Alice Johnson",
      title: "Event Manager",
      email: "alice@example.com",
      phone: "+1234567890",
      image: "/eventimg1.jpg",
    },
    location: {
      address: "rawalpindi, Pakistan",
      mapEmbed: "https://maps.google.com/...", // Use actual embed URL
    },
  };

const address = events.venueAddress

  return (
    <div className="">
      {/* Step 1: Heading */}
      <EventHeading heading="Event Details" />

      {/* Step 2: Main Content */}
      {/* <div className="max-w-7xl mx-auto px-10 md:px-8 py-10 flex   md:flex-row gap-10"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex flex-col md:flex-row gap-10">
        {/* Left Main Section */}
        <div className="w-full md:w-2/3 space-y-8">
          {/* Event Image */}
          <img
            src={events.coverimage}
            alt={event.title}
            className="rounded-xl w-full h-auto object-cover"
          />

          {/* Date-Time Badge */}
          <div className="space-x-6">
            <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <span>{ 
                new Date(events.timeAndDate).toLocaleDateString("en-US", {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
                }</span>
              <span className="w-px h-4 bg-accent/50" />
              <span>{ 
                new Date(events.timeAndDate).toLocaleTimeString("en-US", {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
                }</span>
            </div>
            <div className="inline-flex items-center gap-3  bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <span>{events.type}</span>
             
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-3xl font-bold text-textPrimary">
            {events.title}
          </h1>
          <p className="text-textSecondary text-justify text-base sm:text-lg">
            {events.details}
          </p>

           
    
          <SpeakerCarousel speakers={events.Speakers} />

          {/* Agenda Table */}
          <AgendaTable agenda={events.agenda} />

          <div className="space-y-4 ">
            <CountdownTimer targetDate={events.RegistrationDeadline} />
            <Link href="/events/eventdetail/registerforevent" passHref>
            
            <FancyButton
              text="Register Now"
              onClick={() => router.puch("/events")}
            />
            </Link> 
          </div>
        </div>

        {/* Right Sidebar */}
 
        <div className="w-full md:w-1/3   space-y-6">
          <OrganizerCard organizer={events.createdBy} />
           
          <LocationCard location={{ address: events.venuAddress }} />

        </div>
      </div>
    </div>
  );
}
