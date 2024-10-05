import React, { useState, useEffect, useRef } from "react";
import styles from "./ProjectPage.module.scss";
import ttt from "../pages/projectThumbnails/ttt.png";
import taskify from "../pages/projectThumbnails/taskify.png";
import pp from "../pages/projectThumbnails/pp.png";

import ProjectModal from "./projectModal";

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
    title: "santosh.com",
    thumbnail: pp,
    link: "/",
    description:
      "This is the current site you are viewing. It serves as a complete representation of my journey",
  },
  {
    id: 2,
    title: "Taskify",
    thumbnail: taskify,
    link: "https://taskifyapp-smoky.vercel.app/",
    description:
      "A simple task manager to help you stay organized and productive.",
  },
  {
    id: 3,
    title: "Tic Tac Toe",
    thumbnail: ttt,
    link: "https://nic986.github.io/tictactoe/",
    description:
      "This is a simple Tic Tac Toe where you can play against AI with cool themes and fun sound effects",
  },
];

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
    <div className={styles.projectPage} ref={containerRef}>
      <div className={styles.heading}>
        <h1>PROJECTS</h1>
      </div>
      <div className={styles.gridContainer}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${styles.gridItem}`}
            onClick={() => openModal(project)}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className={styles.thumbnail}
              style={{ aspectRatio: "1 / 1" }}
            />
            <h3 className={styles.title}>{project.title}</h3>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProjectPage;
