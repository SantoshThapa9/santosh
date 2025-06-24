import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const Footer = lazy(() => import("./pages/Footer"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

import SharedStyles from "./shared-style/Shared.module.scss";

const App = () => {
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
        <h2>I love bringing ideas to life through code and design.</h2>
        <h3>
          Explore my portfolio showcasing carefully crafted solo projects,
          including a pixel-perfect ChatGPT clone and more. Discover my
          expertise and feel free to connect for collaborations or inquiries.
        </h3>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home />
              <About />
              <ProjectPage />
              <ContactPage />
            </main>
          }
        />
        <Route
          path="/about"
          element={
            <main>
              <Home />
              <About />
              <ProjectPage />
              <ContactPage />
            </main>
          }
        />
        <Route
          path="/projects"
          element={
            <main>
              <Home />
              <About />
              <ProjectPage />
              <ContactPage />
            </main>
          }
        />

        <Route
          path="/contact"
          element={
            <main>
              <Home />
              <About />
              <ProjectPage />
              <ContactPage />
            </main>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;
