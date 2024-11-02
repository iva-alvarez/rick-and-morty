import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";
import { ToggleTheme } from "../ToogleTheme/ToggleTheme";


export default function Navbar() {
  return (
    <nav className="flex items-center px-2 gap-x-4 md:p-6 justify-between w-full bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes/>
          </SheetContent>
        </Sheet>
      </div>

     

      <div className="flex gap-x-3  justify-between">
        <ToggleTheme/>
        <UserButton />
      </div>
    </nav>
  );
}
