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
const About = () => {
  const skillCategories = [
    {
      title: "UI/UX & Design",
      description:
        "Crafting clean, accessible, responsive UIs with Figma and modern CSS frameworks.",
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
      ],
    },
    {
      title: "Full-Stack Development",
      description:
        "Building fast, scalable apps with React, TypeScript, and modern backend tools.",
      skills: [
        {
          name: "React",
          url: "https://reactjs.org/",
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
      description: "CI/CD, custom domains, and app hosting on Vercel and AWS.",
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
          name: "Webpack",
          url: "https://webpack.js.org/",
          icon: <SiWebpack style={{ color: "#8DD6F9" }} />,
        },
      ],
    },
  ];

  const achievements = [
    {
      title: "Pixel-Perfect Clone",
      description:
        "Developed ChatGPT Clone with Next.js, GenAI, image generation, and Azure voice chat.",
      icon: <FaRocket />,
    },
    {
      title: "End-to-End Full-Stack Apps",
      description:
        "Built full-stack applications with REST APIs, AI integrations, and real-time updates.",
      icon: <FaCode />,
    },
    {
      title: "High Performance",
      description:
        "Achieved 95+ Lighthouse scores across all projects for optimal load and runtime.",
      icon: <FaTachometerAlt />,
    },
    {
      title: "SEO Excellence",
      description:
        "Optimized portfolio and Kura AI to rank top on Google search results.",
      icon: <FaAward />,
    },
    {
      title: "Cloud-Native Deployments",
      description:
        "Deployed scalable apps on Vercel, AWS, and Firebase with custom domains.",
      icon: <FaCloud />,
    },
    {
      title: "Security & Authentication",
      description:
        "Implemented robust authentication, authorization, and secure coding practices throughout.",
      icon: <FaShieldAlt />,
    },
  ];

  return (
    <div id="about" className={clsx(styles.aboutSection)}>
      <div className={styles.introSection}>
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className={styles.header}
        >
          <h5>About Me</h5>
          <img
            loading="lazy"
            src="/logo180.png"
            alt="Profile Picture"
            width={100}
            height={100}
          />
          <p>
            Full Stack Developer creating fast, secure AI-powered apps with
            pixel-perfect UI and cloud deployment.
          </p>
        </motion.div>
        <div className={styles.achievements}>
          {achievements.map((achievement, index) => (
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
              key={index}
              className={styles.achievementItem}
            >
              <div className={styles.achievementIcon}>
                <span>{achievement.icon}</span>
                <span>{achievement.title}</span>
              </div>
              <span className={styles.desc}>{achievement.description}</span>
            </motion.div>
          ))}
        </div>

        <a href="#contact" className={styles.ctaButton}>
          Let's Work Together
          <FiExternalLink />
        </a>
      </div>

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
              initial={{ opacity: 0, x: idx % 2 === 0 ? -300 : 300 }}
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
