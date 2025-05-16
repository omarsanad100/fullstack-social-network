"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import MobileNavbarUi from "./MobileNavbarUi";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <MobileNavbarUi
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
      mounted={mounted}
      theme={theme}
      toggleTheme={toggleTheme}
      isSignedIn={isSignedIn ?? false}
    />
  );
}

export default MobileNavbar;
