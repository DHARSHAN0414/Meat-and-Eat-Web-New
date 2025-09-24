import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Optimized animation variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateY: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInFromBottom = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Micro-interaction variants
const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: "easeOut"
  }
};

const cardHover = {
  y: -8,
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

const imageHover = {
  scale: 1.1,
  transition: {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

// Optimized Animation Components
export const FadeInUp = memo(({ children, delay = 0, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const optimizedVariants = useMemo(() => ({
    ...fadeInUp,
    visible: {
      ...fadeInUp.visible,
      transition: {
        ...fadeInUp.visible.transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }), [delay, shouldReduceMotion]);

  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const FadeInLeft = memo(({ children, delay = 0, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const optimizedVariants = useMemo(() => ({
    ...fadeInLeft,
    visible: {
      ...fadeInLeft.visible,
      transition: {
        ...fadeInLeft.visible.transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }), [delay, shouldReduceMotion]);

  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const FadeInRight = memo(({ children, delay = 0, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const optimizedVariants = useMemo(() => ({
    ...fadeInRight,
    visible: {
      ...fadeInRight.visible,
      transition: {
        ...fadeInRight.visible.transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }), [delay, shouldReduceMotion]);

  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const ScaleIn = memo(({ children, delay = 0, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const optimizedVariants = useMemo(() => ({
    ...scaleIn,
    visible: {
      ...scaleIn.visible,
      transition: {
        ...scaleIn.visible.transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }), [delay, shouldReduceMotion]);

  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const SlideInFromBottom = memo(({ children, delay = 0, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const optimizedVariants = useMemo(() => ({
    ...slideInFromBottom,
    visible: {
      ...slideInFromBottom.visible,
      transition: {
        ...slideInFromBottom.visible.transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }), [delay, shouldReduceMotion]);

  return (
    <motion.div
      variants={optimizedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Interactive Components
export const AnimatedButton = memo(({ children, className = "", onClick, disabled = false, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      whileHover={buttonHover}
      whileTap={buttonTap}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export const AnimatedCard = memo(({ children, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={cardHover}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const AnimatedImage = memo(({ src, alt, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        {...props}
      />
    );
  }

  return (
    <motion.div
      className="overflow-hidden"
      whileHover={imageHover}
      transition={{ duration: 0.4 }}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        {...props}
      />
    </motion.div>
  );
});

// Stagger Animation Container
export const StaggerContainer = memo(({ children, staggerDelay = 0.1, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
});

// Performance-optimized parallax component
export const ParallaxElement = memo(({ children, speed = 0.5, className = "", ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{
        y: 0 // Simplified for now - parallax can be added later
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Export animation variants for custom use
export const animationVariants = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInFromBottom,
  buttonHover,
  buttonTap,
  cardHover,
  imageHover
};
