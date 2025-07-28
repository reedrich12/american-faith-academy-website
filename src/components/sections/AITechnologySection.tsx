'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, BarChart3, Lightbulb, Zap, Cpu } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';

const AITechnologySection = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Learning Plans",
      description: "Math and Language Arts are student-paced, while other subjects follow school-paced structure for community engagement.",
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: BarChart3,
      title: "Clear, Actionable Insights",
      description: "Parents receive real-time updates on progress and areas for improvement.",
      color: "from-patriot-500 to-patriot-600"
    },
    {
      icon: Lightbulb,
      title: "Passion-Driven Learning",
      description: "AI connects challenging subjects to topics students love, making learning engaging and relevant.",
      color: "from-navy-500 to-navy-600"
    }
  ];

  const techElements = [
    { icon: Brain, delay: 0, x: '15%', y: '20%' },
    { icon: Cpu, delay: 1, x: '80%', y: '15%' },
    { icon: Zap, delay: 2, x: '10%', y: '70%' },
    { icon: Target, delay: 3, x: '85%', y: '75%' },
  ];

  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Floating Tech Elements */}
      {techElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-patriot-300 opacity-20"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-16 h-16" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-patriot-500 to-patriot-600 rounded-full flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(178, 34, 52, 0.4)",
                "0 0 0 30px rgba(178, 34, 52, 0)",
                "0 0 0 0 rgba(178, 34, 52, 0.4)"
              ]
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Learning That Adapts to Your Child's Unique Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our AI-driven system meets students where they are, adapting lessons to their pace 
            and connecting learning to their passions.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Interactive AI Demo Widget */}
        <AnimatedSection delay={0.6}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="font-serif text-3xl font-bold text-center mb-8">
              See AI Personalization in Action
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Demo Interface */}
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-white">Student Profile: Sarah, Age 12</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Learning Style:</span>
                      <span className="text-patriot-200 font-medium">Visual Learner</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interests:</span>
                      <span className="text-patriot-200 font-medium">Art, Animals</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Level:</span>
                      <span className="text-patriot-200 font-medium">Grade 7 Math</span>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="bg-white/20 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold mb-2 text-white">AI Recommendation:</h4>
                  <p className="text-sm text-gray-100">
                    "Let's explore fractions using art! We'll create a beautiful mandala pattern 
                    while learning about equivalent fractions and proportions."
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white/20 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold mb-2 text-white">Progress Tracking:</h4>
                  <div className="space-y-2">
                    {[
                      { skill: "Fraction Basics", progress: 95 },
                      { skill: "Equivalent Fractions", progress: 78 },
                      { skill: "Mixed Numbers", progress: 45 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-100">{item.skill}</span>
                        <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                          <motion.div 
                            className="h-2 bg-gradient-to-r from-patriot-400 to-patriot-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-sm text-patriot-200 font-medium">{item.progress}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Visual Representation */}
              <div className="relative">
                <motion.div 
                  className="w-full h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Animated Data Flow */}
                  <svg className="absolute inset-0 w-full h-full">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <motion.circle
                        key={index}
                        cx={`${20 + index * 15}%`}
                        cy="50%"
                        r="4"
                        fill="#B22234"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, 50, 100]
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1
                        }}
                      />
                    ))}
                  </svg>
                  
                  <div className="text-center z-10">
                    <Brain className="w-16 h-16 text-patriot-400 mx-auto mb-4" />
                    <p className="text-gray-100">AI Processing Student Data</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={0.8} className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/admissions">
              Experience the Power of Personalized Learning
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AITechnologySection;