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
      "AI chat application with text, image, and voice interaction. Built with a focus on real-time responses and multi-modal input.",
    highlights: [
      "Text generation with formatted output (markdown, code blocks)",
      "Real-time voice chat with Web Speech API fallback",
      "Streaming responses for live chat experience",
      "Image analysis, editing, and generation support",
      "Persistent conversation history",
      "Chat-driven actions (theme change, reminders, todo creation)",
    ],
    skillsUsed: [
      "Next.js",
      "React",
      "JavaScript",
      "Sass",
      "Redux",
      "Web Speech API",
      "DeepSeek API",
      "Gemini API",
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
      "Full-stack e-commerce application with product management and basic admin controls.",
    highlights: [
      "Product listing, cart, and checkout flow",
      "Admin panel for product CRUD operations",
      "Authentication for admin access",
      "Search and filtering by category and price",
      "Responsive UI with basic animations",
    ],
    skillsUsed: [
      "Next.js",
      "React",
      "JavaScript",
      "MongoDB",
      "NextAuth",
      "Redux",
      "Framer Motion",
      "MUI",
      "Vercel",
      "Git",
    ],
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
      {/* <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={styles.moreProjectsHeading}
      >
        <h5>Other Projects</h5>
      </motion.div>

      <div className={styles.horizontalScrollContainer}>
        <div className={styles.projectsRow}>
          {projects.slice(-2).map((project, i) => (
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
      </div> */}
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
