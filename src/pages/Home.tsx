import React, { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import "../global.css";
import styles from "./Home.module.scss";

const Home: React.FC = React.memo(() => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [0.3, 0]);

  const getRandomImage = async (): Promise<string> => {
    const images = await Promise.all(
      Object.values(import.meta.glob("./pics/*.{jpg,jpeg,png}")).map(
        (importImage) => importImage() as Promise<{ default: string }>
      )
    );
    return images[Math.floor(Math.random() * images.length)].default;
  };

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".parallax").forEach((el) => {
        const speed = (el as HTMLElement).dataset.speed;
        if (speed) {
          (el as HTMLElement).style.transform = `translateY(${
            window.scrollY * parseFloat(speed)
          }px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && backgroundRef.current) {
          backgroundRef.current.style.backgroundImage = `url(${await getRandomImage()})`;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (backgroundRef.current) observer.observe(backgroundRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (targetId: string) => {
    const element =
      targetId === "about"
        ? window.innerHeight
        : document.getElementById(targetId);
    if (element) {
      if (typeof element === "number") {
        window.scrollTo({ top: element, behavior: "smooth" });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.headingContainer}>
        <div className={styles.image} />
        <strong>Santosh</strong>
      </div>

      <h2 className={styles.mainText}>Hey, I'm</h2>
      <div className={styles.typing}>
        {" "}
        <Typewriter
          words={["Santosh.", "a Developer."]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </div>
      <div className={styles.dialog}>
        <p>
          who Loves bringing{" "}
          <span className={styles.headingHighlight}>Ideas</span> to Life
        </p>
      </div>

      <div className={styles.socialIconsContainer}>
        <a
          href="https://x.com/SantoshThapa689"
          target="_blank"
          rel="noopener noreferrer"
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
        >
          <FaGithub
            className={`${styles.icon} ${styles.icon3}`}
            style={{ backgroundColor: "#333" }}
          />
        </a>
        <a
          href="https://linkedin.com/in/santosh986"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            className={`${styles.icon} ${styles.icon4}`}
            style={{ backgroundColor: "#0077B5" }}
          />
        </a>
      </div>

      <button onClick={() => scrollTo("projects")} className={styles.cta}>
        PROJECTS
      </button>

      <motion.div
        onClick={() => scrollTo("about")}
        className={styles.scrollIconContainer}
        style={{ opacity }}
      >
        <BsChevronDoubleDown className={styles.scrollIcon} />
      </motion.div>
      <div
        ref={backgroundRef}
        className={`${styles.backgroundImage} parallax`}
        data-speed="0.3"
      />
      <div className={styles.overlayHeroPage} />
      <div className={styles.edgefade} />
    </div>
  );
});
export default Home;
