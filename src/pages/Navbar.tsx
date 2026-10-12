import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

const sections = ["home", "about", "projects", "contact"] as const;
const getScrollBehavior = (): ScrollBehavior =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isProgrammaticScroll = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    isProgrammaticScroll.current = true;

    setActiveSection(id);

    navigate(id === "home" ? "/home" : `/${id}`, {
      replace: true,
    });

    section.scrollIntoView({
      behavior: getScrollBehavior(),
      block: "start",
    });

    closeSidebar();
  };
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    const section = document.getElementById(path);

    if (section) {
      isProgrammaticScroll.current = true;
      section.scrollIntoView({ behavior: getScrollBehavior() });
      setActiveSection(path);

      window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 3000);
    }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (isProgrammaticScroll.current) return;

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
            navigate(id === "home" ? "/home" : `/${id}`, { replace: true });
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection, navigate]);

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
    <nav
      className={clsx(styles.navbar, scrolled && styles.navbarVB)}
      aria-label="Main navigation"
    >
      <a
        className={styles.logo}
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          scrollTo("home");
        }}
        aria-label="Santosh Thapa, home"
      >
        <strong>Santosh Thapa</strong>
        <span>.</span>
      </a>

      <div className={styles.NavBar}>{renderLinks()}</div>

      <button
        type="button"
        ref={menuButtonRef}
        className={styles.menuBtn}
        onClick={() => setIsSidebarOpen((open) => !open)}
        aria-expanded={isSidebarOpen}
        aria-controls="mobile-navigation"
        aria-label={
          isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
        }
      >
        {isSidebarOpen ? (
          <RxCross2 aria-hidden="true" />
        ) : (
          <MdOutlineMenu aria-hidden="true" />
        )}
      </button>

      <div
        id="mobile-navigation"
        className={clsx(styles.sidebar, isSidebarOpen && styles.open)}
        aria-hidden={!isSidebarOpen}
        inert={!isSidebarOpen}
      >
        <div className={styles.mobileLinks}>{renderLinks()}</div>
      </div>
      {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={closeSidebar}
          aria-label="Close navigation menu"
          tabIndex={-1}
        />
      )}
    </nav>
  );
};

export default Navbar;
