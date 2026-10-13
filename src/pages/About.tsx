import styles from "./about.module.scss";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaGithub,
  FaUniversity,
  FaBriefcase,
  FaRobot,
  FaTrophy,
} from "react-icons/fa";
import { FaCss3Alt, FaDocker, FaHtml5 } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
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
  SiSass,
  SiGooglegemini,
  SiZod,
  SiPostman,
  SiOpenapiinitiative,
  SiOpenaigym,
  SiUpstash,
  SiRedux,
  SiSocketdotio,
  SiOllama,
  SiRazorpay,
  SiPrettier,
  SiRender,
} from "react-icons/si";
import { TbPrompt, TbTools } from "react-icons/tb";

const About = () => {
  const reduceMotion = useReducedMotion();
  const revealFromLeft = reduceMotion ? false : { opacity: 0, x: -56 };
  const revealInView = { opacity: 1, x: 0 };
  const scrollViewport = {
    once: false,
    amount: 0.25,
    margin: "0px 0px -18% 0px",
  };
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
      name: "Sass",
      url: "https://sass-lang.com/",
      icon: <SiSass />,
      color: "#CC6699",
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
    {
      name: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: <FaHtml5 />,
      color: "#E34F26",
    },
    {
      name: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: <FaCss3Alt />,
      color: "#1572B6",
    },
    {
      name: "OpenAI API",
      url: "https://platform.openai.com/docs/overview",
      icon: <SiOpenaigym />,
      color: "#f1f4f5",
    },
    {
      name: "Upstash Redis",
      url: "https://upstash.com/",
      icon: <SiUpstash />,
      color: "#00E9A3",
    },
    {
      name: "AI Tool Calling",
      url: "https://platform.openai.com/docs/guides/function-calling",
      icon: <TbTools />,
      color: "#A78BFA",
    },
    {
      name: "REST APIs",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      icon: <SiOpenapiinitiative />,
      color: "#6BA539",
    },
    {
      name: "Postman",
      url: "https://www.postman.com/",
      icon: <SiPostman />,
      color: "#FF6C37",
    },
    {
      name: "Zod",
      url: "https://zod.dev/",
      icon: <SiZod />,
      color: "#3E63DD",
    },
    {
      name: "Docker",
      url: "https://www.docker.com/",
      icon: <FaDocker />,
      color: "#2496ED",
    },
    {
      name: "Google Gemini API",
      url: "https://ai.google.dev/gemini-api/docs",
      icon: <SiGooglegemini />,
      color: "#8E75B2",
    },

    {
      name: "Redux Toolkit",
      url: "https://redux-toolkit.js.org/",
      icon: <SiRedux />,
      color: "#764ABC",
    },
    {
      name: "WebSockets",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      icon: <SiSocketdotio />,
      color: "#f1f4f5",
    },
    {
      name: "Vercel AI SDK",
      url: "https://ai-sdk.dev/",
      icon: <SiVercel />,
      color: "#f1f4f5",
    },
    {
      name: "Ollama",
      url: "https://ollama.com/",
      icon: <SiOllama />,
      color: "#f1f4f5",
    },

    {
      name: "Razorpay",
      url: "https://razorpay.com/",
      icon: <SiRazorpay />,
      color: "#3395FF",
    },

    {
      name: "Prettier",
      url: "https://prettier.io/",
      icon: <SiPrettier />,
      color: "#F7B93E",
    },
    {
      name: "Render",
      url: "https://render.com/",
      icon: <SiRender />,
      color: "#46E3B7",
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
          <motion.div
            className={styles.pfpCtn}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              className={styles.pfp}
              alt="Portrait of Santosh Thapa"
              src="/pfp-hd.webp"
            />
          </motion.div>
          <div className={styles.aboutCtn}>
            <motion.h2
              id="about-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={revealFromLeft}
              whileInView={revealInView}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              I’m Santosh, a developer from Jamshedpur who enjoys turning ideas
              into useful web products. My work spans thoughtful interfaces,
              full-stack builds, and experiments shaped by real users.
            </motion.p>
          </div>
        </div>
      </div>
      <div className={styles.storySection}>
        <motion.section
          className={styles.educationSection}
          aria-labelledby="education-title"
          initial={revealFromLeft}
          whileInView={revealInView}
          viewport={scrollViewport}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.educationIcon} aria-hidden="true">
            <FaUniversity />
          </div>
          <div className={styles.educationCopy}>
            <span className={styles.sectionEyebrow}>Education</span>
            <h3 id="education-title">Bachelor of Computer Applications</h3>
            <p>Netaji Subhas University</p>
          </div>
          <span className={styles.degreeMark} aria-hidden="true">
            BCA
          </span>
        </motion.section>

        <motion.section
          className={styles.experienceSection}
          aria-labelledby="experience-title"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.sectionIntro}>
            <span className={styles.sectionEyebrow}>Hands-on experience</span>
            <h3 id="experience-title">Internship work</h3>
          </div>
          <div className={styles.experienceDetails}>
            <div className={styles.experienceIcon} aria-hidden="true">
              <FaBriefcase />
            </div>
            <p>
              Worked across different briefs, turning business needs into
              responsive, production-ready web experiences.
            </p>
            <ul className={styles.internshipProjects}>
              <li>
                <a
                  href="https://geer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Geer <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://soft-sell-two-lime.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SoftSell <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://gupta-investment-zone.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gupta Investment Zone <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#/projects/others"
                  rel="noopener noreferrer"
                  target="_self"
                >
                  more <FiArrowUpRight aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </motion.section>

        <section
          className={styles.projectsSection}
          aria-labelledby="about-projects-title"
        >
          <div className={styles.sectionIntro}>
            <span className={styles.sectionEyebrow}>Selected builds</span>
            <h3 id="about-projects-title">Projects with a story.</h3>
          </div>
          <div className={styles.projectStories}>
            <motion.article
              className={`${styles.projectStory} ${styles.skillBladeStory}`}
              initial={reduceMotion ? false : { opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.projectSymbol} aria-hidden="true">
                <FaUniversity />
              </div>
              <div>
                <span className={styles.projectContext}>
                  College final project · Full-stack lead
                </span>
                <h4>Skill Blade</h4>
                <p>
                  Led the team through the full build, shaping the product from
                  its interface to the backend.
                </p>
              </div>
            </motion.article>
            <motion.article
              className={`${styles.projectStory} ${styles.kuraStory}`}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.projectSymbol} aria-hidden="true">
                <FaRobot />
              </div>
              <div>
                <span className={styles.projectContext}>
                  Inspired by ChatGPT
                </span>
                <h4>Kura AI</h4>
                <p>
                  My own AI assistant, bringing chat, voice interaction, and
                  image generation into one product.
                </p>
              </div>
            </motion.article>
            <motion.article
              className={`${styles.projectStory} ${styles.ninzoStory}`}
              initial={reduceMotion ? false : { opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.projectSymbol} aria-hidden="true">
                <FaTrophy />
              </div>
              <div>
                <span className={styles.projectContext}>50+ active users</span>
                <h4>Ninzo Versus</h4>
                <p>
                  A tournament app helping players showcase competitions to a
                  global audience.
                </p>
              </div>
            </motion.article>
          </div>
        </section>
      </div>
      <div className={styles.workSection}>
        <div className={styles.skillsHeading}>
          <span>My Toolkit</span>
          <h3>Tools & Technologies</h3>
        </div>
        <ul className={styles.skillList} aria-label="Technologies I work with">
          {skills.map((skill) => (
            <motion.li
              key={skill.name}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{
                duration: reduceMotion ? 0 : 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
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
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
