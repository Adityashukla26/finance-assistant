'use client';

import { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({
  value,
  duration = 1500,
  delay = 300,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (hasAnimated || typeof value !== 'number') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            animateCounter();
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const animateCounter = () => {
    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;
    const increment = Math.max(1, endValue / 60);

    const easeOutQuad = (t) => t * (2 - t);

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formatNumber = (num) => {
    const fixedNum = num.toFixed(decimals);
    const parts = fixedNum.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <span ref={counterRef}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
