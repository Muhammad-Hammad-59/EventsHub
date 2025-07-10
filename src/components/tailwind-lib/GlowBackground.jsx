import React from "react";

const GlowBackground = ({ color = "#4863E0", size = "w-96 h-96", opacity = "30", blur = "3xl" }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className={`${size} rounded-full blur-${blur}`}
        style={{
          backgroundColor: `${color}`,
          opacity: parseInt(opacity) / 100,
        }}
      />
    </div>
  );
};

export default GlowBackground;

// how to use this component in another file
// import GlowBackground from "./path/to/GlowBackground";
//
// <GlowBackground color="#ff00ff" size="w-[600px] h-[600px]" opacity="20" blur="5xl" />    
// <GlowBackground />