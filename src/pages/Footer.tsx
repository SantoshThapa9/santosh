import { useEffect, useRef, useState } from "react";
import styles from "./AppFooter.module.scss";

const Footer = () => {
  const footerRef = useRef(null);
  const nameContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (nameContainerRef.current) {
      observer.observe(nameContainerRef.current);
    }

    return () => {
      if (nameContainerRef.current) {
        observer.unobserve(nameContainerRef.current);
      }
    };
  }, []);

  const letters = ["S", "A", "N", "T", "O", "S", "H"];

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div
        ref={nameContainerRef}
        className={`${styles.nameContainer} ${isVisible ? styles.animate : ""}`}
      >
        {letters.map((char, index) => (
          <div
            key={index}
            className={`${styles[`letter${char}`]} ${styles.letter}`}
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            {char}
          </div>
        ))}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} Santosh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
