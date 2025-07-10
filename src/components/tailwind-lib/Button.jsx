import { ArrowRightIcon } from "@heroicons/react/24/solid";
import FancyButton from "./Newbutton";
import Link from "next/link";

export default function ButtonsSection() {
  return (
    <div className="flex flex-row  flex-wrap gap-3 mt-8 py-6 justify-center items-center">
      {/* Explore Events Button */}

      <Link href="/events" passHref >
      <button  className="inline-flex items-center justify-center px-6 py-4 text-sm sm:text-base font-semibold rounded-full   text-white bg-accent transition duration-300 hover:scale-105 hover:ring-2 hover:ring-white focus:outline-none">

        Explore Events
      </button>
      </Link>

      {/* Create Your Own Event Button */}
      <Link href="/events/register" passHref >
    
      <FancyButton text="Create Your Own Event"/>

      </Link>
    </div>
  );
}
