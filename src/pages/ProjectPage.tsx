import styles from "./ProjectPage.module.scss";
import taskify from "/projects/taskify.webp";
import pfc from "/projects/pfc.webp";
import ttt from "/projects/ttt.webp";
import kura from "/projects/kura.webp";
import focusflow from "/projects/FocusFlow.webp";
import softsell from "/projects/SoftSell.webp";
import jobringer from "/projects/JobRinger.webp";
import geer from "/projects/Geer.ico";
import { easeOut, motion } from "framer-motion";
import { TbListDetails } from "react-icons/tb";
import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import Popup from "./PopUp";

interface Project {
  id: number;
  title: string;
  logo: string;
  link: string;
  about: string;
  images?: string[];
  skillsUsed?: string[];
  detailed?: string;
  highlights?: string[];
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
      "Built a ChatGPT clone from scratch using Next.js and Sass modules, integrated Generative AI and DeepSeek APIs for text and image generation, and used Azure Cognitive Speech, AWS Polly, and Web Speech APIs for seamless real-time voice chat.",
    highlights: [
      "Smart replies with text & images using Gemini and DeepSeek",
      "Real-time voice chat with Azure Speech",
      "Natural voice replies via AWS Polly",
      "Web Speech API fallback for voice",
      "Change its mood — happy, angry, calm, etc.",
      "Smooth theme switching with Redux and Sass",
      "Supports voice input",
      "Remembers chat and streams replies live",
    ],

    skillsUsed: [
      "SASS modules",
      "React.js",
      "Next.js",
      "JavaScript",
      "Web APIs",
      "Redux",
      "Deepseek api",
      "AWS",
      "Generative AI",
      "Git",
      "Azure",
      "Vercel",
    ],
  },

  {
    id: 2,
    title: "Geer - E-commerce site",
    logo: geer,
    images: [
      "/projects/thumbnail/geer1.webp",
      "/projects/thumbnail/geer2.webp",
      "/projects/thumbnail/geer3.webp",
    ],
    link: "https://geer.vercel.app/",
    about:
      "Built a full e-commerce site with Next.js and MongoDB, inspired by geer.in. Handled both frontend and backend, including admin features for managing products.",
    highlights: [
      "Multiple pages: Home, Products, Cart, Admin",
      "Product CRUD using Next.js API routes and MongoDB",
      "Secure admin login to add/delete products",
      "Search and filter products by price, category, etc.",
      "Responsive design with Framer Motion for smooth animations",
      "Data backup with JSON files and quick reset option",
    ],

    skillsUsed: [
      "React.js",
      "SASS modules",
      "Next.js",
      "Generative AI",
      "Redux",
      "Vercel",
      "Framer motion",
      "Git",
      "MUI",
      "Javascript",
      "MongoDB",
      "NextAuth",
      "App Router",
    ],
  },
  {
    id: 3,
    title: "Taskify",
    logo: taskify,
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "A Firebase task manager with real-time sync, inline editing, themes, built using Next.js.",
  },
  {
    id: 4,
    title: "SoftSell",
    logo: softsell,
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "Modern landing page for software reselling, featuring smooth animations and AI assistant integration.",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    logo: ttt,
    link: "https://tic-tac-toe-ruddy-ten-15.vercel.app/",
    about:
      "Modern app design for XO game featuring PvP, Player vs AI, themes, and sound effects, built with React.",
  },
  {
    id: 6,
    title: "Pokemon Calculator",
    logo: pfc,
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "Fun Pokémon calculator that fetches Pokémon based on the calculated answer using PokeAPI.",
  },

  {
    id: 7,
    title: "Jobringer",
    logo: jobringer,
    link: "https://jobringer-fawn.vercel.app/",
    about:
      "Redesigned a professional job portal frontend with a modern layout, TypeScript, and Tailwind.",
  },
  {
    id: 8,
    title: "Focus Flow",
    logo: focusflow,
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about:
      "Minimal Pomodoro timer with focus sessions and breaks, built with TypeScript and Tailwind.",
  },
];

const ProjectPage: React.FC = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{
    [key: number]: number;
  }>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
          if (p.images && p.images.length > 0) {
            acc[p.id] = ((prev[p.id] || 0) + 1) % p.images.length;
          }
          return acc;
        }, {} as { [key: number]: number })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [projects]);

  return (
    <div id="projects" className={styles.projectPage}>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h5 className={styles.heading}>Things I've Built</h5>
        <p className={styles.subheading}>
          From concept to deployment - Showcasing my creative coding journey and
          projects.
        </p>
      </motion.div>

      <div className={styles.projectsCtn}>
        {projects.slice(0, 2).map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div
              onClick={() => setSelectedProject(project)}
              className={styles.projectImage}
            >
              {project.images?.map((img, i) => (
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
                <div
                  className={styles.glassyBox}
                  onClick={() => setSelectedProject(project)}
                >
                  <p className={styles.projectDescription}>{project.about}</p>
                  <div className={styles.projectFooter}>
                    <div className={styles.btn}>
                      Details
                      <TbListDetails />
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btn}
                    >
                      Live Demo <FiExternalLink />
                    </a>
                  </div>
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
        <h5>Creative Experiments</h5>
        <p>
          Exploring unique ideas through small, impactful builds — where
          creativity meets code.
        </p>
      </motion.div>

      <div className={styles.horizontalScrollContainer}>
        <div className={styles.projectsRow}>
          {projects.slice(-6).map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.cardHeader}>
                {project.logo && (
                  <img
                    src={project.logo}
                    alt={project.title}
                    className={styles.projectIcon}
                    loading="lazy"
                  />
                )}
                <h4 className={styles.projectName}>{project.title}</h4>
              </div>
              <p className={styles.projectSummary}>{project.about}</p>
              <div className={styles.cardFooter}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.demoLink}
                >
                  <span>View</span>
                  <FiExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <Popup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
