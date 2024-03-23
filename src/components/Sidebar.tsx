import * as React from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div></div>
      {children}
    </div>
  );
};

export default Sidebar;
