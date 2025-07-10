 

"use client"
import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEventFilter } from "@/stores/useEventFilterStore";
import { debounce } from "@/lib/debounsing";

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);


  const {search, category,type,  setSearch, setCategory, setType } = useEventFilter()


  // const eventCategories = {
  //   tech: "Technology",
  //   music: "Music",
  //   art: "Art & Design",
  //   sports: "Sports",
  //   education: "Education",
  //   health: "Health & Wellness",
  //   business: "Business",
  // };

  const eventCategories = {
    "": "Select Event Type",
    conference: "Conference",
    workshop: "Workshop",
    seminar: "Seminar",
    webinar: "Webinar",
    meetup: "Meetup",
    other: "Other"
  };
  // Detect screen width on load and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480); // Tailwind 'md' breakpoint is 768px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);

  

  const debouncedSearch = useCallback(
    debounce(
    (value)=>{
    setSearch(value)
    console.log("Debounced search:", value);
    },500
    ),
      [])
  
  const handleSearchChange = (e) =>{
    const value = e.target.value;
    setSearchTerm(value)
    debouncedSearch(value)
  }
  

  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setType(selected);
    console.log("Selected category:", selected);
  };

  const handleSearch=()=>{
    console.log("Search is call ")
    setSearch(search)
    setType(type)
  }
   
  return (
    <div className=" flex justify-center">
      <div className="group max-w-2xl w-full transition-all flex items-center bg-white rounded-lg overflow-hidden shadow focus-within:ring-2 focus-within:ring-blue-500">
        <div className="flex items-center px-4 py-3 w-full">
          {/* Search Input */}
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search by Title..."
            className="w-full text-black bg-white focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Category Select */}
        <select
          value={type}
          onChange={handleTypeChange}
          className="px-2 md:px-4 py-3 bg-white text-gray-700 focus:outline-none"
        >
          <option value="" disabled>
            Select
          </option>
  
          {Object.entries(eventCategories).map(([key,lable]) =>(
            <option  key={key} value={key}>
                {
                  isMobile ? 
                    lable.length > 5 ? ` ${lable.slice(0,5)}`: lable 
                    : lable
                }
            </option>
          ) )}
        </select>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Search Button */}
   
        

        <button
          className="flex items-center justify-center h-full px-6 py-3 bg-accent hover:bg-blue-700 text-white font-semibold focus:outline-none"
          onClick={handleSearch}
        >
          {/* Show icon on mobile */}
          <MagnifyingGlassIcon className="h-5 w-5 block sm:hidden" />

          {/* Show text on medium and larger screens */}
          <span className="hidden sm:block">Search</span>
        </button>


      </div>
    </div>
  );
}

