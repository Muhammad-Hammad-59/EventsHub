"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  ClipboardDocumentListIcon,
  TicketIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navItems = [
  { name: "My Events", href: "/dashboard/my-events", icon: ClipboardDocumentListIcon, badge: "Manage" },
  { name: "My Registrations", href: "/dashboard/registrations", icon: TicketIcon, badge: "Attend" },
  { name: "Explore Events", href: "/dashboard/explore", icon: MagnifyingGlassIcon, badge: "Discover" },
  { name: "Create Event", href: "/dashboard/create-event", icon: PlusCircleIcon, badge: "New", highlight: true },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => pathname.startsWith(href);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const sidebarContent = (
    <>
      {/* Logo + Brand */}
      <div className="px-5 pt-6 pb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-md shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
            <svg fill="none" height="20" viewBox="0 0 32 32" width="20" className="text-white">
              <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-bold text-textPrimary">EventHub</span>
        </Link>
      </div>

      {/* Divider label */}
      <div className="px-5 mb-2">
        <p className="text-[10px] font-semibold text-textMuted uppercase tracking-widest">Menu</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1.5">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              isActive(item.href)
                ? item.highlight
                  ? "bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30"
                  : "bg-accent text-white shadow-md shadow-accent/20"
                : `text-textSecondary hover:bg-backgroundSecondary hover:text-textPrimary ${item.highlight ? "hover:bg-accent/10" : ""}`
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 pt-2 space-y-1 border-t border-borderColor mt-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-gradient-to-r from-background to-backgroundSecondary border-b border-borderColor flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-backgroundSecondary transition"
        >
          {mobileOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
            <svg fill="none" height="14" viewBox="0 0 32 32" width="14" className="text-white">
              <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-bold text-textPrimary">EventHub</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] bg-white border-r border-borderColor flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
