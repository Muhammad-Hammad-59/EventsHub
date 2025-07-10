// export default function SpeakerCard({ speaker }) {
//     return (
//       <div className="p-6 border rounded-xl shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Speaker</h2>
//         <div className="flex items-center gap-4">
//           <img src={speaker.image} alt={speaker.name} className="w-16 h-16 rounded-full" />
//           <div>
//             <div className="font-semibold">{speaker.name}</div>
//             <div className="text-sm text-gray-500">{speaker.title}</div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

// export default function SpeakerCard({ speaker }) {
//     return (
//       <div className="group relative w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-500">
//         {/* Image Container (70% height, slight overlap) */}
//         <div className="relative h-[70%] w-full overflow-hidden">
//           <img
//             src={speaker.image}
//             alt={speaker.name}
//             className="h-full w-full object-cover transition-transform group-hover:scale-105"
//           />
          
//           {/* Dark Gradient (visible on hover) */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          
//           {/* Social Icons (hidden, animate up on hover) */}
//           <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 p-4">
//             {[1, 2, 3, 4].map((i) => (
//               <button
//                 key={i}
//                 className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-blue-500 transition-colors"
//               >
//                 <span className="text-white text-sm">Icon</span>
//               </button>
//             ))}
//           </div>
//         </div>
  
//         {/* Content Box (30% height, slightly overlapped by image) */}
//         <div className="relative z-10 -mt-6 mx-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm transition-all group-hover:border-blue-500">
//           <h3 className="font-semibold text-lg">{speaker.name}</h3>
//           <p className="text-sm text-gray-500 mb-3">{speaker.title}</p>
//           <button className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
//             Speaker
//           </button>
//         </div>
//       </div>
//     );
//   }


import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const iconMap = {
  twitter: { icon: FaTwitter, key: "twitter" },
  linkedin: { icon: FaLinkedin, key: "linkedin" },
  facebook: { icon: FaFacebook, key: "facebook" },
  instagram: { icon: FaInstagram, key: "instagram" },
};

export default function SpeakerCard({ speaker }) {
  return (
    <div className="w-[80%] sm:w-[45%] md:w-[30%] lg:w-[28%] max-w-xs rounded-xl overflow-hidden shadow group transition-all duration-300 flex-shrink-0 flex flex-col">
      {/* Image Box */}
      <div className="relative aspect-[4/3]">
        <img
          src={speaker.profileImage}
          alt={speaker.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Social Icons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {Object.values(iconMap).map(({ icon: Icon, key }) =>
            speaker.socialMedia?.[key] ? (
              <a
                key={key}
                href={speaker.socialMedia[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 p-2 rounded-full text-white hover:text-accent hover:bg-opacity-80 transition"
              >
                <Icon className="text-md" />
              </a>
            ) : null
          )}
        </div>
      </div>

      {/* Content Box */}
      <div className="flex flex-col justify-between flex-grow bg-white px-4 py-6 text-center border border-transparent group-hover:border-accent transition-colors duration-300 rounded-b-xl">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">{speaker.name}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{speaker.expertise}</p>
        </div>
        <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Speaker
        </button>
      </div>
    </div>
  );
}
