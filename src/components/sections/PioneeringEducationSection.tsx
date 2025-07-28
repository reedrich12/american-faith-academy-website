'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';

const PioneeringEducationSection = () => {
  const statistics = [
    {
      icon: TrendingUp,
      value: "85%",
      label: "Students show 1-2 years acceleration",
      description: "with personalized tutoring approach"
    },
    {
      icon: Users,
      value: "92%",
      label: "Christian school graduates remain faithful",
      description: "into adulthood according to research"
    },
    {
      icon: BookOpen,
      value: "3x",
      label: "Deeper faith commitment",
      description: "in classical education students"
    },
    {
      icon: Award,
      value: "95%",
      label: "College acceptance rate",
      description: "for our graduating students"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
              Join the Future of Education: Where Innovation Meets Proven Excellence
            </h2>
            <h3 className="text-xl md:text-2xl text-patriot font-semibold mb-6">
              American Faith Academy blends time-tested classical education with adaptive technology, 
              empowering pioneering families to shape an educational model grounded in faith, data, and real-world results.
            </h3>
            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                At American Faith Academy, we've carefully crafted an educational model that blends time-tested 
                principles with innovative approaches. Research shows that children who attend Christian schools 
                are more likely to remain faithful into adulthood.
              </p>
              <p>
                The Good Soil Study highlights that students in classical education develop deeper faith commitment 
                and intellectual maturity. Studies on tutoring show personalized instruction can accelerate learning 
                by 1-2 years in just months.
              </p>
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-patriot text-patriot hover:bg-patriot hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              asChild
            >
              <Link href="/academics">
                See the Research That Guides Us
              </Link>
            </Button>
          </AnimatedSection>

          {/* Statistics Visualization */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                    <CardContent className="p-0">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 360 }}
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
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {stat.value}
                        </motion.span>
                      </motion.div>
                      
                      <h4 className="font-semibold text-navy mb-2">
                        {stat.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Interactive Data Visualization */}
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-r from-navy-50 to-patriot-50 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-navy mb-4 text-center">
                Research-Backed Results
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Faith Retention", percentage: 92 },
                  { label: "Academic Acceleration", percentage: 85 },
                  { label: "College Readiness", percentage: 95 },
                  { label: "Character Development", percentage: 88 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="h-2 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-sm font-bold text-patriot">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default PioneeringEducationSection;