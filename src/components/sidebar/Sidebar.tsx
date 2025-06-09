import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import { getUserByClerkId } from "@/actions/user.action";
import AuthenticatedSidebar from "./AuthenticatedSidebar";

const Sidebar = async () => {
  const authenticatedUser = await currentUser();
  if (!authenticatedUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authenticatedUser.id);
  if (!user) return null;

  return <AuthenticatedSidebar user={user} />;
};

export default Sidebar;
