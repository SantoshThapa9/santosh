import styles from "./about.module.scss";
import { FaReact, FaJs, FaNodeJs, FaGithub } from "react-icons/fa";
import {
  SiTailwindcss,
  SiFramer,
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiGit,
  SiVercel,
  SiWebpack,
  SiSupabase,
  SiPython,
} from "react-icons/si";
import { TbPrompt } from "react-icons/tb";

const About = () => {
  const skills = [
    {
      name: "React",
      url: "https://react.dev/",
      icon: <FaReact />,
      color: "#61DBFB",
    },
    {
      name: "Next.js",
      url: "https://nextjs.org/",
      icon: <SiNextdotjs />,
      color: "#f1f4f5",
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: <FaJs />,
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      icon: <SiTypescript />,
      color: "#3178C6",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      icon: <SiTailwindcss />,
      color: "#06B6D4",
    },
    {
      name: "Framer Motion",
      url: "https://www.framer.com/motion/",
      icon: <SiFramer />,
      color: "#8B7CFF",
    },
    {
      name: "Node.js",
      url: "https://nodejs.org/",
      icon: <FaNodeJs />,
      color: "#68A063",
    },
    {
      name: "Express.js",
      url: "https://expressjs.com/",
      icon: <SiExpress />,
      color: "#f1f4f5",
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      icon: <SiMongodb />,
      color: "#47A248",
    },
    {
      name: "Supabase",
      url: "https://supabase.com/",
      icon: <SiSupabase />,
      color: "#3ECF8E",
    },
    {
      name: "Python",
      url: "https://www.python.org/",
      icon: <SiPython />,
      color: "#3776AB",
    },
    {
      name: "Prompt Engineering",
      url: "https://platform.openai.com/docs/guides/prompt-engineering",
      icon: <TbPrompt />,
      color: "#A78BFA",
    },
    {
      name: "Git",
      url: "https://git-scm.com/",
      icon: <SiGit />,
      color: "#F05032",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: <FaGithub />,
      color: "#f1f4f5",
    },
    {
      name: "Webpack",
      url: "https://webpack.js.org/",
      icon: <SiWebpack />,
      color: "#8DD6F9",
    },
    {
      name: "Vercel",
      url: "https://vercel.com/",
      icon: <SiVercel />,
      color: "#f1f4f5",
    },
  ];

  return (
    <section
      id="about"
      className={styles.aboutSection}
      aria-labelledby="about-title"
    >
      <div className={styles.introSection}>
        <div className={styles.header}>
          <div className={styles.pfpCtn}>
            <img
              src="/about/triangle.webp"
              alt=""
              className={styles.triangle}
            />
            <img
              src="/about/pfp-transparent.webp"
              alt="Portrait of Santosh Thapa"
              className={styles.pfp}
            />
          </div>
          <div className={styles.aboutCtn}>
            <h2 id="about-title">About Me</h2>
            <p>
              I’m a software engineer and frontend developer based in
              Jamshedpur, Jharkhand, India. I build thoughtful web experiences
              from interface to APIs, data, testing, and deployment. I hold a
              BCA from Netaji Subhas University and an ADCA in Computer
              Applications, and bring that foundation to practical, user-focused
              software.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.workSection}>
        <div className={styles.skillsHeading}>
          <span>My Toolkit</span>
          <h3>Tools & Technologies</h3>
        </div>
        <ul className={styles.skillList} aria-label="Technologies I work with">
          {skills.map((skill) => (
            <li key={skill.name}>
              <a
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.skill}
              >
                <span
                  className={styles.skillIcon}
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </span>
                <span>{skill.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
