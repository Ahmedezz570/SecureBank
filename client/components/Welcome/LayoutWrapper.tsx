"use client";

import { usePathname } from "next/navigation";
import NavbarWrapper from "../Header/NavbarWrapper "; 
import { Footer } from "@/components/Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/Register","/"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <NavbarWrapper />}
      {children}
      <Footer />
    </>
  );
}
