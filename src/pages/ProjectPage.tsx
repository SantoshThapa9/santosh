import styles from "./ProjectPage.module.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
} from "react-icons/fi";
import { FaLongArrowAltDown } from "react-icons/fa";

interface FeaturedProject {
  id: number;
  slug: string;
  title: string;
  logo: string;
  images: string[];
  link?: string;
  about: string;
  highlights: string[];
}

interface SideProject {
  id: number;
  title: string;
  logo: string;
  link: string;
  about: string;
}

interface ProjectGalleryProps {
  title: string;
  images: string[];
  projectNumber: number;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  title,
  images,
  projectNumber,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [images.length, isPaused]);

  const showImage = (index: number) => {
    setActiveImage((index + images.length) % images.length);
  };

  return (
    <div
      className={styles.projectImage}
      role="group"
      aria-label={`${title} screenshots`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {images.map((image, index) => (
        <motion.img
          key={image}
          src={image}
          alt={`${title} screenshot ${index + 1}`}
          className={index === activeImage ? styles.activeImage : ""}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={index !== activeImage}
          animate={{
            opacity: index === activeImage ? 1 : 0,
            scale: index === activeImage ? 1 : 1.025,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <span className={styles.imageIndex} aria-hidden="true">
        {String(projectNumber).padStart(2, "0")}
      </span>
      <div className={styles.galleryControls}>
        <span className={styles.imageCaption}>Selected build</span>
        <div className={styles.galleryActions}>
          <div className={styles.galleryDots} aria-label="Choose screenshot">
            {images.map((image, index) => (
              <motion.button
                key={image}
                type="button"
                className={
                  index === activeImage ? styles.activeDot : styles.galleryDot
                }
                aria-label={`Show screenshot ${index + 1} of ${images.length} for ${title}`}
                aria-pressed={index === activeImage}
                onClick={() => showImage(index)}
                whileHover={reduceMotion ? undefined : { scale: 1.35 }}
                whileTap={reduceMotion ? undefined : { scale: 0.85 }}
              />
            ))}
          </div>
          <motion.button
            type="button"
            className={styles.galleryArrow}
            aria-label={`Previous screenshot for ${title}`}
            onClick={() => showImage(activeImage - 1)}
            whileHover={reduceMotion ? undefined : { x: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          >
            <FiArrowLeft aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            className={styles.galleryArrow}
            aria-label={`Next screenshot for ${title}`}
            onClick={() => showImage(activeImage + 1)}
            whileHover={reduceMotion ? undefined : { x: 2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          >
            <FiArrowRight aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const projects: FeaturedProject[] = [
  {
    id: 1,
    slug: "geer",
    title: "Geer — E-commerce",
    logo: "https://geer.vercel.app/logo.png",
    images: [
      "/projects/thumbnail/geer1.webp",
      "/projects/thumbnail/geer2.webp",
      "/projects/thumbnail/geer3.webp",
    ],
    link: "https://geer.vercel.app/",
    about:
      "An internship project: a full-stack store that brings discovery, shopping, and support together, with an AI assistant to help customers find products.",
    highlights: [
      "Built as part of my internship work",
      "Product discovery with search, category filters, and sorting",
      "Account-backed cart, checkout, and purchase history",
      "Razorpay payments with NextAuth authentication and MongoDB data",
      "AI shopping assistant to help customers explore products",
    ],
  },
  {
    id: 2,
    slug: "ninzo-versus",
    title: "Ninzo Versus",
    logo: "https://ninzo-versus.vercel.app/nv.svg",
    images: [
      "/projects/nv/1.webp",
      "/projects/nv/2.webp",
      "/projects/nv/3.webp",
    ],
    about:
      "A tournament platform for players to discover competitions and showcase them to a global audience. Ninzo Versus has grown to 50+ active users.",
    highlights: [
      "50+ active users",
      "Tournament discovery and player sign-up",
      "Built to showcase competitions globally",
      "Next.js application with MongoDB-backed data",
    ],
  },
  {
    id: 3,
    slug: "kura",
    title: "Kura AI",
    logo: "https://kura-iota.vercel.app/kura.png",
    images: [
      "/projects/thumbnail/kura1.webp",
      "/projects/thumbnail/kura2.webp",
      "/projects/thumbnail/kura3.webp",
    ],
    link: "https://kura-iota.vercel.app/",
    about:
      "Inspired by ChatGPT, Kura is my full-stack take on an AI assistant, bringing multimodal chat, voice, image generation, coding help, and persistent history together.",
    highlights: [
      "Streaming AI conversations with markdown and code highlighting",
      "MongoDB-backed accounts, chat history, and preferences",
      "Voice interaction using the Web Speech API",
      "Razorpay subscriptions for premium tools and usage",
    ],
  },
];

const otherProjects: SideProject[] = [
  {
    id: 4,
    title: "SoftSell",
    logo: "https://soft-sell-two-lime.vercel.app/favicon.ico",
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "An internship project: a polished, responsive SaaS landing page designed to explain the product clearly and guide visitors toward taking action.",
  },
  {
    id: 5,
    title: "Skill Blade",
    logo: "https://skill-blade-psi.vercel.app/skill-blade.png",
    link: "https://skill-blade-psi.vercel.app/",
    about:
      "My college final project, where I led full-stack development to bring the Skill Blade platform from interface to backend.",
  },
  {
    id: 6,
    title: "Gupta Investment Zone",
    logo: "https://gupta-investment-zone.vercel.app/logo.png",
    link: "https://gupta-investment-zone.vercel.app/",
    about:
      "An internship project: a responsive web presence for Gupta Investment Zone, presenting its investment services in a clear, professional experience.",
  },
  {
    id: 7,
    title: "Taskify",
    logo: "https://taskifyapp-smoky.vercel.app/taskify.png",
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "A task management application for organizing projects, tracking progress, and improving productivity.",
  },
  {
    id: 8,
    title: "FocusFlow",
    logo: "https://focus-flow-productivity-timer.vercel.app/favicon.ico",
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about:
      "A Pomodoro productivity timer with focus sessions, break reminders, and a distraction-free interface.",
  },
  {
    id: 9,
    title: "Pokémon Finding Calculator",
    logo: "https://pfc-app-mauve.vercel.app/icon.png",
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "A utility app that simplifies Pokémon finding calculations with a clean and responsive interface.",
  },
  {
    id: 10,
    title: "Tic Tac Toe",
    logo: "https://tic-tac-toe-ruddy-ten-15.vercel.app/favicon.ico",
    link: "https://tic-tac-toe-ruddy-ten-15.vercel.app/",
    about:
      "My first project: a classic Tic Tac Toe game given a distinctive visual identity, responsive design, and smooth play.",
  },
];

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateProjectUrl = () => {
      const otherProjectsSection = document.getElementById("project-others");
      const viewportCenter = window.innerHeight / 2;
      const otherProjectsRect = otherProjectsSection?.getBoundingClientRect();

      if (
        otherProjectsRect &&
        otherProjectsRect.top <= viewportCenter &&
        otherProjectsRect.bottom >= viewportCenter
      ) {
        if (location.pathname !== "/projects/others") {
          navigate("/projects/others", {
            replace: true,
            state: { fromScroll: true },
          });
        }
        return;
      }

      const projectCards = document.querySelectorAll<HTMLElement>(
        "#projects [data-project-slug]",
      );
      const viewportHeight = window.innerHeight;
      let mostVisibleSlug: string | undefined;
      let mostVisibleRatio = 0;

      projectCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0),
        );
        const visibleRatio = visibleHeight / viewportHeight;

        if (visibleRatio > mostVisibleRatio) {
          mostVisibleRatio = visibleRatio;
          mostVisibleSlug = card.dataset.projectSlug;
        }
      });

      if (mostVisibleRatio >= 0.35 && mostVisibleSlug) {
        const projectPath = `/projects/${mostVisibleSlug}`;
        if (location.pathname !== projectPath) {
          navigate(projectPath, {
            replace: true,
            state: { fromScroll: true },
          });
        }
      }
    };

    updateProjectUrl();
    window.addEventListener("scroll", updateProjectUrl, { passive: true });
    window.addEventListener("resize", updateProjectUrl);
    return () => {
      window.removeEventListener("scroll", updateProjectUrl);
      window.removeEventListener("resize", updateProjectUrl);
    };
  }, [location.pathname, navigate]);

  return (
    <section
      id="projects"
      className={styles.projectPage}
      aria-labelledby="projects-title"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Portfolio / Selected work
        </p>
        <div className={styles.heroCopy}>
          <motion.h1
            id="projects-title"
            className={styles.heading}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -18% 0px",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Building products
            <br />
            <span>with integrated AI</span>
            <br />
            <span>and modern tech.</span>
          </motion.h1>

          <motion.div
            className={styles.heroAside}
            initial={reduceMotion ? false : { opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -18% 0px",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.08,
            }}
          >
            <p>
              A few things I’ve designed, built, and shipped — from full-stack
              products to small experiments made just to see what’s possible.
            </p>
          </motion.div>
        </div>
        <div className={styles.headerRule} aria-hidden="true">
          <span>Featured projects</span>
          <span>
            Scroll to explore <FaLongArrowAltDown />
          </span>
        </div>
      </header>

      <div className={styles.projectsCtn}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            id={`project-${project.slug}`}
            data-project-slug={project.slug}
            className={`${styles.projectCard} ${
              index % 2 === 1 ? styles.reversed : ""
            }`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: index % 2 === 0 ? -36 : 36 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: false,
              amount: 0.16,
              margin: "0px 0px -16% 0px",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectGallery
              title={project.title}
              images={project.images}
              projectNumber={project.id}
            />
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>
                <span>Case study {String(index + 1).padStart(2, "0")}</span>
                {project.link && (
                  <span className={styles.liveStatus}>Live</span>
                )}
              </div>
              <div className={styles.projectHeading}>
                <img
                  src={project.logo}
                  alt="project logo"
                  className={styles.projectLogo}
                />
                <h2 className={styles.projectTitle}>{project.title}</h2>
              </div>
              <p className={styles.projectDescription}>{project.about}</p>
              <div className={styles.highlights}>
                <h3>What it does</h3>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                >
                  Visit live project
                  <FiArrowUpRight aria-hidden="true" />
                </motion.a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <section
        id="project-others"
        className={styles.moreProjects}
        aria-labelledby="more-projects-title"
      >
        <div className={styles.moreProjectsHeading}>
          <div>
            <p className={styles.eyebrow}>The rest of the lab</p>
            <h2 id="more-projects-title">More things in motion.</h2>
          </div>
          <p className={styles.moreProjectsIntro}>
            Smaller builds, experiments, and ideas shipped along the way.
          </p>
        </div>
        <div className={styles.otherProjectsGrid}>
          {otherProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className={styles.otherProject}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: false,
                amount: 0.3,
                margin: "0px 0px -12% 0px",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : (index % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <div className={styles.otherProjectHeader}>
                <span className={styles.otherProjectIndex}>
                  {String(project.id).padStart(2, "0")}
                </span>
                <img
                  src={project.logo}
                  alt="project logo"
                  className={styles.projectIcon}
                />
              </div>
              <h3>{project.title}</h3>
              <p>{project.about}</p>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                whileHover={reduceMotion ? undefined : { x: 3 }}
              >
                Open project <FiExternalLink aria-hidden="true" />
              </motion.a>
            </motion.article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProjectPage;
