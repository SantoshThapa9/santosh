import styles from "./about.module.scss";
import { FaReact, FaJs, FaNodeJs, FaGithub, FaAward } from "react-icons/fa";
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
      title: "UI/UX & Frontend Crafting",
      description: "Modern, responsive, and accessible by default.",
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
      description:
        "Streamlined full-stack development—efficient logic meets seamless scalability.",
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
      description:
        "Effortless delivery through streamlined workflows and smart automation.",
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
      title: "Full-Stack Development & Deployment",
      description:
        "Developed complete apps with REST APIs, AI features, and real-time updates, fully deployed to cloud.",
      icon: <FaCode />,
    },

    {
      title: "High Performance Optimization",
      description:
        "Consistently scored 98+ on Lighthouse for speed, accessibility, and best practices.",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Pixel-Perfect Clone",
      description:
        "Built a pixel-perfect ChatGPT clone. Confident in converting Figma designs to clean, responsive UI code.",
      icon: <FaRocket />,
    },
    {
      title: "SEO Excellence",
      description:
        "Successfully optimized multiple applications to achieve top rankings on Google search results.",
      icon: <FaAward />,
    },
    {
      title: "Cloud-Native Deployments",
      description:
        "Deployed scalable apps on GitHub, Vercel and AWS with custom domains.",
      icon: <FaCloud />,
    },
    {
      title: "Security & Authentication",
      description:
        "Implemented security measures like rate limiting, reCAPTCHA, and leveraged Next.js features to safeguard applications.",
      icon: <FaShieldAlt />,
    },
  ];

  return (
    <div id="about" className={clsx(styles.aboutSection)}>
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className={styles.introSection}
      >
        <div className={styles.header}>
          <h5>About Me</h5>
          <img loading="lazy" src="/logo180.png" alt="Profile Picture" />
          <p>
            Building Performant, Secure, AI-Powered Apps with Flawless UI,and
            cloud deployement
          </p>
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
          Technical Expertise
        </motion.h5>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          Technologies I work with to deliver exceptional results
        </motion.p>

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
