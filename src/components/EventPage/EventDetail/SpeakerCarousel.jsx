"use client"

// import { useState } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import SpeakerCard from "./SpeakerCard";
// import { motion, AnimatePresence } from "framer-motion";

// export default function SpeakerCarousel({ speakers }) {
//   const CARDS_PER_VIEW = 3;
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex + CARDS_PER_VIEW < speakers.length) {
//       setCurrentIndex(currentIndex + CARDS_PER_VIEW);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex - CARDS_PER_VIEW >= 0) {
//       setCurrentIndex(currentIndex - CARDS_PER_VIEW);
//     }
//   };

//   // Slice the speakers to show only the current 3
//   const visibleSpeakers = speakers.slice(currentIndex, currentIndex + CARDS_PER_VIEW);

//   return (
//     <div className="w-full bg-backgroundSecondary p-6 rounded-xl">
//       {/* Header with Title and Arrows */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Speakers</h2>
//         <div className="flex gap-2">
//           <button
//             className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//             onClick={handlePrev}
//             disabled={currentIndex === 0}
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//             onClick={handleNext}
//             disabled={currentIndex + CARDS_PER_VIEW >= speakers.length}
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Card Slider */}
//       <motion.div
//         key={currentIndex} // this key causes AnimatePresence to trigger
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -100 }}
//         transition={{ duration: 0.5 }}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//       >
//         {visibleSpeakers.map((speaker, index) => (
//           <SpeakerCard key={index} speaker={speaker} />
//         ))}
//       </motion.div>
//     </div>
//   );
// }


// components/event/SpeakerSection.jsx
// import { useRef } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import SpeakerCard from "./SpeakerCard";

// export default function SpeakerCarousel({ speakers }) {
//   const scrollRef = useRef();

//   const scroll = (direction) => {
//     const scrollAmount = 300; // adjust how much you want to scroll per click
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="bg-backgroundSecondary p-6 rounded-xl">
//       {/* Heading & Arrows */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Speakers</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={() => scroll("left")}
//             className="p-2 rounded-full bg-gray-200 hover:bg-accent text-gray-700 hover:text-white transition"
//           >
//             <FaArrowLeft />
//           </button>
//           <button
//             onClick={() => scroll("right")}
//             className="p-2 rounded-full bg-gray-200 hover:bg-accent text-gray-700 hover:text-white transition"
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Speaker Cards */}
//       <div
//         ref={scrollRef}
//         className="flex flex-row  overflow-x-auto no-scrollbar scroll-smooth"
//       >
//         {speakers.map((speaker, index) => (
//           <SpeakerCard key={index} speaker={speaker} />
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState, useRef, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SpeakerCard from './SpeakerCard';

export default function SpeakerCarousel({ speakers }) {
    if (!speakers || speakers.length === 0) { 
      return null; // or return a fallback message            
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3);
    const carouselRef = useRef(null);
  
    // Function to handle window resize and adjust cards to show
    useEffect(() => {
      const handleResize = () => {
        // Example logic to adjust the number of cards based on screen size
        if (window.innerWidth < 768) {
          setCardsToShow(1);
        } else if (window.innerWidth < 1024) {
          setCardsToShow(2);
        } else {
          setCardsToShow(3);
        }
      };
  
      // Set initial value
      handleResize();
  
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // Handle navigation
    const goToPrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
      }
    };
  
    const goToNext = () => {
      if (currentIndex < speakers.length - cardsToShow) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    };
  
    // Check if navigation buttons should be enabled
    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < speakers.length - cardsToShow;
  
    return (
      <div className="w-full bg-backgroundSecondary p-10">
        {/* Header with title and navigation arrows */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Our Speakers</h2>
          
          <div className="flex gap-4">
            <button 
              onClick={goToPrevious}
              disabled={!canGoBack}
              className={`p-2 rounded-full ${canGoBack ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            
            <button 
              onClick={goToNext}
              disabled={!canGoForward}
              className={`p-2 rounded-full ${canGoForward ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>
        
      
        {/* Cards container with overflow hidden */}
        <div className="relative overflow-hidden">
          {/* Sliding container */}
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (256 + 24)}px)` }} // 256px card width + 24px gap
          >
            {speakers.map((speaker, index) => (
              console.log("Speaker data:", speaker),
              <SpeakerCard key={index} speaker={speaker} />
            ))}
          </div>
        </div>
      </div>
    );
  }



// "use client";

// import { useState, useEffect } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import SpeakerCard from "./SpeakerCard";

// export default function SpeakerCarousel({ speakers }) {
//   if (!speakers || speakers.length === 0) {
//     return null; // or return a fallback message
//   }

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsToShow, setCardsToShow] = useState(3);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCardsToShow(1);
//       } else if (window.innerWidth < 1024) {
//         setCardsToShow(2);
//       } else {
//         setCardsToShow(3);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   console.log("speakers in card", speakers);

//   const goToPrevious = () => {
//     const newIndex = (currentIndex - 1 + speakers.length) % speakers.length;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = () => {
//     const newIndex = (currentIndex + 1) % speakers.length;
//     setCurrentIndex(newIndex);
//   };

//   const getVisibleSpeakers = () => {
//     const result = [];
//     for (let i = 0; i < cardsToShow; i++) {
//       const index = (currentIndex + i) % speakers.length;
//       result.push(speakers[index]);
//     }
//     return result;
//   };

//   return (
//     <div className="w-full bg-backgroundSecondary p-6 rounded-xl">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Our Speakers</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={goToPrevious}
//             className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
//           >
//             <IoIosArrowBack className="text-xl" />
//           </button>
//           <button
//             onClick={goToNext}
//             className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
//           >
//             <IoIosArrowForward className="text-xl" />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500">
//         {getVisibleSpeakers().map((speaker, index) => (
//           <SpeakerCard key={index} speaker={speaker} />
//         ))}
//       </div>
//     </div>
//   );
// }




 
