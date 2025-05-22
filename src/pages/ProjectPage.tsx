import styles from "./ProjectPage.module.scss";
import taskify from "/taskify.png";
import pfc from "/pfc.png";
import ttt from "/ttt.png";
import kura from "/kura.png";
import focusflow from "/focusflow.ico";
import softsell from "/softsell.ico";
import p1 from "/p1.jpg";
import p2 from "/p2.jpg";
import p3 from "/p3.jpg";

import AnimateView from "./animate/AnimateView";

interface Project {
  id: number;
  title: string;
  logo: string;
  thumbnail?: string;
  link: string;
  about: string;
  highlights?: string[];
  skillsUsed: string[];
}
const projects: Project[] = [
  {
    id: 1,
    title: "ChatGPT Clone Kura AI",
    logo: kura,
    thumbnail: p1,
    link: "https://kura-iota.vercel.app/",
    about:
      "KURA AI is an advanced ChatGPT alternative with real-time voice chat, unlimited AI image generation, and adaptive conversations.",
    highlights: [
      "Real-time voice interaction and unlimited AI image generation powered by Web Speech API and Stable Diffusion.",
      "Smart Markdown & code formatting",
      "Fully responsive with dark/light mode toggle",
    ],
    skillsUsed: ["Next.js", "Gemini API", "Web APIs", "Git"],
  },
  {
    id: 2,
    title: "SoftSell - Software reselling company",
    logo: softsell,
    thumbnail: p2,
    link: "https://soft-sell-two-lime.vercel.app/",
    about:
      "SoftSell is a sleek, responsive landing platform for software license reselling, featuring AI assistance and modern UI animations.",
    highlights: [
      "Integrated Gemini API to power an AI assistant that guides users through the selling process.",
      "Framer Motion animations for smooth, engaging transitions and a premium UI feel.",
      "Responsive layout with polished sections for benefits, testimonials, and CTAs.",
    ],
    skillsUsed: ["Next.js", "Framer Motion", "Gemini API", "Git"],
  },
  {
    id: 3,
    title: "Taskify - Task Management app",
    logo: taskify,
    thumbnail: p3,
    link: "https://taskifyapp-smoky.vercel.app/",
    about:
      "Taskify is a modern task management app built with Next.js and Firebase, designed for speed, clarity, and productivity.",
    highlights: [
      "Real-time sync with Firebase Firestore for instant updates and collaboration.",
      "Customizable grid/list views with persistent layout preferences using local storage.",
      "Inline task editing and bulk deletion with confirmation safeguards.",
      "Theme switching and responsive design for a fast, mobile-friendly user experience.",
    ],
    skillsUsed: ["Next.js", "Firebase", "REST API", "Git"],
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
    skillsUsed: ["TypeScript", "Tailwind", "Next.js", "Git"],
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
                {p.highlights && (
                  <ul className={styles.highlights}>
                    {p.highlights.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
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
                Visit
              </a>
            </div>
          </AnimateView>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ProjectPage;
