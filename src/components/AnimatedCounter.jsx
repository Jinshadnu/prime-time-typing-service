import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter - Smooth number count-up animation triggered by scroll visibility
 */
export default function AnimatedCounter({ value, duration = 2000, className = '' }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  const animateCount = () => {
    // Parse target number, prefix, suffix, and formatting
    const rawString = String(value);
    
    // Match numeric part with potential decimal
    const numMatch = rawString.match(/[\d,.]+/);
    if (!numMatch) {
      setDisplayValue(rawString);
      return;
    }

    const matchedStr = numMatch[0];
    const cleanNumStr = matchedStr.replace(/,/g, '');
    const targetNum = parseFloat(cleanNumStr);
    const hasDecimal = cleanNumStr.includes('.');
    const decimalPlaces = hasDecimal ? cleanNumStr.split('.')[1].length : 0;
    
    const prefix = rawString.substring(0, rawString.indexOf(matchedStr));
    const suffix = rawString.substring(rawString.indexOf(matchedStr) + matchedStr.length);

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out expo formula for smooth slowing down at the end
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = targetNum * easeOutProgress;

      let formattedNum = '';
      if (hasDecimal) {
        formattedNum = currentNum.toFixed(decimalPlaces);
      } else {
        formattedNum = Math.floor(currentNum).toLocaleString();
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(rawString);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? displayValue : '0'}
    </span>
  );
}
