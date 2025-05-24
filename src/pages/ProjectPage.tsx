import styles from "./ProjectPage.module.scss";
import taskify from "/taskify.png";
import pfc from "/pfc.png";
import ttt from "/ttt.png";
import kura from "/kura.png";
import focusflow from "/focusflow.ico";
import softsell from "/softsell.ico";
import p1 from "/p1.jpg";
import p2 from "/p2.jpg";
import p3 from "/p3.png";

import AnimateView from "./animate/AnimateView";

interface Project {
  id: number;
  title: string;
  logo: string;
  thumbnail?: string;
  link: string;
  about: string;

  skillsUsed: string[];
}
const projects: Project[] = [
  {
    id: 1,
    title: "Kura AI",
    logo: kura,
    thumbnail: p1,
    link: "https://kura-iota.vercel.app/",
    about:
      "KURA AI is a ChatGPT clone with real-time voice chat, AI image generation, neat code/text formatting, and seamless light & dark responsive layouts.",

    skillsUsed: [
      "SASS",
      "React.js",
      "Next.js",
      "Web APIs",
      "Context API",
      "Gemini API",
    ],
  },
  {
    id: 2,
    title: "SoftSell",
    logo: softsell,
    thumbnail: p2,
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "SoftSell is a landing page for reselling software licenses, with an AI assistant for guidance, smooth animations for engagement, and a clean, responsive design.",

    skillsUsed: [
      "React.js",
      "Next.js",
      "Framer Motion",
      "Gemini API",
      "Git",
      "Vercel",
    ],
  },
  {
    id: 3,
    title: "Taskify",
    logo: taskify,
    thumbnail: p3,
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "Taskify is a task management app with real-time syncing, customizable views, inline editing, bulk actions, and theme switching in a fast, clear, responsive design.",

    skillsUsed: [
      "Next.js",
      "Firebase",
      "Vercel",
      "REST API",
      "Git",
      "JavaScript",
      "Context API",
    ],
  },
  {
    id: 4,
    title: "Pokemon Finding Calculator",
    logo: pfc,
    link: "https://pfc-app-mauve.vercel.app/",
    about: "Fun number-to-Pokémon converter using public PokeAPI data.",
    skillsUsed: ["React", "PokeAPI", "SASS", "Git"],
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    logo: ttt,
    link: "https://santoshthapa9.github.io/tictactoer/",
    about: "Classic XO game with AI, sound effects, and dark/light themes.",
    skillsUsed: ["HTML", "CSS", "React", "Git"],
  },
  {
    id: 6,
    title: "Focus Flow",
    logo: focusflow,
    link: "https://focus-flow-productivity-timer.vercel.app/",
    about: "Minimalist Pomodoro app for focused work and regular breaks.",
    skillsUsed: ["TypeScript", "Tailwind", "Next.js", "Vercel"],
  },
];

const ProjectPage: React.FC = () => {
  return (
    <div id="projects" className={styles.projectPage}>
      <hr />
      <AnimateView>
        <h4 className={styles.heading}>PROJECTS</h4>
      </AnimateView>

      <div className={styles.mainProjects}>
        {projects.slice(0, 3).map((p) => (
          <AnimateView key={p.id}>
            <div className={styles.card}>
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={`${p.title} Thumbnail`}
                  className={styles.thumbnail}
                  loading="lazy"
                />
              )}
              <div className={styles.box1}>
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

                <div className={styles.skillsMarquee}>
                  <ul className={styles.skillsStrip}>
                    {p.skillsUsed.concat(p.skillsUsed).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  try now
                </a>
              </div>
            </div>
          </AnimateView>
        ))}
      </div>
      <div className={styles.bottomGrid}>
        {projects.slice(3).map((p) => (
          <AnimateView key={p.id}>
            <div className={styles.gridCard}>
              <img src={p.logo} alt={p.title} className={styles.gridLogo} />
              <h3 className={styles.gridTitle}>{p.title}</h3>
              <p className={styles.gridAbout}>{p.about}</p>
              <ul className={styles.gridSkills}>
                {p.skillsUsed.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
              <a href={p.link} target="_blank" className={styles.gridLink}>
                try now
              </a>
            </div>
          </AnimateView>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
