'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SoaringCentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Start transition immediately, complete by 60% of viewport
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.6), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
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
        className="fixed inset-0 bg-gradient-to-b from-white to-gray-50"
        style={{
          opacity: 1 - scrollProgress,
          zIndex: -3
        }}
      />
      
      {/* Blue background that fades in */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{
          background: 'linear-gradient(to bottom right, #1e3a8a 0%, #1e293b 100%)',
          opacity: scrollProgress,
          zIndex: -2
        }}
      />
      
      {/* Stars layer */}
      <div 
        className="star-background-layer"
        style={{ 
          opacity: scrollProgress,
          zIndex: -1
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