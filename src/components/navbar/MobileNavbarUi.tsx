import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  Moon,
  Sun,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

type Props = {
  showMobileMenu: boolean;
  setShowMobileMenu: (open: boolean) => void;
  mounted: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
  isSignedIn: boolean;
  username?: string | null;
};

const MobileNavbarUi = ({
  showMobileMenu,
  setShowMobileMenu,
  mounted,
  theme,
  toggleTheme,
  isSignedIn,
  username,
}: Props) => (
  <div
    className="flex md:hidden items-center space-x-2 antialiased
      bg-background font-sans dark:bg-gradient-to-r from-[#141e30] to-[#101c29] dark:text-gray-200"
  >
    {mounted && theme && (
      <Button
        size="icon"
        onClick={toggleTheme}
        variant="outline"
        className={`relative ${
          theme === "dark"
            ? "bg-slate-100 text-slate-900"
            : "bg-slate-900 text-slate-100"
        }`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-current rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] text-current rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    )}

    <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-5 w-5 " />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] antialiased text-gray-800
    bg-gray-50
    dark:bg-gradient-to-r dark:from-[#070c16] dark:to-[#243b55]
    dark:text-gray-200
    rounded-xl"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          <Button
            variant="ghost"
            className="flex items-center gap-3 justify-start  hover:bg-gray-200"
            asChild
          >
            <Link href="/">
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </Button>

          {isSignedIn ? (
            <>
              <Button
                variant="ghost"
                className="flex items-center gap-3 justify-start  hover:bg-gray-200"
                asChild
              >
                <Link href="/notifications">
                  <BellIcon className="w-4 h-4" />
                  Notifications
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-3 justify-start  hover:bg-gray-200"
                asChild
              >
                <Link href={username ? `/profile/${username}` : "/profile"}>
                  <UserIcon className="w-4 h-4" />
                  Profile
                </Link>
              </Button>
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start  hover:bg-gray-200 w-full"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </SignInButton>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  </div>
);

export default MobileNavbarUi;
