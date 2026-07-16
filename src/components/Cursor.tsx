
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const outerSize = 30; // Keep size consistent
  const innerSize = isHovered ? 0 : 8;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Adjusted for a smoother, slower, and bouncier outer circle
  const smoothOptions = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };
  
  // Adjusted for a slightly quicker inner ball, creating more separation
  const innerSmoothOptions = { damping: 25, stiffness: 500, mass: 0.8 };
  const innerSmoothMouse = {
    x: useSpring(mouse.x, innerSmoothOptions),
    y: useSpring(mouse.y, innerSmoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  const manageMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      setIsHovered(true);
    }
  };

  const manageMouseLeave = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
     if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove);
    document.body.addEventListener('mouseover', manageMouseOver);
    document.body.addEventListener('mouseout', manageMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      document.body.removeEventListener('mouseover', manageMouseOver);
      document.body.removeEventListener('mouseout', manageMouseLeave);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Outer circle */}
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed z-[9999] pointer-events-none"
      >
        <motion.div
          animate={{ width: outerSize, height: outerSize }}
          className={cn(
            "rounded-full border-2 transition-colors",
            isHovered ? 'border-primary' : 'border-primary' // Keep border color consistent
          )}
        />
      </motion.div>
      {/* Inner ball */}
      <motion.div
         style={{
          left: innerSmoothMouse.x,
          top: innerSmoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed z-[9999] pointer-events-none"
      >
        <motion.div
           animate={{ width: innerSize, height: innerSize }}
           className="rounded-full bg-black dark:bg-white"
        />
      </motion.div>
    </div>
  );
};

export default Cursor;
