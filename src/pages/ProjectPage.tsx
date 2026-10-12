import styles from "./ProjectPage.module.scss";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
} from "react-icons/fi";

interface FeaturedProject {
  id: number;
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
        <img
          key={image}
          src={image}
          alt={`${title} screenshot ${index + 1}`}
          className={index === activeImage ? styles.activeImage : ""}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={index !== activeImage}
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
              <button
                key={image}
                type="button"
                className={
                  index === activeImage ? styles.activeDot : styles.galleryDot
                }
                aria-label={`Show screenshot ${index + 1} of ${images.length} for ${title}`}
                aria-pressed={index === activeImage}
                onClick={() => showImage(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.galleryArrow}
            aria-label={`Previous screenshot for ${title}`}
            onClick={() => showImage(activeImage - 1)}
          >
            <FiArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.galleryArrow}
            aria-label={`Next screenshot for ${title}`}
            onClick={() => showImage(activeImage + 1)}
          >
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const projects: FeaturedProject[] = [
  {
    id: 1,
    title: "Geer — E-commerce",
    logo: "https://geer.vercel.app/logo.png",
    images: [
      "/projects/thumbnail/geer1.webp",
      "/projects/thumbnail/geer2.webp",
      "/projects/thumbnail/geer3.webp",
    ],
    link: "https://geer.vercel.app/",
    about:
      "A full-stack online store built around the complete shopping journey: product discovery, accounts, cart, checkout, and order history, with an AI shopping assistant.",
    highlights: [
      "Product discovery with search, category filters, and sorting",
      "Account-backed cart, checkout, and purchase history",
      "Razorpay payments with NextAuth authentication and MongoDB data",
      "AI shopping assistant to help customers explore products",
    ],
  },
  {
    id: 2,
    title: "Ninzo Versus",
    logo: "https://ninzo-versus.vercel.app/nv.svg",
    images: [
      "/projects/nv/1.webp",
      "/projects/nv/2.webp",
      "/projects/nv/3.webp",
    ],
    about:
      "An esports tournament platform where players can sign up and showcase their competitions to a global audience. Built with Next.js and MongoDB.",
    highlights: [
      "Built for esports tournament discovery and showcasing",
      "Player sign-up for participation",
      "Tournament pages designed for a worldwide audience",
      "Next.js application with MongoDB-backed data",
    ],
  },
  {
    id: 3,
    title: "Kura AI",
    logo: "https://kura-iota.vercel.app/kura.png",
    images: [
      "/projects/thumbnail/kura1.webp",
      "/projects/thumbnail/kura2.webp",
      "/projects/thumbnail/kura3.webp",
    ],
    link: "https://kura-iota.vercel.app/",
    about:
      "A full-stack AI assistant with multimodal conversations, voice interaction, image generation, coding help, and persistent chat history.",
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
      "A modern SaaS landing page built with a strong focus on conversions, responsive layouts, and smooth animations.",
  },
  {
    id: 5,
    title: "Skill Blade",
    logo: "https://skill-blade-psi.vercel.app/skill-blade.png",
    link: "https://skill-blade-psi.vercel.app/",
    about:
      "A modern platform for discovering and improving developer skills through an intuitive and responsive interface.",
  },
  {
    id: 6,
    title: "Gupta Investment Zone",
    logo: "https://gupta-investment-zone.vercel.app/logo.png",
    link: "https://gupta-investment-zone.vercel.app/",
    about:
      "A professional investment and financial services website with a modern, responsive design and clean user experience.",
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
      "A responsive Tic Tac Toe game featuring smooth gameplay, clean UI, and React-based architecture.",
  },
];

const ProjectPage: React.FC = () => (
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
        <h1 id="projects-title" className={styles.heading}>
          Building products
          <br />
          <span>with integrated AI</span>
          <br />
          <span>and modern tech.</span>
        </h1>

        <div className={styles.heroAside}>
          <p>
            A few things I’ve designed, built, and shipped — from full-stack
            products to small experiments made just to see what’s possible.
          </p>
        </div>
      </div>
      <div className={styles.headerRule} aria-hidden="true">
        <span>Featured projects</span>
        <span>Scroll to explore ↓</span>
      </div>
    </header>

    <div className={styles.projectsCtn}>
      {projects.map((project, index) => (
        <article
          key={project.id}
          className={`${styles.projectCard} ${
            index % 2 === 1 ? styles.reversed : ""
          }`}
        >
          <ProjectGallery
            title={project.title}
            images={project.images}
            projectNumber={project.id}
          />
          <div className={styles.projectContent}>
            <div className={styles.projectMeta}>
              <span>Case study {String(index + 1).padStart(2, "0")}</span>
              {project.link && <span className={styles.liveStatus}>Live</span>}
            </div>
            <div className={styles.projectHeading}>
              <img
                src={project.logo}
                alt=""
                className={styles.projectLogo}
                loading="lazy"
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                Visit live project
                <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>

    <section
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
        {otherProjects.map((project) => (
          <article key={project.id} className={styles.otherProject}>
            <div className={styles.otherProjectHeader}>
              <span className={styles.otherProjectIndex}>
                {String(project.id).padStart(2, "0")}
              </span>
              <img
                src={project.logo}
                alt=""
                className={styles.projectIcon}
                loading="lazy"
              />
            </div>
            <h3>{project.title}</h3>
            <p>{project.about}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
            >
              Open project <FiExternalLink aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  </section>
);

export default ProjectPage;
