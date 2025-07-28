'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, BookOpen, GraduationCap, Heart } from 'lucide-react';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingElements = [
    { icon: BookOpen, delay: 0, x: '10%', y: '20%' },
    { icon: GraduationCap, delay: 1, x: '80%', y: '30%' },
    { icon: Heart, delay: 2, x: '15%', y: '70%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-50 via-white to-patriot-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B22234' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-patriot-200"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-12 h-12 opacity-30" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10" ref={heroRef}>
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
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(178, 34, 52, 0)",
                  "0 0 20px rgba(178, 34, 52, 0.3)",
                  "0 0 0px rgba(178, 34, 52, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Soar
            </motion.span>
            {' '}and Faith Takes{' '}
            <motion.span 
              className="text-patriot relative inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(178, 34, 52, 0)",
                  "0 0 20px rgba(178, 34, 52, 0.3)",
                  "0 0 0px rgba(178, 34, 52, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
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
            Uniting Classic Wisdom, Modern Technology, and an Enduring Community for Lasting Impact
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
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsApplicationOpen(true)}
            >
              Discover How Your Child Can Soar
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              onClick={() => setIsCalendarOpen(true)}
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
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="cursor-pointer"
              onClick={() => {
                const nextSection = document.querySelector('#soar-framework');
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ChevronDown className="w-6 h-6 text-patriot" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      
      {/* Admissions Application Form Modal */}
      <FormModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
      
      {/* Calendar Modal for Discovery Call */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
};

export default HeroSection;