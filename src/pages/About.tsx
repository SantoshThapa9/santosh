import React from "react";
import styles from "./about.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../global.css";
import { FaGithub, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiSass,
  SiTailwindcss,
  SiDocker,
  SiFramer,
  SiVercel,
  SiMui,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
} from "react-icons/si";

const About: React.FC = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 130 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const AnimatedSection = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const { ref, inView } = useInView({ threshold: 0.1 });
    const controls = useAnimation();

    React.useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [inView, controls]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className={styles.sectionAbout}>
      <AnimatedSection className={styles.aboutContent}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>
            <span>Behind the Code</span>
            <br />
            Meet Santosh
          </h1>

          <div className={styles.image}></div>
        </div>

        <div className={styles.description}>
          <p>
            Hi, I'm Santosh, a developer passionate about turning ideas into
            interactive and engaging digital experiences.
            <br />
            <br />
            My passion for clean, efficient code, combined with a strong
            foundation in modern technologies like Next.js, HTML, SCSS, etc.,
            drives me to continuously explore new frameworks and tools. This
            ensures that my projects are not only functional but also luxurious
            in appearance. I am dedicated to delivering high-quality results
            that exceed expectations.
            <br />
            <br />
            Let's <span>build</span> something amazing together!
          </p>
        </div>

        <hr />
        <div className={styles.workHeading}>
          <AnimatedSection>
            <h3>Designing</h3>
            <p>
              I'm not just a designer, I'm a creative enthusiast who loves
              making every pixel count! You'll often find me immersed in the
              world of stylesheets, and I'm excited to help you with UX/UI
              design, frontend development, responsive layouts, prototyping,
              branding, and more.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h3>Engineering</h3>
            <p>
              While I might not be the best backend developer yet, I can handle
              the basic fundamentals of backend development. Whether it's
              creating APIs, managing databases, building server-side logic, or
              ensuring everything is running well, I've got you covered! I'm
              excited to tackle new challenges and contribute to building robust
              solutions. I am always learning to keep up with the latest trends.
            </p>
          </AnimatedSection>
        </div>

        <hr />
        <br />
        <h2 className={styles.heading}>SKILLS</h2>

        <div className={styles.gridContainer}>
          <AnimatedSection>
            <div className={styles.gridItem}>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
              >
                <FaJs style={{ color: "#f0db4f" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://reactjs.org/" target="_blank">
                <FaReact style={{ color: "#61DBFB" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://nodejs.org/" target="_blank">
                <FaNodeJs style={{ color: "#68A063" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://nextjs.org/" target="_blank">
                <SiNextdotjs style={{ color: "grey" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://www.typescriptlang.org/" target="_blank">
                <SiTypescript style={{ color: "#007acc" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://expressjs.com/" target="_blank">
                <SiExpress style={{ color: "silver" }} />{" "}
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                target="_blank"
              >
                <SiHtml5 style={{ color: "#E34F26" }} />
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://git-scm.com/" target="_blank">
                <SiGit style={{ color: "orange" }} />{" "}
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
              >
                <SiCss3 style={{ color: "#1572B6" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://www.mongodb.com/" target="_blank">
                <SiMongodb style={{ color: "#4DB33D" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://www.framer.com/api/motion/" target="_blank">
                <SiFramer style={{ color: "#F15A29" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://getbootstrap.com/" target="_blank">
                <SiBootstrap style={{ color: "#563D7C" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://sass-lang.com/" target="_blank">
                <SiSass style={{ color: "#CC6699" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://tailwindcss.com/" target="_blank">
                <SiTailwindcss style={{ color: "#38B2AC" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://www.docker.com/" target="_blank">
                <SiDocker style={{ color: "#2496ED" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://vercel.com/" target="_blank">
                <SiVercel style={{ color: "grey" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://mui.com/" target="_blank">
                <SiMui style={{ color: "#007FFF" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://github.com/" target="_blank">
                <FaGithub style={{ color: "grey" }} />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={styles.gridItem}>
              <a href="https://www.postgresql.org/" target="_blank">
                <SiPostgresql style={{ color: "#336791" }} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(About);
