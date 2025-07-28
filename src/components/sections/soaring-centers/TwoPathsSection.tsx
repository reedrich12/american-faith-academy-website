'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Church, Briefcase, CheckCircle2, ArrowRight, Users, Target, Heart, TrendingUp } from 'lucide-react';

const TwoPathsSection = () => {
  const [selectedPath, setSelectedPath] = useState<'church' | 'edupreneur' | null>(null);

  const paths = {
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

  const sharedOutcomes = [
    { icon: Users, text: "Serve 40-80 families in your community" },
    { icon: Target, text: "Deliver excellence in classical Christian education" },
    { icon: Heart, text: "Make kingdom impact through education" },
    { icon: TrendingUp, text: "Build a sustainable, growing enterprise" }
  ];

  return (
    <section id="two-paths" className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section with Split Screen */}
        <AnimatedSection className="mb-16">
          <div className="text-center mb-12">
            <motion.h2 
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Church Path Visual */}
            <motion.div
              className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedPath('church')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-950/80 z-10" />
              <img 
                src="/api/placeholder/600/400" 
                alt="Church building with families" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
                <Church className="w-16 h-16 mb-4" />
                <h3 className="text-3xl font-bold mb-2">For Churches</h3>
                <p className="text-lg">Transform Your Ministry Impact</p>
              </div>
            </motion.div>

            {/* Edupreneur Path Visual */}
            <motion.div
              className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedPath('edupreneur')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 to-red-800/80 z-10" />
              <img 
                src="/api/placeholder/600/400" 
                alt="Professional educator with students" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
                <Briefcase className="w-16 h-16 mb-4" />
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
            transition={{ delay: 0.3 }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Church Card */}
          <AnimatedSection delay={0.1}>
            <Card 
              className={`h-full cursor-pointer transition-all duration-300 ${
                selectedPath === 'church' ? 'ring-4 ring-blue-900 shadow-2xl' : 'hover:shadow-xl'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
                border: '2px solid rgba(59, 130, 246, 0.2)'
              }}
              onClick={() => setSelectedPath('church')}
            >
              <CardContent className="p-8 relative">
                {/* Blue stars for church card when selected */}
                {selectedPath === 'church' && (
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
                  }}>
                    {[...Array(25)].map((_, i) => {
                      const delay = (i % 4) * 0.5;
                      const size = i % 5 === 0 ? 30 : i % 3 === 0 ? 18 : 24;
                      return (
                        <motion.span 
                          key={i} 
                          style={{
                            position: 'absolute',
                            top: `${(i * 37 + (i % 3) * 13) % 90 + 5}%`,
                            left: `${(i * 29 + (i % 5) * 7) % 90 + 5}%`,
                            fontSize: `${size}px`,
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
                            delay: delay,
                            ease: 'easeInOut'
                          }}
                        >
                          ★
                        </motion.span>
                      );
                    })}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${paths.church.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Church className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{paths.church.title}</h3>
                <p className="text-lg text-gray-600 mb-6 relative z-10">{paths.church.subtitle}</p>
                
                <div className="space-y-3 mb-6 relative z-10">
                  {paths.church.benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: selectedPath === 'church' ? 1 : 0.7, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
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
              className={`h-full cursor-pointer transition-all duration-300 ${
                selectedPath === 'edupreneur' ? 'ring-4 ring-red-700 shadow-2xl' : 'hover:shadow-xl'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #ffe4e4 50%, #ffcccc 100%)',
                border: '2px solid rgba(239, 68, 68, 0.2)'
              }}
              onClick={() => setSelectedPath('edupreneur')}
            >
              <CardContent className="p-8 relative">
                {/* Red stars for edupreneur card when selected */}
                {selectedPath === 'edupreneur' && (
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
                  }}>
                    {[...Array(25)].map((_, i) => {
                      const delay = (i % 4) * 0.5;
                      const size = i % 5 === 0 ? 30 : i % 3 === 0 ? 18 : 24;
                      return (
                        <motion.span 
                          key={i} 
                          style={{
                            position: 'absolute',
                            top: `${(i * 37 + (i % 3) * 13) % 90 + 5}%`,
                            left: `${(i * 29 + (i % 5) * 7) % 90 + 5}%`,
                            fontSize: `${size}px`,
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
                            delay: delay,
                            ease: 'easeInOut'
                          }}
                        >
                          ★
                        </motion.span>
                      );
                    })}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${paths.edupreneur.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{paths.edupreneur.title}</h3>
                <p className="text-lg text-gray-600 mb-6 relative z-10">{paths.edupreneur.subtitle}</p>
                
                <div className="space-y-3 mb-6 relative z-10">
                  {paths.edupreneur.benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: selectedPath === 'edupreneur' ? 1 : 0.7, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sharedOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-4 border-2 border-white/80"
                       style={{
                         boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(5px)'
                       }}>
                    <outcome.icon className="w-8 h-8" style={{
                      color: 'white',
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
                    }} />
                  </div>
                  <p className="font-medium" style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                  }}>{outcome.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TwoPathsSection;