import React, { useState, useEffect, useRef, Suspense } from "react";
import styles from "./ProjectPage.module.scss";
import ttt from "../pages/projectThumbnails/ttt.png";
import taskify from "../pages/projectThumbnails/taskify.png";
import pfc from "../pages/projectThumbnails/pfc.png";
import kura from "../pages/projectThumbnails/kuraxchatgpt.png";
import "../global.css";

const ProjectModal = React.lazy(() => import("./projectModal"));

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  description?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "KURA.AI",
    thumbnail: kura,
    link: "https://kura-iota.vercel.app/",
    description:
      "KURA.AI is A ChatGPT Clone with Free Unlimited Image Generation & Premium Voice Chat.",
  },
  {
    id: 2,
    title: "Taskify",
    thumbnail: taskify,
    link: "https://taskifyapp-smoky.vercel.app/",
    description:
      "Taskify is A Simple, Distraction-Free Task Manager with Gmail Login & Cloud Sync.",
  },
  {
    id: 3,
    title: "Tic Tac Toe",
    thumbnail: ttt,
    link: "https://santoshthapa9.github.io/tictactoer/",
    description:
      "This is a simple Tic Tac Toe where you can play against AI with cool themes and fun sound effects",
  },
  {
    id: 4,
    title: "PFC",
    thumbnail: pfc,
    link: "https://pfc-app-mauve.vercel.app/",
    description:
      "A Small, playful app where you can calculate number, and it reveals the corresponding Pokemon, using API ",
  },
];

const GridItem: React.FC<{ project: Project; onClick: () => void }> =
  React.memo(({ project, onClick }) => (
    <div className={styles.gridItem} onClick={onClick}>
      <img
        src={project.thumbnail}
        alt={project.title}
        className={styles.thumbnail}
        style={{ aspectRatio: "1 / 1" }}
        loading="lazy"
      />
      <span className={styles.title}>{project.title}</span>
    </div>
  ));

const ProjectPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const gridItems = document.querySelectorAll(`.${styles.gridItem}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    gridItems.forEach((item) => observer.observe(item));

    return () => {
      gridItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalVisible(false);
  };

  return (
    <section id="projects" className={styles.projectPage} ref={containerRef}>
      <hr />
      <br />
      <div className={styles.heading}>
        <h1>PROJECTS</h1>
      </div>
      <article className={styles.gridContainer}>
        {projects.map((project) => (
          <GridItem
            key={project.id}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </article>

      {isModalVisible && (
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectModal
            project={selectedProject}
            isVisible={isModalVisible}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </section>
  );
};

export default ProjectPage;
