"use client";
import { useEffect, useState } from "react";
import SearchSection from "../searchbar/search";
import EventCard from "../cards/EventCard";
import EventHeading from "./EventHeading";
import { useEvents } from "@/hooks/useEvents";
import { useEventFilter } from "@/stores/useEventFilterStore";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import PaginationControls from "../tailwind-lib/PaginationControls";
 

// Dummy event data
 
export default function EventPage() {

  const { data, isLoading, isError } = useEvents();
  const { page, setPage } = useEventFilter();

console.log("data object value",data)

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Step 2: Search Section */}
   <div className="bg-backgroundSecondary w-full max-w-7xl pt-10">

      <SearchSection   />
   </div>

      {/* Step 3: Event Cards List */}
      <div className="grid gap-6 mt-12 bg-white p-4 sm:p-10 rounded-xl">
        {
        
        isLoading ? ( <LoadingPage/>) :
        (
          
          data?.events?.map((event) => (
            <EventCard key={event._id} event={event} color="backgroundSecondary" />
          ))
        )
        }
      </div>

      {/* Step 4: Pagination */}
      <div className="flex justify-center p-10 gap-2 mt-10">
         
          {/* <button
          
            // className={`px-4 py-2 rounded-full border ${
            //   currentPage === index + 1
            //     ? "bg-accent text-white"
            //     : "bg-white text-accent border-accent"
            // }`}
            onClick={() => setPage(page+1)}
          >
            {page+1}
          </button> */}
       
       <PaginationControls totalpage={data?.totalPages || 1} />
      </div>

    </div>
  );
}
