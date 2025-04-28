import styles from "./ProjectPage.module.scss";
import ttt from "../pages/projectThumbnails/ttt.png";
import taskify from "../pages/projectThumbnails/taskify.png";
import pfc from "../pages/projectThumbnails/pfc.png";
import kura from "../pages/projectThumbnails/kura.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  about: string;
  skillsUsed: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "KURA AI - ChatGPT Clone",
    thumbnail: kura,
    link: "https://kura-iota.vercel.app/",
    about:
      "KURA AI is a ChatGPT alternative I built to offer human-like conversations, AI-powered coding assistance, image generation, voice chat, and creative content tools — all completely free. I created it to explore advanced AI integrations and improve my skills in building real-world, interactive AI applications.",
    skillsUsed: [
      "Next.js",
      "Google Gemini API",
      "Web Speech APIs",
      "SASS",
      "Vercel",
    ],
  },
  {
    id: 2,
    title: "Taskify",
    thumbnail: taskify,
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "Taskify is a task management platform I built to help users stay organized and boost productivity with features like real-time sync, customizable views, and secure user authentication. I created it using Next.js and Firebase to provide a seamless, intuitive experience for managing tasks and projects efficiently.",
    skillsUsed: ["Next.js", "Firebase", "SASS", "Vercel"],
  },
  {
    id: 3,
    title: "PFC",
    thumbnail: pfc,
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "PFC is a fun and simple number calculator that shows the corresponding Pokemon for any number you calculate. Using the Poke API, this app adds an interactive twist to your basic calculator, bringing a bit of fun while you learn about the world of Pokemon.",
    skillsUsed: ["React.js", " PokeAPI", "SASS", "Vercel"],
  },
  {
    id: 4,
    title: "Tic Tac Toe",
    thumbnail: ttt,
    link: "https://santoshthapa9.github.io/tictactoer/",
    about:
      "Tic Tac Toe is a simple yet engaging game that I created using HTML5, CSS3, and React. It features both Player vs Player and Player vs AI modes with easy and hard difficulty levels. Enjoy the interactive experience with fun sound effects and a theme toggle between light and dark modes.",
    skillsUsed: ["HTML5", "CSS3", "React.js", "Git & GitHub"],
  },
];

const ProjectPage: React.FC = () => {
  const AnimatedSection = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const { ref, inView } = useInView({ threshold: 0 });
    const controls = useAnimation();

    React.useEffect(() => {
      if (inView) controls.start("visible");
    }, [inView, controls]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: "100px" }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className={styles.projectPage}>
      <hr />
      <AnimatedSection>
        <div className={styles.heading}>
          <h1>PROJECTS</h1>
        </div>
      </AnimatedSection>
      {projects.map((project) => (
        <AnimatedSection key={project.id} className={styles.projectBlock}>
          <AnimatedSection>
            <h2 className={styles.projectTitle}>{project.title}</h2>
          </AnimatedSection>
          <AnimatedSection>
            <img
              src={project.thumbnail}
              alt={project.title}
              className={styles.projectImage}
              loading="lazy"
            />
          </AnimatedSection>
          <AnimatedSection>
            <p className={styles.projectDescription}>{project.about}</p>
          </AnimatedSection>

          <AnimatedSection>
            <h3>Skills Used</h3>
            <ul className={styles.skillsList}>
              {project.skillsUsed.map((skill, index) => (
                <AnimatedSection key={index} className={styles.skillItem}>
                  {skill}
                </AnimatedSection>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              Know more
            </a>
          </AnimatedSection>
        </AnimatedSection>
      ))}
    </section>
  );
};

export default ProjectPage;
