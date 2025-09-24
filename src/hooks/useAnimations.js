import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
export const useGSAP = (callback, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(callback, ref);
      return () => ctx.revert();
    }
  }, deps);

  return ref;
};

// Custom hook for ScrollTrigger animations
export const useScrollTrigger = (animationConfig, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && animationConfig) {
      // Create the GSAP animation first
      const animation = gsap.fromTo(
        ref.current, 
        animationConfig.from || { opacity: 0, y: 50 },
        {
          ...animationConfig.to || { opacity: 1, y: 0 },
          duration: animationConfig.duration || 0.8,
          ease: animationConfig.ease || "power3.out"
        }
      );

      const scrollTrigger = ScrollTrigger.create({
        trigger: ref.current,
        animation: animation,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        toggleActions: options.toggleActions || "play none none reverse",
        ...options
      });

      return () => {
        scrollTrigger.kill();
        animation.kill();
      };
    }
  }, [animationConfig, options]);

  return ref;
};

// Custom hook for Anime.js animations
export const useAnime = (targets, animation, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const animeInstance = animate({
        targets: ref.current,
        ...animation
      });

      return () => animeInstance.pause();
    }
  }, deps);

  return ref;
};

// Custom hook for complex sequence animations
export const useSequenceAnimation = (sequence, deps = []) => {
  const ref = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (ref.current && sequence) {
      timelineRef.current = gsap.timeline();
      
      sequence.forEach((step, index) => {
        const { targets, animation, delay = 0 } = step;
        const element = targets ? ref.current.querySelector(targets) : ref.current;
        
        if (element) {
          timelineRef.current.to(element, {
            ...animation,
            delay: index === 0 ? delay : 0
          }, index > 0 ? `-=${delay}` : delay);
        }
      });

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }
  }, deps);

  const play = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  }, []);

  const reverse = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  }, []);

  const restart = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  }, []);

  return { ref, play, pause, reverse, restart };
};

// Custom hook for hover animations
export const useHoverAnimation = (hoverAnimation, leaveAnimation) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, hoverAnimation);
    };

    const handleMouseLeave = () => {
      gsap.to(element, leaveAnimation);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverAnimation, leaveAnimation]);

  return ref;
};

// Custom hook for scroll-based animations
export const useScrollAnimation = (animation, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: ref.current,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        toggleActions: options.toggleActions || "play none none reverse",
        animation: gsap.fromTo(ref.current, animation.from, animation.to),
        ...options
      });

      return () => scrollTrigger.kill();
    }
  }, [animation, options]);

  return ref;
};

// Custom hook for stagger animations
export const useStaggerAnimation = (selector, animation, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(selector);
      
      if (elements.length > 0) {
        gsap.fromTo(elements, 
          animation.from || { opacity: 0, y: 50 },
          {
            ...animation.to || { opacity: 1, y: 0 },
            duration: animation.duration || 0.8,
            stagger: animation.stagger || 0.1,
            ease: animation.ease || "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: options.start || "top 80%",
              end: options.end || "bottom 20%",
              toggleActions: options.toggleActions || "play none none reverse",
              ...options
            }
          }
        );
      }
    }
  }, [selector, animation, options]);

  return ref;
};

// Custom hook for loading animations
export const useLoadingAnimation = (isLoading) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isLoading) {
        // Start loading animation
        gsap.fromTo(ref.current, 
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        // End loading animation
        gsap.to(ref.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power3.out"
        });
      }
    }
  }, [isLoading]);

  return ref;
};

// Custom hook for page transitions
export const usePageTransition = (isEntering = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isEntering) {
        // Page enter animation
        gsap.fromTo(ref.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      } else {
        // Page exit animation
        gsap.to(ref.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        });
      }
    }
  }, [isEntering]);

  return ref;
};

// Custom hook for counter animations
export const useCounterAnimation = (endValue, duration = 2) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (ref.current) {
      gsap.to({ value: 0 }, {
        value: endValue,
        duration: duration,
        ease: "power2.out",
        onUpdate: function() {
          setCount(Math.round(this.targets()[0].value));
        }
      });
    }
  }, [endValue, duration]);

  return { ref, count };
};

// Custom hook for morphing animations
export const useMorphAnimation = (shapes) => {
  const ref = useRef(null);
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    if (ref.current && shapes.length > 0) {
      const morphToNext = () => {
        const nextShape = (currentShape + 1) % shapes.length;
        
        gsap.to(ref.current, {
          morphSVG: shapes[nextShape],
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentShape(nextShape);
            setTimeout(morphToNext, 2000);
          }
        });
      };

      morphToNext();
    }
  }, [shapes, currentShape]);

  return ref;
};

// Utility hook for animation performance
export const useAnimationPerformance = () => {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0.1);
      // Note: anime.speed is not available in the new API
    }

    // Cleanup on unmount
    return () => {
      gsap.globalTimeline.timeScale(1);
      // Note: anime.speed is not available in the new API
    };
  }, []);
};

export default {
  useGSAP,
  useScrollTrigger,
  useAnime,
  useSequenceAnimation,
  useHoverAnimation,
  useScrollAnimation,
  useStaggerAnimation,
  useLoadingAnimation,
  usePageTransition,
  useCounterAnimation,
  useMorphAnimation,
  useAnimationPerformance
};
