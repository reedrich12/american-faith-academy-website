'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function NotFound() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const quickLinks = [
    { href: '/about', label: 'About Us', icon: GraduationCap },
    { href: '/academics', label: 'Academic Programs', icon: GraduationCap },
    { href: '/admissions', label: 'Admissions', icon: GraduationCap },
    { href: '/contact', label: 'Contact Us', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 via-white to-patriot-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
        >
          {/* 404 Display */}
          <div className="mb-8">
            <motion.h1 
              className="font-serif text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy to-patriot"
              initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.1 }}
            >
              404
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4"
              initial={prefersReducedMotion ? {} : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.2 }}
            >
              Page Not Found
            </motion.p>
          </div>

          {/* Error Message */}
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            We couldn't find the page you're looking for. It might have been moved, 
            deleted, or perhaps it never existed.
          </p>

          {/* Search Icon Animation */}
          <motion.div 
            className="mb-8 flex justify-center"
            animate={prefersReducedMotion ? {} : { 
              rotate: [0, -10, 10, -10, 0] 
            }}
            transition={prefersReducedMotion ? {} : { 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 2 
            }}
          >
            <Search className="w-16 h-16 text-gray-400" aria-hidden="true" />
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" role="group" aria-label="Navigation options">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Go Back
            </Button>
            
            <Link href="/" passHref legacyBehavior>
              <Button
                className="bg-patriot hover:bg-patriot-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-patriot"
                aria-label="Return to homepage"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Here are some helpful links:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list" aria-label="Quick navigation links">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  role="listitem"
                  initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? {} : { duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group focus:ring-2 focus:ring-offset-2 focus:ring-patriot"
                  >
                    <link.icon className="w-8 h-8 text-gray-400 group-hover:text-patriot transition-colors mb-2" aria-hidden="true" />
                    <span className="text-sm text-gray-700 group-hover:text-patriot transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}