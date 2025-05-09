import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Home.module.scss";
import { easeInOut, motion } from "framer-motion";
const imageModules = import.meta.glob("./pics/*.{jpg,jpeg,png}");

const Home = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const getRandomImage = async (): Promise<string> => {
    const paths = Object.keys(imageModules);
    const randomPath = paths[Math.floor(Math.random() * paths.length)];
    const image = (await imageModules[randomPath]()) as { default: string };
    return image.default;
  };

  const handleScroll = () => {
    if (backgroundRef.current) {
      const parallaxElement = document.querySelectorAll(".parallax");
      parallaxElement.forEach((el) => {
        const speed = (el as HTMLElement).dataset.speed;
        if (speed) {
          requestAnimationFrame(() => {
            (el as HTMLElement).style.transform = `translateY(${
              window.scrollY * parseFloat(speed)
            }px)`;
          });
        }
      });
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = `url(${await getRandomImage()})`;
      }
    };
    loadImage();

    const heroPage = document.getElementById("heroPage");
    if (heroPage) {
      const height = window.innerHeight * 0.01;
      heroPage.style.height = `${height * 100}px`;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={styles.hero} id="heroPage">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: easeInOut }}
        className={styles.brand}
      >
        <img loading="lazy" src="santosh.png" alt="Santosh thapa logo" />
        <strong>Santosh</strong>
      </motion.div>
      <header>
        <motion.h1
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: easeInOut }}
        >
          Hi, I'm <span>Santosh</span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: easeInOut }}
          aria-live="polite"
          role="status"
        >
          <Typewriter
            words={["santosh", "a developer"]}
            loop={true}
            cursor
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
            aria-live="polite"
          />
        </motion.h2>
      </header>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={styles.dialog}
      >
        Who Loves Bringing<span>Ideas</span>To Life
      </motion.p>

      <div className={styles.socialIconsContainer}>
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeInOut }}
      >
        <button className={styles.cta} onClick={() => scrollTo("projects")}>
          PROJECTS
        </button>
      </motion.div>
      <button
        onClick={() => scrollTo("about")}
        className={styles.scrollIconContainer}
      >
        <BsChevronDoubleDown className={styles.scrollIcon} />
      </button>
      <div
        ref={backgroundRef}
        className={`${styles.backgroundImage} parallax`}
        data-speed="0.4"
      />
      <div className={styles.overlayHeroPage} />
      <div className={styles.edgefade} />
    </main>
  );
};
export default Home;
