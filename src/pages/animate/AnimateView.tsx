import { useEffect } from "react";
import { easeInOut, motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0.2, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeInOut },
  },
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

const AnimateView = ({ children, className }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateView;
