import * as React from "react";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="absolute right-2 top-2 bottom-2 h-auto w-72 p-2 bg-white border border-gray-300 rounded-md shadow-md shadow-gray-800/10">
      <div></div>
      {children}
    </div>
  );
};

export default Sidebar;
