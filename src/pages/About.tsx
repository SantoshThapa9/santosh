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
  SiFirebase,
  SiNextdotjs,
  SiExpress,
  SiChartdotjs,
  SiAntdesign,
  SiGit,
  SiChakraui,
  SiMongodb,
} from "react-icons/si";

const About: React.FC = () => {
  const AnimatedSection = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const { ref, inView } = useInView({ threshold: 0 });
    const controls = useAnimation();

    React.useEffect(() => {
      if (inView) controls.start("visible");
    }, [inView, controls]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: "100px" }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const techStack = {
    frontend: [
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: (
          <FaJs style={{ color: "#f0db4f" }} aria-label="JavaScript Icon" />
        ),
      },
      {
        name: "React",
        url: "https://reactjs.org/",
        icon: <FaReact style={{ color: "#61DBFB" }} aria-label="React Icon" />,
      },
      {
        name: "Next.js",
        url: "https://nextjs.org/",
        icon: (
          <SiNextdotjs style={{ color: "grey" }} aria-label="Next.js Icon" />
        ),
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
        name: "HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        icon: <SiHtml5 style={{ color: "#E34F26" }} aria-label="HTML5 Icon" />,
      },
      {
        name: "CSS3",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        icon: <SiCss3 style={{ color: "#1572B6" }} aria-label="CSS3 Icon" />,
      },
    ],
    backend: [
      {
        name: "Node.js",
        url: "https://nodejs.org/",
        icon: (
          <FaNodeJs style={{ color: "#68A063" }} aria-label="Node.js Icon" />
        ),
      },
      {
        name: "Express.js",
        url: "https://expressjs.com/",
        icon: (
          <SiExpress style={{ color: "silver" }} aria-label="Express.js Icon" />
        ),
      },
      {
        name: "Firebase",
        url: "https://firebase.google.com/",
        icon: (
          <SiFirebase style={{ color: "#FFCA28" }} aria-label="Firebase Icon" />
        ),
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com/",
        icon: (
          <SiMongodb style={{ color: "#47A248" }} aria-label="MongoDB Icon" />
        ),
      },
    ],
    uiLibraries: [
      {
        name: "MUI",
        url: "https://mui.com/",
        icon: <SiMui style={{ color: "#007FFF" }} aria-label="MUI Icon" />,
      },
      {
        name: "Chakra UI",
        url: "https://chakra-ui.com/",
        icon: (
          <SiChakraui
            style={{ color: "#319795" }}
            aria-label="Chakra UI Icon"
          />
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
        name: "Bootstrap",
        url: "https://getbootstrap.com/",
        icon: (
          <SiBootstrap
            style={{ color: "#563D7C" }}
            aria-label="Bootstrap Icon"
          />
        ),
      },
      {
        name: "Sass",
        url: "https://sass-lang.com/",
        icon: <SiSass style={{ color: "#CC6699" }} aria-label="Sass Icon" />,
      },
    ],
    tools: [
      {
        name: "Git",
        url: "https://git-scm.com/",
        icon: <SiGit style={{ color: "orange" }} aria-label="Git Icon" />,
      },
      {
        name: "GitHub",
        url: "https://github.com/",
        icon: <FaGithub style={{ color: "grey" }} aria-label="GitHub Icon" />,
      },
      {
        name: "Vercel",
        url: "https://vercel.com/",
        icon: <SiVercel style={{ color: "grey" }} aria-label="Vercel Icon" />,
      },
      {
        name: "Chart.js",
        url: "https://www.chartjs.org/",
        icon: (
          <SiChartdotjs
            style={{ color: "#FF6384" }}
            aria-label="Chart.js Icon"
          />
        ),
      },
      {
        name: "Motion",
        url: "https://motion.dev/docs",
        icon: (
          <SiFramer style={{ color: "#F15A29" }} aria-label="Motion.dev Icon" />
        ),
      },
    ],
  };

  return (
    <section className={styles.sectionAbout}>
      <div id="about" className={styles.aboutContent}>
        <div className={styles.headingContainer}>
          <AnimatedSection>
            <span className={styles.header}>About Me</span>
          </AnimatedSection>
          <br />
          <AnimatedSection>
            <div className={styles.image}></div>
          </AnimatedSection>
        </div>

        <article>
          <AnimatedSection>
            <span className={styles.dialog}>
              From "Hello World!" to building dynamic user interfaces, my
              journey is fueled by curiosity and creativity.
            </span>
          </AnimatedSection>

          <br />
          <br />

          <AnimatedSection>
            <hr />
          </AnimatedSection>

          <div className={styles.description}>
            <AnimatedSection>
              Hi, I'm Santosh, an aspiring Software Engineer with a strong
              passion for building responsive and interactive web applications.
              I have experience with technologies such as React.js, Next.js,
              HTML5, CSS/SASS, and Git. I am passionate about creating
              user-friendly applications with a focus on SEO, web performance
              optimization, and attention to detail.
            </AnimatedSection>
            <br />

            <AnimatedSection>
              I'm constantly learning about new frameworks and techniques to
              improve creativity and efficiency. <br /> Every project I work on
              gives me the chance to blend solid functionality with smooth,
              engaging user interfaces, aiming to achieve the best results.
              <br />
              <br />
            </AnimatedSection>

            <AnimatedSection>
              Let's <span>build</span> something amazing together!
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <hr />
          </AnimatedSection>

          <br />

          <AnimatedSection>
            <h2 className={styles.heading}>SKILLS</h2>
          </AnimatedSection>

          {Object.entries(techStack).map(([category, items]) => (
            <AnimatedSection key={category}>
              <div>
                <AnimatedSection>
                  <h3 className={styles.subHeading}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                </AnimatedSection>

                <div className={styles.gridContainer}>
                  {items.map((tech, index) => (
                    <AnimatedSection key={index}>
                      <div className={styles.gridItem}>
                        <AnimatedSection>
                          <a
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${tech.name} URL`}
                          >
                            {tech.icon}
                          </a>
                        </AnimatedSection>
                        <AnimatedSection>
                          <span className={styles.techName}>{tech.name}</span>
                        </AnimatedSection>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </article>
      </div>
    </section>
  );
};

export default React.memo(About);
