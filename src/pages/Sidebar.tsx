import React, { MouseEvent, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./sidebar.module.scss";

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
    e: MouseEvent<HTMLAnchorElement>,
    scrollFunction: () => void
  ) => {
    e.preventDefault();
    scrollFunction();
    toggleSidebar();
  };

  return (
    <div>
      <button className={styles.menuToggle} onClick={toggleSidebar}>
        {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
      </button>
      <div
        onClick={toggleSidebar}
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <nav className={styles.nav}>
          <ul>
            <li>
              <a
                href="home"
                onClick={(e) => handleLinkClick(e, scrollToHome)}
                aria-current={isSidebarOpen ? "page" : undefined}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="about"
                onClick={(e) => handleLinkClick(e, scrollToAbout)}
                aria-current={isSidebarOpen ? "page" : undefined}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="projects"
                onClick={(e) => handleLinkClick(e, scrollToProjectsPage)}
                aria-current={isSidebarOpen ? "page" : undefined}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, scrollToContactPage)}
                aria-current={isSidebarOpen ? "page" : undefined}
              >
                Contact
              </a>
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
