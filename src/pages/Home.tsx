import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./Home.module.scss";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Home = () => {
  const [showTalkOptions, setShowTalkOptions] = useState(false);
  const reduceMotion = useReducedMotion();

  const buttonGroupRef = useRef<HTMLDivElement | null>(null);
  const talkTriggerRef = useRef<HTMLButtonElement | null>(null);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showTalkOptions) {
        setShowTalkOptions(false);
        talkTriggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTalkOptions]);

  const socialLinks = [
    {
      href: "https://instagram.com/santoshh689",
      label: "Instagram",
      icon: <FaInstagram size={28} />,
    },
    {
      href: "https://www.linkedin.com/in/santosh986/",
      label: "LinkedIn",
      icon: <FaLinkedin size={28} />,
    },
    {
      href: "https://github.com/SantoshThapa9",
      label: "GitHub",
      icon: <FaGithub size={28} />,
    },
    {
      href: "https://x.com/SantoshThapa689",
      label: "X (formerly Twitter)",
      icon: <FaXTwitter size={28} />,
    },
  ];
  const linkMap: Record<string, string> = {
    "Send me a message": "#contact",
    "Talk to my Assistant": "#assistant",
    "Talk to Kura AI": "https://kura-iota.vercel.app/",
  };
  return (
    <section className={styles.hero} id="home" aria-labelledby="home-title">
      <motion.div
        className={styles.heroSection}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.14 },
          },
        }}
      >
        <motion.h1
          id="home-title"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: reduceMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          I build digital <br /> <span> products end to end.</span>
        </motion.h1>
        <motion.h2
          variants={{
            hidden: { opacity: 0, x: -18 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: reduceMotion ? 0 : 0.55 },
            },
          }}
        >
          Hi, I’m Santosh — a software engineer in Jamshedpur, India.
        </motion.h2>
        <motion.p
          className={styles.heroDescription}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduceMotion ? 0 : 0.5 },
            },
          }}
        >
          I design and build responsive web products across frontend, backend,
          testing, and deployment.
        </motion.p>
        <AnimatePresence>
          {showTalkOptions && (
            <motion.div
              id="talk-options"
              className={styles.talkOptions}
              role="group"
              aria-label="Ways to get in touch"
              initial={
                reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              {[
                "Send me a message",
                "Talk to my Assistant",
                "Talk to Kura AI",
                ,
              ].map((label) => (
                <motion.a
                  key={label}
                  href={(label && linkMap[label]) || "#"}
                  target={
                    label && linkMap[label]?.startsWith("http")
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    label && linkMap[label]?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={styles.actionGroup}
          ref={buttonGroupRef}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduceMotion ? 0 : 0.45 },
            },
          }}
        >
          <div className={styles.buttonGroup}>
            <motion.a
              href="#projects"
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              Projects
            </motion.a>

            <motion.button
              type="button"
              ref={talkTriggerRef}
              aria-expanded={showTalkOptions}
              aria-controls={showTalkOptions ? "talk-options" : undefined}
              onClick={() => setShowTalkOptions((open) => !open)}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              Let’s Talk
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className={styles.socialIcons}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
            },
          }}
        >
          {socialLinks.map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0 : 0.3 },
                },
              }}
              whileHover={reduceMotion ? undefined : { y: -4, rotate: -5 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
export default Home;
