"use client";
import { motion } from "framer-motion";
import SearchSection from "../searchbar/search";
import ButtonsSection from "../tailwind-lib/Button";
import { Button } from "@heroui/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import FancyButton from "../tailwind-lib/Newbutton";

export const category = [
  { key: "Education", label: "Education" },
  { key: "Technology", label: "Technology" },
  { key: "Cuncert", label: "Cuncert" },
  { key: "Sport", label: "Sport" },
];

export default function HeroPage() {

  const images = [
    "/eventimg1.jpg",
    "/eventimg2.jpeg",
    "/eventimg3.jpeg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
  
    return () => clearInterval(interval);
  }, []);


  const handleSearch = () => {
    console.log("Search clicked");
  };


 



  return (
    <motion.div
   
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  className="relative w-full h-screen flex items-center justify-center transition-all duration-1000"
    

  style={{
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>


 

      {/* Overlay */}
       
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#4863E0]/70 via-[#4863E0]/50 to-transparent" /> */}

 
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
        >
          Discover and Create Unforgettable Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Find the perfect event for you or create your own. From workshops to
          concerts, conferences to parties - all in one place.
        </motion.p>


        {/* Search SearchSection         */}
 
        <SearchSection category={category} onSearch={handleSearch} /> 
       <ButtonsSection/>
 
      </div>

  


{/* Dots Indicator */}

      <div className="absolute bottom-8 w-full flex justify-center space-x-2 z-20">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`h-3 w-3 rounded-full ${
          currentImageIndex === index ? "bg-white" : "bg-white/50"
        }`}
      />
    ))}
  </div> 
  
    </motion.div>
  );
}
