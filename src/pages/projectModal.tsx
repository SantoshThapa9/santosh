import React from "react";
import { motion } from "framer-motion";
import styles from "./projectModal.module.scss";
import "../global.css";
interface Project {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  description?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isVisible: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isVisible,
  onClose,
}) => {
  if (!isVisible || !project) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={project.thumbnail} className={styles.modalThumbnail} />
        <p>{project.description}</p>
        <a
          href={project.link}
          className={styles.goBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
