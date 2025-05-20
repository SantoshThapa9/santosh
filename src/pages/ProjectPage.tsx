import styles from "./ProjectPage.module.scss";
import taskify from "/taskify.png";
import pfc from "/pfc.png";
import ttt from "/ttt.png";
import kura from "/kura.png";
import focusflow from "/focusflow.ico";
import softsell from "/softsell.ico";

import AnimateView from "./animate/AnimateView";

interface Project {
  id: number;
  title: string;
  logo: string;
  link: string;
  about: string;
  skillsUsed: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "KURA AI",
    logo: kura,
    link: "https://kura-iota.vercel.app/",
    about:
      "A ChatGPT-style app with image-gen, voice chat, and code assist—100% free.",
    skillsUsed: ["Next.js", "API Integration", "Web APIs", "Vercel"],
  },
  {
    id: 2,
    title: "SoftSell",
    logo: softsell,
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "Classic X/O game with AI opponent, sound effects, and light/dark modes.",
    skillsUsed: ["HTML", "CSS", "React", "Git"],
  },
  {
    id: 3,
    title: "Taskify",
    logo: taskify,
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "Real-time todo manager with custom views and secure auth via Firebase.",
    skillsUsed: ["Next.js", "Firebase", "REST API", "Vercel"],
  },
  {
    id: 4,
    title: "PFC",
    logo: pfc,
    link: "https://pfc-app-mauve.vercel.app/",
    about:
      "Calculator meets Pokémon™—enter any number, see its Poke-counterpart.",
    skillsUsed: ["React", "PokeAPI", "SASS", "Vercel"],
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    logo: ttt,
    link: "https://santoshthapa9.github.io/tictactoer/",
    about:
      "Classic X/O game with AI opponent, sound effects, and light/dark modes.",
    skillsUsed: ["HTML", "CSS", "React", "Git"],
  },
  {
    id: 6,
    title: "Focus Flow",
    logo: focusflow,
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about:
      "Classic X/O game with AI opponent, sound effects, and light/dark modes.",
    skillsUsed: ["HTML", "CSS", "React", "Git"],
  },
];

const ProjectPage: React.FC = () => (
  <section id="projects" className={styles.projectPage}>
    <hr />
    <AnimateView>
      <h1 className={styles.heading}>PROJECTS</h1>
    </AnimateView>
    <div className={styles.grid}>
      {projects.map((p) => (
        <div key={p.id} className={styles.card}>
          <AnimateView>
            <div className={styles.logoCtn}>
              <img
                src={p.logo}
                alt={p.title}
                className={styles.image}
                loading="lazy"
              />

              <h2 className={styles.title}>{p.title}</h2>
            </div>
            <p className={styles.about}>{p.about}</p>

            <ul className={styles.skills}>
              {p.skillsUsed.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Learn More
            </a>
          </AnimateView>
        </div>
      ))}
    </div>
    <hr />
  </section>
);

export default ProjectPage;
