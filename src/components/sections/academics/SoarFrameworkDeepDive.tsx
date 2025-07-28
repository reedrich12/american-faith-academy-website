'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Cpu, Target, Rocket } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const SoarFrameworkDeepDive = () => {
  const frameworkDetails = [
    {
      icon: Building,
      letter: "S",
      title: "SOLID FOUNDATION",
      subtitle: "Built on God's Truth & Classical Excellence",
      details: [
        "Biblical worldview integration across all subjects",
        "Classical Trivium: Grammar, Logic, Rhetoric stages",
        "Character development through virtue-based learning",
        "Strong foundational skills in reading, writing, mathematics"
      ],
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Cpu,
      letter: "O",
      title: "OPTIMIZED BY TECHNOLOGY",
      subtitle: "AI-Enhanced Personalized Learning",
      details: [
        "Adaptive learning algorithms adjust to student pace",
        "Real-time progress tracking and assessment",
        "Personalized learning paths for each student",
        "Technology enhances, never replaces, human connection"
      ],
      color: "from-patriot-500 to-patriot-600"
    },
    {
      icon: Target,
      letter: "A",
      title: "ACTION-ORIENTED FAITH",
      subtitle: "Faith That Transforms the World",
      details: [
        "Service learning and community engagement",
        "Practical application of biblical principles",
        "Leadership development and character formation",
        "Mission-minded global perspective"
      ],
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Rocket,
      letter: "R",
      title: "READY FOR IMPACT",
      subtitle: "Prepared for Purpose and Success",
      details: [
        "College and career readiness preparation",
        "Critical thinking and problem-solving skills",
        "Communication and leadership abilities",
        "Entrepreneurial and innovative mindset"
      ],
      color: "from-patriot-500 to-patriot-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            The S.O.A.R. Framework: A Deep Dive
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive educational approach is built on four foundational pillars that work 
            together to develop the whole child—mind, heart, and character.
          </p>
        </AnimatedSection>

        <div className="space-y-16">
          {frameworkDetails.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mr-6`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-white font-bold text-3xl">{item.letter}</span>
                    </motion.div>
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-xl font-semibold text-patriot">
                        {item.subtitle}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {item.details.map((detail, detailIndex) => (
                      <motion.div 
                        key={detailIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} mt-2 flex-shrink-0`} />
                        <p className="text-gray-600 leading-relaxed">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-1">
                  <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center`}
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(178, 34, 52, 0.3)",
                            "0 0 0 20px rgba(178, 34, 52, 0)",
                            "0 0 0 0 rgba(178, 34, 52, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        <item.icon className="w-16 h-16 text-white" />
                      </motion.div>
                      <blockquote className="text-lg text-gray-700 italic">
                        "Excellence in education comes from the perfect integration of timeless wisdom 
                        and innovative methods, all grounded in biblical truth."
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoarFrameworkDeepDive;