import styles from "./about.module.scss";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaGithub,
  FaShoppingCart,
} from "react-icons/fa";
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
import { FaCode, FaCloud, FaRocket } from "react-icons/fa";
import { easeOut, motion } from "framer-motion";
import clsx from "clsx";
import { FaChartLine, FaRobot } from "react-icons/fa6";
import { TbPrompt } from "react-icons/tb";

const About = () => {
  const achievements = [
    {
      title: "AI-Powered Applications",
      description:
        "Engineered production-ready AI products using Next.js, OpenAI, and Python, including intelligent chatbots, image generation, voice conversations, and AI workflow automation.",
      icon: <FaRobot />,
    },
    {
      title: "Full-Stack Software Engineering",
      description:
        "Designed and built scalable web applications from frontend to backend using Next.js, React, Node.js, Python, MongoDB, and modern cloud infrastructure.",
      icon: <FaCode />,
    },
    {
      title: "Intelligent E-Commerce",
      description:
        "Developed high-performance e-commerce platforms with AI shopping assistants, personalized recommendations, secure payments, authentication, and optimized user experiences.",
      icon: <FaShoppingCart />,
    },
    {
      title: "Modern UI Engineering",
      description:
        "Transformed complex Figma designs into fast, responsive, accessible interfaces with reusable component systems and pixel-perfect implementation.",
      icon: <FaRocket />,
    },
    {
      title: "Performance & SEO",
      description:
        "Optimized Core Web Vitals, implemented SSR/SSG, metadata, structured data, and caching strategies to maximize speed, discoverability, and search rankings.",
      icon: <FaChartLine />,
    },
    {
      title: "Cloud Deployment & Security",
      description:
        "Deployed and maintained production applications on Vercel with CI/CD, secure authentication, JWT, NextAuth, role-based access control, and scalable architecture.",
      icon: <FaCloud />,
    },
  ];
  const projects = [
    {
      src: "https://kura-iota.vercel.app/kura.png",
      name: "KURA AI - ChatGPT Clone",
    },
    {
      src: "https://skill-blade-psi.vercel.app/skill-blade.png",
      name: "Skill blade",
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

  const skillCategories = [
    {
      title: "Frontend",
      description:
        "Building responsive and interactive AI-powered user experiences.",
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
          icon: <FaJs style={{ color: "#F7DF1E" }} />,
        },
        {
          name: "TypeScript",
          url: "https://www.typescriptlang.org/",
          icon: <SiTypescript style={{ color: "#3178C6" }} />,
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
      title: "Backend & AI",
      description: "Building APIs, databases, and intelligent AI integrations.",
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

        {
          name: "Prompt Engineering",
          url: "https://platform.openai.com/docs/guides/prompt-engineering",
          icon: <TbPrompt style={{ color: "#8B5CF6" }} />,
        },
      ],
    },

    {
      title: "Tools & Deployment",
      description: "Version control, deployment, and production workflows.",
      skills: [
        {
          name: "Git",
          url: "https://git-scm.com/",
          icon: <SiGit style={{ color: "#F05032" }} />,
        },
        {
          name: "GitHub",
          url: "https://github.com/",
          icon: <FaGithub style={{ color: "#24292E" }} />,
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
  const timelineData = [
    {
      title: "Bachelor of Computer Applications (BCA)",
      institution: "Netaji Subhas University, Jamshedpur",
      description:
        "Studied software development, programming fundamentals, databases, networking, and web technologies while building practical development skills.",
    },
    {
      title: "Advanced Diploma in Computer Applications (ADCA)",
      institution: "Jamshedpur",
      description:
        "Strengthened my foundation in programming, computer systems, office productivity tools, and software applications.",
    },
    {
      title: "Continuous Learning",
      institution: "",
      description:
        "Beyond academics, I've built 20+ personal projects using Next.js, React, Node.js, MongoDB, Python, and modern deployment workflows. I've also created AI-powered applications with OpenAI APIs, including chatbots, AI assistants, content generation tools, and workflow automation solutions. I enjoy turning new technologies into practical products and continuously exploring the latest advancements in AI and web development.",
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
            <motion.img
              src="/about/triangle.webp"
              alt="triangle bg"
              className={styles.triangle}
            />
            <motion.img
              src="/about/pfp-transparent.webp"
              alt="Profile Picture"
              className={styles.pfp}
              initial={{ scale: 0.8, y: 100 }}
              whileInView={{ scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOut }}
            />
          </div>
          <div className={styles.aboutCtn}>
            <h5>About Me</h5>
            <p>
              I love turning ambitious ideas into reliable, high-performance
              products built to scale.
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
      </motion.div>
      <div className={styles.educationSection}>
        <div className={styles.bg_pc}>
          <div className={styles.educationOverlay}>
            <div className={styles.bg_phone}>
              <motion.div
                className={styles.educationHeadingCtn}
                initial={{ scale: 0.8, y: 100 }}
                whileInView={{ scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOut }}
              >
                <span className={styles.sectionTag}>Education & Journey</span>
                <h2>Building products through learning and experience.</h2>
                <p className={styles.intro}>
                  My journey into software development combines formal education
                  with hands-on experience building real-world applications. I
                  enjoy learning modern technologies and turning ideas into
                  fast, scalable products.
                </p>
              </motion.div>
            </div>

            <motion.div className={styles.timeline}>
              {timelineData.map((item, index) => (
                <motion.div
                  initial={{ scale: 0.8, y: 100 }}
                  whileInView={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut }}
                  key={index}
                  className={styles.timelineItem}
                >
                  {index !== 0 && <div className={styles.dot}></div>}

                  <div>
                    <h4>{item.title}</h4>

                    {item.institution && <span>{item.institution}</span>}

                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
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
