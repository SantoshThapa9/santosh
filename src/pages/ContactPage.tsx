import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("Message sent!");
      form.current?.reset();
    } catch (error) {
      setStatus("Error sending message.");
      console.error(error);
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
          <h2 className={styles.contactTitle}>Get in Touch</h2>
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
          <p className={styles.contactSubtitle}>
            Open to collaborations and inquiries! <br />
            <a href="mailto:st8493510@gmail.com" className={styles.email}>
              st8493510@gmail.com
            </a>
          </p>
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

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {status && (
          <p className={styles.statusMessage} aria-live="polite">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
