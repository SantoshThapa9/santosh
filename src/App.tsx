import React, { useRef, useState } from "react";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import ProjectPage from "./pages/ProjectPage";
import FooterPage from "./pages/FooterPage";
import ContactPage from "./pages/ContactPage";

interface Refs {
  home: React.RefObject<HTMLDivElement>;
  about: React.RefObject<HTMLDivElement>;
  projectPage: React.RefObject<HTMLDivElement>;
  footerPage: React.RefObject<HTMLDivElement>;
  contactPage: React.RefObject<HTMLDivElement>;
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
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        scrollToAbout={() => scrollTo("about")}
        scrollToProjectsPage={() => scrollTo("projectPage")}
        scrollToHome={() => scrollTo("home")}
        scrollToContactPage={() => scrollTo("contactPage")}
      />
      <div style={contentStyle}>
        <div ref={refs.home}>
          <Home />
        </div>
        <div ref={refs.about}>
          <About />
        </div>
        <div ref={refs.projectPage}>
          <ProjectPage />
        </div>
        <div ref={refs.contactPage}>
          <ContactPage />
        </div>
        <div ref={refs.footerPage}>
          <FooterPage />
        </div>
      </div>
      <div style={overlayStyle} onClick={toggleSidebar} />
    </div>
  );
};

export default App;
