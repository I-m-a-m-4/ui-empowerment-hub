'use client';

import { motion } from 'framer-motion';

const staggerContainer = (staggerChildren?: any, delayChildren?: any) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const MotionWrap = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.section
    variants={staggerContainer()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className={className}
  >
    {children}
  </motion.section>
);

export default MotionWrap;
