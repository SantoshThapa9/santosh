import styles from "./ProjectPage.module.scss";
import taskify from "/projects/taskify.webp";
import pfc from "/projects/pfc.webp";
import ttt from "/projects/ttt.webp";
import kura from "/projects/kura.webp";
import focusflow from "/projects/FocusFlow.webp";
import softsell from "/projects/SoftSell.webp";
import jobringer from "/projects/JobRinger.webp";
import { easeOut, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import Marquee from "react-fast-marquee";

interface Project {
  id: number;
  title: string;
  logo: string;
  images: string[];
  link: string;
  about: string;
  skillsUsed?: string[];
  detailed?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ChatGPT Clone - Kura AI",
    logo: kura,
    images: [
      "/projects/thumbnail/kura1.webp",
      "/projects/thumbnail/kura2.webp",
      "/projects/thumbnail/kura3.webp",
    ],

    link: "https://kura-iota.vercel.app/",
    about:
      "Built a 1:1 ChatGPT clone with image generation and real-time voice chat using Azure, Gemini API, and Web APIs.",
    skillsUsed: [
      "SASS",
      "React.js",
      "Next.js",
      "Web APIs",
      "Redux",
      "Gemini API",
      "Git",
      "Vercel",
    ],
  },
  {
    id: 2,
    title: "Taskify - Firebase Task Management app",
    logo: taskify,
    images: [
      "/projects/thumbnail/taskify1.webp",
      "/projects/thumbnail/taskify2.webp",
      "/projects/thumbnail/taskify3.webp",
    ],
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "Advanced task manager with real-time sync, inline editing, themes, and bulk operations using Firebase and Context API.",
    skillsUsed: [
      "Next.js",
      "Firebase",
      "Vercel",
      "REST API",
      "Git",
      "JavaScript",
      "Context API",
    ],
  },
  {
    id: 3,
    title: "Geer - E-commerce site",
    logo: jobringer,
    images: [
      "/projects/thumbnail/geer1.webp",
      "/projects/thumbnail/geer2.webp",
      "/projects/thumbnail/geer3.webp",
    ],
    link: "https://geer.vercel.app/",
    about:
      "Modern e-commerce site featuring fast performance, responsive UI, CRUD operations, and a clean layout inspired by Geer.",
    skillsUsed: [
      "React.js",
      "SASS",
      "Next.js",
      "Vercel",
      "NextAuth",
      "App Router",
    ],
  },
  {
    id: 4,
    title: "SoftSell - AI-powered landing page",
    logo: softsell,
    images: [
      "/projects/thumbnail/softsell1.webp",
      "/projects/thumbnail/softsell2.webp",
      "/projects/thumbnail/softsell3.webp",
    ],
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "Modern landing page for software reselling featuring smooth animations, clean design, responsive layout, and AI assistant integration.",
    skillsUsed: [
      "React.js",
      "Next.js",
      "Framer Motion",
      "Gemini API",
      "Git",
      "Vercel",
    ],
  },
  {
    id: 5,
    title: "Jobringer",
    logo: jobringer,
    images: [ttt, ttt, ttt],
    link: "https://jobringer-fawn.vercel.app/",
    about:
      "Redesigned a professional job portal with clean UI, modern layout, and improved user experience across devices using TypeScript and Tailwind.",
  },
  {
    id: 6,
    title: "Focus Flow",
    logo: focusflow,
    images: [ttt, ttt, ttt],
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about:
      "Minimal Pomodoro timer to boost productivity with focus sessions and breaks, built with TypeScript and Tailwind for a clean, responsive UI.",
  },
  {
    id: 7,
    title: "Pokemon Finding Calculator",
    logo: pfc,
    images: [ttt, ttt, ttt],
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "Fun number-to-Pokémon converter using React and PokeAPI with interactive logic and a clean, styled layout.",
  },
  {
    id: 8,
    title: "Tic Tac Toe",
    logo: ttt,
    images: [ttt, ttt, ttt],
    link: "https://tic-tac-toe-ruddy-ten-15.vercel.app/",
    about:
      "Classic XO game featuring a basic AI opponent, light/dark themes, and sound effects, built with React.",
  },
];

const ProjectPage: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const initialIndices = projects.reduce(
      (acc, p) => ({ ...acc, [p.id]: 0 }),
      {}
    );
    setCurrentImageIndices(initialIndices);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndices((prev) =>
        projects.reduce((acc, p) => {
          acc[p.id] = (prev[p.id] + 1) % p.images.length;
          return acc;
        }, {} as { [key: number]: number })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="projects" className={styles.projectPage}>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h5 className={styles.heading}>Featured Projects</h5>
        <p className={styles.subheading}>
          A collection of my recent work and personal projects
        </p>
      </motion.div>

      <div className={styles.projectsCtn}>
        {projects.slice(0, 4).map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className={styles.projectImage}>
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} - ${i}`}
                  className={`${
                    i === currentImageIndices[project.id] ? styles.active : ""
                  }`}
                  loading="lazy"
                />
              ))}
            </div>
            <div className={styles.projectContentWrapper}>
              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <img
                    src={project.logo}
                    alt={project.title}
                    className={styles.projectLogo}
                    loading="lazy"
                  />
                  <h5 className={styles.projectTitle}>{project.title}</h5>
                </div>
                <div className={styles.glassyBox}>
                  <p className={styles.projectDescription}>{project.about}</p>

                  <div className={styles.skillsMarquee}>
                    <Marquee speed={30}>
                      {[
                        ...(project.skillsUsed ?? []),
                        ...(project.skillsUsed ?? []),
                      ].map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </Marquee>
                  </div>
                </div>
                <div className={styles.projectFooter}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                  >
                    Live Demo <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={styles.moreProjectsHeading}
      >
        <h5>More Projects</h5>
        <p>Other cool stuff I have built—check them out!</p>
      </motion.div>

      <div className={styles.moreProjects}>
        {projects.slice(-4).map((project, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className={styles.projectCard}
          >
            <div>
              <img src={project.logo} loading="lazy" alt={project.title} />
              <h5>{project.title}</h5>
            </div>
            <p>{project.about}</p>
            <div className={styles.projectFooter}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
              >
                Live Demo <FiExternalLink />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
