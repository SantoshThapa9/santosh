import styles from "./about.module.scss";
import { FaReact, FaJs, FaNodeJs, FaGithub, FaAward } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import {
  SiFigma,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFramer,
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiExpress,
  SiMongodb,
  SiGit,
  SiVercel,
  SiAmazon,
  SiWebpack,
  SiBootstrap,
  SiMui,
  SiSass,
  SiPython,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import {
  FaCode,
  FaCloud,
  FaShieldAlt,
  FaTachometerAlt,
  FaRocket,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { easeOut, motion } from "framer-motion";
import clsx from "clsx";
import Shared from "../shared-style/Shared.module.scss";

const About = () => {
  const skillCategories = [
    {
      title: "UI/UX & Frontend",
      description: "Clean, responsive, and accessible interfaces.",
      skills: [
        {
          name: "Figma",
          url: "https://www.figma.com/",
          icon: <SiFigma style={{ color: "#F24E1E" }} />,
        },
        {
          name: "HTML5",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          icon: <SiHtml5 style={{ color: "#E34F26" }} />,
        },
        {
          name: "CSS3",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          icon: <SiCss3 style={{ color: "#1572B6" }} />,
        },
        {
          name: "Tailwind CSS",
          url: "https://tailwindcss.com/",
          icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
        },
        {
          name: "Framer Motion",
          url: "https://www.framer.com/motion/",
          icon: <SiFramer style={{ color: "#0055FF" }} />,
        },
        {
          name: "Bootstrap",
          url: "https://getbootstrap.com/",
          icon: <SiBootstrap style={{ color: "#7952B3" }} />,
        },
        {
          name: "Material UI",
          url: "https://mui.com/",
          icon: <SiMui style={{ color: "#007FFF" }} />,
        },
        {
          name: "Sass",
          url: "https://sass-lang.com/",
          icon: <SiSass style={{ color: "#cd6799" }} />,
        },
        {
          name: "React",
          url: "https://reactjs.org/",
          icon: <FaReact style={{ color: "#61DBFB" }} />,
        },
      ],
    },
    {
      title: "Full-Stack Development",
      description: "Build scalable, maintainable applications.",
      skills: [
        {
          name: "Next.js",
          url: "https://nextjs.org/",
          icon: <SiNextdotjs style={{ color: "#000000" }} />,
        },
        {
          name: "JavaScript",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          icon: <FaJs style={{ color: "#f0db4f" }} />,
        },
        {
          name: "TypeScript",
          url: "https://www.typescriptlang.org/",
          icon: <SiTypescript style={{ color: "#007acc" }} />,
        },
        {
          name: "Python",
          url: "https://www.python.org/",
          icon: <SiPython style={{ color: "#3776AB" }} />,
        },
        {
          name: "Node.js",
          url: "https://nodejs.org/",
          icon: <FaNodeJs style={{ color: "#68A063" }} />,
        },
        {
          name: "Express.js",
          url: "https://expressjs.com/",
          icon: <SiExpress style={{ color: "#000000" }} />,
        },
        {
          name: "MongoDB",
          url: "https://www.mongodb.com/",
          icon: <SiMongodb style={{ color: "#47A248" }} />,
        },
        {
          name: "Firebase",
          url: "https://firebase.google.com/",
          icon: <SiFirebase style={{ color: "#FFCA28" }} />,
        },
      ],
    },
    {
      title: "Deployment & DevOps",
      description: "Deploy fast, manage efficiently.",
      skills: [
        {
          name: "GitHub",
          url: "https://github.com/",
          icon: <FaGithub style={{ color: "#24292e" }} />,
        },
        {
          name: "Git",
          url: "https://git-scm.com/",
          icon: <SiGit style={{ color: "#F05032" }} />,
        },
        {
          name: "Vercel",
          url: "https://vercel.com/",
          icon: <SiVercel style={{ color: "#000000" }} />,
        },
        {
          name: "AWS",
          url: "https://aws.amazon.com/",
          icon: <SiAmazon style={{ color: "#FF9900" }} />,
        },
        {
          name: "Azure",
          url: "https://azure.microsoft.com/",
          icon: <VscAzure style={{ color: "#0078D4" }} />,
        },
        {
          name: "Webpack",
          url: "https://webpack.js.org/",
          icon: <SiWebpack style={{ color: "#8DD6F9" }} />,
        },
      ],
    },
  ];

  const achievements = [
    {
      title: "Full-Stack Dev",
      description:
        "Built full-stack apps with Next.js and Python, powering projects like Kura AI and Geer.",
      icon: <FaCode />,
    },
    {
      title: "Fast & Efficient",
      description:
        "Optimized sites for blazing speed, accessibility, and buttery-smooth interactions, ensuring performance even in complex apps like Geer’s e-commerce platform.",
      icon: <FaTachometerAlt />,
    },
    {
      title: "UI/UX Precision",
      description:
        "Turned Figma designs into pixel-perfect, responsive interfaces.",
      icon: <FaRocket />,
    },
    {
      title: "SEO Ready",
      description:
        "Implemented SEO best practices so apps like Kura AI and Portfolio are easily discoverable, rank higher, and load quickly for visitors across devices.",
      icon: <FaAward />,
    },
    {
      title: "Cloud Deployments",
      description:
        "Deployed and managed apps on Vercel and other cloud platforms, connected custom domains, and ensured production readiness.",
      icon: <FaCloud />,
    },
    {
      title: "Secure Apps",
      description:
        "Implemented authentication (NextAuth, JWTs) and security measures to protect user data and admin dashboards, critical for platforms like Geer.",
      icon: <FaShieldAlt />,
    },
  ];
  const projects = [
    {
      src: "https://kura-iota.vercel.app/kura.png",
      name: "KURA AI - ChatGPT Clone",
    },
    {
      src: "https://taskifyapp-smoky.vercel.app/taskify.png",
      name: "Taskify - Task Management App",
    },
    {
      src: "https://tic-tac-toe-ruddy-ten-15.vercel.app/favicon.ico",
      name: "Tic Tac Toe",
    },
    {
      src: "https://geer.vercel.app/logo.png",
      name: "Geer - E-commerce",
    },
    {
      src: "https://soft-sell-two-lime.vercel.app/favicon.ico",
      name: "SoftSell - Landing Page",
    },
    {
      src: "https://pfc-app-mauve.vercel.app/icon.png",
      name: "Pokemon Finding Calculator",
    },

    {
      src: "https://focus-flow-productivity-timer.vercel.app/favicon.ico",
      name: "FocusFlow - Pomodoro Timer",
    },
    {
      src: "https://gupta-investment-zone.vercel.app/logo.png",
      name: "Gupta Investment Zone",
    },
  ];
  return (
    <div id="about" className={clsx(styles.aboutSection)}>
      <Marquee speed={20} className={styles.marqueeContainer}>
        {projects.map((icon, index) => (
          <div key={index} className={styles.marqueeItem}>
            <img
              loading="lazy"
              className={styles.icon}
              src={icon.src}
              alt={icon.name}
            />
            <span>{icon.name}</span>
          </div>
        ))}
      </Marquee>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className={styles.introSection}
      >
        <div className={styles.header}>
          <h5>About Me</h5>
          <p>Always learning, always making, always evolving.</p>
        </div>
        <div className={styles.achievements}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementItem}>
              <div className={styles.achievementIcon}>
                <span>{achievement.icon}</span>
                <span>{achievement.title}</span>
              </div>
              <span className={styles.desc}>{achievement.description}</span>
            </div>
          ))}
        </div>
        <a href="#contact" style={{ fontSize: "small" }} className={Shared.btn}>
          Let's Work Together
          <FiExternalLink />
        </a>
      </motion.div>
      <div className={styles.workSection}>
        <motion.h5
          className={styles.sectionTitle}
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          What I'm Working With
        </motion.h5>

        <div className={styles.skillGrid}>
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className={`${styles.skillCard} ${
                idx % 2 === 0 ? styles.leftCard : styles.rightCard
              }`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className={styles.cardHeader}>
                <h5>{category.title}</h5>
                <p>{category.description}</p>
              </div>
              <div className={styles.skillIcons}>
                {category.skills.map((skill, skillIdx) => (
                  <a
                    key={skillIdx}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.skillIcon}
                  >
                    <div className={styles.iconWrapper}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
