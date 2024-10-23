"use client"
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { title } from "process";
import { usePathname } from "next/navigation";

const pathNameMap = {
  "tasks": {
    title: " My Tasks ",
    description: "Manage all your Tasks Here!",
  },
  "projects": {
    title: " My Projects ",
    description: "Manage your Specific Projects Here!",
  },
}

const defaultMap = {
  title: "Home",
  description: "Monitor all of your Progress",
}

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathNameMap

  const { title, description } = pathNameMap[pathnameKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex"> 
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar/>
      <UserButton/>
    </nav>
  );
};
