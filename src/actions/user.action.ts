"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// I've created this Fn to use to sync user with database
export const syncUser = async () => {
  try {
    // Get the userId from the auth object
    const { userId } = await auth();
    // Get the user object from Clerk
    const user = await currentUser();

    if (!user || !userId) {
      throw new Error("User not found");
    }

    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // Create a new user if it does not exist
    const databaseUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return databaseUser;
  } catch (error) {
    console.error("Error syncing user:", error);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
};
