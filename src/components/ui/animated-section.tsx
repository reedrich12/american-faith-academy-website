'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  prefersReducedMotion?: boolean; // Allow override from parent
  role?: string; // Allow ARIA role attribute
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  prefersReducedMotion: prefersReducedMotionProp,
  role
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const hookPrefersReducedMotion = usePrefersReducedMotion();
  
  // Use prop if provided, otherwise use hook
  const prefersReducedMotion = prefersReducedMotionProp ?? hookPrefersReducedMotion;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // If user prefers reduced motion, show content immediately without animation
  const variants: Variants = prefersReducedMotion 
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      }
    : {
        hidden: {
          opacity: 0,
          y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
          x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeInOut",
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      role={role}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;