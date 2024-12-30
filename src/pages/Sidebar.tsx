import React, { MouseEvent, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./sidebar.module.scss";
import "../global.css";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  scrollToAbout: () => void;
  scrollToProjectsPage: () => void;
  scrollToHome: () => void;
  scrollToContactPage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  scrollToAbout,
  scrollToProjectsPage,
  scrollToHome,
  scrollToContactPage,
}) => {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    console.log("Scrollbar width:", scrollbarWidth);

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isSidebarOpen]);

  const handleLinkClick = (
    e: MouseEvent<HTMLLIElement>,
    scrollFunction: () => void
  ) => {
    e.preventDefault();
    scrollFunction();
    toggleSidebar();
  };

  return (
    <div>
      <button
        className={styles.menuToggle}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        {isSidebarOpen ? (
          <RxCross2 className={styles.crossBtn} />
        ) : (
          <MdOutlineMenu />
        )}
      </button>
      <div
        onClick={toggleSidebar}
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <nav className={styles.nav}>
          <ul>
            <li onClick={(e) => handleLinkClick(e, scrollToHome)}>Home</li>
            <li onClick={(e) => handleLinkClick(e, scrollToAbout)}>About</li>
            <li onClick={(e) => handleLinkClick(e, scrollToProjectsPage)}>
              Projects
            </li>
            <li onClick={(e) => handleLinkClick(e, scrollToContactPage)}>
              Contact
            </li>
          </ul>
        </nav>
      </div>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Sidebar;
