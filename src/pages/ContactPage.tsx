import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import SharedStyles from "../shared-style/Shared.module.scss";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Footer from "./Footer";

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const lastSubmitTime = useRef<number | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lastSubmitTime.current && Date.now() - lastSubmitTime.current < 1000) {
      setStatus("Please wait a second before sending again.");
      return;
    }
    lastSubmitTime.current = Date.now();
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("Message sent!");
      form.current?.reset();
    } catch {
      setStatus("Error sending message.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status) {
      const timeout = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <div id="contact" className={styles.ContactPage}>
      <div className={styles.contactContainer}>
        <div className={styles.contactSection}>
          <h5 className={styles.contactTitle}>Get in Touch</h5>
          <p className={styles.contactSubtitle}>
            Open to collaborations and inquiries! <br />
            <a
              href="mailto:st8493510@gmail.com"
              className={`${SharedStyles.btn2} ${styles.email}`}
            >
              st8493510@gmail.com
            </a>
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://x.com/SantoshThapa689"
              className={SharedStyles.btn2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santosh Thapa on X"
            >
              <FaTwitter className={styles.icon} />
            </a>
            <a
              href="https://in.linkedin.com/in/santosh986?trk=profile-badge"
              className={SharedStyles.btn2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santosh Thapa on Linkedin"
            >
              <FaLinkedin className={styles.icon} />
            </a>
            <a
              href="https://instagram.com/santoshh689"
              className={SharedStyles.btn2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santosh Thapa on Instagram"
            >
              <FaInstagram className={styles.icon} />
            </a>
            <a
              href="https://github.com/SantoshThapa9"
              className={SharedStyles.btn2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santosh Thapa on Github"
            >
              <FaGithub className={styles.icon} />
            </a>
          </div>
        </div>

        <form ref={form} className={styles.contactForm} onSubmit={sendEmail}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              className={styles.formInput}
              placeholder="Your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              className={styles.formInput}
              placeholder="Your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.formTextarea}
              placeholder="Your message"
              required
            ></textarea>
          </div>

          <button className={styles.sendButton} disabled={loading}>
            <div className={styles.svgWrapper1}>
              <div className={styles.svgWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  />
                </svg>
              </div>
            </div>
            <span> {loading ? "Sending..." : "Send"}</span>
          </button>
        </form>
        {status && (
          <p className={styles.statusMessage} aria-live="polite">
            {status}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
