"use client";

import { usePathname } from "next/navigation";
import Navbard from "@/components/navbar/navbar";
import Footer from "@/components/navbar/Footer";
import { ToastContainer } from "react-toastify";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/dashboard"];
const NO_FOOTER_ROUTES = ["/login", "/signup", "/forgot-password", "/dashboard"];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isHiddenNavbar = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const hideFooter = NO_FOOTER_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isHiddenNavbar && <Navbard />}
      {children}
      <ToastContainer
        position="bottom-right"
        newestOnTop
        hideProgressBar={false}
        autoClose={3000}
      />
      {!hideFooter && <Footer />}
    </>
  );
}
