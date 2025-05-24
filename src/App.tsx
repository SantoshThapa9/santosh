import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import styles from "./App.module.scss";
const About = lazy(() => import("./pages/About"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const Footer = lazy(() => import("./pages/Footer"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.loaderCtn}>
          <div className={styles.loader} />
        </div>
      }
    >
      <Navbar />
      <header className={styles.seo}>
        <h1>Hi, I'm Santosh Thapa - Software Engineer & Frontend Developer</h1>
        <h2>
          As a creative and detail-oriented software engineer, I specialize in
          React.js, Next.js, JavaScript, TypeScript, HTML5, CSS3, and other
          modern web technologies, building intuitive and high-performance
          applications.
        </h2>
        <h3>
          Welcome to my professional portfolio! Here, you'll find my latest
          projects, learn more about my expertise, and connect with me for
          collaborations or inquiries. Let's build something amazing together.
        </h3>
      </header>
      <main>
        <Home />
        <About />
        <ProjectPage />
        <ContactPage />
      </main>

      <Footer />
    </Suspense>
  );
};

export default App;
