import styles from "./ProjectPage.module.scss";
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
    title: "Kura AI",
    logo: "https://kura-iota.vercel.app/kura.png",
    images: [
      "/projects/thumbnail/kura1.webp",
      "/projects/thumbnail/kura2.webp",
      "/projects/thumbnail/kura3.webp",
    ],
    link: "https://kura-iota.vercel.app/",

    about:
      "A full-stack AI assistant inspired by ChatGPT, featuring multimodal conversations, voice interaction, image generation, coding assistance, and premium AI capabilities. Built with a production-ready architecture including authentication, payments, personalization, and persistent chat history.",

    highlights: [
      "ChatGPT-inspired UI with responsive, production-quality user experience",
      "Secure authentication using NextAuth with MongoDB-backed user accounts",
      "Persistent chat history, conversation management, and personalized user settings",
      "AI-powered text generation with markdown, syntax highlighting, and streaming responses",
      "Voice conversations using Web Speech API with real-time speech recognition",

      "Built-in AI actions allowing users to change themes, manage personalization, create reminders, todos, and control app features directly through chat",
      "Dedicated Pro Coding Assistant optimized for programming, debugging, and code explanations",
      "Premium subscription system using Razorpay with ₹1 / 7-day trial",
      "Premium-only features including advanced image generation, Pro Chat Mode, and higher AI usage limits",
    ],

    skillsUsed: [
      "Next.js",
      "React",
      "JavaScript",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "Redux",
      "Sass",
      "Gemini API",
      "OpenAI API",
      "Web Speech API",
      "Razorpay",
      "Vercel",
      "Git",
    ],
  },
  {
    id: 2,
    title: "Geer - E-commerce",
    logo: "https://geer.vercel.app/logo.png",
    images: [
      "/projects/thumbnail/geer1.webp",
      "/projects/thumbnail/geer2.webp",
      "/projects/thumbnail/geer3.webp",
    ],
    link: "https://geer.vercel.app/",

    about:
      "A full-stack e-commerce platform built with Next.js, featuring secure authentication, product management, online payments, order processing, and a modern shopping experience enhanced with an AI shopping assistant.",

    highlights: [
      "Complete shopping experience with product browsing, cart, checkout, and order management",
      "Secure authentication with NextAuth.js and MongoDB",
      "AI shopping assistant to help users discover products and answer shopping-related queries",
      "Integrated Razorpay payment gateway for secure online payments",
      "Persistent shopping cart powered by Redux for seamless state management",
      "Product search, category filtering, sorting, and responsive browsing experience",
      "Order placement with purchase history for authenticated users",
      "Smooth page transitions and interactive UI using Framer Motion",
      "Responsive design optimized for desktop, tablet, and mobile devices",
      "Production-ready deployment on Vercel with a scalable Next.js architecture",
    ],

    skillsUsed: [
      "Next.js",
      "React",
      "JavaScript",
      "MongoDB",
      "NextAuth.js",
      "Redux Toolkit",
      "Razorpay",
      "MUI",
      "Framer Motion",
      "REST API",
      "Vercel",
      "Git",
    ],
  },
];
const otherProjects = [
  {
    id: 3,
    title: "Gupta Investment Zone",
    logo: "https://gupta-investment-zone.vercel.app/logo.png",
    link: "https://gupta-investment-zone.vercel.app/",
    about:
      "A professional investment and financial services website with a modern, responsive design and clean user experience.",
  },
  {
    id: 4,
    title: "Skill Blade",
    logo: "https://skill-blade-psi.vercel.app/skill-blade.png",
    link: "https://skill-blade-psi.vercel.app/",
    about:
      "A modern platform for discovering and improving developer skills through an intuitive and responsive interface.",
  },
  {
    id: 5,
    title: "SoftSell",
    logo: "https://soft-sell-two-lime.vercel.app/favicon.ico",
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "A modern SaaS landing page built with a strong focus on conversions, responsive layouts, and smooth animations.",
  },
  {
    id: 6,
    title: "Taskify",
    logo: "https://taskifyapp-smoky.vercel.app/taskify.png",
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "A task management application for organizing projects, tracking progress, and improving productivity.",
  },
  {
    id: 7,
    title: "FocusFlow",
    logo: "https://focus-flow-productivity-timer.vercel.app/favicon.ico",
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about:
      "A Pomodoro productivity timer with focus sessions, break reminders, and a distraction-free interface.",
  },
  {
    id: 8,
    title: "Pokémon Finding Calculator",
    logo: "https://pfc-app-mauve.vercel.app/icon.png",
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "A utility app that simplifies Pokémon finding calculations with a clean and responsive interface.",
  },
  {
    id: 9,
    title: "Tic Tac Toe",
    logo: "https://tic-tac-toe-ruddy-ten-15.vercel.app/favicon.ico",
    link: "https://tic-tac-toe-ruddy-ten-15.vercel.app/",
    about:
      "A responsive Tic Tac Toe game featuring smooth gameplay, clean UI, and React-based architecture.",
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
      {},
    );
    setCurrentImageIndices(initialIndices);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndices((prev) =>
        projects.reduce(
          (acc, p) => {
            if (p.images && p.images.length > 0) {
              acc[p.id] = ((prev[p.id] || 0) + 1) % p.images.length;
            }
            return acc;
          },
          {} as { [key: number]: number },
        ),
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
        <h5 className={styles.heading}>Things I've Built</h5>
        <p className={styles.subheading}>
          End-to-end projects focused on performance, usability, and clean
          architecture.
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
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={styles.smallImage}
                  >
                    {project.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${project.title} - ${i}`}
                        className={`${
                          i === currentImageIndices[project.id]
                            ? styles.active
                            : ""
                        }`}
                        loading="lazy"
                      />
                    ))}
                  </div>
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
                    <Marquee speed={20}>
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
        <h5>Other Projects</h5>
      </motion.div>

      <div className={styles.horizontalScrollContainer}>
        <div className={styles.projectsRow}>
          {otherProjects.map((project, i) => (
            <div
              key={i}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.cardHeader}>
                {project.logo && (
                  <img
                    src={project.logo}
                    alt={project.title}
                    className={styles.projectIcon}
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
                  <FiExternalLink />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <Popup
          project={selectedProject}
          currentImageIndices={currentImageIndices}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
