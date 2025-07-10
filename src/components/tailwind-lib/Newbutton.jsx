// "use client"
// import { ArrowRightIcon } from "@heroicons/react/24/solid";

// export default function FancyButton() {
//   return (
//     <button className="group relative flex items-center gap-4 px-6 py-3 rounded-full font-semibold border border-volatile bg-white text-accent overflow-hidden transition-colors duration-300">
//       {/* Gradient overlay transition */}
//       <span className="absolute inset-0 bg-gradient-to-br from-accent via-blue-500 to-blue-600 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out z-0"></span>

//       {/* Text animation (slide up/down) */}
//       <span className="relative z-10 block h-5 overflow-hidden">
//         <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
//           Create Your Own Event
//         </span>
//         <span className="block absolute top-full left-0 transition-transform duration-500 ease-in-out group-hover:translate-y-[-100%] text-white">
//           Create Your Own Event
//         </span>
//       </span>

//       {/* Arrow inside a smooth animated circle */}
//       <div className="relative z-10 w-8 h-8 rounded-full bg-accent group-hover:bg-white flex items-center justify-center overflow-hidden transition-colors duration-500 ease-in-out">
//         {/* Outgoing arrow */}
//         <ArrowRightIcon className="w-4 h-4 absolute transition-transform duration-500 ease-in-out group-hover:translate-x-8 text-white group-hover:text-accent" />
//         {/* Incoming arrow */}
//         <ArrowRightIcon className="w-4 h-4 absolute -translate-x-8 transition-transform duration-500 ease-in-out group-hover:translate-x-0 text-white group-hover:text-accent" />
//       </div>
//     </button>
//   );
// }



"use client"

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function FancyButton({
  text = "Create Your Own Event",
  onClick,
  icon = <ArrowRightIcon className="w-4 h-4" />,
  className = "",
  textClass = "",
  arrowBgClass = "",
  gradient = "from-accent via-blue-500 to-blue-600",
  textColor = "text-accent",
  bg = "bg-white",
  border = "border border-volatile",
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex items-center gap-4 px-6 py-3 rounded-full font-semibold overflow-hidden transition-colors duration-300",
        textColor,
        bg,
        border,
        className
      )}
    >
      {/* Gradient overlay transition */}
      <span
        className={clsx(
          "absolute inset-0 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out z-0",
          `bg-gradient-to-br ${gradient}`
        )}
      ></span>

      {/* Text animation (slide up/down) */}
      <span className={clsx("relative z-10 block h-5 overflow-hidden", textClass)}>
        <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="block absolute top-full left-0 transition-transform duration-500 ease-in-out group-hover:translate-y-[-100%] text-white">
          {text}
        </span>
      </span>

      {/* Arrow inside a smooth animated circle */}
      <div
        className={clsx(
          "relative z-10 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ease-in-out",
          "bg-accent group-hover:bg-white",
          arrowBgClass
        )}
      >
        {/* Outgoing arrow */}
        <span className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-8 text-white group-hover:text-accent">
          {icon}
        </span>
        {/* Incoming arrow */}
        <span className="absolute -translate-x-8 transition-transform duration-500 ease-in-out group-hover:translate-x-0 text-white group-hover:text-accent">
          {icon}
        </span>
      </div>
    </button>
  );
}
