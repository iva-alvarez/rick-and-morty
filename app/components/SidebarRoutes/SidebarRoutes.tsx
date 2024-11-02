"use client"

import SidebarItem from "../SidebarItems/SidebarItem";
import { DataGeneralSidebar } from "./SidebarRoutes.data";

export default function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6">
    
          {DataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}

        </div>
      </div>

    
      
      <footer className="mt-3 p-3 text-center">
          2024. All rights reserved 
      </footer>

    </div>
  );
}
