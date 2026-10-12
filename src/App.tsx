import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import SharedStyles from "./shared-style/Shared.module.scss";

const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

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
        <div
          className={SharedStyles.loaderCtn}
          role="status"
          aria-label="Loading"
        >
          <div className={SharedStyles.droplet} />
        </div>
      }
    >
      <Navbar />
      <Routes>
        <Route path="/home" element={<Layout />} />
        <Route path="/about" element={<Layout />} />
        <Route path="/projects" element={<Layout />} />
        <Route path="/contact" element={<Layout />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;
