import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedSection - Scroll-triggered reveal animation component
 * Uses IntersectionObserver for high performance
 */
export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.05,
  rootMargin = '0px 0px -30px 0px',
  className = '',
  once = true,
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);

  // Compute inline transform and opacity for hardware-accelerated 60fps animations
  const getTransformStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return { opacity: 0, transform: 'translate3d(0, 36px, 0)' };
      case 'fade-down':
        return { opacity: 0, transform: 'translate3d(0, -36px, 0)' };
      case 'fade-left':
        return { opacity: 0, transform: 'translate3d(36px, 0, 0)' };
      case 'fade-right':
        return { opacity: 0, transform: 'translate3d(-36px, 0, 0)' };
      case 'zoom-in':
        return { opacity: 0, transform: 'scale(0.92)' };
      case 'scale-up':
        return { opacity: 0, transform: 'scale(0.88)' };
      case 'fade':
        return { opacity: 0, transform: 'none' };
      default:
        return { opacity: 0, transform: 'translate3d(0, 36px, 0)' };
    }
  };

  const transformStyles = getTransformStyles();

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        ...transformStyles,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
        ...style
      }}
    >
      {children}
    </div>
  );
}
