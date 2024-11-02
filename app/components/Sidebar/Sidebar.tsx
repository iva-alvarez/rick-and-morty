import Logo from "../Logo/Logo";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export default function Sidebar() {
  return (
    <aside className="h-screen">
      <div className="h-full flex flex-col border-r">
        <Logo/>
        <SidebarRoutes />
      </div>
    </aside>
  );
}
