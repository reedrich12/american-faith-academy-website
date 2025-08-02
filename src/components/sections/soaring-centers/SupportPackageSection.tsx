'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';

import { ChevronDown, CheckCircle, Sparkles, Users, LineChart, Shield, Laptop, Award, MessageSquare, Calendar, FileText, Palette, Globe, BookOpen, Briefcase, LucideIcon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// TypeScript interfaces
interface SupportFeatures {
  included: string[];
  additional: string[];
}

interface SupportPillar {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
  features: SupportFeatures;
}

interface SupportIcon {
  icon: LucideIcon;
  label: string;
}

const SupportPackageSection = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const prefersReducedMotion = usePrefersReducedMotion();

  const supportPillars: SupportPillar[] = [
    {
      id: 'curriculum',
      title: 'Curriculum & Methodology',
      subtitle: 'Academic Excellence at Your Fingertips',
      highlights: [
        'S.O.A.R. Framework Integration',
        'Multi-Level Teaching Resources',
        'AI-Enhanced Learning Tools',
        'Classical Education Foundation'
      ],
      features: {
        included: [
          'Complete K-12 classical curriculum',
          'Teacher guides and lesson plans',
          'Assessment tools and rubrics',
          'Parent communication templates',
          'Student progress tracking system',
          'Digital resource library',
          'Quarterly curriculum updates'
        ],
        additional: [
          'Custom curriculum modifications',
          'Advanced placement materials',
          'Specialized learning support resources'
        ]
      }
    },
    {
      id: 'business',
      title: 'Business & Operational',
      subtitle: 'Everything You Need to Run Successfully',
      highlights: [
        'Business Planning Tools',
        'Financial Modeling',
        'Legal Compliance',
        'Technology Platform'
      ],
      features: {
        included: [
          'Business plan templates',
          'Financial projection models',
          'Enrollment management system',
          'Parent portal access',
          'Billing and payment processing',
          'Legal document templates',
          'Compliance checklists',
          'Insurance guidance'
        ],
        additional: [
          'Custom financial consulting',
          'Legal review services',
          'Advanced analytics dashboard'
        ]
      }
    },
    {
      id: 'training',
      title: 'Training & Development',
      subtitle: 'Continuous Growth and Support',
      highlights: [
        'Professional Development',
        'Community Network',
        'Mentorship Program',
        'Ongoing Support'
      ],
      features: {
        included: [
          'Initial 3-day intensive training',
          'Monthly webinar series',
          'Quarterly regional conferences',
          'Online learning platform access',
          'Peer mentorship matching',
          'Best practices library',
          '24/7 support community',
          'Annual national conference ticket'
        ],
        additional: [
          'On-site training visits',
          'Custom workshop development',
          'Executive coaching sessions'
        ]
      }
    },
    {
      id: 'marketing',
      title: 'Brand & Marketing',
      subtitle: 'National Brand Power, Local Impact',
      highlights: [
        'AFA Brand Strength',
        'Marketing Assets',
        'Digital Presence',
        'Campaign Support'
      ],
      features: {
        included: [
          'Professional website template',
          'Marketing material library',
          'Social media templates',
          'Email campaign tools',
          'Local SEO optimization',
          'Press release templates',
          'Community event guides',
          'National advertising inclusion'
        ],
        additional: [
          'Custom marketing campaigns',
          'Professional photography',
          'Video production services'
        ]
      }
    }
  ];

  const supportIcons: SupportIcon[] = [
    { icon: Users, label: 'Community' },
    { icon: LineChart, label: 'Analytics' },
    { icon: Shield, label: 'Compliance' },
    { icon: Laptop, label: 'Technology' },
    { icon: Award, label: 'Quality' },
    { icon: MessageSquare, label: 'Support' },
    { icon: Calendar, label: 'Events' },
    { icon: FileText, label: 'Resources' },
    { icon: Palette, label: 'Branding' },
    { icon: Globe, label: 'Network' },
    { icon: BookOpen, label: 'Curriculum' },
    { icon: Briefcase, label: 'Business' }
  ];

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const handleKeydown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard(index);
    }
  };

  const expandAll = () => {
    setExpandedCards(new Set([0, 1, 2, 3]));
  };

  const collapseAll = () => {
    setExpandedCards(new Set());
  };

  return (
    <section className="py-20" aria-labelledby="support-package-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="support-package-heading"
            className="font-serif text-5xl font-bold mb-6 text-white"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            What You Get: Complete Support for Success
          </h2>
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            Our comprehensive support system ensures you have everything needed to launch and grow
            a thriving Soaring Center. From proven curriculum to marketing power, we've got you covered.
          </motion.p>
        </AnimatedSection>

        {/* Demo controls */}
        <div className="text-center mb-10">
          <button 
            className="bg-transparent text-white border-2 border-white/80 px-6 py-3 rounded-lg font-semibold mr-4 transition-all hover:bg-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent"
            onClick={expandAll}
            aria-label="Expand all support pillar cards"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)'
            }}
          >
            Expand All Cards
          </button>
          <button 
            className="bg-transparent text-white border-2 border-white/80 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent"
            onClick={collapseAll}
            aria-label="Collapse all support pillar cards"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)'
            }}
          >
            Collapse All Cards
          </button>
        </div>

        {/* Four-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" role="list" aria-label="Support pillars">
          {supportPillars.map((pillar, index) => (
            <motion.div 
              key={pillar.id}
              role="listitem"
              className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group ${
                expandedCards.has(index) ? 'ring-4 ring-patriot shadow-2xl' : 'hover:shadow-xl'
              }`}
              onClick={() => toggleCard(index)}
              onKeyDown={(e) => handleKeydown(e, index)}
              tabIndex={0}
              aria-label={`${pillar.title} support details`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            >
              {/* Flag stripe pattern (hidden initially, shown on expand) */}
              {expandedCards.has(index) && !prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 0.08, scaleY: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: 'repeating-linear-gradient(to bottom, #B22234 0%, #B22234 7.69%, #FFFFFF 7.69%, #FFFFFF 15.38%)',
                    transformOrigin: 'top'
                  }}
                />
              )}
              
              {/* Canton overlay for first card */}
              {index === 0 && expandedCards.has(index) && !prefersReducedMotion && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-[26.92%] bg-navy pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
              )}

              <div className="relative z-10 p-6 bg-white/95">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy mb-1">{pillar.title}</h3>
                    <p className="text-sm text-gray-600">{pillar.subtitle}</p>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                      expandedCards.has(index) ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Highlights */}
                <div className="space-y-2" role="list" aria-label={`${pillar.title} highlights`}>
                  {pillar.highlights.map((highlight, idx) => (
                    <motion.div 
                      key={idx}
                      role="listitem"
                      className="flex items-center gap-2 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.05 }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Expanded Content */}
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ 
                    height: expandedCards.has(index) ? 'auto' : 0,
                    marginTop: expandedCards.has(index) ? 20 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t pt-5">
                    {/* Included Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                        Included in Partnership
                      </h4>
                      <div className="space-y-2" role="list">
                        {pillar.features.included.map((feature, idx) => (
                          <div key={idx} role="listitem" className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div>
                      <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                        Available Add-Ons
                      </h4>
                      <div className="space-y-2" role="list">
                        {pillar.features.additional.map((feature, idx) => (
                          <div key={idx} role="listitem" className="flex items-start gap-2 text-sm text-gray-700">
                            <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comprehensive Coverage Visual */}
        <AnimatedSection delay={0.5}>
          <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 lg:p-12 border-2 border-white/30" 
               style={{ 
                 boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1)' 
               }}>
            <h3 
              className="text-3xl font-bold text-center mb-12 text-white"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              360° Support Coverage
            </h3>
            
            {/* Support Icons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12" role="list" aria-label="Support coverage areas">
              {supportIcons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    role="listitem"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-2 border-2 border-white/80"
                         style={{
                           boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(5px)'
                         }}>
                      <Icon className="w-8 h-8 text-white" style={{ 
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                      }} 
                      aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium" style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                    }}>{item.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Value Proposition */}
            <div className="text-center">
              <motion.p 
                className="text-xl font-semibold mb-4 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                }}
              >
                Total Partnership Value: <span 
                  className="text-3xl text-white"
                  style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                  }}
                >$250,000+</span>
              </motion.p>
              <p className="max-w-2xl mx-auto" style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}>
                Access resources and support that would cost over a quarter million dollars to develop independently, 
                all included in your partnership.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SupportPackageSection;