import { RiChatSmileAi3Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./chatWidget.module.scss";
import { motion, useReducedMotion } from "framer-motion";

export default function ChatWidget() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  if (location.pathname.startsWith("/assistant")) return null;

  return (
    <motion.button
      type="button"
      className={styles.launcher}
      onClick={() => navigate("/assistant")}
      aria-label="Chat with Santosh's portfolio assistant"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.08, rotate: 5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
    >
      <RiChatSmileAi3Fill aria-hidden="true" />
    </motion.button>
  );
}
