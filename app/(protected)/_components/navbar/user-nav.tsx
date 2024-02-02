import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import AvatarPlaceholder from "@/public/avatar_placeholder.svg";
import { Logout } from "@/components/logout";
import { LogOutIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
export async function UserNav() {
  const session = await getAuthSession();
  const image = session?.user?.image || "https://utfs.io/f/20808674-1778-469c-b44b-261ee645ad21-17b5l.png";
  const name = session?.user?.name;
  const email = session?.user?.email;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} alt="@shadcn" />
            <AvatarFallback>
              <Image
                src={AvatarPlaceholder}
                alt="Avatar placeholder"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <Link href="/bookmarks">
            <DropdownMenuItem>
              Bookmarks
              <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>

            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}