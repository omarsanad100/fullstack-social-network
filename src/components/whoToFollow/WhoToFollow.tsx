import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import FollowButton from "../followButton/FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <div
      className="antialiased text-gray-800
    bg-gray-50
    dark:bg-gradient-to-r dark:from-[#070c16] dark:to-[#243b55]
    dark:text-gray-200
    rounded-xl"
    >
      <Card className="bg-transparent shadow-none w-full rounded-xl">
        <CardHeader>
          <CardTitle>Who to Follow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex gap-2 items-center justify-between "
              >
                <div className="flex items-center gap-1">
                  <Link href={`/profile/${user.username}`}>
                    <Avatar>
                      <AvatarImage src={user.image ?? "/avatar.png"} />
                    </Avatar>
                  </Link>
                  <div className="text-xs">
                    <Link
                      href={`/profile/${user.username}`}
                      className="font-medium cursor-pointer"
                    >
                      {user.name}
                    </Link>
                    <p className="text-muted-foreground">@{user.username}</p>
                    <p className="text-muted-foreground">
                      {user._count.followers} followers
                    </p>
                  </div>
                </div>
                <FollowButton userId={user.id} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default WhoToFollow;
