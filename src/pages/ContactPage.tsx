import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const lastSubmitTime = useRef<number | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = Date.now();
    if (lastSubmitTime.current && now - lastSubmitTime.current < 1000) {
      setStatus("Please wait before sending again.");
      return;
    }
    if (!form.current || !executeRecaptcha) return;
    lastSubmitTime.current = now;

    setLoading(true);

    try {
      const token = await executeRecaptcha("contact_form");

      const recaptchaRes = await fetch("/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const recaptchaJson = await recaptchaRes.json();

      if (!recaptchaJson.success) {
        setStatus("Failed reCAPTCHA verification.");
        setLoading(false);
        return;
      }

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("Message sent successfully!");
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch (error: any) {
      setStatus("Failed to send message. Please try again later.");
      console.error("Email send error:", error?.text || error);
    } finally {
      setLoading(false);
    }
  };

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
              value={formData.user_name}
              onChange={handleChange}
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
              value={formData.user_email}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
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
        {status && <p className={styles.statusMessage}>{status}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
