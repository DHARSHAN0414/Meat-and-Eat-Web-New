import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// GSAP Scroll Animations
export const createScrollAnimations = () => {
  // Hero section animations
  gsap.fromTo('.hero-title', 
    { y: 100, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1.2, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.hero-title',
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  gsap.fromTo('.hero-subtitle', 
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.hero-subtitle',
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Stats counter animation
  gsap.fromTo('.stat-number', 
    { scale: 0.8, opacity: 0 },
    { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.stats-grid',
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Product cards reveal animation
  gsap.fromTo('.product-card', 
    { y: 80, opacity: 0, rotationY: 15 },
    { 
      y: 0, 
      opacity: 1, 
      rotationY: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.products-grid',
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Feature cards animation
  gsap.fromTo('.feature-card', 
    { x: -100, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.features-section',
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Parallax effects
  gsap.to('.parallax-bg', {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: '.parallax-section',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Text reveal animation
  gsap.utils.toArray('.text-reveal').forEach((element) => {
    gsap.fromTo(element, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

// Anime.js Micro-interactions
export const createMicroInteractions = () => {
  // Icon pulse animations
  animate({
    targets: '.pulse-icon',
    scale: [1, 1.2, 1],
    duration: 2000,
    easing: 'easeInOutSine',
    loop: true,
    delay: (el, i) => i * 200
  });

  // Floating animation for special elements
  animate({
    targets: '.float-element',
    translateY: [-10, 10],
    duration: 3000,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate'
  });

  // Button hover effects
  const buttons = document.querySelectorAll('.anime-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      animate({
        targets: button,
        scale: 1.05,
        duration: 200,
        easing: 'easeOutQuad'
      });
    });

    button.addEventListener('mouseleave', () => {
      animate({
        targets: button,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuad'
      });
    });
  });

  // Loading spinner animation
  animate({
    targets: '.loading-spinner',
    rotate: 360,
    duration: 1000,
    easing: 'linear',
    loop: true
  });

  // Success checkmark animation
  animate({
    targets: '.success-checkmark',
    scale: [0, 1.2, 1],
    duration: 600,
    easing: 'easeOutElastic(1, .8)',
    delay: 200
  });

  // Error shake animation
  animate({
    targets: '.error-shake',
    translateX: [-10, 10, -10, 10, 0],
    duration: 500,
    easing: 'easeInOutQuad'
  });
};

// Complex Sequence Animations
export const createSequenceAnimations = () => {
  // Hero sequence animation
  const heroSequence = gsap.timeline();
  
  heroSequence
    .from('.hero-bg', { scale: 1.1, duration: 1.5, ease: "power2.out" })
    .from('.hero-content', { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=1")
    .from('.hero-cta', { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
    .from('.hero-features', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.3");

  // Dashboard loading sequence
  const dashboardSequence = gsap.timeline();
  
  dashboardSequence
    .from('.dashboard-header', { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" })
    .from('.dashboard-sidebar', { x: -100, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    .from('.dashboard-content', { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    .from('.stats-cards', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.2")
    .from('.recent-orders', { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
    .from('.quick-actions', { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

  // Product reveal sequence
  const productSequence = gsap.timeline({
    scrollTrigger: {
      trigger: '.products-section',
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play none none reverse"
    }
  });

  productSequence
    .from('.products-header', { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
    .from('.products-filters', { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from('.product-item', { 
      y: 80, 
      opacity: 0, 
      rotationY: 15,
      duration: 0.8, 
      stagger: 0.1, 
      ease: "power3.out" 
    }, "-=0.2");
};

// Advanced Hover Effects
export const createAdvancedHoverEffects = () => {
  // Card tilt effect
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  // Magnetic effect for buttons
  const magneticElements = document.querySelectorAll('.magnetic-element');
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
};

// Performance Optimized Animations
export const createOptimizedAnimations = () => {
  // Use will-change for better performance
  const animatedElements = document.querySelectorAll('.animated-element');
  animatedElements.forEach(element => {
    element.style.willChange = 'transform, opacity';
  });

  // Clean up will-change after animation
  gsap.utils.toArray('.animated-element').forEach(element => {
    gsap.to(element, {
      onComplete: () => {
        element.style.willChange = 'auto';
      }
    });
  });

  // Reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.1);
    // Note: anime.speed is not available in the new API
  }
};

// Page Transition Animations
export const createPageTransitions = () => {
  // Page enter animation
  gsap.fromTo('.page-content', 
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out" 
    }
  );

  // Page exit animation
  const exitAnimation = () => {
    return gsap.to('.page-content', {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in"
    });
  };

  return { exitAnimation };
};

// Loading Animations
export const createLoadingAnimations = () => {
  // Skeleton loading animation
  gsap.fromTo('.skeleton-shimmer', 
    { x: '-100%' },
    { 
      x: '100%', 
      duration: 1.5, 
      ease: "none", 
      repeat: -1 
    }
  );

  // Progress bar animation
  gsap.fromTo('.progress-bar', 
    { scaleX: 0 },
    { 
      scaleX: 1, 
      duration: 2, 
      ease: "power2.out" 
    }
  );

  // Loading dots animation
  animate({
    targets: '.loading-dot',
    scale: [1, 1.5, 1],
    duration: 600,
    easing: 'easeInOutSine',
    delay: (el, i) => i * 200,
    loop: true
  });
};

// Initialize all animations
export const initializeAnimations = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createScrollAnimations();
      createMicroInteractions();
      createSequenceAnimations();
      createAdvancedHoverEffects();
      createOptimizedAnimations();
      createLoadingAnimations();
    });
  } else {
    createScrollAnimations();
    createMicroInteractions();
    createSequenceAnimations();
    createAdvancedHoverEffects();
    createOptimizedAnimations();
    createLoadingAnimations();
  }
};

// Utility functions for manual animation control
export const animateElement = (selector, animation) => {
  const element = document.querySelector(selector);
  if (element) {
    gsap.to(element, animation);
  }
};

export const animateElements = (selector, animation) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    gsap.to(elements, animation);
  }
};

export const createTimeline = () => {
  return gsap.timeline();
};

export const pauseAnimations = () => {
  gsap.globalTimeline.pause();
  // Note: anime.pause() is not available in the new API
};

export const resumeAnimations = () => {
  gsap.globalTimeline.resume();
  // Note: anime.play() is not available in the new API
};

export default {
  createScrollAnimations,
  createMicroInteractions,
  createSequenceAnimations,
  createAdvancedHoverEffects,
  createOptimizedAnimations,
  createPageTransitions,
  createLoadingAnimations,
  initializeAnimations,
  animateElement,
  animateElements,
  createTimeline,
  pauseAnimations,
  resumeAnimations
};
