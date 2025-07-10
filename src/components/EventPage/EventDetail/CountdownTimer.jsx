// "use client";
// import { useEffect, useState } from "react";
// import { FaClock } from "react-icons/fa";

// const getTimeRemaining = (targetDate) => {
//   const total = Date.parse(targetDate) - Date.parse(new Date());
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));

//   return { total, days, hours, minutes, seconds };
// };

// export default function CountdownTimer({ targetDate }) {
//   const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updated = getTimeRemaining(targetDate);
//       setTimeLeft(updated);
//       if (updated.total <= 0) clearInterval(timer);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
//       <div className="flex items-center gap-2 text-lg font-semibold text-accent">
//         <FaClock className="text-accent" />
//         <span>Countdown to Event</span>
//       </div>

//       <div className="grid grid-cols-4 gap-3 text-center">
//         {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
//           <div key={label} className="bg-accent/10 text-accent rounded-lg py-3">
//             <div className="text-2xl font-bold">
//               {["days", "hours", "minutes", "seconds"][i] in timeLeft
//                 ? timeLeft[["days", "hours", "minutes", "seconds"][i]]
//                 : "00"}
//             </div>
//             <div className="text-xs">{label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const getTimeRemaining = (targetDate) => {
  const total = Date.parse(targetDate) - Date.parse(new Date());
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

  return { total, days, hours, minutes, seconds };
};

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = getTimeRemaining(targetDate);
      setTimeLeft(updated);
      if (updated.total <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm space-y-3">
      {/* Title */}
      <div className="flex items-center gap-2 text-base font-semibold text-accent">
        <FaClock className="text-accent text-sm" />
        <span>Starts In</span>
      </div>

      {/* Timer Grid */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {timeUnits.map((unit, i) => (
          <div
            key={i}
            className="bg-accent/10 text-accent rounded-md px-1.5 py-2"
          >
            <div className="text-xl font-bold leading-tight">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-[10px] font-medium mt-1">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

 