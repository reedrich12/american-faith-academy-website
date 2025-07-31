'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  Home,
  Building2,
  GraduationCap,
  Calculator,
  ArrowUpRight,
  BarChart3,
  Target,
  LucideIcon
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// TypeScript interfaces
interface MarketStat {
  icon: LucideIcon;
  value: string;
  label: string;
  subtext: string;
  color: string;
  hasStars: boolean;
  hasStripes?: boolean;
}

interface MarketForce {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ROICalculation {
  actualStudents: number;
  annualRevenue: number;
  netIncome: number;
  monthlyIncome: number;
  breakEvenMonth: number;
}

interface ValidationMetric {
  icon: LucideIcon;
  title: string;
  description: string;
}

type ScenarioType = 'conservative' | 'optimistic';

const MarketOpportunitySection = () => {
  const [students, setStudents] = useState(60);
  const [tuition, setTuition] = useState(5500);
  const [scenario, setScenario] = useState<ScenarioType>('conservative');
  const prefersReducedMotion = usePrefersReducedMotion();

  const marketStats: MarketStat[] = [
    {
      icon: TrendingUp,
      value: "300%",
      label: "Homeschool Growth",
      subtext: "in the last 5 years",
      color: "text-emerald-600",
      hasStars: true
    },
    {
      icon: Users,
      value: "3.7M",
      label: "Homeschooled Students",
      subtext: "and growing rapidly",
      color: "text-blue-600",
      hasStars: true,
      hasStripes: false
    },
    {
      icon: DollarSign,
      value: "$16B",
      label: "ESA Funding Available",
      subtext: "across 32 states",
      color: "text-purple-600",
      hasStars: true
    },
    {
      icon: MapPin,
      value: "87%",
      label: "Communities Underserved",
      subtext: "lacking quality options",
      color: "text-orange-600",
      hasStars: true,
      hasStripes: false
    }
  ];

  const marketForces: MarketForce[] = [
    {
      icon: Home,
      title: "Remote Work Revolution",
      description: "More families seeking flexible education options"
    },
    {
      icon: Building2,
      title: "School Choice Expansion",
      description: "ESA programs making private education accessible"
    },
    {
      icon: BookOpen,
      title: "Classical Renaissance",
      description: "Growing demand for time-tested education methods"
    },
    {
      icon: GraduationCap,
      title: "Hybrid Model Appeal",
      description: "Families want community without full-time commitment"
    }
  ];

  const validationMetrics: ValidationMetric[] = [
    {
      icon: BarChart3,
      title: "Existing Centers Thriving",
      description: "Average 85% capacity within first year"
    },
    {
      icon: Target,
      title: "High Parent Satisfaction",
      description: "92% retention rate year-over-year"
    },
    {
      icon: MapPin,
      title: "Geographic Opportunity",
      description: "Less than 13% market penetration nationally"
    }
  ];

  const calculateROI = (): ROICalculation => {
    const enrollmentRate = scenario === 'conservative' ? 0.85 : 0.95;
    const actualStudents = Math.floor(students * enrollmentRate);
    const annualRevenue = actualStudents * tuition;
    const operatingMargin = scenario === 'conservative' ? 0.35 : 0.45;
    const netIncome = annualRevenue * operatingMargin;
    const monthlyIncome = netIncome / 12;

    return {
      actualStudents,
      annualRevenue,
      netIncome,
      monthlyIncome,
      breakEvenMonth: scenario === 'conservative' ? 8 : 6
    };
  };

  const roi = calculateROI();

  return (
    <section className="py-20" aria-labelledby="market-opportunity-heading">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            id="market-opportunity-heading"
            className="text-5xl font-bold mb-6 font-serif text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            style={{ 
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            The Market Opportunity
          </motion.h2>
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            The education landscape is shifting dramatically. Growing demand for classical Christian education, 
            coupled with expanding school choice programs, creates an unprecedented opportunity for Soaring Centers.
          </motion.p>
        </div>

        {/* Market Trends Dashboard */}
        <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-6 mb-16 overflow-x-auto" role="list" aria-label="Market statistics">
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                role="listitem"
                className="flex-1 min-w-[140px] md:min-w-[180px] relative overflow-hidden rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  backgroundColor: stat.hasStars ? 'transparent' : 'white',
                  backgroundImage: stat.hasStripes ? 'repeating-linear-gradient(to bottom, #B22234 0px, #B22234 10px, #FFFFFF 10px, #FFFFFF 20px)' : 'none',
                  border: stat.hasStars ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                  boxShadow: stat.hasStars ? '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backdropFilter: stat.hasStars ? 'blur(10px)' : 'none'
                }}
                whileHover={prefersReducedMotion ? {} : stat.hasStars ? {
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(255, 255, 255, 1)'
                } : {
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                }}
              >
                {stat.hasStripes && (
                  <div className="absolute inset-0 bg-white/90" />
                )}
                <div className="p-4 md:p-6 relative z-10">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className={`p-2 md:p-3 rounded-lg ${
                      stat.hasStars 
                        ? 'bg-transparent border border-white/60' 
                        : stat.hasStripes 
                          ? 'bg-blue-900' 
                          : 'bg-gray-100'
                    }`} style={stat.hasStars ? {
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)'
                    } : {}}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                        stat.hasStars ? '' : stat.hasStripes ? 'text-white' : stat.color
                      }`} style={stat.hasStars ? {
                        color: 'white',
                        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
                      } : {}} 
                      aria-hidden="true" />
                    </div>
                    <ArrowUpRight className={`w-4 h-4 md:w-5 md:h-5 ${stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : 'text-gray-400'}`} 
                      style={stat.hasStars ? { color: 'rgba(255, 255, 255, 0.8)' } : {}}
                      aria-hidden="true" />
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : stat.color}`}
                       style={stat.hasStars ? { 
                         color: 'white', 
                         textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' 
                       } : {}}>
                    {stat.value}
                  </div>
                  <div className={`font-semibold text-sm md:text-base ${stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : 'text-gray-900'}`}
                       style={stat.hasStars ? { 
                         color: 'white', 
                         textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' 
                       } : {}}>
                    {stat.label}
                  </div>
                  <div className={`text-xs md:text-sm mt-1 ${stat.hasStars ? '' : stat.hasStripes ? 'text-gray-700' : 'text-gray-600'}`}
                       style={stat.hasStars ? { 
                         color: 'rgba(255, 255, 255, 0.9)' 
                       } : {}}>
                    {stat.subtext}
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-800"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Market Forces */}
        <AnimatedSection delay={0.3}>
          <div className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mb-16 overflow-hidden border-2 border-white/80" 
               style={{ 
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <h3 
              className="text-3xl font-bold text-center mb-12 relative z-10 text-white"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              Market Forces Working in Your Favor
            </h3>
            <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 relative z-10 overflow-x-auto" role="list" aria-label="Market forces">
              {marketForces.map((force, index) => {
                const Icon = force.icon;
                return (
                  <motion.div
                    key={index}
                    role="listitem"
                    className="flex-1 min-w-[120px] md:min-w-[150px] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border-2 border-white/60"
                         style={{
                           boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                           backdropFilter: 'blur(5px)'
                         }}>
                      <Icon className="w-8 h-8 text-white" style={{
                        filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                      }} 
                      aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 px-1 text-white" style={{
                      textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                    }}>{force.title}</h4>
                    <p className="text-xs md:text-sm px-1 md:px-2" style={{
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}>{force.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ROI Calculator */}
        <AnimatedSection delay={0.4}>
          <div className="overflow-hidden bg-transparent backdrop-blur-md rounded-2xl border-2 border-white/80" 
               style={{ 
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <div className="relative bg-transparent text-white p-8 overflow-hidden">
              <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 relative z-10 text-white">
                <Calculator className="w-8 h-8 text-white" aria-hidden="true" />
                Financial Opportunity Calculator
              </h3>
              <p className="text-blue-100 relative z-10">
                See your potential revenue based on real market data
              </p>
            </div>

            <div className="relative p-8 bg-transparent">
              {/* Input Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
                {/* Student Capacity */}
                <div>
                  <label htmlFor="student-capacity" className="block text-sm font-semibold text-white mb-2">
                    Student Capacity
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="student-capacity"
                      type="range"
                      min="40"
                      max="80"
                      value={students}
                      onChange={(e) => setStudents(Number(e.target.value))}
                      className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((students - 40) / 40) * 100}%, #1e3a8a40 ${((students - 40) / 40) * 100}%, #1e3a8a40 100%)`,
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                      }}
                      aria-label={`Student capacity: ${students} students`}
                    />
                    <span className="text-2xl font-bold text-white w-12 text-right" aria-live="polite">{students}</span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-100 mt-1" aria-hidden="true">
                    <span>40</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Average Tuition */}
                <div>
                  <label htmlFor="average-tuition" className="block text-sm font-semibold text-white mb-2">
                    Average Annual Tuition
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="average-tuition"
                      type="range"
                      min="4000"
                      max="7000"
                      step="100"
                      value={tuition}
                      onChange={(e) => setTuition(Number(e.target.value))}
                      className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 100%)`,
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                      }}
                      aria-label={`Average annual tuition: $${tuition.toLocaleString()}`}
                    />
                    <span className="text-2xl font-bold text-white w-20 text-right" aria-live="polite">
                      ${tuition.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-100 mt-1" aria-hidden="true">
                    <span>$4,000</span>
                    <span>$7,000</span>
                  </div>
                </div>

                {/* Scenario Toggle */}
                <div>
                  <fieldset>
                    <legend className="block text-sm font-semibold text-white mb-2">
                      Projection Scenario
                    </legend>
                    <div className="flex gap-2" role="radiogroup">
                      <button
                        onClick={() => setScenario('conservative')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                          scenario === 'conservative' 
                            ? 'bg-white text-blue-900' 
                            : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                        }`}
                        role="radio"
                        aria-checked={scenario === 'conservative'}
                        aria-label="Conservative projection scenario"
                      >
                        Conservative
                      </button>
                      <button
                        onClick={() => setScenario('optimistic')}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                          scenario === 'optimistic' 
                            ? 'bg-white text-blue-900' 
                            : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                        }`}
                        role="radio"
                        aria-checked={scenario === 'optimistic'}
                        aria-label="Optimistic projection scenario"
                      >
                        Optimistic
                      </button>
                    </div>
                  </fieldset>
                </div>
              </div>

              {/* Results Display */}
              <div className="relative bg-transparent rounded-xl p-6 overflow-hidden border-2 border-white/60"
                   style={{
                     boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(10px)'
                   }}
                   role="region"
                   aria-label="Financial projection results"
                   aria-live="polite">
                <h4 className="text-xl font-semibold text-white mb-6 relative z-10">
                  Your Projected Financial Results
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold text-white">
                      {roi.actualStudents} students
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Annual Revenue</div>
                    <div className="text-2xl font-bold text-white">
                      ${roi.annualRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Net Annual Income</div>
                    <div className="text-2xl font-bold text-white">
                      ${roi.netIncome.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Monthly Income</div>
                    <div className="text-2xl font-bold text-white">
                      ${Math.floor(roi.monthlyIncome).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-700 relative z-10">
                  <div className="text-center">
                    <span className="text-sm text-blue-100">Break-even Timeline: </span>
                    <span className="font-semibold text-white">{roi.breakEvenMonth} months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Market Validation */}
        <AnimatedSection delay={0.5}>
          <div className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mt-16 overflow-hidden border-2 border-white/80" 
               style={{ 
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <h3 
              className="text-3xl font-bold text-center mb-8 relative z-10 text-white"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              Proven Market Demand
            </h3>
            <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 overflow-x-auto relative z-10" role="list" aria-label="Market validation metrics">
              {validationMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div 
                    key={index}
                    role="listitem"
                    className="flex-1 min-w-[140px] md:min-w-[180px] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/60"
                         style={{
                           boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                           backdropFilter: 'blur(5px)'
                         }}>
                      <Icon className="w-8 h-8 text-white" style={{
                        filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                      }}
                      aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-white" style={{
                      textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                    }}>{metric.title}</h4>
                    <p className="text-sm" style={{
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}>{metric.description}</p>
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

export default MarketOpportunitySection;