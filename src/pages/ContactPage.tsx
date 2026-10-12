import { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.scss";
import SharedStyles from "../shared-style/Shared.module.scss";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const apiUrl = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "") ?? "");

function contactApiUrl(path: string) {
  if (import.meta.env.PROD && !apiUrl) {
    throw new Error("VITE_API_URL is required for production builds.");
  }

  return `${apiUrl}${path}`;
}

async function waitForContactApi() {
  const deadline = Date.now() + 90_000;
  const transientStatuses = new Set([502, 503, 504]);
  let retryDelayMs = 2000;

  while (Date.now() < deadline) {
    const remainingMs = deadline - Date.now();

    try {
      const response = await fetch(contactApiUrl("/health"), {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(Math.min(85_000, remainingMs)),
      });

      if (response.ok) {
        const result: unknown = await response.json();
        if (
          result &&
          typeof result === "object" &&
          "status" in result &&
          result.status === "ok"
        ) {
          return;
        }

        throw new Error("Contact server returned an invalid health response.");
      }

      if (!transientStatuses.has(response.status)) {
        throw new Error(
          `Contact server health check failed with status ${response.status}.`,
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        throw new Error("Contact server health check timed out.");
      }

      if (!(error instanceof TypeError)) {
        throw error;
      }
    }

    const pauseMs = Math.min(retryDelayMs, deadline - Date.now());
    if (pauseMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, pauseMs));
    }
    retryDelayMs = Math.min(10_000, retryDelayMs * 2);
  }

  throw new Error("Contact server did not become ready within 90 seconds.");
}

function getContactFailureMessage(error: unknown) {
  if (
    error instanceof Error &&
    error.message === "Contact server did not become ready within 90 seconds."
  ) {
    return "The contact server did not become ready. Please try again shortly or email me directly.";
  }

  if (
    error instanceof Error &&
    error.message === "Contact server health check timed out."
  ) {
    return "The contact server is taking too long to start. Please try again shortly or email me directly.";
  }

  if (error instanceof Error && error.name === "TimeoutError") {
    return "The contact request timed out. It may have been delivered; please check your email before retrying, or email me directly.";
  }

  return "Your message could not be sent. Please email me directly.";
}

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentForm = form.current;
    if (!currentForm) {
      setStatus("The contact form is unavailable. Please email me directly.");
      return;
    }

    setLoading(true);
    setStatus("Connecting to the contact server…");
    try {
      await waitForContactApi();
      setStatus("Sending your message…");

      const formData = new FormData(currentForm);
      const response = await fetch(contactApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("user_name") ?? "").trim(),
          email: String(formData.get("user_email") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
        }),
        signal: AbortSignal.timeout(35_000),
      });

      if (!response.ok) {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const result: unknown = await response.json();
          if (
            result &&
            typeof result === "object" &&
            "message" in result &&
            typeof result.message === "string"
          ) {
            setStatus(result.message);
            return;
          }
        }

        throw new Error(
          `Contact request failed with status ${response.status}.`,
        );
      }
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Contact server returned an unexpected response.");
      }
      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== "object" ||
        !("message" in result) ||
        result.message !== "Message sent."
      ) {
        throw new Error("Contact server returned an invalid response.");
      }

      setStatus("Message sent!");
      currentForm.reset();
    } catch (error) {
      console.error("Unable to send contact form message.", error);
      setStatus(getContactFailureMessage(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status && !loading) {
      const timeout = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [loading, status]);

  return (
    <section
      id="contact"
      className={styles.ContactPage}
      aria-labelledby="contact-title"
    >
      <div className={styles.contactContainer}>
        <div className={styles.contactSection}>
          <h2 id="contact-title" className={styles.contactTitle}>
            Let’s Work Together
          </h2>
          <p className={styles.contactSubtitle}>
            Have a project in mind or want to compare notes? I’d be glad to hear
            from you.
            <br />
            <a
              href="mailto:st8493510@gmail.com"
              className={`${SharedStyles.btn2} ${styles.email}`}
            >
              st8493510@gmail.com
            </a>
          </p>
          <div
            className={styles.socialLinks}
            role="group"
            aria-label="Social profiles"
          >
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
              href="https://www.linkedin.com/in/santosh986/"
              className={SharedStyles.btn2}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Santosh Thapa on LinkedIn"
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

        <form
          ref={form}
          className={styles.contactForm}
          onSubmit={sendEmail}
          aria-label="Send a message"
        >
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              className={styles.formInput}
              placeholder="How should I address you?"
              required
              autoComplete="name"
              maxLength={100}
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
              placeholder="you@example.com"
              required
              autoComplete="email"
              maxLength={254}
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
              placeholder="A little about what you have in mind..."
              required
              rows={5}
              maxLength={5000}
            ></textarea>
          </div>

          <button
            className={styles.sendButton}
            disabled={loading}
            type="submit"
            aria-busy={loading}
          >
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
            <span> {loading ? "Sending…" : "Send Message"}</span>
          </button>
        </form>
        {status && (
          <p className={styles.statusMessage} role="status" aria-live="polite">
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
