import { useEffect, useRef, memo } from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Home.module.scss";

const Home: React.FC = memo(() => {
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
    const loadImage = async () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = `url(${await getRandomImage()})`;
      }
    };

    loadImage();

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
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the element is not found, try to scroll to a specific position
      const position = parseInt(targetId, 10);
      if (!isNaN(position)) {
        window.scrollTo({ top: position, behavior: "smooth" });
      }
    }
  };

  const words = ["Santosh", "a Developer"];
  return (
    <main className={styles.hero}>
      <div className={styles.headingContainer}>
        <div className={styles.image} />
        <strong>Santosh</strong>
      </div>
      <h2 className={styles.mainText}>Hi, I'm</h2>
      <div className={styles.typing}>
        <Typewriter
          words={words}
          loop={true}
          cursor
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={2000}
          aria-live="polite"
        />
      </div>
      <div className={styles.dialog}>
        <p>
          Who Loves Bringing{" "}
          <span className={styles.headingHighlight}>Ideas</span> To Life
        </p>
      </div>
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
        data-speed="0.4"
      />
      <div className={styles.overlayHeroPage} />
      <div className={styles.edgefade} />
    </main>
  );
});
export default Home;
