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
  threshold = 0.15,
  className = '',
  once = true,
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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
      { threshold }
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
  }, [threshold, once]);

  // Animation class map
  const animationClasses = {
    'fade-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
    'fade-down': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10',
    'fade-left': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 [dir=rtl]:-translate-x-12',
    'fade-right': isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 [dir=rtl]:translate-x-12',
    'zoom-in': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    'scale-up': isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
    'fade': isVisible ? 'opacity-100' : 'opacity-0'
  };

  const selectedAnimationClass = animationClasses[animation] || animationClasses['fade-up'];

  return (
    <div
      ref={sectionRef}
      className={`transition-all ease-out ${selectedAnimationClass} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
        ...style
      }}
    >
      {children}
    </div>
  );
}
