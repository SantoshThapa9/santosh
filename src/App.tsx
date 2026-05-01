import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

import SharedStyles from "./shared-style/Shared.module.scss";

const App = () => {
  const Layout = () => (
    <main>
      <Home />
      <About />
      <ProjectPage />
      <ContactPage />
    </main>
  );

  return (
    <Suspense
      fallback={
        <div className={SharedStyles.loaderCtn}>
          <div className={SharedStyles.droplet} />
        </div>
      }
    >
      <Navbar />
      <header className={SharedStyles.srOnly}>
        <h1>Hi, I'm Santosh Thapa - Software Engineer</h1>
        <h2>I bring ideas to life through code and design.</h2>
        <h3>
          Explore my portfolio of solo projects, including pixel-perfect ChatGPT
          clone, e-commerce sites, and more. Discover my expertise and feel free
          to connect for collaborations or inquiries.
        </h3>
      </header>

      <Routes>
        <Route path="/home" element={<Layout />} />
        <Route path="/about" element={<Layout />} />
        <Route path="/projects" element={<Layout />} />
        <Route path="/contact" element={<Layout />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
