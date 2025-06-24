import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { easeInOut, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import SharedStyles from "../shared-style/Shared.module.scss";

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const activeSectionRef = useRef("home");
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      isProgrammaticScroll.current = true;

      element.scrollIntoView({ behavior: "smooth" });
      const newPath = targetId === "home" ? "/home" : `/${targetId}`;
      navigate(newPath, { replace: true });
      setIsSidebarOpen(false);
      setActiveSection(targetId);
      activeSectionRef.current = targetId;

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  };

  useEffect(() => {
    const path = location.pathname.slice(1);
    const validSections = ["home", "about", "projects", "contact"];

    if (path && validSections.includes(path)) {
      isProgrammaticScroll.current = true;
      const element = document.getElementById(path);

      if (element) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(path);
          activeSectionRef.current = path;
          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 600);

          scrollTimeout.current = null;
        }, 100);
      }
    } else if (location.pathname === "/home" || location.pathname === "") {
      setActiveSection("home");
      activeSectionRef.current = "home";
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const sectionIds = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = activeSectionRef.current;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = rect.bottom + window.scrollY;

          if (scrollPosition >= top && scrollPosition <= bottom) {
            currentSection = id;
            break;
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        setActiveSection(currentSection);
        activeSectionRef.current = currentSection;

        const newPath =
          currentSection === "home" ? "/home" : `/${currentSection}`;
        if (location.pathname !== newPath) {
          navigate(newPath);
        }
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [navigate, location.pathname]);

  const Links = ["home", "about", "projects", "contact"];
  return (
    <nav className={clsx(styles.navbar, scrolled && styles.navbarVB)}>
      <div className={styles.logo}>
        <strong>Santosh thapa</strong>
        <span>.</span>
      </div>

      <div className={clsx(styles.NavBar)}>
        <ul>
          {Links.map((section) => (
            <li
              key={section}
              className={clsx(SharedStyles.btn2, {
                [styles.activeLink]: activeSection === section,
              })}
              onClick={() => scrollTo(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={clsx(styles.sidebar, isSidebarOpen && styles.open)}
      >
        <ul>
          {Links.map((section) => (
            <li
              key={section}
              className={clsx(SharedStyles.btn2, {
                [styles.activeLink]: activeSection === section,
              })}
              onClick={() => scrollTo(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: easeInOut }}
        className={styles.menuBtn}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="menu button"
      >
        {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
      </motion.button>
      <div className={clsx(isSidebarOpen && styles.overlay)} />
    </nav>
  );
};

export default Navbar;
