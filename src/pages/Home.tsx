import { useEffect, useState, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

import styles from "./Home.module.scss";
import SharedStyles from "../shared-style/Shared.module.scss";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  easeOut,
} from "framer-motion";
import Marquee from "react-fast-marquee";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Home = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["center 100%", "center 0%"],
  });

  const left: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 0, 100]
  );
  const bottom: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, 20]
  );

  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0]
  );

  const techIcons = [
    { src: "/hero/tailwind.webp", alt: "tailwind icon" },
    { src: "/hero/typescript.webp", alt: "typescript icon" },
    { src: "/hero/nextjs.webp", alt: "next.js icon" },
  ];
  const [showTalkOptions, setShowTalkOptions] = useState(false);

  const buttonGroupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTalkOptions &&
        buttonGroupRef.current &&
        !buttonGroupRef.current.contains(event.target as Node)
      ) {
        setShowTalkOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTalkOptions]);

  const projects = [
    {
      src: "/projects/kura.webp",
      name: "KURA AI - ChatGPT Clone",
    },
    { src: "/projects/taskify.webp", name: "Taskify - Task Management App" },
    { src: "/projects/ttt.webp", name: "Tic Tac Toe" },
    { src: "/projects/Geer.webp", name: "Geer - E-commerce" },
    { src: "/projects/SoftSell.webp", name: "SoftSell - Landing Page" },
    { src: "/projects/pfc.webp", name: "Pokemon Finding Calculator" },
    { src: "/projects/JobRinger.webp", name: "JobRinger - Job Portal" },
    { src: "/projects/FocusFlow.webp", name: "FocusFlow - Pomodoro Timer" },
  ];
  const socialLinks = [
    {
      href: "https://instagram.com/santoshh689",
      label: "Instagram",
      color: "#E4405F",
      icon: <FaInstagram size={28} />,
    },
    {
      href: "https://www.linkedin.com/in/santosh986/",
      label: "LinkedIn",
      color: "#0A66C2",
      icon: <FaLinkedin size={28} />,
    },
    {
      href: "https://github.com/SantoshThapa9",
      label: "GitHub",
      color: "#333",
      icon: <FaGithub size={28} />,
    },
    {
      href: "https://x.com/SantoshThapa689",
      label: "X (formerly Twitter)",
      color: "#000",
      icon: <FaXTwitter size={28} />,
    },
  ];

  return (
    <div className={styles.hero} ref={heroRef} id="home">
      <div className={styles.heroSection}>
        <h4>
          Hi, I'm <span>Santosh</span>
        </h4>
        <h5>
          <span aria-live="polite" aria-atomic="true">
            <Typewriter
              words={[
                "Software Engineer </>",
                "Web Developer </>",
                "UI/UX Engineer </>",
              ]}
              loop={0}
              cursor
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>

          <span className={SharedStyles.srOnly}>Software Engineer</span>
        </h5>
        <p className={styles.heroDescription}>
          who loves bringing <span>ideas</span> to life through code and design.
        </p>
        {!showTalkOptions ? (
          <div className={styles.buttonGroup}>
            <a className={SharedStyles.btn} href="#projects">
              Projects
            </a>
            <button
              className={SharedStyles.btn}
              onClick={() => {
                setShowTalkOptions(true);
              }}
            >
              Let's Talk
            </button>
          </div>
        ) : (
          <motion.div className={styles.talkOptions} ref={buttonGroupRef}>
            {["Message Me", "Talk to Kura AI"].map((label, i) => (
              <motion.a
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3, ease: easeOut }}
                custom={i}
                className={SharedStyles.btn}
                href={
                  label === "Message Me"
                    ? "#contact"
                    : "https://kura-iota.vercel.app/"
                }
                target={label === "Message Me" ? "_self" : "_blank"}
                rel="noopener noreferrer"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
        <div className={styles.socialIcons}>
          {socialLinks.map(({ href, label, color, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ color }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
      <motion.div
        className={styles.floatingContent}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 3, ease: easeOut }}
        style={{
          x: left,
          y: bottom,
          opacity: opacity,
        }}
      >
        {techIcons.map((icon, index) => (
          <div key={index} className={styles.icons}>
            <img
              loading="lazy"
              className={styles.icon}
              src={icon.src}
              alt={icon.alt}
            />
          </div>
        ))}

        <div className={styles.shipContainer}>
          <div className={`${styles.cloud} ${styles.cloud1}`} />
          <div className={`${styles.cloud} ${styles.cloud2}`}></div>
          <div className={`${styles.cloud} ${styles.cloud3}`} />
          <img
            loading="lazy"
            className={styles.ship}
            src="/hero/ship.webp"
            alt="Ship floating in sea"
          />
        </div>
      </motion.div>

      <div className={styles.waveCtn}>
        <svg
          fill="rgba(21, 146, 204, 0.75)"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,160 C180,200 360,120 540,160 C720,200 900,120 1080,160 C1260,200 1440,120 1440,120 L1440,320 L0,320 Z" />
        </svg>

        <svg
          fill="rgba(51, 167, 221, 0.8)"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,170 C300,210 600,100 900,170 C1200,240 1440,180 1440,180 L1440,320 L0,320 Z" />
        </svg>

        <svg
          fill="rgba(77, 162, 231, 0.76)"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,150 C240,160 480,200 720,150 C960,100 1200,180 1440,160 L1440,320 L0,320 Z" />
        </svg>
      </div>

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
    </div>
  );
};
export default Home;
