import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
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
