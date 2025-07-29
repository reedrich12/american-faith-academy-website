'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const STAR_COUNT = 50; // Reduced from 100
const MOBILE_STAR_COUNT = 25; // Even fewer for mobile

export function OptimizedStarBackground({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [starsGenerated, setStarsGenerated] = useState(false);
  
  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setStarsGenerated(true);
    };
    checkMobile();
    
    const debouncedResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  // Smooth spring for natural motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Optimized transforms
  const blueOpacity = useTransform(smoothProgress, [0.2, 0.8], [0, 1]);
  const whiteOpacity = useTransform(smoothProgress, [0.2, 0.8], [1, 0]);
  const starsOpacity = useTransform(smoothProgress, [0.3, 0.9], [0, 1]);

  // Generate stars once
  const stars = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    animationDelay: number;
  }>>([]);

  if (starsGenerated && stars.current.length === 0) {
    const count = isMobile ? MOBILE_STAR_COUNT : STAR_COUNT;
    stars.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      animationDelay: Math.random() * 4,
    }));
  }

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1);
          }
        }
        
        .star {
          position: absolute;
          border-radius: 50%;
          background-color: white;
          pointer-events: none;
        }
      `}</style>
      
      <div ref={containerRef} className="min-h-screen">
        {/* Backgrounds with GPU acceleration hints */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 will-change-opacity"
          style={{ 
            opacity: whiteOpacity,
            zIndex: -3
          }}
        />
        
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-900 to-slate-900 will-change-opacity"
          style={{ 
            opacity: blueOpacity,
            zIndex: -2
          }}
        />
        
        {/* Optimized stars */}
        <motion.div
          className="fixed inset-0 overflow-hidden pointer-events-none will-change-opacity"
          style={{ 
            opacity: starsOpacity,
            zIndex: -1
          }}
        >
          {starsGenerated && stars.current.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}rem`,
                height: `${star.size}rem`,
                boxShadow: `0 0 ${star.size * 8}px rgba(255, 255, 255, 0.5)`,
                animation: `twinkle ${3 + star.animationDelay}s ease-in-out infinite`,
                animationDelay: `${star.animationDelay}s`,
              }}
            />
          ))}
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}

// Add resize timeout to window
declare global {
  interface Window {
    resizeTimeout: NodeJS.Timeout;
  }
}