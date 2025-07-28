'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Brain, Plane, Clock, GraduationCap, Briefcase } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const StudentTypesSection = () => {
  const studentTypes = [
    {
      icon: BookOpen,
      title: "Students Who Love to Learn",
      description: "For curious minds who thrive with challenging, engaging curriculum that goes beyond traditional boundaries.",
      benefits: ["Advanced coursework", "Self-paced learning", "Enrichment opportunities"],
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Brain,
      title: "Students With Learning Differences",
      description: "Personalized approaches that adapt to unique learning styles and help every student reach their potential.",
      benefits: ["Adaptive technology", "Multiple learning modalities", "Individual support"],
      color: "from-patriot-500 to-patriot-600"
    },
    {
      icon: Plane,
      title: "Military Families",
      description: "Consistent, portable education that travels with your family, maintaining continuity through transitions.",
      benefits: ["Location flexibility", "Consistent curriculum", "Military family support"],
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Clock,
      title: "Families That Need Flexibility",
      description: "Accommodating busy schedules, travel, and unique family circumstances without compromising quality.",
      benefits: ["Flexible scheduling", "Family-centered approach", "Work-life balance"],
      color: "from-patriot-500 to-patriot-600"
    },
    {
      icon: GraduationCap,
      title: "College-Bound Students",
      description: "Rigorous preparation for higher education with classical foundation and modern skills.",
      benefits: ["College prep courses", "Critical thinking skills", "Academic excellence"],
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Briefcase,
      title: "Career-Bound Students",
      description: "Practical skills and character development for students entering the workforce directly.",
      benefits: ["Real-world skills", "Character development", "Career readiness"],
      color: "from-patriot-500 to-patriot-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Is American Faith Academy Right for Your Student?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            American Faith Academy offers your child the education you've always wished for 
            and the one they truly deserve.
          </p>
        </AnimatedSection>

        {/* Modern Grid Layout with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {studentTypes.map((type, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
                  <CardContent className="p-8 relative">
                    {/* Top Accent Bar */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    
                    {/* Icon with Background */}
                    <div className="relative mb-6">
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-r ${type.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse"
                        }}
                      />
                      <div className={`relative w-20 h-20 mx-auto bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <type.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl font-bold text-navy mb-4 text-center group-hover:text-patriot transition-colors duration-300">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed mb-6">
                      {type.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <motion.div 
                          key={benefitIndex}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + benefitIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${type.color} flex-shrink-0`} />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Indicator */}
                    <motion.div 
                      className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center`}>
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Central Focus Element */}
        <AnimatedSection delay={0.7} className="mt-20">
          <div className="relative max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-r from-navy-500 to-patriot-500 rounded-3xl p-12 text-white text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <motion.div
                className="relative z-10"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse"
                }}
              >
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Every Student Can S.O.A.R.
                </h3>
                <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
                  Our proven framework ensures that regardless of learning style or background, 
                  every student receives the support they need to excel academically and spiritually.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-lg font-semibold">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span>Solid Foundation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span>Optimized Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span>Action-Oriented</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span>Ready for Impact</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.8} className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-navy mb-4">
              Ready to Discover Your Child's Perfect Learning Environment?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Every child is unique, and their education should be too. Let us help you find 
              the perfect fit for your student's needs and learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/admissions"
                className="inline-block bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey Today
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-block border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Consultation
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StudentTypesSection;