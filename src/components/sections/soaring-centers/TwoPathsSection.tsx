'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Church, Briefcase, CheckCircle2, Users, Target, Heart, TrendingUp, LucideIcon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// TypeScript interfaces
interface PathDetails {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  benefits: string[];
  uniqueValue: string;
}

interface SharedOutcome {
  icon: LucideIcon;
  text: string;
}

type PathType = 'church' | 'edupreneur';

const TwoPathsSection = () => {
  const [selectedPath, setSelectedPath] = useState<PathType | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const paths: Record<PathType, PathDetails> = {
    church: {
      icon: Church,
      title: "Education as Mission",
      subtitle: "Your Church's Greatest Opportunity",
      color: "from-blue-900 to-blue-950",
      benefits: [
        "Extend your church's mission to weekday education",
        "Serve families in your congregation and community",
        "Generate sustainable revenue for ministry expansion",
        "Build deeper family relationships",
        "Create a lasting legacy of faith and learning"
      ],
      uniqueValue: "Transform your existing facilities into a thriving educational ministry that impacts generations."
    },
    edupreneur: {
      icon: Briefcase,
      title: "Purpose-Driven Business",
      subtitle: "Make a Difference While Making a Living",
      color: "from-red-700 to-red-800",
      benefits: [
        "Build a profitable business with eternal impact",
        "Be your own boss while serving families",
        "Tap into the growing education market",
        "Create flexible work-life balance",
        "Join a network of like-minded entrepreneurs"
      ],
      uniqueValue: "Launch a successful education business that changes lives while providing financial freedom."
    }
  };

  const sharedOutcomes: SharedOutcome[] = [
    { icon: Users, text: "Serve 40-80 families in your community" },
    { icon: Target, text: "Deliver excellence in classical Christian education" },
    { icon: Heart, text: "Make kingdom impact through education" },
    { icon: TrendingUp, text: "Build a sustainable, growing enterprise" }
  ];

  // Generate star positions once
  const starPositions = Array.from({ length: 25 }, (_, i) => ({
    top: `${(i * 37 + (i % 3) * 13) % 90 + 5}%`,
    left: `${(i * 29 + (i % 5) * 7) % 90 + 5}%`,
    size: i % 5 === 0 ? 30 : i % 3 === 0 ? 18 : 24,
    delay: (i % 4) * 0.5
  }));

  return (
    <section 
      id="two-paths" 
      className="py-20"
      aria-labelledby="two-paths-heading"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section with Split Screen */}
        <AnimatedSection className="mb-16">
          <div className="text-center mb-12">
            <motion.h2 
              id="two-paths-heading"
              className="font-serif text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(90deg, #ef4444 0%, #ffffff 35%, #ffffff 65%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}
            >
              Two Paths to Impact
            </motion.h2>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              style={{
                background: 'linear-gradient(90deg, #fca5a5 0%, #ffffff 35%, #ffffff 65%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
              }}
            >
              Whether you're a church leader or an education entrepreneur, we have a partnership path designed for your unique calling and goals.
            </motion.p>
          </div>

          {/* Split Screen Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" role="list" aria-label="Partnership path options">
            {/* Church Path Visual */}
            <motion.div
              role="listitem"
              className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-blue-900"
              onClick={() => setSelectedPath('church')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPath('church');
                }
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3 }}
              tabIndex={0}
              aria-label="Church partnership path - Transform your ministry impact"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-950/80 z-10" />
              <Image
                src="/api/placeholder/600/400"
                alt="Church building with families"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
                <Church className="w-16 h-16 mb-4" aria-hidden="true" />
                <h3 className="text-3xl font-bold mb-2">For Churches</h3>
                <p className="text-lg">Transform Your Ministry Impact</p>
              </div>
            </motion.div>

            {/* Edupreneur Path Visual */}
            <motion.div
              role="listitem"
              className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-red-700"
              onClick={() => setSelectedPath('edupreneur')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPath('edupreneur');
                }
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3 }}
              tabIndex={0}
              aria-label="Edupreneur path - Build your education business"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 to-red-800/80 z-10" />
              <Image
                src="/api/placeholder/600/400"
                alt="Professional educator with students"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
                <Briefcase className="w-16 h-16 mb-4" aria-hidden="true" />
                <h3 className="text-3xl font-bold mb-2">For Edupreneurs</h3>
                <p className="text-lg">Build Your Education Business</p>
              </div>
            </motion.div>
          </div>

          {/* Central Message */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
          >
            <p 
              className="text-2xl font-semibold"
              style={{
                background: 'linear-gradient(90deg, #ef4444 0%, #ffffff 35%, #ffffff 65%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
              }}
            >
              Choose Your Path to Educational Impact
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Dual Path Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" role="region" aria-label="Path details">
          {/* Church Card */}
          <AnimatedSection delay={0.1}>
            <Card 
              className={`h-full cursor-pointer transition-all duration-300 focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-blue-900 ${
                selectedPath === 'church' ? 'ring-4 ring-blue-900 shadow-2xl' : 'hover:shadow-xl'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
                border: '2px solid rgba(59, 130, 246, 0.2)'
              }}
              onClick={() => setSelectedPath('church')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPath('church');
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selectedPath === 'church'}
              aria-label="View church partnership details"
            >
              <CardContent className="p-8 relative">
                {/* Blue stars for church card when selected */}
                {selectedPath === 'church' && !prefersReducedMotion && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                  aria-hidden="true">
                    {starPositions.map((star, i) => (
                      <motion.span 
                        key={i} 
                        style={{
                          position: 'absolute',
                          top: star.top,
                          left: star.left,
                          fontSize: `${star.size}px`,
                          color: 'rgba(30, 58, 138, 0.4)',
                          textShadow: '0 0 8px rgba(30, 58, 138, 0.6), 0 0 16px rgba(30, 58, 138, 0.3)'
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.2, 1],
                          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: star.delay,
                          ease: 'easeInOut'
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${paths.church.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Church className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{paths.church.title}</h3>
                <p className="text-lg text-gray-600 mb-6 relative z-10">{paths.church.subtitle}</p>
                
                <div className="space-y-3 mb-6 relative z-10" role="list" aria-label="Church partnership benefits">
                  {paths.church.benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      role="listitem"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: selectedPath === 'church' ? 1 : 0.7, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-300 relative z-10">
                  <p className="text-sm font-semibold text-blue-900">
                    {paths.church.uniqueValue}
                  </p>
                </div>

              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Edupreneur Card */}
          <AnimatedSection delay={0.2}>
            <Card 
              className={`h-full cursor-pointer transition-all duration-300 focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-red-700 ${
                selectedPath === 'edupreneur' ? 'ring-4 ring-red-700 shadow-2xl' : 'hover:shadow-xl'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #ffe4e4 50%, #ffcccc 100%)',
                border: '2px solid rgba(239, 68, 68, 0.2)'
              }}
              onClick={() => setSelectedPath('edupreneur')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPath('edupreneur');
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selectedPath === 'edupreneur'}
              aria-label="View edupreneur program details"
            >
              <CardContent className="p-8 relative">
                {/* Red stars for edupreneur card when selected */}
                {selectedPath === 'edupreneur' && !prefersReducedMotion && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                  aria-hidden="true">
                    {starPositions.map((star, i) => (
                      <motion.span 
                        key={i} 
                        style={{
                          position: 'absolute',
                          top: star.top,
                          left: star.left,
                          fontSize: `${star.size}px`,
                          color: 'rgba(185, 28, 28, 0.4)',
                          textShadow: '0 0 8px rgba(185, 28, 28, 0.6), 0 0 16px rgba(185, 28, 28, 0.3)'
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.2, 1],
                          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: star.delay,
                          ease: 'easeInOut'
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${paths.edupreneur.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Briefcase className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{paths.edupreneur.title}</h3>
                <p className="text-lg text-gray-600 mb-6 relative z-10">{paths.edupreneur.subtitle}</p>
                
                <div className="space-y-3 mb-6 relative z-10" role="list" aria-label="Edupreneur program benefits">
                  {paths.edupreneur.benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      role="listitem"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: selectedPath === 'edupreneur' ? 1 : 0.7, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200 relative z-10">
                  <p className="text-sm font-semibold text-red-900">
                    {paths.edupreneur.uniqueValue}
                  </p>
                </div>

              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Shared Outcomes Section */}
        <AnimatedSection delay={0.3}>
          <div className="bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 border-2 border-white/80"
               style={{
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <motion.h3 
              className="text-3xl font-bold text-center mb-8"
              style={{
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              Shared Outcomes for Both Paths
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Shared outcomes">
              {sharedOutcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center"
                    role="listitem"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-4 border-2 border-white/80"
                         style={{
                           boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(5px)'
                         }}>
                      <Icon className="w-8 h-8" aria-hidden="true" style={{
                        color: 'white',
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                      }} />
                    </div>
                    <p className="font-medium" style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                    }}>{outcome.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TwoPathsSection;