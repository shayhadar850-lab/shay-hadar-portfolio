'use client';

import type { ReactNode, RefObject } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

type SupportedTag = 'div' | 'h2' | 'p' | 'span';

interface TimelineContentProps {
  as?: SupportedTag;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: ReactNode;
}

const defaultVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.14,
      duration: 0.45,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
  hidden: {
    y: 16,
    opacity: 0,
    filter: 'blur(6px)',
  },
};

const motionComponents = {
  div: motion.div,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
} as const;

export function TimelineContent({
  as = 'div',
  animationNum,
  timelineRef,
  customVariants = defaultVariants,
  className,
  children,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, amount: 0.08 });
  const prefersReduced = useReducedMotion();
  const Component = motionComponents[as];

  if (prefersReduced) {
    const PlainTag = as;
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  return (
    <Component
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariants}
      className={className}
    >
      {children}
    </Component>
  );
}
