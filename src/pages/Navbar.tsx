import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { easeInOut, motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isMobile, setIsMobile] = useState<boolean>(true);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkDevice);
    checkDevice();
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const [scrolled100, setScrolled100] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled100(window.scrollY >= 180);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={clsx(scrolled100 ? styles.navbarVB : styles.navbar)}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: easeInOut }}
        className={styles.logo}
      >
        <strong>Santosh</strong>
      </motion.div>

      <aside
        onClick={toggleSidebar}
        className={clsx({
          [styles.sidebar]: isMobile,
          [styles.open]: isMobile && isSidebarOpen,
          [styles.NavRow]: !isMobile,
        })}
      >
        <ul>
          <li onClick={() => scrollTo("home")}>Home</li>
          <li onClick={() => scrollTo("about")}>About</li>
          <li onClick={() => scrollTo("projects")}>Projects</li>
          <li onClick={() => scrollTo("contact")}>Contact</li>
        </ul>
      </aside>
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: easeInOut }}
          className={styles.menuBtn}
          onClick={toggleSidebar}
          aria-label="menu button"
        >
          {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
        </motion.button>
      )}
      {isSidebarOpen && isMobile && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </nav>
  );
};

export default Navbar;
