'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Cross, Shield, Lightbulb, Users, Heart, Star, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  benefits: string[];
}

interface ValueApplication {
  title: string;
  description: string;
}

const ValuesSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const values: Value[] = [
    {
      icon: Cross,
      title: "Biblical Truth",
      description: "Scripture is our foundation for all learning and living. We integrate biblical principles into every subject and decision.",
      color: "from-navy-500 to-navy-600",
      benefits: ["Scripture-based learning", "Biblical worldview", "Faith integration"]
    },
    {
      icon: Shield,
      title: "Academic Excellence",
      description: "We pursue the highest standards in education, challenging students to reach their God-given potential.",
      color: "from-patriot-500 to-patriot-600",
      benefits: ["Rigorous curriculum", "High standards", "Academic achievement"]
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace technology and new methods while honoring time-tested educational principles.",
      color: "from-navy-500 to-navy-600",
      benefits: ["Cutting-edge technology", "Modern methods", "Classical foundation"]
    },
    {
      icon: Users,
      title: "Community",
      description: "Education is a collaborative effort involving students, families, teachers, and the broader community.",
      color: "from-patriot-500 to-patriot-600",
      benefits: ["Strong relationships", "Family partnership", "Supportive environment"]
    },
    {
      icon: Heart,
      title: "Character",
      description: "We develop virtue, integrity, and moral courage alongside academic achievement.",
      color: "from-navy-500 to-navy-600",
      benefits: ["Virtue development", "Moral formation", "Leadership skills"]
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in all we do, as an act of worship and service to God and others.",
      color: "from-patriot-500 to-patriot-600",
      benefits: ["Pursuit of excellence", "Service mindset", "God-honoring work"]
    }
  ];

  const valueApplications: ValueApplication[] = [
    {
      title: "In Our Curriculum",
      description: "Every lesson integrates biblical truth with academic excellence, fostering both intellectual growth and spiritual formation."
    },
    {
      title: "In Our Community",
      description: "We build strong relationships between students, families, and teachers, creating a supportive learning environment."
    },
    {
      title: "In Our Innovation",
      description: "We use cutting-edge technology and methods while staying true to time-tested educational principles."
    }
  ];

  const cardVariants = {
    hover: prefersReducedMotion ? {} : { y: -8 }
  };

  const scaleAnimation = prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.1, 1],
      };

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const applicationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="values-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="values-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            These six values form the foundation of everything we do at American Faith Academy. 
            They guide our decisions, shape our culture, and define our character.
          </p>
        </AnimatedSection>

        {/* Modern Grid Layout with Staggered Animation */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          role="list"
          aria-label="Core values of American Faith Academy"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.article
                  whileHover={cardVariants.hover}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                  role="listitem"
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
                    <CardContent className="p-8 relative">
                      {/* Top Accent Bar */}
                      <div 
                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                        aria-hidden="true"
                      />
                      
                      {/* Icon with Background */}
                      <div className="relative mb-6">
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                          animate={scaleAnimation}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          aria-hidden="true"
                        />
                        <div className={`relative w-20 h-20 mx-auto bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-serif text-2xl font-bold text-navy mb-4 text-center group-hover:text-patriot transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-center leading-relaxed mb-6">
                        {value.description}
                      </p>

                      {/* Benefits List */}
                      <ul 
                        className="space-y-2"
                        role="list"
                        aria-label={`Benefits of ${value.title}`}
                      >
                        {value.benefits.map((benefit, benefitIndex) => (
                          <motion.li 
                            key={benefitIndex}
                            className="flex items-center space-x-3"
                            variants={benefitVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: 0.3 + benefitIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div 
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${value.color} flex-shrink-0`}
                              aria-hidden="true"
                            />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Hover Indicator */}
                      <motion.div 
                        className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center`}>
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.article>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Values in Action */}
        <AnimatedSection delay={0.8} className="mt-16">
          <div 
            className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center border border-gray-200"
            role="region"
            aria-labelledby="values-action-heading"
          >
            <h3 
              id="values-action-heading"
              className="font-serif text-3xl font-bold text-navy mb-6"
            >
              Values in Action
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our values aren't just words on a wall—they're lived out daily in our classrooms, 
              our relationships, and our commitment to excellence in everything we do.
            </p>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="How our values are applied"
            >
              {valueApplications.map((application, index) => (
                <motion.article
                  key={index}
                  className="text-center"
                  variants={applicationVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <h4 className="font-semibold text-lg text-navy mb-2">{application.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{application.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ValuesSection;