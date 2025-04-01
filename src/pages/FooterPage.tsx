import React, { useEffect, useRef } from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
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
            href="https://x.com/SantoshThapa689"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on X"
          >
            <FaTwitter className={styles.icon} />
          </a>
          <a
            href="https://in.linkedin.com/in/santosh986?trk=profile-badge"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Linkedin"
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a
            href="https://instagram.com/santoshh689"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Instagram"
          >
            <FaInstagram className={styles.icon} />
          </a>
          <a
            href="https://github.com/SantoshThapa9"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Santosh Thapa on Github"
          >
            <FaGithub className={styles.icon} />
          </a>
        </div>
        <div className={styles.copyRight}>
          &copy; {new Date().getFullYear()} Santosh. Open to collaborations and
          inquiries!
        </div>

        <hr />
      </div>
    </footer>
  );
};

export default FooterPage;
