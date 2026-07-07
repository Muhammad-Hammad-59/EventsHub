import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
  } from "@heroicons/react/24/outline";
  import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
  } from "react-icons/fa";
import GlowEffect from "../tailwind-lib/GlowEffect";
import Link from "next/link";
  
  export default function Footer() {
    return (
      <footer className="relative bg-[#0C1B38] overflow-hidden text-textSecondary pt-12 sm:pt-20 px-6">
        <div className="max-w-7xl relative mx-auto ">

   
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-gray-600 gap-8">
          {/* Brand */}
          <div className="md:px-6 py-4 flex-1">
            <Link href="/">
              <h2 className="text-xl font-bold text-white mb-4">EventHub</h2>
            </Link>
            <p className="text-sm text-gray-400">
              Discover and organize events that matter to you.
            </p>
          </div>
  
          {/* Navigation */}
          <div className="md:pl-12 py-4 flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2 text-gray-400 text-md">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/events" className="hover:text-accent transition">Events</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div className="md:pl-12 py-4 flex-1">
            <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-md text-gray-400">
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-8 h-8 p-2 bg-white rounded-full  text-accent hover:text-white hover:bg-accent transition duration-100 " /> support@eventhub.com
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-8 h-8 p-2 bg-white rounded-full  text-accent hover:text-white hover:bg-accent transition duration-100 " /> +1 234 567 890
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-8 h-8 p-2 bg-white rounded-full  text-accent hover:text-white hover:bg-accent transition duration-100 " /> New York, USA
              </li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div className="md:pl-12 py-4 flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4 text-white text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
  
        <div className="mt-10 py-6 text-center text-xs text-gray-500 border-t border-gray-600">
          &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        </div>
        </div>
        <GlowEffect position="-left-10 -top-10"/>
      </footer>
    );
  }