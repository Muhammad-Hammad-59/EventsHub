"use client";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Link as HeroLink,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useAuthStore } from "@/stores/useAuthStore";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Navbard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading, fetchUser, logout } = useAuthStore();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Contact us", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Navbar
      isBordered={true}
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 left-0 w-full border-black z-50 ${isScrolled ? "bg-textPrimary shadow-md" : "bg-transparent"} text-background transition-all duration-300`}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

      <NavbarBrand>
        <NextLink href="/" className="flex items-center gap-1">
          <AcmeLogo />
          <p className="font-bold text-inherit">EventHub</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-6 font-semibold" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={isActive(item.href)}>
            <HeroLink
              as={NextLink}
              href={item.href}
              className={`w-full ${isActive(item.href) ? "text-primary font-semibold" : "text-foreground"}`}
            >
              {item.name}
            </HeroLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side */}
      <NavbarContent justify="end">
        {isLoading ? (
          <NavbarItem>
            <div className="w-20 h-4 bg-white/20 rounded animate-pulse" />
          </NavbarItem>
        ) : user ? (
          <>
            {/* Logged-in: show user avatar + dropdown */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar
                    isBordered
                    color="primary"
                    size="sm"
                    name={user.username?.charAt(0).toUpperCase()}
                    className="cursor-pointer"
                  />
                  <span className="hidden sm:block text-sm font-semibold text-inherit">
                    {user.username}
                  </span>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User actions">
                <DropdownItem key="profile" className="h-14 gap-2" textValue="Signed in">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-accent">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="dashboard" textValue="Dashboard" onPress={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownItem>
                <DropdownItem key="my-events" textValue="My Events" onPress={() => router.push("/dashboard/my-events")}>
                  My Events
                </DropdownItem>
                <DropdownItem key="create" textValue="Create Event" onPress={() => router.push("/dashboard/create-event")}>
                  Create Event
                </DropdownItem>
                <DropdownItem key="logout" color="danger" textValue="Log Out" onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            {/* Not logged in: show Login + Sign up + Create Event */}
            <NavbarItem className="font-semibold">
              <HeroLink as={NextLink} href="/login">
                Login
              </HeroLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <HeroLink as={NextLink} href="/signup">
                Sign up
              </HeroLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button as={NextLink} color="accent" href="/events/register" variant="flat" className="bg-accent font-semibold">
                Create Event +
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <HeroLink
              as={NextLink}
              href={item.href}
              className={`w-full ${isActive(item.href) ? "text-primary font-semibold" : ""}`}
              color="foreground"
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.name}
            </HeroLink>
          </NavbarMenuItem>
        ))}
        {user ? (
          <NavbarMenuItem>
            <HeroLink
              color="danger"
              size="lg"
              className="w-full cursor-pointer"
              onPress={handleLogout}
            >
              Log Out
            </HeroLink>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <HeroLink as={NextLink} href="/login" size="lg" onPress={() => setIsMenuOpen(false)}>Login</HeroLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <HeroLink as={NextLink} href="/signup" size="lg" onPress={() => setIsMenuOpen(false)}>Sign up</HeroLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
