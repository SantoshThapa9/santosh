import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AssistantPage = lazy(() => import("./pages/AssistantPage"));
const ChatWidget = lazy(() => import("./pages/chatWidget"));

const App = () => {
  const Layout = () => (
    <main>
      <Home />
      <About />
      <ProjectPage />
      <AssistantPage />
      <ContactPage />
    </main>
  );

  return (
    <Suspense
      fallback={
        <div role="status" aria-label="Loading">
          loading...
        </div>
      }
    >
      <Navbar />
      <Routes>
        <Route path="/home" element={<Layout />} />
        <Route path="/about" element={<Layout />} />
        <Route path="/projects" element={<Layout />} />
        <Route path="/projects/:projectSlug" element={<Layout />} />
        <Route path="/assistant" element={<Layout />} />
        <Route path="/contact" element={<Layout />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <ChatWidget />
      <Footer />
    </Suspense>
  );
};

export default App;
