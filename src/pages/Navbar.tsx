import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const sections = ["home", "about", "projects", "assistant", "contact"] as const;

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();

  const navigate = useNavigate();
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    setActiveSection(id);

    navigate(id === "home" ? "/home" : `/${id}`, {
      replace: true,
    });

    section.scrollIntoView({
      behavior: "auto",
      block: "start",
    });

    closeSidebar();
  };
  useEffect(() => {
    const locationState = location.state;
    if (
      locationState &&
      typeof locationState === "object" &&
      "fromScroll" in locationState &&
      locationState.fromScroll === true
    ) {
      return;
    }

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const path = pathSegments[0] || "home";
    const targetId =
      path === "projects"
        ? pathSegments[1] === "others"
          ? "project-others"
          : pathSegments[1]
            ? `project-${pathSegments[1]}`
            : path
        : path;
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({ behavior: "auto", block: "start" });
      setActiveSection(path);
    } else if (path === "projects" && pathSegments[1]) {
      navigate("/projects", { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (!section) continue;

        const { top, bottom } = section.getBoundingClientRect();
        if (
          scrollPos >= top + window.scrollY &&
          scrollPos <= bottom + window.scrollY
        ) {
          if (activeSection !== id) {
            setActiveSection(id);
            navigate(id === "home" ? "/home" : `/${id}`, {
              replace: true,
              state: { fromScroll: true },
            });
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection, location.pathname, navigate]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSidebarOpen) closeSidebar();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeSidebar, isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mobileViewport = window.matchMedia("(max-width: 680px)");
    if (mobileViewport.matches) document.body.style.overflow = "hidden";

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) setIsSidebarOpen(false);
    };
    mobileViewport.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      mobileViewport.removeEventListener("change", closeOnDesktop);
    };
  }, [isSidebarOpen]);

  const renderLinks = () => (
    <ul>
      {sections.map((section) => (
        <li key={section}>
          <a
            href={`#${section}`}
            className={clsx(activeSection === section && styles.activeLink)}
            aria-current={activeSection === section ? "location" : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollTo(section);
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <motion.nav
      className={styles.navbar}
      aria-label="Main navigation"
      initial={reduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        className={styles.logo}
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          scrollTo("home");
        }}
        aria-label="Santosh Thapa, home"
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <strong>Santosh Thapa</strong>
        <span>.</span>
      </motion.a>

      <div className={styles.NavBar}>{renderLinks()}</div>

      <motion.button
        type="button"
        ref={menuButtonRef}
        className={styles.menuBtn}
        onClick={() => setIsSidebarOpen((open) => !open)}
        aria-expanded={isSidebarOpen}
        aria-controls="mobile-navigation"
        aria-label={
          isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
        }
        whileHover={
          reduceMotion
            ? undefined
            : { scale: 1.06, rotate: isSidebarOpen ? 0 : 4 }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        {isSidebarOpen ? (
          <RxCross2 aria-hidden="true" />
        ) : (
          <MdOutlineMenu aria-hidden="true" />
        )}
      </motion.button>

      <motion.div
        id="mobile-navigation"
        className={clsx(styles.sidebar, isSidebarOpen && styles.open)}
        aria-hidden={!isSidebarOpen}
        inert={!isSidebarOpen}
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : "102%",
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className={styles.mobileLinks}>{renderLinks()}</div>
      </motion.div>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.button
            type="button"
            className={styles.overlay}
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
