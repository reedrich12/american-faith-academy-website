'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, BookOpen, GraduationCap, Heart } from 'lucide-react';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';
import { useModal, useScrolled } from '@/hooks';
import type { HeroSectionProps } from '@/types';

// Type for floating elements
interface FloatingElement {
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  x: string;
  y: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title = "Where Minds Soar and Faith Takes Flight",
  subtitle = "Uniting Classic Wisdom, Modern Technology, and an Enduring Community for Lasting Impact",
  ctaText = "Discover How Your Child Can Soar",
  onCtaClick
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isScrolled = useScrolled();
  
  // Use custom hooks for modals
  const applicationModal = useModal();
  const calendarModal = useModal();

  useEffect(() => {
    if (shouldReduceMotion) return; // Skip parallax if user prefers reduced motion
    
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY; // Modern API
        const parallax = scrolled * 0.3; // Reduced parallax effect
        
        // Use transform for better performance
        heroRef.current.style.transform = `translate3d(0, ${parallax}px, 0)`;
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [shouldReduceMotion]);

  const floatingElements: FloatingElement[] = [
    { icon: BookOpen, delay: 0, x: '10%', y: '20%' },
    { icon: GraduationCap, delay: 1, x: '80%', y: '30%' },
    { icon: Heart, delay: 2, x: '15%', y: '70%' },
  ];

  // Animation variants with reduced motion support
  const floatingAnimation = shouldReduceMotion ? {} : {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  };

  const glowAnimation = shouldReduceMotion ? {} : {
    animate: { 
      textShadow: [
        "0 0 0px rgba(178, 34, 52, 0)",
        "0 0 20px rgba(178, 34, 52, 0.3)",
        "0 0 0px rgba(178, 34, 52, 0)"
      ]
    },
    transition: { 
      duration: 3, 
      repeat: Infinity 
    }
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    applicationModal.open();
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#soar-framework');
    nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-50 via-white to-patriot-50"
      aria-label="Hero section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B22234' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* Floating Elements - Hidden from screen readers */}
      <div aria-hidden="true">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute text-patriot-200"
              style={{ left: element.x, top: element.y }}
              {...floatingAnimation}
              transition={{
                ...floatingAnimation.transition,
                delay: element.delay,
              }}
            >
              <Icon className="w-12 h-12 opacity-30" />
            </motion.div>
          );
        })}
      </div>

      <div 
        className="container mx-auto px-4 text-center relative z-10" 
        ref={heroRef}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Headline */}
          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-navy mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Where Minds{' '}
            <motion.span 
              className="text-patriot relative inline-block"
              {...glowAnimation}
            >
              Soar
            </motion.span>
            {' '}and Faith Takes{' '}
            <motion.span 
              className="text-patriot relative inline-block"
              {...glowAnimation}
              transition={{
                ...glowAnimation.transition,
                delay: 1.5
              }}
            >
              Flight
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {subtitle}
          </motion.h2>

          {/* Supporting Text */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            American Faith Academy blends time-tested classical Christian education with adaptive technology, 
            fostering strong local communities and empowering global influence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2"
              onClick={handleCtaClick}
              aria-label={ctaText}
            >
              {ctaText}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              onClick={calendarModal.open}
              aria-label="Schedule a Discovery Call"
            >
              Schedule a Discovery Call
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="text-sm text-gray-500 mb-2">Discover More</p>
            <button
              onClick={scrollToNextSection}
              className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2"
              aria-label="Scroll to next section"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-patriot" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      
      {/* Modals using custom hooks */}
      <FormModal
        isOpen={applicationModal.isOpen}
        onClose={applicationModal.close}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
      
      <CalendarModal
        isOpen={calendarModal.isOpen}
        onClose={calendarModal.close}
      />
    </section>
  );
};

export default HeroSection;