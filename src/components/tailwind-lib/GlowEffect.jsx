// components/common/GlowEffect.js
export default function GlowEffect({
    className = "",
    color = "bg-blue-500",
    size = "h-72 w-72",
    position = "bottom-0 right-0",
    blur = "blur-3xl",
    opacity = "opacity-30",
    zIndex = "z-0",
  }) {
    return (
      <div
        className={`pointer-events-none absolute ${position} ${size} ${color} ${blur} ${opacity} rounded-full ${zIndex} ${className}`}
      />
    );
  }
  