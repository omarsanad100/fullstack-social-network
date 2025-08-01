import { auth } from "@clerk/nextjs/server";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { redirect, notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

type ProfilePageParams = {
  params: { username: string };
};

export const generateMetadata = async ({ params }: ProfilePageParams) => {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
};

const ProfilePageServer = async ({ params }: ProfilePageParams) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getProfileByUsername(params.username);

  if (!user) return notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
};
export default ProfilePageServer;
