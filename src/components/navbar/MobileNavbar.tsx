"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
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
  const { user } = useUser();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const username =
    user?.username ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0];

  return (
    <MobileNavbarUi
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
      mounted={mounted}
      theme={theme}
      toggleTheme={toggleTheme}
      isSignedIn={isSignedIn ?? false}
      username={username}
    />
  );
}

export default MobileNavbar;
