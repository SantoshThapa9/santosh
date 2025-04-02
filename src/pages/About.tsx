import React from "react";
import styles from "./about.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiSass,
  SiFramer,
  SiVercel,
  SiMui,
  SiStorybook,
  SiNextdotjs,
  SiExpress,
  SiChartdotjs,
  SiMongodb,
  SiAntdesign,
  SiSvelte,
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
      icon: <FaJs style={{ color: "#f0db4f" }} aria-label="JavaScript Icon" />,
    },
    {
      name: "React",
      url: "https://reactjs.org/",
      icon: <FaReact style={{ color: "#61DBFB" }} aria-label="React Icon" />,
    },
    {
      name: "Node.js",
      url: "https://nodejs.org/",
      icon: <FaNodeJs style={{ color: "#68A063" }} aria-label="Node.js Icon" />,
    },
    {
      name: "Docker",
      url: "https://www.docker.com/",
      icon: <SiDocker style={{ color: "#2496ED" }} aria-label="Docker Icon" />,
    },
    {
      name: "Next.js",
      url: "https://nextjs.org/",
      icon: <SiNextdotjs style={{ color: "grey" }} aria-label="Next.js Icon" />,
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      icon: (
        <SiTypescript
          style={{ color: "#007acc" }}
          aria-label="TypeScript Icon"
        />
      ),
    },
    {
      name: "Svelte",
      url: "https://svelte.dev/",
      icon: <SiSvelte style={{ color: "#FF3E00" }} aria-label="Svelte Icon" />,
    },
    {
      name: "Express.js",
      url: "https://expressjs.com/",
      icon: (
        <SiExpress style={{ color: "silver" }} aria-label="Express.js Icon" />
      ),
    },
    {
      name: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: <SiHtml5 style={{ color: "#E34F26" }} aria-label="HTML5 Icon" />,
    },
    {
      name: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: <SiCss3 style={{ color: "#1572B6" }} aria-label="CSS3 Icon" />,
    },
    {
      name: "Storybook",
      url: "https://storybook.js.org/",
      icon: (
        <SiStorybook style={{ color: "#FF4785" }} aria-label="Storybook Icon" />
      ),
    },
    {
      name: "Git",
      url: "https://git-scm.com/",
      icon: <SiGit style={{ color: "orange" }} aria-label="Git Icon" />,
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      icon: (
        <SiMongodb style={{ color: "#4DB33D" }} aria-label="MongoDB Icon" />
      ),
    },
    {
      name: "Ant Design",
      url: "https://ant.design/",
      icon: (
        <SiAntdesign
          style={{ color: "#1890FF" }}
          aria-label="Ant Design Icon"
        />
      ),
    },
    {
      name: "Framer Motion",
      url: "https://www.framer.com/api/motion/",
      icon: (
        <SiFramer
          style={{ color: "#F15A29" }}
          aria-label="Framer Motion Icon"
        />
      ),
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      icon: (
        <SiBootstrap style={{ color: "#563D7C" }} aria-label="Bootstrap Icon" />
      ),
    },
    {
      name: "Sass",
      url: "https://sass-lang.com/",
      icon: <SiSass style={{ color: "#CC6699" }} aria-label="Sass Icon" />,
    },
    {
      name: "Chart.js",
      url: "https://www.chartjs.org/",
      icon: (
        <SiChartdotjs style={{ color: "#FF6384" }} aria-label="Chart.js Icon" />
      ),
    },
    {
      name: "Vercel",
      url: "https://vercel.com/",
      icon: <SiVercel style={{ color: "grey" }} aria-label="Vercel Icon" />,
    },
    {
      name: "MUI",
      url: "https://mui.com/",
      icon: <SiMui style={{ color: "#007FFF" }} aria-label="MUI Icon" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: <FaGithub style={{ color: "grey" }} aria-label="GitHub Icon" />,
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
              Hello, I'm Santosh, a passionate Software Engineer specializing in
              React.js, Next.js, HTML5, SASS, and modern web technologies. I
              excel at crafting responsive and visually captivating web
              interfaces with meticulous attention to detail.
              <br />
              <br />
              My expertise includes Frontend Development, UI/UX design,
              responsive layouts, prototyping, and branding. While I focus on
              frontend technologies, I am also proficient in APIs, databases,
              and server-side logic. I am committed to continuous learning to
              optimize application performance and user experience.
              <br />
              <br />
              I actively explore new frameworks and methodologies to push the
              boundaries of creativity and efficiency. Every project I take on
              is an opportunity to blend aesthetic excellence with technical
              precision, delivering exceptional results.
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
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="tech url"
                >
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
