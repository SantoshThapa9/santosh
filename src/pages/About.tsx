import styles from "./about.module.scss";
import { FaReact, FaJs, FaNodeJs, FaGithub} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiFirebase,
  SiGit,
  SiVercel,
  SiFramer,
  SiFigma,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiWebpack,
  SiGoogle,
} from "react-icons/si";
import AnimateView from "./animate/AnimateView";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const skillCategories = [
    {
      title: "UI & Design",
      description:
        "Creating intuitive, accessible, and visually engaging user interfaces.",
      skills: [
        {
          name: "Figma",
          url: "https://www.figma.com/",
          icon: (
            <SiFigma style={{ color: "#F24E1E" }} aria-label="Figma Icon" />
          ),
        },
        {
          name: "HTML5",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          icon: (
            <SiHtml5 style={{ color: "#E34F26" }} aria-label="HTML5 Icon" />
          ),
        },
        {
          name: "CSS3",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          icon: <SiCss3 style={{ color: "#1572B6" }} aria-label="CSS3 Icon" />,
        },
        {
          name: "Tailwind CSS",
          url: "https://tailwindcss.com/",
          icon: (
            <SiTailwindcss
              style={{ color: "#06B6D4" }}
              aria-label="Tailwind CSS Icon"
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
        {
          name: "Framer Motion",
          url: "https://www.framer.com/motion/",
          icon: (
            <SiFramer
              style={{ color: "#0055FF" }}
              aria-label="Framer Motion Icon"
            />
          ),
        },
      ],
    },
    {
      title: "Development",
      description:
        "Building dynamic and scalable web applications using modern JavaScript frameworks and libraries.",
      skills: [
        {
          name: "React",
          url: "https://reactjs.org/",
          icon: (
            <FaReact style={{ color: "#61DBFB" }} aria-label="React Icon" />
          ),
        },
        {
          name: "Next.js",
          url: "https://nextjs.org/",
          icon: (
            <SiNextdotjs style={{ color: "grey" }} aria-label="Next.js Icon" />
          ),
        },
        {
          name: "JavaScript",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          icon: (
            <FaJs style={{ color: "#f0db4f" }} aria-label="JavaScript Icon" />
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
            <SiExpress
              style={{ color: "silver" }}
              aria-label="Express.js Icon"
            />
          ),
        },

        {
          name: "Firebase",
          url: "https://firebase.google.com/",
          icon: (
            <SiFirebase
              style={{ color: "#FFCA28" }}
              aria-label="Firebase Icon"
            />
          ),
        },
      ],
    },
    {
      title: "Deployment & DevOps",
      description:
        "Deploying, maintaining, and managing applications with performance and version control in mind.",
      skills: [
        {
          name: "GitHub",
          url: "https://github.com/",
          icon: (
            <FaGithub style={{ color: "black" }} aria-label="GitHub Icon" />
          ),
        },
        {
          name: "Git",
          url: "https://git-scm.com/",
          icon: <SiGit style={{ color: "orange" }} aria-label="Git Icon" />,
        },
        {
          name: "Vercel",
          url: "https://vercel.com/",
          icon: <SiVercel style={{ color: "grey" }} aria-label="Vercel Icon" />,
        },
        {
          name: "GitHub",
          url: "https://github.com/",
          icon: (
            <FaGithub style={{ color: "black" }} aria-label="GitHub Icon" />
          ),
        },
        {
          name: "Git",
          url: "https://git-scm.com/",
          icon: <SiGit style={{ color: "orange" }} aria-label="Git Icon" />,
        },
        {
          name: "Vercel",
          url: "https://vercel.com/",
          icon: <SiVercel style={{ color: "grey" }} aria-label="Vercel Icon" />,
        },
      ],
    },
    {
      title: "Performance & SEO",
      description:
        "Improving page load speed, search engine visibility, and overall user experience.",
      skills: [
        {
          name: "PageSpeed Insights",
          url: "https://developers.google.com/speed/pagespeed/insights",
          icon: (
            <SiGoogle
              style={{ color: "blueviolet" }}
              aria-label="PageSpeed Insights Icon"
            />
          ),
        },
        {
          name: "Webpack",
          url: "https://webpack.js.org/",
          icon: (
            <SiWebpack style={{ color: "#2b3a42" }} aria-label="Webpack Icon" />
          ),
        },
        {
          name: "Search Console",
          url: "https://search.google.com/search-console",
          icon: (
            <SiGoogle
              style={{ color: "green" }}
              aria-label="Search Console Icon"
            />
          ),
        },
        {
          name: "PageSpeed Insights",
          url: "https://developers.google.com/speed/pagespeed/insights",
          icon: (
            <SiGoogle
              style={{ color: "blueviolet" }}
              aria-label="PageSpeed Insights Icon"
            />
          ),
        },
        {
          name: "Webpack",
          url: "https://webpack.js.org/",
          icon: (
            <SiWebpack style={{ color: "#2b3a42" }} aria-label="Webpack Icon" />
          ),
        },
        {
          name: "Search Console",
          url: "https://search.google.com/search-console",
          icon: (
            <SiGoogle
              style={{ color: "green" }}
              aria-label="Search Console Icon"
            />
          ),
        },
      ],
    },
  ];

  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stripRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    marqueeRefs.current.forEach((marquee, idx) => {
      const strip = stripRefs.current[idx];
      if (marquee && strip) {
        const shouldAnimate = strip.scrollWidth > marquee.clientWidth;
        marquee.classList.toggle(styles.animate, shouldAnimate);
      }
    });
  }, []);
  const secRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["center 100%", "end 40%"],
  });

  const left = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, -100]);
  const right = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div id="about" className={clsx(styles.aboutSection)}>
      <div className={styles.divider} />
      <div className={styles.headingContainer}>
        <AnimateView>
          <h4>About Me</h4>
        </AnimateView>

        <AnimateView>
          <img loading="lazy" src="santosh.png" alt="profile photo" />
        </AnimateView>
      </div>
      <AnimateView>
        <h5 className={styles.h5}>
          A CREATIVE FRONTEND <span>DEVELOPER</span>
        </h5>
      </AnimateView>
      <div className={styles.desc}>
        <AnimateView>
          specializing in modern front-end development, with a strong focus on
          building responsive, interactive, and user-centric web applications.
          With expertise in...
        </AnimateView>
        <div ref={secRef} className={styles.skillSec}>
          {skillCategories.map((set, idx) => {
            const x = idx % 2 === 0 ? left : right;
            return (
              <motion.div
                className={styles.card}
                key={set.title}
                style={{ opacity, x }}
              >
                <AnimateView>
                  <p className={styles.title}>{set.title}</p>
                  <p className={styles.description}>{set.description}</p>
                  <div
                    ref={(el) => (marqueeRefs.current[idx] = el)}
                    className={styles.skillsMarquee}
                  >
                    <ul
                      ref={(el) => (stripRefs.current[idx] = el)}
                      className={styles.skillsStrip}
                    >
                      {[...set.skills, ...set.skills].map((skill, idx) => (
                        <li key={idx}>
                          <a
                            href={skill.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {skill.icon}
                          </a>
                          <span>{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateView>
              </motion.div>
            );
          })}
        </div>

        <br />
      </div>
    </div>
  );
};

export default About;
