'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Loading() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 via-white to-patriot-50">
      <div className="text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          className="mb-8"
        >
          {/* Logo Animation */}
          <div className="relative inline-block">
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={prefersReducedMotion ? {} : { 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 w-24 h-24 border-4 border-dashed border-navy-200 rounded-full"
            />
            
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={prefersReducedMotion ? {} : { 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 w-24 h-24 border-4 border-dashed border-patriot-200 rounded-full"
              style={{ borderStyle: 'dashed' }}
            />
            
            <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-12 h-12 text-navy" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={prefersReducedMotion ? {} : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.1 }}
        >
          <h2 className="font-serif text-2xl font-bold text-navy mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing your educational journey
          </p>
        </motion.div>

        {/* Animated Loading Dots */}
        <div className="mt-8 flex justify-center items-center gap-2" role="status" aria-label="Loading">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-patriot rounded-full"
              animate={prefersReducedMotion ? {} : {
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={prefersReducedMotion ? {} : {
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>

        {/* Accessibility Text */}
        <span className="sr-only">Loading American Faith Academy content</span>
      </div>
    </div>
  );
}