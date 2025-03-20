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
        <span className={styles.dialog}>
          From crafting my first 'Hello, World!' to building interactive digital
          experiences, my journey has been fueled by curiosity and creativity.
        </span>
        <br />
        <br />
        <hr />
        <div className={styles.description}>
          <p>
            Hi! I'm Santosh, a developer passionate about technology and design.
            I specialize in crafting smooth and user-friendly interfaces with
            React, Next.js, HTML5, and SCSS. While my strength is in frontend, I
            can also work with backend technologies like Node.js, Express, and
            databases to build functional and scalable applications.
            <br />
            <br />
            I continuously explore new frameworks and methodologies to push the
            boundaries of creativity and performance. Every project I take on is
            an opportunity to blend aesthetic excellence with technical
            precision, ensuring results that exceed expectations.
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
              For me, design isn't just about looks, it's about creating
              experiences that feel intuitive and engaging. and I'm a creative
              enthusiast who loves making every pixel count! You'll often find
              me immersed in the world of stylesheets, I love working with UI/UX
              design, frontend development, responsive layouts, prototyping,
              branding, and more.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h3>Engineering</h3>
            <p>
              While I love frontend the most, I can build APIs, work with
              databases, and handle server-side logic when needed. Always
              experimenting, always learning, pushing boundaries to make things
              faster, better, and smarter.
            </p>
          </AnimatedSection>
        </div>

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
