'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, Heart, Target } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const AboutHeroSection = () => {
  const statistics = [
    {
      icon: Users,
      value: "2,500+",
      label: "Students Served",
      description: "Across our growing network"
    },
    {
      icon: BookOpen,
      value: "50+",
      label: "Soaring Centers",
      description: "In communities nationwide"
    },
    {
      icon: Heart,
      value: "95%",
      label: "Family Satisfaction",
      description: "Based on annual surveys"
    },
    {
      icon: Target,
      value: "100%",
      label: "Faith-Centered",
      description: "Biblical worldview integration"
    }
  ];

  const values = [
    "Biblical Truth",
    "Classical Excellence", 
    "Personalized Learning",
    "Community Impact",
    "Character Development",
    "Academic Rigor"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 via-white to-patriot-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
              Restoring Education to Its Noble Purpose
            </h1>
            <h2 className="text-2xl md:text-3xl text-patriot font-semibold mb-6">
              American Faith Academy was founded on the conviction that every child deserves 
              an education that develops both brilliant minds and faithful hearts.
            </h2>
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                In a world where education has lost its way, we stand as a beacon of hope—
                combining the time-tested wisdom of classical education with the innovative 
                power of modern technology, all grounded in biblical truth.
              </p>
              <p>
                Our mission is simple yet profound: to provide an education worthy of our children, 
                one that prepares them not just for college or career, but for a life of purpose, 
                impact, and faithful service to God and others.
              </p>
            </div>

            {/* Key Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200 hover:border-patriot-300 hover:bg-patriot-50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-navy">{value}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Statistics */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-0">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <motion.div 
                        className="text-4xl font-bold text-patriot mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {stat.value}
                      </motion.div>
                      
                      <h3 className="font-semibold text-navy mb-2">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement Callout */}
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-r from-navy-50 to-patriot-50 rounded-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-lg text-gray-700 italic text-center">
                "Education is the most powerful weapon which you can use to change the world. 
                We believe that weapon should be wielded with wisdom, truth, and love."
              </blockquote>
              <p className="text-center text-sm text-gray-500 mt-2">
                — AFA Founding Principle
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;