import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] grid place-items-center px-4  antialiased text-gray-800
               bg-gray-50
 dark:bg-gradient-to-r from-[#141e30] to-[#243b55] dark:text-gray-200"
    >
      <Card className="w-full max-w-md bg-transparent shadow-none rounded-xl ">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* LARGE 404 TEXT */}
            <p className="text-8xl font-bold text-primary font-mono">404</p>

            {/* MESSAGE */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                User not found
              </h1>
              <p className="text-muted-foreground">
                The user you're looking for doesn't exist.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="" variant="outline" asChild>
                <Link href="/">
                  <ArrowLeftIcon className="mr-2 size-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
