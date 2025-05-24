import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Home.module.scss";
import {
  easeInOut,
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

const Home = () => {
  useEffect(() => {
    const heroPage = document.getElementById("home");
    if (heroPage) {
      const height = window.innerHeight * 0.01;
      heroPage.style.height = `${height * 100}px`;
    }
  }, []);

  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["center 100%", "center 0%"],
  });

  const left: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -200]
  );
  const bottom: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, 30]
  );

  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0]
  );

  return (
    <div className={styles.hero} ref={heroRef} id="home">
      <div className={styles.mainTxtCtn}>
        <motion.p
          style={{
            opacity: opacity,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: easeInOut }}
        >
          Hi, I'm <strong>Santosh</strong>
        </motion.p>
        <motion.div
          style={{
            opacity: opacity,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: easeInOut }}
          aria-live="polite"
          role="status"
        >
          <Typewriter
            words={["santosh.", "a developer </>"]}
            loop={true}
            cursor
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
            aria-live="polite"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: easeInOut }}
          className={styles.dialogue}
          style={{
            opacity: opacity,
          }}
        >
          Who Loves Bringing <span>Ideas</span> To Life
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeInOut }}
          style={{
            opacity: opacity,
          }}
        >
          <button className={styles.cta} onClick={() => scrollTo("projects")}>
            PROJECTS
          </button>
        </motion.div>
      </div>

      <div className={styles.socialIconsContainer}>
        <motion.div
          style={{
            x: left,
            y: bottom,
            opacity: opacity,
          }}
        >
          <a
            href="https://x.com/SantoshThapa689"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on X"
          >
            <FaXTwitter
              className={`${styles.icon} ${styles.icon1}`}
              style={{ backgroundColor: "#222" }}
            />
          </a>
        </motion.div>
        <motion.div
          style={{
            x: left,
            y: bottom,
            opacity: opacity,
          }}
        >
          <a
            href="https://instagram.com/santoshh689"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Instagram"
          >
            <FaInstagram
              className={`${styles.icon} ${styles.icon2}`}
              style={{ backgroundColor: "#E1306C" }}
            />
          </a>
        </motion.div>
        <motion.div
          style={{
            x: left,
            y: bottom,
            opacity: opacity,
          }}
        >
          <a
            href="https://github.com/SantoshThapa9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Github"
          >
            <FaGithub
              className={`${styles.icon} ${styles.icon3}`}
              style={{ backgroundColor: "#333" }}
            />
          </a>
        </motion.div>
        <motion.div
          style={{
            x: left,
            opacity: opacity,
          }}
        >
          <a
            href="https://in.linkedin.com/in/santosh986?trk=profile-badge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Linkedin"
          >
            <FaLinkedin
              className={`${styles.icon} ${styles.icon4}`}
              style={{ backgroundColor: "#0077B5" }}
            />
          </a>
        </motion.div>
      </div>
      <button
        onClick={() => scrollTo("about")}
        className={styles.scrollIconContainer}
      >
        <BsChevronDoubleDown className={styles.scrollIcon} />
      </button>

      <div className={styles.waveCtn}>
        <svg
          className={styles.wave1}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="
            M0,160
            C180,200 360,120 540,160
            C720,200 900,120 1080,160
            C1260,200 1440,120 1440,120
            L1440,320 L0,320 Z
          "
          />
        </svg>

        <svg
          className={styles.wave2}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,170 
             C300,210 600,100 900,170 
             C1200,240 1440,180 1440,180 
             L1440,320 L0,320 Z"
          />
        </svg>

        <svg
          className={styles.wave3}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,150 
             C240,160 480,200 720,150 
             C960,100 1200,180 1440,160 
             L1440,320 L0,320 Z"
          />
        </svg>
      </div>
      <div className={styles.edgefade} />
    </div>
  );
};
export default Home;
