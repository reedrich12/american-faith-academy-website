'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';

const FinalCTASection = () => {
  const floatingElements = [
    { icon: Star, delay: 0, x: '10%', y: '20%', duration: 6 },
    { icon: Heart, delay: 1, x: '85%', y: '15%', duration: 8 },
    { icon: BookOpen, delay: 2, x: '15%', y: '80%', duration: 7 },
    { icon: Star, delay: 3, x: '80%', y: '75%', duration: 9 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-patriot-50 via-white to-navy-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B22234' fill-opacity='0.1'%3E%3Cpolygon points='50,0 60,35 100,35 70,57 80,91 50,70 20,91 30,57 0,35 40,35'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-patriot-200"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-8 h-8 opacity-40" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <AnimatedSection>
          {/* Main Headline */}
          <motion.h2 
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join AFA - Where Minds{' '}
            <motion.span 
              className="text-patriot relative inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(178, 34, 52, 0)",
                  "0 0 30px rgba(178, 34, 52, 0.4)",
                  "0 0 0px rgba(178, 34, 52, 0)"
                ]
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              Soar
            </motion.span>
            {' '}and Faith Takes{' '}
            <motion.span 
              className="text-patriot relative inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(178, 34, 52, 0)",
                  "0 0 30px rgba(178, 34, 52, 0.4)",
                  "0 0 0px rgba(178, 34, 52, 0)"
                ]
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            >
              Flight!
            </motion.span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p 
            className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            An education worthy of our children.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-12 py-6 text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group mb-8"
              asChild
            >
              <Link href="/admissions">
                Start Your Journey Today
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>

          {/* Secondary Options */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group"
              asChild
            >
              <Link href="/contact">
                Schedule a Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-patriot text-patriot hover:bg-patriot hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group"
              asChild
            >
              <Link href="/about">
                Learn More About AFA
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: BookOpen,
                title: "Classical Excellence",
                description: "Time-tested educational methods proven to develop critical thinking"
              },
              {
                icon: Heart,
                title: "Faith-Centered",
                description: "Biblical worldview integrated throughout all subjects and activities"
              },
              {
                icon: Star,
                title: "Personalized Learning",
                description: "AI-powered technology adapts to each student's unique needs"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-serif text-xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Final Encouragement */}
          <motion.div 
            className="mt-16 p-8 bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-xl md:text-2xl text-gray-700 italic font-medium mb-4">
              "The best time to plant a tree was 20 years ago. The second best time is now."
            </blockquote>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't wait another day to give your child the education they deserve. 
              Join the American Faith Academy family and watch your child soar to new heights.
            </p>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent" />
    </section>
  );
};

export default FinalCTASection;