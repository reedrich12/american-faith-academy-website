'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SoaringCentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        // Start transition at 20% of viewport, complete by 120% of viewport
        const startPoint = windowHeight * 0.2;
        const endPoint = windowHeight * 1.2;
        const progress = Math.min(Math.max((scrollY - startPoint) / (endPoint - startPoint), 0), 1);
        
        // Apply easing function for smoother transition
        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setScrollProgress(easedProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
          }
        }
        
        .star-background-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.3s ease;
        }
        
        .star-pattern-bg {
          position: absolute;
          color: rgba(255, 255, 255, 0.4);
          font-size: 24px;
          animation: twinkle 4s ease-in-out infinite;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4);
        }
        
        .star-pattern-bg:nth-child(odd) {
          animation-delay: 0s;
        }
        
        .star-pattern-bg:nth-child(even) {
          animation-delay: 2s;
        }
        
        .star-pattern-bg:nth-child(3n) {
          animation-delay: 1s;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.3);
        }
        
        .star-pattern-bg:nth-child(5n) {
          animation-delay: 3s;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.5);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
        }
        
        .star-pattern-bg:nth-child(7n) {
          animation-delay: 1.5s;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      {/* Initial white background that fades out */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-white to-gray-50 will-change-transform"
        style={{
          opacity: 1 - scrollProgress,
          zIndex: -3,
          transition: 'opacity 0.15s ease-out'
        }}
      />
      
      {/* Blue background that fades in */}
      <div 
        className="fixed inset-0 will-change-transform"
        style={{
          background: 'linear-gradient(to bottom right, #1e3a8a 0%, #1e293b 100%)',
          opacity: scrollProgress,
          zIndex: -2,
          transition: 'opacity 0.15s ease-out'
        }}
      />
      
      {/* Stars layer */}
      <div 
        className="star-background-layer will-change-transform"
        style={{ 
          opacity: scrollProgress * scrollProgress, // Quadratic easing for stars
          zIndex: -1,
          transition: 'opacity 0.15s ease-out'
        }}
      >
        {[...Array(100)].map((_, i) => (
          <span 
            key={i} 
            className="star-pattern-bg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            ★
          </span>
        ))}
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}