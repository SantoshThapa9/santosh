import styles from "./Footer.module.scss";
import { motion, useReducedMotion } from "framer-motion";

const Footer = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.footer
      className={styles.footer}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.5,
        margin: "0px 0px -10% 0px",
      }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
    >
      <motion.div
        className={styles.nameContainer}
        role="img"
        aria-label="Santosh Thapa"
        whileHover={reduceMotion ? undefined : { letterSpacing: "0.18em" }}
        transition={{ duration: 0.25 }}
      >
        SANTOSH
      </motion.div>
      <motion.div
        className={styles.divider}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.7 }}
      />
      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} Santosh Thapa
      </div>
    </motion.footer>
  );
};

export default Footer;
