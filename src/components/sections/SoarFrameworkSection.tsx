'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Cpu, Target, Rocket, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';

interface FrameworkItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  delay: number;
}

const SoarFrameworkSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const frameworkItems: FrameworkItem[] = [
    {
      icon: Building,
      title: "SOLID FOUNDATION",
      subtitle: "Built on God's Truth & Classical Excellence",
      description: "At American Faith Academy, we begin with a strong foundation grounded in God's truth and time-tested classical education. Our curriculum is built on the Trivium—Grammar, Logic, and Rhetoric—ensuring students develop critical thinking skills rooted in biblical wisdom.",
      color: "from-navy-500 to-navy-600",
      delay: 0,
    },
    {
      icon: Cpu,
      title: "OPTIMIZED BY TECHNOLOGY",
      subtitle: "AI-Enhanced Personalized Learning",
      description: "Our education model is enhanced by adaptive technology that meets students where they are. AI-driven personalization ensures each child receives instruction tailored to their learning style, pace, and interests while maintaining the rigor of classical education.",
      color: "from-patriot-500 to-patriot-600",
      delay: 0.2,
    },
    {
      icon: Target,
      title: "ACTION-ORIENTED FAITH",
      subtitle: "Faith That Transforms the World",
      description: "We are committed to helping students not just learn, but live out their faith in meaningful ways. Through service learning, community engagement, and real-world application, students develop the character and conviction to make a lasting impact.",
      color: "from-navy-500 to-navy-600",
      delay: 0.4,
    },
    {
      icon: Rocket,
      title: "READY FOR IMPACT",
      subtitle: "Prepared for Purpose and Success",
      description: "We prepare students to make a meaningful impact in their communities, careers, and the world. Whether pursuing higher education or entering the workforce, our graduates are equipped with the knowledge, skills, and character to excel and lead.",
      color: "from-patriot-500 to-patriot-600",
      delay: 0.6,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pulseAnimation = prefersReducedMotion 
    ? {} 
    : {
        boxShadow: [
          "0 0 0 0 rgba(178, 34, 52, 0.3)",
          "0 0 0 20px rgba(178, 34, 52, 0)",
          "0 0 0 0 rgba(178, 34, 52, 0.3)"
        ]
      };

  return (
    <section 
      id="soar-framework" 
      className="py-20 bg-gray-50"
      aria-labelledby="soar-framework-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="soar-framework-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Why Families Choose American Faith Academy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer an education worthy of your child—one that helps them reach their God-given potential 
            through our unique S.O.A.R. framework.
          </p>
        </AnimatedSection>

        {/* Desktop Layout with Center S.O.A.R. */}
        <div className="hidden md:block relative max-w-6xl mx-auto" role="presentation">
          {/* Grid with large center gap */}
          <div className="grid grid-cols-2 gap-40">
            {frameworkItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={index} delay={item.delay}>
                  <motion.article
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: item.delay }}
                  >
                    <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
                      <CardContent className="p-8 relative">
                        {/* Background Gradient */}
                        <div 
                          className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`} 
                          aria-hidden="true"
                        />
                        
                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                          whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          role="presentation"
                        >
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </motion.div>

                        {/* Content */}
                        <h3 className="font-serif text-2xl font-bold text-navy mb-2">
                          {item.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-patriot mb-4">
                          {item.subtitle}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Hover Effect */}
                        <motion.div 
                          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-patriot-500 to-patriot-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                          aria-hidden="true"
                        />
                      </CardContent>
                    </Card>
                  </motion.article>
                </AnimatedSection>
              );
            })}
          </div>

          {/* S.O.A.R. Circle - Positioned in center */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            role="presentation"
          >
            <AnimatedSection delay={0.8}>
              <motion.div 
                className="w-32 h-32 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center shadow-2xl"
                animate={pulseAnimation}
                transition={{ duration: 2, repeat: Infinity }}
                aria-label="S.O.A.R. - Solid foundation, Optimized by technology, Action-oriented faith, Ready for impact"
              >
                <span className="text-white font-serif font-bold text-3xl" aria-hidden="true">S.O.A.R.</span>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* SVG Lines - From card inner corners to circle edge */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            aria-hidden="true"
            role="presentation"
          >
            {/* Top left line - from card inner corner to circle edge */}
            <motion.line
              x1="calc(50% - 80px)"  // Card inner corner
              y1="calc(50% - 80px)"
              x2="calc(50% - 45px)"  // Circle edge at 45° angle (64px / √2 ≈ 45px)
              y2="calc(50% - 45px)"
              stroke="#B22234"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.3 } : { pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 1 }}
            />
            
            {/* Top right line - from card inner corner to circle edge */}
            <motion.line
              x1="calc(50% + 80px)"  // Card inner corner
              y1="calc(50% - 80px)"
              x2="calc(50% + 45px)"  // Circle edge at 45° angle
              y2="calc(50% - 45px)"
              stroke="#B22234"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.3 } : { pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 1.2 }}
            />

            {/* Bottom left line - from card inner corner to circle edge */}
            <motion.line
              x1="calc(50% - 80px)"  // Card inner corner
              y1="calc(50% + 80px)"
              x2="calc(50% - 45px)"  // Circle edge at 45° angle
              y2="calc(50% + 45px)"
              stroke="#B22234"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.3 } : { pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 1.4 }}
            />

            {/* Bottom right line - from card inner corner to circle edge */}
            <motion.line
              x1="calc(50% + 80px)"  // Card inner corner
              y1="calc(50% + 80px)"
              x2="calc(50% + 45px)"  // Circle edge at 45° angle
              y2="calc(50% + 45px)"
              stroke="#B22234"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 0.3 } : { pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 1.6 }}
            />
          </svg>
        </div>

        {/* Mobile Layout - Simple Grid */}
        <div className="md:hidden grid grid-cols-1 gap-8 max-w-6xl mx-auto">
          {frameworkItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={index} delay={item.delay}>
                <motion.article
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: item.delay }}
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
                    <CardContent className="p-8 relative">
                      <div 
                        className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`}
                        aria-hidden="true"
                      />
                      <motion.div 
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        role="presentation"
                      >
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </motion.div>
                      <h3 className="font-serif text-2xl font-bold text-navy mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-patriot mb-4">
                        {item.subtitle}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-patriot-500 to-patriot-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        aria-hidden="true"
                      />
                    </CardContent>
                  </Card>
                </motion.article>
              </AnimatedSection>
            );
          })}
          
          {/* Mobile S.O.A.R. - Show at bottom */}
          <AnimatedSection delay={0.8} className="mt-8">
            <div className="flex justify-center">
              <motion.div 
                className="w-32 h-32 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center shadow-2xl"
                animate={pulseAnimation}
                transition={{ duration: 2, repeat: Infinity }}
                aria-label="S.O.A.R. - Solid foundation, Optimized by technology, Action-oriented faith, Ready for impact"
              >
                <span className="text-white font-serif font-bold text-3xl" aria-hidden="true">S.O.A.R.</span>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SoarFrameworkSection;