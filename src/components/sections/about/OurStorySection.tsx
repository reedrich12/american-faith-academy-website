'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lightbulb, Rocket, Star } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const OurStorySection = () => {
  const timelineItems = [
    {
      icon: AlertTriangle,
      title: "The Problem Identified",
      year: "2020",
      description: "We recognized that traditional education was failing our children—lacking both academic rigor and moral foundation. Families were struggling to find educational options that aligned with their values while preparing students for success.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Lightbulb,
      title: "The Solution Developed",
      year: "2021",
      description: "Our founders began developing a revolutionary approach that combined classical Christian education with adaptive AI technology. The S.O.A.R. framework was born—Solid foundation, Optimized by technology, Action-oriented faith, Ready for impact.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Rocket,
      title: "The Mission Launched",
      year: "2022",
      description: "American Faith Academy officially launched with our first Soaring Centers and Solo Flights program. Families immediately embraced our unique blend of time-tested wisdom and innovative technology.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Star,
      title: "The Future We're Building",
      year: "2024+",
      description: "Today, we're expanding nationwide, partnering with churches and edupreneurs to bring exceptional Christian education to every community. Our vision: a generation of students who soar academically and spiritually.",
      color: "from-patriot-500 to-patriot-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Why We Exist
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our story begins with a simple conviction: every child deserves an education that 
            honors God, challenges the mind, and prepares them for a life of purpose and impact.
          </p>
        </AnimatedSection>

        {/* Interactive Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-200 via-yellow-200 via-blue-200 to-patriot-200 rounded-full" />

          {timelineItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <div className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content Card */}
                <motion.div 
                  className="w-5/12"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mr-4`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-navy">
                            {item.title}
                          </h3>
                          <span className="text-patriot font-semibold">{item.year}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Timeline Node */}
                <motion.div 
                  className="w-2/12 flex justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} border-4 border-white shadow-lg relative z-10`}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(178, 34, 52, 0.3)",
                        "0 0 0 10px rgba(178, 34, 52, 0)",
                        "0 0 0 0 rgba(178, 34, 52, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  />
                </motion.div>

                {/* Spacer */}
                <div className="w-5/12" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mission Statement */}
        <AnimatedSection delay={0.8} className="mt-16">
          <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center border border-gray-200">
            <h3 className="font-serif text-3xl font-bold text-navy mb-6">
              Our Mission Today
            </h3>
            <blockquote className="text-xl md:text-2xl text-gray-700 italic font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
              "To provide an education worthy of our children—one that develops brilliant minds, 
              faithful hearts, and prepares students to make a lasting impact in their communities 
              and the world."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Academic Excellence",
                  description: "Rigorous classical education that develops critical thinking and intellectual curiosity"
                },
                {
                  title: "Spiritual Formation",
                  description: "Biblical worldview integration that shapes character and faith"
                },
                {
                  title: "Real-World Impact",
                  description: "Practical preparation for leadership and service in every sphere of life"
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-lg text-navy mb-2">{pillar.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OurStorySection;