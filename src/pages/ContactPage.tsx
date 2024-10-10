import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_rr0tckm",
          "template_oimik4p",
          form.current,
          "AMutHry9f-LdcdnOm"
        )
        .then(
          () => {
            setStatus("Message sent successfully!");
            setFormData({ user_name: "", user_email: "", message: "" }); 
          },
          (error) => {
            setStatus("Failed to send message. Please try again later.");
            console.error("Failed...", error.text);
          }
        );
    }
  };

  return (
    <div id="contact" className={styles.ContactPage}>
      <div className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Get in Touch</h1>
        <p className={styles.contactSubtitle}>
          Feel free to reach out. I'm up for a chat!
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
          <button type="submit" value="send" className={styles.submitButton}>
            Send Message
          </button>
        </form>

        {status && <p className={styles.statusMessage}>{status}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
