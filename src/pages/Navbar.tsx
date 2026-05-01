import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styles from "./Navbar.module.scss";
import { easeInOut, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isProgrammaticScroll = useRef(false);

  const sections = ["home", "about", "projects", "contact"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isProgrammaticScroll.current = true;

    el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    navigate(id === "home" ? "/home" : `/${id}`, { replace: true });
    setIsSidebarOpen(false);

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  };

  // sync route → scroll
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    const el = document.getElementById(path);

    if (el) {
      isProgrammaticScroll.current = true;
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(path);

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  }, [location.pathname]);

  // scroll effects
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);

      if (isProgrammaticScroll.current) return;

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos <= bottom) {
          if (activeSection !== id) {
            setActiveSection(id);
            navigate(id === "home" ? "/home" : `/${id}`, { replace: true });
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection, navigate]);

  return (
    <nav className={clsx(styles.navbar, scrolled && styles.navbarVB)}>
      <div className={styles.logo}>
        <strong>Santosh thapa</strong>
        <span>.</span>
      </div>

      <div className={styles.NavBar}>
        <ul>
          {sections.map((s) => (
            <li
              key={s}
              className={clsx({
                [styles.activeLink]: activeSection === s,
              })}
              onClick={() => scrollTo(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={() => setIsSidebarOpen(false)}
        className={clsx(styles.sidebar, isSidebarOpen && styles.open)}
      >
        <ul>
          {sections.map((s) => (
            <li
              key={s}
              className={clsx({
                [styles.activeLink]: activeSection === s,
              })}
              onClick={() => scrollTo(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: easeInOut }}
        className={styles.menuBtn}
        onClick={() => setIsSidebarOpen((p) => !p)}
      >
        {isSidebarOpen ? <RxCross2 /> : <MdOutlineMenu />}
      </motion.button>

      <div className={clsx(isSidebarOpen && styles.overlay)} />
    </nav>
  );
};

export default Navbar;
