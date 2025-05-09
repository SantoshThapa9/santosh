import React, { MouseEvent, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./sidebar.module.scss";
import { easeInOut, motion } from "framer-motion";

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
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: easeInOut }}
        className={styles.menuToggle}
        onClick={toggleSidebar}
        aria-label="menu button"
      >
        {isSidebarOpen ? (
          <RxCross2 className={styles.crossBtn} />
        ) : (
          <MdOutlineMenu />
        )}
      </motion.button>
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
