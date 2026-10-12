import styles from "./Footer.module.scss";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.nameContainer} role="img" aria-label="Santosh Thapa">
      SANTOSH
    </div>
    <div className={styles.divider} />
    <div className={styles.copyRight}>
      &copy; {new Date().getFullYear()} Santosh Thapa
    </div>
  </footer>
);

export default Footer;
