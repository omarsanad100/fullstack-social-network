import React from "react";
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

const Navbar = async () => {
  try {
    const user = await currentUser();
    if (user) {
      await syncUser();
    }

    return (
      <nav className="sticky top-0 w-full border-b bg-gray-50 dark:bg-background/60 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-primary font-mono tracking-wider"
              >
                <img
                  src="/flag-palestine-wallpaper-preview.jpg"
                  alt=""
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <DesktopNavbar />
            <MobileNavbar />
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error("Navbar error:", error);
    return null;
  }
};
export default Navbar;
