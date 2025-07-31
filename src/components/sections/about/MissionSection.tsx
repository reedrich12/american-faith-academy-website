'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Target, Users, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface VisionStat {
  number: string;
  label: string;
}

const MissionSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const pillars: Pillar[] = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "We provide rigorous, classical education that develops critical thinking, intellectual curiosity, and a love of learning that lasts a lifetime.",
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Heart,
      title: "Spiritual Formation",
      description: "Every aspect of our curriculum is designed to help students develop a biblical worldview and grow in their relationship with God.",
      color: "from-patriot-500 to-patriot-600"
    },
    {
      icon: Target,
      title: "Character Development",
      description: "We cultivate virtue, integrity, and moral courage, preparing students to be leaders who make a positive impact in their communities.",
      color: "from-navy-500 to-navy-600"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Our graduates are equipped not just for personal success, but to serve others and contribute meaningfully to society.",
      color: "from-patriot-500 to-patriot-600"
    }
  ];

  const visionStats: VisionStat[] = [
    { number: "100%", label: "College & Career Ready" },
    { number: "95%", label: "Faith Retention Rate" },
    { number: "∞", label: "Kingdom Impact" }
  ];

  const pulseAnimation = prefersReducedMotion
    ? {}
    : {
        boxShadow: [
          "0 0 0 0 rgba(178, 34, 52, 0.4)",
          "0 0 0 30px rgba(178, 34, 52, 0)",
          "0 0 0 0 rgba(178, 34, 52, 0.4)"
        ]
      };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="py-20 bg-navy text-white relative overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-patriot-500 to-patriot-600 rounded-full flex items-center justify-center"
            animate={pulseAnimation}
            transition={{ duration: 3, repeat: Infinity }}
            role="presentation"
          >
            <Target className="w-12 h-12 text-white" aria-hidden="true" />
          </motion.div>

          <h2 
            id="mission-heading"
            className="font-serif text-4xl md:text-5xl font-bold mb-8"
          >
            Our Mission
          </h2>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto mb-12"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Mission statement"
          >
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed">
              "To provide an education worthy of our children—one that develops brilliant minds, 
              faithful hearts, and prepares students to make a lasting impact in their communities 
              and the world."
            </blockquote>
          </motion.div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This mission drives everything we do, from curriculum development to teacher training, 
            from technology integration to community partnerships.
          </p>
        </AnimatedSection>

        {/* Mission Pillars */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          role="list"
          aria-label="Mission pillars"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.2}>
                <motion.article 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group h-full"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  role="listitem"
                >
                  <motion.div 
                    className={`w-16 h-16 mb-6 bg-gradient-to-r ${pillar.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    role="presentation"
                  >
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </motion.div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-4 group-hover:text-patriot-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.article>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Vision Statement */}
        <AnimatedSection delay={0.8}>
          <div 
            className="text-center"
            role="region"
            aria-labelledby="vision-heading"
          >
            <h3 
              id="vision-heading"
              className="font-serif text-3xl font-bold mb-6"
            >
              Our Vision
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto mb-8">
              <p className="text-xl leading-relaxed mb-6">
                We envision a generation of students who soar academically and spiritually—young people 
                who think critically, love deeply, and lead courageously. Our graduates will be equipped 
                to excel in any field they choose while remaining grounded in biblical truth and committed 
                to serving others.
              </p>
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
                role="list"
                aria-label="Vision statistics"
              >
                {visionStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    role="listitem"
                  >
                    <div 
                      className="text-3xl font-bold text-patriot-300 mb-2"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link 
                href="/admissions"
                aria-label="Join our mission by starting the admissions process"
              >
                Join Our Mission Today
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MissionSection;