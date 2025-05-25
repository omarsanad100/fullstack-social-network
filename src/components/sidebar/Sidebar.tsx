import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
// import { getUserByClerkId } from "@/actions/user.action";

const Sidebar = async () => {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) return <UnAuthenticatedSidebar />;

  // const user = await getUserByClerkId(authUser.id);
  // if (!user) return null;
  return (
    <div className="h-full antialiased text-gray-800 bg-background font-sans dark:bg-gradient-to-r from-[#141e30] to-[#243b55] dark:text-gray-200">
      Sidebar
    </div>
  );
};

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20 antialiased text-gray-800 bg-background font-sans dark:bg-gradient-to-r from-[#141e30] to-[#243b55] dark:text-gray-200 rounded-xl">
    <Card className="bg-transparent shadow-none w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
