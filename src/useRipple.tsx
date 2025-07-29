import { useState, useCallback } from 'react';
import { RippleEffect } from '../types/button.types';

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple: RippleEffect = {
      x,
      y,
      size,
      id: Date.now().toString()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, createRipple };
};