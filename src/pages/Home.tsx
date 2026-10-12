import { useEffect, useState, useRef } from "react";

import styles from "./Home.module.scss";
import { FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Home = () => {
  const [showTalkOptions, setShowTalkOptions] = useState(false);

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

  return (
    <section className={styles.hero} id="home" aria-labelledby="home-title">
      <div className={styles.heroSection}>
        <h1 id="home-title">
          I build digital <br /> <span> products end to end.</span>
        </h1>
        <h2>Hi, I’m Santosh — a software engineer in Jamshedpur, India.</h2>
        <p className={styles.heroDescription}>
          I design and build responsive web products across frontend, backend,
          testing, and deployment.
        </p>

        <div className={styles.actionGroup} ref={buttonGroupRef}>
          <div className={styles.buttonGroup}>
            <a href="#projects">Projects</a>
            <button
              type="button"
              ref={talkTriggerRef}
              aria-expanded={showTalkOptions}
              aria-controls={showTalkOptions ? "talk-options" : undefined}
              onClick={() => setShowTalkOptions((open) => !open)}
            >
              Let’s Talk
            </button>
          </div>
          {showTalkOptions && (
            <div
              id="talk-options"
              className={styles.talkOptions}
              role="group"
              aria-label="Ways to get in touch"
            >
              {["Send me a message", "Explore Kura AI"].map((label) => (
                <a
                  key={label}
                  href={
                    label === "Send me a message"
                      ? "#contact"
                      : "https://kura-iota.vercel.app/"
                  }
                  target={label === "Send me a message" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className={styles.socialIcons}>
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Home;
