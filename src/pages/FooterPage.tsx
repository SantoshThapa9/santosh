import React, { useEffect, useRef } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import styles from "./Footer.module.scss";

const FooterPage: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (nameContainerRef.current) {
          entry.isIntersecting
            ? nameContainerRef.current.classList.add(styles.animate)
            : nameContainerRef.current.classList.remove(styles.animate);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div ref={nameContainerRef} className={styles.nameContainer}>
        <div className={styles.letterS}>S</div>
        <div className={styles.letterA}>A</div>
        <div className={styles.letterN}>N</div>
        <div className={styles.letterT}>T</div>
        <div className={styles.letterO}>O</div>
        <div className={styles.letterS}>S</div>
        <div className={styles.letterH}>H</div>
      </div>
      <hr />
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a
            href="https://x.com/986nic"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className={styles.icon} />
          </a>
          <a
            href="https://linkedin.com/in/santosh986"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a
            href="https://instagram.com/santoshh689"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={styles.icon} />
          </a>
          <a
            href="https://github.com/nic986"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.icon} />
          </a>
          <a
            href="https://discord.gg/EKce6uKuZa"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className={styles.icon} />
          </a>
        </div>
        <div className={styles.copyRight}>
          &copy; {new Date().getFullYear()} . All rights reserved.
        </div>
        <hr />
      </div>
    </footer>
  );
}; 

export default FooterPage;
