import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    user_name: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);

      emailjs;
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setStatus("Message sent successfully!");
            setFormData({ user_name: "", message: "" });
            setLoading(false);
          },
          (error) => {
            setStatus("Failed to send message. Please try again later.");
            console.error("Failed...", error.text);
            setLoading(false);
          }
        );
    }
  };
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section id="contact" className={styles.ContactPage}>
      <div className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Get in Touch</h1>
        <p className={styles.contactSubtitle}>
          Feel free to reach out. I'm up for a chat! <br />
          st8493510@gmail.com
        </p>
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

          <address className={styles.formGroup}>
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
          </address>
          <button type="submit" value="send" className={styles.submitButton}>
            {loading ? "Sending Message" : "Send Message"}
          </button>
        </form>

        {status && <p className={styles.statusMessage}>{status}</p>}
      </div>
    </section>
  );
};

export default ContactPage;
