import styles from "./about.module.scss";
import { FaReact, FaJs, FaNodeJs, FaGithub, FaAward } from "react-icons/fa";
import Marquee from "react-fast-marquee";
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
      title: "Frontend",
      description: "Responsive, accessible interfaces with modern React.",
      skills: [
        {
          name: "React",
          url: "https://react.dev/",
          icon: <FaReact style={{ color: "#61DBFB" }} />,
        },
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
          name: "Tailwind CSS",
          url: "https://tailwindcss.com/",
          icon: <SiTailwindcss style={{ color: "#06B6D4" }} />,
        },
        {
          name: "Framer Motion",
          url: "https://www.framer.com/motion/",
          icon: <SiFramer style={{ color: "#0055FF" }} />,
        },
      ],
    },
    {
      title: "Backend",
      description: "APIs and server-side logic for real applications.",
      skills: [
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
          name: "Supabase",
          url: "https://supabase.com/",
          icon: <SiSupabase style={{ color: "#3ECF8E" }} />,
        },
        {
          name: "Python",
          url: "https://www.python.org/",
          icon: <SiPython style={{ color: "#3776AB" }} />,
        },
      ],
    },
    {
      title: "Tools & Deployment",
      description: "Version control and production deployment.",
      skills: [
        {
          name: "Git",
          url: "https://git-scm.com/",
          icon: <SiGit style={{ color: "#F05032" }} />,
        },
        {
          name: "GitHub",
          url: "https://github.com/",
          icon: <FaGithub style={{ color: "#24292e" }} />,
        },
        {
          name: "Webpack",
          url: "https://webpack.js.org/",
          icon: <SiWebpack style={{ color: "#8DD6F9" }} />,
        },
        {
          name: "Vercel",
          url: "https://vercel.com/",
          icon: <SiVercel style={{ color: "#000000" }} />,
        },
      ],
    },
  ];
  const achievements = [
    {
      title: "Full-Stack Development",
      description:
        "Built production apps using Next.js and Python, including Kura AI and Geer.",
      icon: <FaCode />,
    },
    {
      title: "Performance Focus",
      description:
        "Reduced load times and improved responsiveness across complex flows, including e-commerce.",
      icon: <FaTachometerAlt />,
    },
    {
      title: "UI Implementation",
      description:
        "Converted Figma designs into responsive, accessible interfaces with consistent design systems.",
      icon: <FaRocket />,
    },
    {
      title: "SEO Optimization",
      description:
        "Applied SSR, metadata, and structured content to improve visibility and indexing.",
      icon: <FaAward />,
    },
    {
      title: "Deployment & Infra",
      description:
        "Deployed and maintained apps on Vercel with custom domains and CI-ready setups.",
      icon: <FaCloud />,
    },
    {
      title: "Authentication & Security",
      description:
        "Implemented secure auth flows using NextAuth and JWT with role-based access control.",
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
      <Marquee speed={30} className={styles.marqueeContainer}>
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
          <div className={styles.pfpCtn}>
            <div className={styles.triangle} />
            <img src="/about/pfp.png" alt="Profile Picture" />
          </div>
          <div className={styles.aboutCtn}>
            <h5>About Me</h5>
            <p>
              I build full-stack web apps using Next.js, Node.js, and modern
              tooling
            </p>
          </div>
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
        <a
          href="#contact"
          style={{ fontSize: "small" }}
          className={Shared.btn2}
        >
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
