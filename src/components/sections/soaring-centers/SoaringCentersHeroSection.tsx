'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Heart, ChevronDown, GraduationCap, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import FormModal from '@/components/ui/form-modal';

const SoaringCentersHeroSection = () => {
  const [isSoaringFormOpen, setIsSoaringFormOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add smooth scrolling behavior with parallax effect
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
  
  const opportunities = [
    {
      icon: Building2,
      title: "Church Partnership",
      description: "Transform your church into a thriving learning center"
    },
    {
      icon: Users,
      title: "Edupreneur Program",
      description: "Build a successful education business in your community"
    },
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Join our expanding network of successful centers"
    },
    {
      icon: Heart,
      title: "Kingdom Impact",
      description: "Make a lasting difference in children's lives"
    }
  ];

  const floatingElements = [
    { icon: Building2, delay: 0, x: '10%', y: '20%' },
    { icon: GraduationCap, delay: 1, x: '80%', y: '30%' },
    { icon: BookOpen, delay: 2, x: '15%', y: '70%' },
    { icon: Heart, delay: 1.5, x: '85%', y: '60%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-patriot-50 via-white to-navy-50">
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
      <div className="container mx-auto px-4 relative z-10" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
              Transform Your Community Through Classical Christian Education
            </h1>
            <h2 className="text-2xl md:text-3xl text-patriot font-semibold mb-6">
              Make a Difference While Making a Living—Or Fulfill Your Church's Educational Mission
            </h2>
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                Join the American Faith Academy network and bring exceptional classical Christian 
                education to your community. Whether you're a church looking to expand your ministry 
                or an entrepreneur passionate about education, we provide everything you need to succeed.
              </p>
              <p>
                Our proven model combines the best of classical education with modern technology, 
                creating opportunities for both ministry impact and business success.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsSoaringFormOpen(true)}
              >
                Church Partnership
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                onClick={() => setIsSoaringFormOpen(true)}
              >
                Edupreneur Program
              </Button>
            </div>
          </AnimatedSection>

          {/* Opportunities Grid */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group h-full">
                    <CardContent className="p-0">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <opportunity.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="font-serif text-xl font-bold text-navy mb-3">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {opportunity.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="text-sm text-gray-500 mb-2">Discover Two Paths</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={() => {
              const nextSection = document.querySelector('#two-paths');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="w-6 h-6 text-patriot" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      
      {/* Soaring Center Discovery / Edupreneur Form Modal */}
      <FormModal
        isOpen={isSoaringFormOpen}
        onClose={() => setIsSoaringFormOpen(false)}
        formId="NwX4RaS1RAnoDiIgMein"
        formHeight="893px"
        formTitle="Soaring Center Discovery"
      />
    </section>
  );
};

export default SoaringCentersHeroSection;