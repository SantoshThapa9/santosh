import styles from "./PopUp.module.scss";
import { FiX, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Shared from "../shared-style/Shared.module.scss";

interface PopupProps {
  project: any;
  currentImageIndices: { [key: number]: number };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  project,
  onClose,
  currentImageIndices,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.popupOverlay}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={styles.popupContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
          >
            <FiX />
          </button>

          <motion.div
            className={styles.logo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {project.logo && (
              <img
                src={project.logo}
                alt={project.title}
                className={styles.popupLogo}
              />
            )}
            <div>
              <h2>{project.title}</h2>
              {project.subtitle && (
                <p className={styles.subtitle}>{project.subtitle}</p>
              )}
            </div>
          </motion.div>
          <div className={styles.projectImage}>
            {project.images?.map((img: string, i: number) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className={styles.description}>{project.about}</p>

            {project.highlights && (
              <div className={styles.highlightsSection}>
                <h3 className={styles.sectionTitle}>Key Features</h3>
                <ul className={styles.highlightList}>
                  {project.highlights.map((item: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {project.skillsUsed && (
              <div className={styles.skillsSection}>
                <h3 className={styles.sectionTitle}>Technologies Used</h3>
                <div className={styles.skillsList}>
                  {project.skillsUsed.map((skill: string, idx: number) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {project.link && (
              <motion.div
                className={styles.actions}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Shared.btn}
                >
                  Live Demo <FiExternalLink className={styles.externalIcon} />
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
