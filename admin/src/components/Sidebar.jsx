import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, List, ShoppingBag } from "lucide-react"; // icons

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/add", icon: <Plus className="w-5 h-5" />, label: "Add Item" },
    { to: "/list", icon: <List className="w-5 h-5" />, label: "List Items" },
    { to: "/orders", icon: <ShoppingBag className="w-5 h-5" />, label: "Orders" },
  ];

  return (
    <aside className="h-[calc(100vh-64px)] w-[22vw] md:w-50 bg-base-200 shadow-md flex flex-col">
      {/* Logo / Brand */}
      <div className="p-3 flex justify-center items-center md:block border-b border-base-300">
        <h1 className="text-2xl hidden md:block font-bold text-primary">Dan's DEN</h1>
        <p className="text-xs text-base-content/70">Admin Dashboard</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-6">
        <ul className="menu gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition 
                    ${isActive ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
                >
                  {link.icon}
                  <span className="hidden md:block">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
