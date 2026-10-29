import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** A single reveal on entry. Keep layout and scrolling independent of animation. */
export function Reveal({ children, className, as = 'div', delay = 0 }: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const Element = as === 'li' ? motion.li : motion.div;
  return <Element
    className={className}
    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</Element>;
}
