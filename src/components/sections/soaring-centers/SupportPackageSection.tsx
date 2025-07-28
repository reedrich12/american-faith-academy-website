'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Sparkles,
  Users,
  LineChart,
  Shield,
  Laptop,
  Award,
  MessageSquare,
  Calendar,
  FileText,
  Palette,
  Globe,
  BookOpen,
  Briefcase
} from 'lucide-react';

const SupportPackageSection = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const supportPillars = [
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
    <>
      <style jsx={true} global={true}>{`
        /* Layout #1: Static Grid Implementation */
        
        /* Flag segment pseudo-elements on cards */
        .flag-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            animation: slideUp 0.6s ease-out backwards;
        }

        .flag-card:nth-child(1) { animation-delay: 0.1s; }
        .flag-card:nth-child(2) { animation-delay: 0.2s; }
        .flag-card:nth-child(3) { animation-delay: 0.3s; }
        .flag-card:nth-child(4) { animation-delay: 0.4s; }

        .flag-card:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .flag-card.expanded {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .flag-card::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 0;
            /* Start with scaleY(0) for vertical reveal */
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.3s ease-in-out;
            /* Base flag stripes */
            background-image: repeating-linear-gradient(
                to bottom,
                #B22234 0%,
                #B22234 7.69%,
                #FFFFFF 7.69%,
                #FFFFFF 15.38%
            );
        }

        /* Reveal flag when card is expanded */
        .flag-card.expanded::before {
            transform: scaleY(1);
            opacity: 1;
        }

        /* Position each card's flag segment using background-position */
        .flag-card-0::before {
            background-position: 0 0;
        }

        .flag-card-1::before {
            background-position: -100% 0;
        }

        .flag-card-2::before {
            background-position: -200% 0;
        }

        .flag-card-3::before {
            background-position: -300% 0;
        }

        /* Canton overlay for first card only */
        .flag-card-0::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 26.92%;
            background-color: #3C3B6E;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.3s ease-in-out 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .flag-card-0.expanded::after {
            opacity: 1;
        }

        /* Stars in canton (using CSS content for simplicity) */
        .canton-stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 26.92%;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 8px 12px;
            opacity: 0;
            transition: opacity 0.4s ease-in-out 0.5s;
        }

        .flag-card-0.expanded .canton-stars {
            opacity: 1;
        }

        .star-row {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
        }

        .star-row.offset {
            padding: 0 8%;
        }

        .star {
            color: white;
            font-size: 0.4rem;
            animation: twinkle 3s ease-in-out infinite;
        }

        .star:nth-child(even) {
            animation-delay: 0.5s;
        }

        @media (min-width: 768px) {
            .star {
                font-size: 0.5rem;
            }
        }

        @media (min-width: 1024px) {
            .star {
                font-size: 0.6rem;
            }
            .canton-stars {
                padding: 6px 10px;
            }
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }

        /* Content overlay to ensure readability */
        .flag-content-wrapper {
            position: relative;
            background-color: rgba(255, 255, 255, 0.95);
            z-index: 10;
            height: 100%;
            transition: background-color 0.3s ease;
            padding: 24px;
            border-radius: 12px;
        }

        .flag-card.expanded .flag-content-wrapper {
            background-color: rgba(255, 255, 255, 0.92);
        }

        /* Responsive grid adjustments */
        @media (max-width: 1023px) {
            /* On smaller screens, cards stack so flag segments don't align */
            .flag-card::before {
                background-size: 100% 100%;
            }
        }

        @media (min-width: 1024px) {
            /* Full desktop: ensure flag segments align perfectly */
            .flag-card::before {
                width: 400%;
                background-size: 400% 100%;
            }
        }

        /* Card header */
        .card-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .card-header-text {
            flex: 1;
        }

        .arrow-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            transition: transform 0.3s ease;
            color: #9ca3af;
        }

        .expanded .arrow-button {
            transform: rotate(180deg);
        }

        h3 {
            font-size: 20px;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 4px;
        }

        .card-subtitle {
            font-size: 14px;
            color: #6b7280;
        }

        .highlights {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 16px;
        }

        .highlight-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #374151;
        }

        .sparkle {
            color: #eab308;
            font-size: 16px;
        }

        /* Expanded content */
        .expanded-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.6s ease;
            margin-top: 0;
        }

        .expanded .expanded-content {
            max-height: 800px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }

        .features-title {
            font-weight: 600;
            color: #1e3a8a;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
        }

        .features-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 20px;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            font-size: 14px;
            color: #374151;
        }

        .check-icon {
            color: #10b981;
            flex-shrink: 0;
            margin-top: 2px;
            font-size: 14px;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Demo controls */
        .demo-controls {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: transparent;
            border-radius: 12px;
        }

        .demo-button {
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.8);
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 8px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 
                        inset 0 0 20px rgba(255, 255, 255, 0.1);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(5px);
        }

        .demo-button:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 
                        0 4px 6px rgba(0, 0, 0, 0.1),
                        inset 0 0 20px rgba(255, 255, 255, 0.2);
            border-color: white;
            text-shadow: 0 0 15px rgba(255, 255, 255, 1);
        }

        .demo-button:active {
            transform: translateY(0);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 
                        inset 0 0 20px rgba(255, 255, 255, 0.15);
        }

        /* Focus styles for accessibility */
        .flag-card:focus-visible {
            outline: 2px solid #3C3B6E;
            outline-offset: 2px;
        }
      `}</style>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="font-serif text-5xl font-bold mb-6"
              style={{
                color: 'white',
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
          <div className="demo-controls">
            <button className="demo-button" onClick={expandAll}>Expand All Cards</button>
            <button className="demo-button" onClick={collapseAll}>Collapse All Cards</button>
          </div>

          {/* Four-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportPillars.map((pillar, index) => (
              <div 
                key={pillar.id}
                className={`flag-card flag-card-${index} ${expandedCards.has(index) ? 'expanded' : ''}`}
                onClick={() => toggleCard(index)}
                tabIndex={0}
                onKeyDown={(e) => handleKeydown(e, index)}
                role="button"
                aria-expanded={expandedCards.has(index)}
              >
                {/* Canton stars for first card - 50 stars in 9 rows */}
                {index === 0 && (
                  <div className="canton-stars">
                    <div className="star-row">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row offset">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row offset">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row offset">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row offset">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span>
                    </div>
                    <div className="star-row">
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                  </div>
                )}

                <div className="flag-content-wrapper">
                  <div className="card-header">
                    <div className="card-header-text">
                      <h3>{pillar.title}</h3>
                      <p className="card-subtitle">{pillar.subtitle}</p>
                    </div>
                    <button className="arrow-button" aria-hidden="true">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="highlights">
                    {pillar.highlights.map((highlight, idx) => (
                      <div key={idx} className="highlight-item">
                        <span className="sparkle">✨</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="expanded-content">
                    <div className="features-section">
                      <h4 className="features-title">
                        <span className="check-icon">✓</span>
                        Included in Partnership
                      </h4>
                      <div className="features-list">
                        {pillar.features.included.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <span className="check-icon">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="add-ons-section">
                      <h4 className="features-title">
                        <span className="sparkle">✨</span>
                        Available Add-Ons
                      </h4>
                      <div className="features-list">
                        {pillar.features.additional.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <span className="sparkle">✨</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Comprehensive Coverage Visual */}
          <AnimatedSection delay={0.5}>
            <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 lg:p-12 border-2 border-white/30" 
                 style={{ 
                   boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1)' 
                 }}>
              <h3 
                className="text-3xl font-bold text-center mb-12"
                style={{
                  color: 'white',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                360° Support Coverage
              </h3>
              
              {/* Support Icons Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
                {[
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
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-2 border-2 border-white/80"
                         style={{
                           boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(5px)'
                         }}>
                      <item.icon className="w-8 h-8" style={{ 
                        color: 'white',
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                      }} />
                    </div>
                    <span className="text-sm font-medium" style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                    }}>{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Value Proposition */}
              <div className="text-center">
                <motion.p 
                  className="text-xl font-semibold mb-4"
                  style={{
                    color: 'white',
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Total Partnership Value: <span 
                    className="text-3xl"
                    style={{
                      color: 'white',
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
    </>
  );
};

export default SupportPackageSection;