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
  Target
} from 'lucide-react';

const MarketOpportunitySection = () => {
  const [students, setStudents] = useState(60);
  const [tuition, setTuition] = useState(5500);
  const [scenario, setScenario] = useState('conservative');

  const marketStats = [
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

  const marketForces = [
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

  const calculateROI = () => {
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
    <>
      <style jsx={true} global={true}>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
          }
        }
        
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .star-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 12px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .star-pattern {
          position: absolute;
          color: rgba(255, 255, 255, 0.15);
          font-size: 24px;
          animation: twinkle 4s ease-in-out infinite;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px rgba(255, 255, 255, 0.15);
          transition: opacity 0.3s ease;
        }
        
        .star-pattern:nth-child(odd) {
          animation-delay: 0s;
        }
        
        .star-pattern:nth-child(even) {
          animation-delay: 2s;
        }
        
        .star-pattern:nth-child(3n) {
          animation-delay: 1s;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.1);
        }
        
        .star-pattern:nth-child(5n) {
          animation-delay: 3s;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.2);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2);
        }
        
        .star-pattern:nth-child(7n) {
          animation-delay: 1.5s;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.08);
        }
        
        .animate-float-up {
          animation: floatUp 0.6s ease-out forwards;
        }
        
        /* Custom range input styles */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
          transition: all 0.2s ease;
          border: none;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }
      `}</style>
      
      <section className="py-20">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          {/* Header */}
          <div className="text-center mb-16 animate-float-up">
            <h2 
              className="text-5xl font-bold mb-6" 
              style={{ 
                fontFamily: 'serif',
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              The Market Opportunity
            </h2>
            <motion.p 
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            >
              The education landscape is shifting dramatically. Growing demand for classical Christian education, 
              coupled with expanding school choice programs, creates an unprecedented opportunity for Soaring Centers.
            </motion.p>
          </div>

          {/* Market Trends Dashboard with Stars */}
          <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-6 mb-16 overflow-x-auto">
            {marketStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex-1 min-w-[140px] md:min-w-[180px] relative overflow-hidden rounded-xl transition-all duration-300 animate-float-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  backgroundColor: stat.hasStars ? 'transparent' : 'white',
                  backgroundImage: stat.hasStripes ? 'repeating-linear-gradient(to bottom, #B22234 0px, #B22234 10px, #FFFFFF 10px, #FFFFFF 20px)' : 'none',
                  border: stat.hasStars ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
                  boxShadow: stat.hasStars ? '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backdropFilter: stat.hasStars ? 'blur(10px)' : 'none'
                }}
                whileHover={stat.hasStars ? {
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
                      <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${
                        stat.hasStars ? '' : stat.hasStripes ? 'text-white' : stat.color
                      }`} style={stat.hasStars ? {
                        color: 'white',
                        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
                      } : {}} />
                    </div>
                    <ArrowUpRight className={`w-4 h-4 md:w-5 md:h-5 ${stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : 'text-gray-400'}`} 
                      style={stat.hasStars ? { color: 'rgba(255, 255, 255, 0.8)' } : {}} />
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
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-800"
                    style={{
                      transform: `scaleX(1)`,
                      transition: 'transform 1s ease-out',
                      transitionDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Market Forces with Star Background */}
          <div className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mb-16 overflow-hidden animate-float-up border-2 border-white/80" 
               style={{ 
                 animationDelay: '0.3s',
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <h3 
              className="text-3xl font-bold text-center mb-12 relative z-10"
              style={{
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              Market Forces Working in Your Favor
            </h3>
            <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 relative z-10 overflow-x-auto">
              {marketForces.map((force, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[120px] md:min-w-[150px] text-center animate-float-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border-2 border-white/60"
                       style={{
                         boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                         backdropFilter: 'blur(5px)'
                       }}>
                    <force.icon className="w-8 h-8" style={{
                      color: 'white',
                      filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                    }} />
                  </div>
                  <h4 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 px-1" style={{
                    color: 'white',
                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                  }}>{force.title}</h4>
                  <p className="text-xs md:text-sm px-1 md:px-2" style={{
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>{force.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="overflow-hidden bg-transparent backdrop-blur-md rounded-2xl animate-float-up border-2 border-white/80" 
               style={{ 
                 animationDelay: '0.4s',
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <div className="relative bg-transparent text-white p-8 overflow-hidden">
              <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 relative z-10 text-white">
                <Calculator className="w-8 h-8 text-white" />
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
                  <label className="block text-sm font-semibold text-white mb-2">
                    Student Capacity
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="40"
                      max="80"
                      value={students}
                      onChange={(e) => setStudents(Number(e.target.value))}
                      className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((students - 40) / 40) * 100}%, #1e3a8a40 ${((students - 40) / 40) * 100}%, #1e3a8a40 100%)`,
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                      }}
                    />
                    <span className="text-2xl font-bold text-white w-12 text-right">{students}</span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-100 mt-1">
                    <span>40</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Average Tuition */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Average Annual Tuition
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="4000"
                      max="7000"
                      step="100"
                      value={tuition}
                      onChange={(e) => setTuition(Number(e.target.value))}
                      className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 100%)`,
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                      }}
                    />
                    <span className="text-2xl font-bold text-white w-20 text-right">
                      ${tuition.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-100 mt-1">
                    <span>$4,000</span>
                    <span>$7,000</span>
                  </div>
                </div>

                {/* Scenario Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Projection Scenario
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setScenario('conservative')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        scenario === 'conservative' 
                          ? 'bg-white text-blue-900' 
                          : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                      }`}
                    >
                      Conservative
                    </button>
                    <button
                      onClick={() => setScenario('optimistic')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        scenario === 'optimistic' 
                          ? 'bg-white text-blue-900' 
                          : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                      }`}
                    >
                      Optimistic
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Display with Stars */}
              <div className="relative bg-transparent rounded-xl p-6 overflow-hidden border-2 border-white/60"
                   style={{
                     boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(10px)'
                   }}>
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

          {/* Market Validation */}
          <div className="relative bg-transparent backdrop-blur-md rounded-2xl p-8 lg:p-12 mt-16 overflow-hidden animate-float-up border-2 border-white/80" 
               style={{ 
                 animationDelay: '0.5s',
                 boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
               }}>
            <h3 
              className="text-3xl font-bold text-center mb-8 relative z-10"
              style={{
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              Proven Market Demand
            </h3>
            <div className="flex justify-between items-start gap-2 md:gap-4 lg:gap-8 overflow-x-auto relative z-10">
              <div className="flex-1 min-w-[140px] md:min-w-[180px] text-center animate-float-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/60"
                     style={{
                       boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                       backdropFilter: 'blur(5px)'
                     }}>
                  <BarChart3 className="w-8 h-8" style={{
                    color: 'white',
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                  }} />
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{
                  color: 'white',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                }}>Existing Centers Thriving</h4>
                <p className="text-sm" style={{
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>Average 85% capacity within first year</p>
              </div>
              <div className="flex-1 min-w-[140px] md:min-w-[180px] text-center animate-float-up" style={{ animationDelay: '0.7s' }}>
                <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/60"
                     style={{
                       boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                       backdropFilter: 'blur(5px)'
                     }}>
                  <Target className="w-8 h-8" style={{
                    color: 'white',
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                  }} />
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{
                  color: 'white',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                }}>High Parent Satisfaction</h4>
                <p className="text-sm" style={{
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>92% retention rate year-over-year</p>
              </div>
              <div className="flex-1 min-w-[140px] md:min-w-[180px] text-center animate-float-up" style={{ animationDelay: '0.8s' }}>
                <div className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/60"
                     style={{
                       boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                       backdropFilter: 'blur(5px)'
                     }}>
                  <MapPin className="w-8 h-8" style={{
                    color: 'white',
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))'
                  }} />
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{
                  color: 'white',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                }}>Geographic Opportunity</h4>
                <p className="text-sm" style={{
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>Less than 13% market penetration nationally</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketOpportunitySection;