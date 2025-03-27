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
  SiMysql,
  SiFramer,
  SiVercel,
  SiMui,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
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
  const techStack = [
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: <FaJs style={{ color: "#f0db4f" }} />,
    },
    {
      name: "React",
      url: "https://reactjs.org/",
      icon: <FaReact style={{ color: "#61DBFB" }} />,
    },
    {
      name: "Node.js",
      url: "https://nodejs.org/",
      icon: <FaNodeJs style={{ color: "#68A063" }} />,
    },
    {
      name: "Docker",
      url: "https://www.docker.com/",
      icon: <SiDocker style={{ color: "#2496ED" }} />,
    },
    {
      name: "Next.js",
      url: "https://nextjs.org/",
      icon: <SiNextdotjs style={{ color: "grey" }} />,
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      icon: <SiTypescript style={{ color: "#007acc" }} />,
    },
    {
      name: "Express.js",
      url: "https://expressjs.com/",
      icon: <SiExpress style={{ color: "silver" }} />,
    },
    {
      name: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: <SiHtml5 style={{ color: "#E34F26" }} />,
    },
    {
      name: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: <SiCss3 style={{ color: "#1572B6" }} />,
    },
    {
      name: "Git",
      url: "https://git-scm.com/",
      icon: <SiGit style={{ color: "orange" }} />,
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      icon: <SiMongodb style={{ color: "#4DB33D" }} />,
    },
    {
      name: "Framer Motion",
      url: "https://www.framer.com/api/motion/",
      icon: <SiFramer style={{ color: "#F15A29" }} />,
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      icon: <SiBootstrap style={{ color: "#563D7C" }} />,
    },
    {
      name: "Sass",
      url: "https://sass-lang.com/",
      icon: <SiSass style={{ color: "#CC6699" }} />,
    },
    {
      name: "Vercel",
      url: "https://vercel.com/",
      icon: <SiVercel style={{ color: "grey" }} />,
    },
    {
      name: "MUI",
      url: "https://mui.com/",
      icon: <SiMui style={{ color: "#007FFF" }} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: <FaGithub style={{ color: "grey" }} />,
    },
    {
      name: "PostgreSQL",
      url: "https://www.postgresql.org/",
      icon: <SiPostgresql style={{ color: "#336791" }} />,
    },
    {
      name: "MySQL",
      url: "https://www.mysql.com/",
      icon: <SiMysql style={{ color: "#00758F" }} />,
    },
  ];

  return (
    <section className={styles.sectionAbout}>
      <AnimatedSection className={styles.aboutContent}>
        <div className={styles.headingContainer}>
          <span className={styles.header}> Meet Santosh</span>
          <br />

          <div className={styles.image}></div>
        </div>
        <article>
          <span className={styles.dialog}>
            From crafting my first Hello World! to building interactive digital
            experiences, my journey has been fueled by curiosity and creativity.
          </span>
          <br />
          <br />
          <hr />
          <div className={styles.description}>
            <p>
              Hi! I am Santosh, a passionate Web Developer specializing in
              React, Next.js, HTML5, and SCSS like technologies. I thrive on
              creating responsive and visually engaging web interfaces with a
              keen eye for detail.
              <br />
              <br />
              My expertise spans UI/UX design, frontend development, responsive
              layouts, prototyping, and branding. While I love working on the
              frontend, I also have experience with APIs, databases, and
              server-side logic. I'm constantly learning and experimenting to
              enhance application performance and user experience.
              <br />
              <br />
              <p>
                I actively explore new frameworks and methodologies to push the
                boundaries of creativity and efficiency. Every project I take on
                is an opportunity to blend aesthetic excellence with technical
                precision, delivering results that exceed expectations.
              </p>
              <br />
              <br />
              Let's <span>build</span> something amazing together!
            </p>
          </div>

          <hr />
        </article>
        <hr />
        <br />
        <h2 className={styles.heading}>SKILLS</h2>

        <div className={styles.gridContainer}>
          {techStack.map((tech, index) => (
            <AnimatedSection key={index}>
              <div className={styles.gridItem}>
                <a href={tech.url} target="_blank" rel="noopener noreferrer">
                  {tech.icon}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(About);
