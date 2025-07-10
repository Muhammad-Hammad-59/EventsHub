// components/event/EventHeading.jsx

export default function EventHeading({heading}) {
    return (
      <div
        className="relative h-52 sm:h-64 md:h-72 bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
  
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{heading}</h1>
          <div className="text-sm text-white opacity-80">
            <span className="hover:underline cursor-pointer">Home</span>
            <span className="mx-2">→</span>
            <span className="font-medium">Events</span>
          </div>
        </div>
      </div>
    );
  }
  