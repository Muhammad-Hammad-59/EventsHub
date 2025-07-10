"use client";
import React, { useState,useEffect } from "react";
import NextLink from "next/link"; // 👈 import Next.js Link
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
} from "@heroui/react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Contact us", href: "/contact" },
    { name: "Log Out", href: "/logout" },
  ];

  const handleLinkClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false); // close menu
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // 10px scroll triggers background
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


 

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
        <AcmeLogo />
        <p className="font-bold text-inherit">EventHub</p>
      </NavbarBrand>

 
      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-6 font-semibold" justify="center">
        {menuItems.slice(0, 4).map((item) => (
          <NavbarItem key={item.name} isActive={activePage === item.name}>
            <HeroLink
              as={NextLink}
              href={item.href}
              className={`w-full ${activePage === item.name ? "text-primary font-semibold" : "text-froeground"}`}
              onPress={() => handleLinkClick(item.name)} // ✅ CORRECT NOW
            >
              {item.name}
            </HeroLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side */}
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <Avatar
              isBordered
              color="primary"
              size="sm"
              src="https://i.pravatar.cc/150?u=user"
            />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="font-semibold">
              <HeroLink as={NextLink} href="/login">
                Login
              </HeroLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <HeroLink as={NextLink} href="/about">
                Sign up
              </HeroLink>
            </NavbarItem>
          </>
        )}
        <NavbarItem className="hidden lg:flex">
          <Button as={NextLink} color="accent" href="#" variant="flat" className="bg-accent font-semibold">
            Create Event +
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <HeroLink
              as={NextLink}
              href={item.href}
              className={`w-full ${activePage === item.name ? "text-primary font-semibold" : ""}`}
              color={item.name === "Log Out" ? "danger" : "foreground"}
              size="lg"
              onPress={() => handleLinkClick(item.name)}
            >
              {item.name}
            </HeroLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
