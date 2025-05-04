import React, { useRef, useState, lazy } from "react";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import styles from "./App.module.scss";
const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const FooterPage = lazy(() => import("./pages/FooterPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
interface Refs {
  home: React.RefObject<HTMLDivElement | null>;
  about: React.RefObject<HTMLDivElement | null>;
  projectPage: React.RefObject<HTMLDivElement | null>;
  footerPage: React.RefObject<HTMLDivElement | null>;
  contactPage: React.RefObject<HTMLDivElement | null>;
}

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const refs: Refs = {
    home: useRef(null),
    about: useRef(null),
    projectPage: useRef(null),
    footerPage: useRef(null),
    contactPage: useRef(null),
  };

  const scrollTo = (key: keyof Refs) =>
    refs[key].current?.scrollIntoView({ behavior: "smooth" });
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const contentStyle: React.CSSProperties = {
    filter: isSidebarOpen ? "blur(5px)" : "none",
    transition: "filter 0.6s ease",
    position: "relative",
    zIndex: isSidebarOpen ? 0 : 1,
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 500,
    opacity: isSidebarOpen ? 1 : 0,
    transition: "opacity 0.6s ease",
    pointerEvents: isSidebarOpen ? "auto" : "none",
  };

  return (
    <main>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        scrollToAbout={() => scrollTo("about")}
        scrollToProjectsPage={() => scrollTo("projectPage")}
        scrollToHome={() => scrollTo("home")}
        scrollToContactPage={() => scrollTo("contactPage")}
      />
      <header className={styles.seo}>
        <h1>
          Santosh Thapa | Software Engineer & Frontend Developer Portfolio.
        </h1>
        <h2>
          Santosh Thapa is a Professional Software Engineer specializing in
          React.js, Next.js, HTML5, SASS, and other modern web technologies.
        </h2>
        <h3>
          Explore the professional portfolio of Santosh Thapa, a highly skilled
          Software Engineer and Frontend Developer with expertise in React.js,
          Next.js, HTML5, SASS, and modern web technologies. Discover projects,
          learn about Santosh's experience, and get in touch for collaborations
          or inquiries.
        </h3>
      </header>
      <ul className={styles.seo}>
        <li>
          <a href="/home" aria-label="home page link">
            Home
          </a>
        </li>
        <li>
          <a href="/about" aria-label="about page link">
            About Us
          </a>
        </li>
        <li>
          <a href="/blog" aria-label="blog page link">
            Blog
          </a>
        </li>
        <li>
          <a href="/services" aria-label="services page link">
            Services
          </a>
        </li>
        <li>
          <a href="/contact" aria-label="contact page link">
            Contact
          </a>
        </li>
        <li>
          <a href="/article" aria-label="article page link">
            article
          </a>
        </li>
        <li>
          <a href="/footer" aria-label="footer page link">
            footer
          </a>
        </li>
      </ul>

      <div style={contentStyle}>
        <section ref={refs.home}>
          <Home />
        </section>
        <section ref={refs.about}>
          <About />
        </section>
        <section ref={refs.projectPage}>
          <ProjectPage />
        </section>
        <section ref={refs.contactPage}>
          <ContactPage />
        </section>
        <footer ref={refs.footerPage}>
          <FooterPage />
        </footer>
      </div>
      <div style={overlayStyle} onClick={toggleSidebar} />
    </main>
  );
};

export default App;
