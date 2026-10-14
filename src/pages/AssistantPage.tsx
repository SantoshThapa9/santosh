import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiPlus, FiSend } from "react-icons/fi";
import styles from "./AssistantPage.module.scss";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TbRobot } from "react-icons/tb";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hey! I'm Santosh's AI assistant. Chat with me in English, Hindi, or any language you prefer.",
};

const quickPrompts = [
  "What projects has Santosh built?",
  "What is his tech stack?",
  "Tell me about Kura AI",
];

const storageKey = "portfolio-assistant-messages";

function readConversation(): ChatMessage[] {
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return [greeting];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [greeting];

    const messages = parsed.filter(
      (item): item is ChatMessage =>
        item !== null &&
        typeof item === "object" &&
        "role" in item &&
        (item.role === "user" || item.role === "assistant") &&
        "content" in item &&
        typeof item.content === "string",
    );

    return messages.length ? messages : [greeting];
  } catch (error) {
    console.error("Could not restore the assistant conversation.", error);
    return [greeting];
  }
}

const AssistantPage = () => {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>(readConversation);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Could not save the assistant conversation.", error);
    }
  }, [messages]);

  const startNewChat = () => {
    setDraft("");
    setErrorMessage("");
    setMessages([greeting]);
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = draft.trim();

    if (!message || isSending) return;
    const nextMessages = [
      ...messages,
      { role: "user" as const, content: message },
    ];
    setMessages(nextMessages);
    setDraft("");
    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          previousMessages: messages.slice(-5),
        }),
        signal: AbortSignal.timeout(30_000),
      });
      const result: unknown = await response.json();

      if (
        !result ||
        typeof result !== "object" ||
        !("reply" in result) ||
        typeof result.reply !== "string"
      ) {
        throw new Error(
          result &&
            typeof result === "object" &&
            "message" in result &&
            typeof result.message === "string"
            ? result.message
            : "The assistant returned an invalid response.",
        );
      }
      if (!response.ok) {
        throw new Error(result.reply);
      }

      setMessages([
        ...nextMessages,
        { role: "assistant", content: result.reply },
      ]);
    } catch (error) {
      console.error("Assistant message failed.", error);
      const detail =
        error instanceof Error && error.name === "TimeoutError"
          ? "That took too long. Please try again."
          : error instanceof Error && error.message
            ? error.message
            : "Your message could not be sent. Please try again.";
      setErrorMessage(detail);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="assistant"
      className={styles.assistantSection}
      aria-labelledby="assistant-title"
    >
      <div className={styles.pageShell}>
        <motion.header
          className={styles.intro}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -16% 0px",
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.liveDot} />A little help, powered by AI
          </div>
          <h2 id="assistant-title">
            Get to know <span>Santosh.</span>
          </h2>
          <p>
            Ask about the work, the thinking behind it, or what could be built
            together. Answers are grounded in this portfolio.
          </p>
          <div className={styles.introMeta}>
            <span>Portfolio guide</span>
            <span aria-hidden="true">/</span>
            <span>Jamshedpur, India</span>
          </div>
        </motion.header>

        <motion.div
          className={styles.chatCard}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.12,
            margin: "0px 0px -12% 0px",
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.06,
          }}
        >
          <div className={styles.chatHeader}>
            <div className={styles.assistantIdentity}>
              <div className={styles.avatar} aria-hidden="true">
                <TbRobot />
              </div>
              <div>
                <strong>Ask Santosh’s AI</strong>
                <span>
                  <i /> Here to help you explore
                </span>
              </div>
            </div>
            <button
              type="button"
              className={styles.newChatButton}
              onClick={startNewChat}
              aria-label="Start a new conversation"
            >
              <FiPlus aria-hidden="true" />
              <span>New chat</span>
            </button>
          </div>

          <div
            ref={messageListRef}
            className={styles.messageList}
            role="log"
            aria-label="Conversation with Santosh's portfolio assistant"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <AnimatePresence initial={false}>
              {messages.map((item, index) => (
                <motion.div
                  key={`${item.role}-${index}`}
                  className={`${styles.messageRow} ${
                    item.role === "user" ? styles.userMessageRow : ""
                  }`}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: item.role === "user" ? 18 : -18,
                          scale: 0.98,
                        }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                >
                  {item.role === "assistant" && (
                    <span className={styles.messageAvatar} aria-hidden="true">
                      <TbRobot />
                    </span>
                  )}
                  <div
                    className={`${styles.messageBubble} ${
                      item.role === "user" ? styles.userBubble : ""
                    } ${styles.markdownContent}`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children, ...props }) => (
                          <a
                            {...props}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isSending && (
              <motion.div
                className={styles.messageRow}
                role="status"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
              >
                <span className={styles.messageAvatar} aria-hidden="true">
                  <TbRobot />
                </span>
                <p className={`${styles.messageBubble} ${styles.typing}`}>
                  <i />
                  <i />
                  <i />
                  <span className={styles.srOnly}>Thinking</span>
                </p>
              </motion.div>
            )}
            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  className={styles.errorMessage}
                  role="alert"
                  initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {messages.length <= 1 && (
            <div
              className={styles.promptGroup}
              aria-label="Suggested questions"
            >
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  type="button"
                  key={prompt}
                  onClick={() => {
                    setDraft(prompt);
                    inputRef.current?.focus();
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    delay: reduceMotion ? 0 : index * 0.06,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  {prompt}
                  <FiArrowUpRight aria-hidden="true" />
                </motion.button>
              ))}
            </div>
          )}

          <form className={styles.composer} onSubmit={sendMessage}>
            <label className={styles.srOnly} htmlFor="assistant-message">
              Your message
            </label>
            <textarea
              id="assistant-message"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Ask me anything about Santosh…"
              maxLength={2000}
              rows={1}
              disabled={isSending}
            />
            <motion.button
              type="submit"
              className={styles.sendButton}
              disabled={!draft.trim() || isSending}
              aria-label="Send message"
              whileHover={
                reduceMotion || !draft.trim() || isSending
                  ? undefined
                  : { scale: 1.06, rotate: -4 }
              }
              whileTap={
                reduceMotion || !draft.trim() || isSending
                  ? undefined
                  : { scale: 0.92 }
              }
            >
              <FiSend aria-hidden="true" />
            </motion.button>
          </form>
          <p className={styles.disclaimer}>
            AI-generated answers may be imperfect. No conversation is stored
            beyond this browser session.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AssistantPage;
