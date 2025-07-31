'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, Brain, ChartBar, Users, Target, Sparkles, BookOpen, Award, TrendingUp, Shield, CheckCircle, Play, Calendar, Microscope, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';
import type { LucideIcon } from 'lucide-react';

interface AdaptiveFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  color: string;
}

interface TechnologyTool {
  name: string;
  icon: LucideIcon;
  description: string;
}

interface DashboardMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface ClassicalBalance {
  traditional: string;
  technology: string;
  icon: LucideIcon;
}

const TechnologyIntegrationSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const adaptiveFeatures: AdaptiveFeature[] = [
    {
      icon: Brain,
      title: "Smart Pacing",
      description: "AI adjusts lesson difficulty based on student performance",
      details: [
        "Automatically slows down for struggling concepts",
        "Accelerates when mastery is demonstrated",
        "Provides additional practice where needed",
        "Never leaves a student behind or holds them back"
      ],
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Target,
      title: "Personalized Pathways",
      description: "Custom learning routes for each student's needs",
      details: [
        "Identifies learning style preferences",
        "Adapts content presentation format",
        "Offers multiple ways to demonstrate mastery",
        "Creates unique progression paths"
      ],
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Sparkles,
      title: "Instant Feedback",
      description: "Real-time guidance and encouragement",
      details: [
        "Immediate correction of misconceptions",
        "Positive reinforcement for progress",
        "Hints and scaffolding when stuck",
        "Celebrates achievements big and small"
      ],
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: ChartBar,
      title: "Progress Analytics",
      description: "Deep insights into learning patterns",
      details: [
        "Track mastery of individual concepts",
        "Identify knowledge gaps early",
        "Predict areas needing support",
        "Measure growth over time"
      ],
      color: "from-amber-400 to-orange-400"
    }
  ];

  const technologyTools: TechnologyTool[] = [
    {
      name: "Interactive Lessons",
      icon: Laptop,
      description: "Engaging multimedia content that brings subjects to life"
    },
    {
      name: "Virtual Labs",
      icon: Microscope,
      description: "Safe, cost-effective science experiments"
    },
    {
      name: "Digital Library",
      icon: BookOpen,
      description: "Thousands of classical texts at their fingertips"
    },
    {
      name: "Collaboration Tools",
      icon: Users,
      description: "Connect with classmates for group projects"
    }
  ];

  const dashboardMetrics: DashboardMetric[] = [
    { label: "Daily Progress", value: "87%", icon: TrendingUp, color: "text-green-600" },
    { label: "Mastery Level", value: "Grade 6.3", icon: Award, color: "text-blue-600" },
    { label: "Time Today", value: "3h 24m", icon: Clock, color: "text-purple-600" },
    { label: "Lessons Complete", value: "142/180", icon: CheckCircle, color: "text-amber-600" }
  ];

  const classicalBalance: ClassicalBalance[] = [
    {
      traditional: "Teacher-Led Discussion",
      technology: "AI-Enhanced Review Sessions",
      icon: Users
    },
    {
      traditional: "Handwritten Essays",
      technology: "Digital Research Tools",
      icon: BookOpen
    },
    {
      traditional: "Socratic Seminars",
      technology: "Virtual Breakout Rooms",
      icon: Brain
    },
    {
      traditional: "Physical Manipulatives",
      technology: "Interactive Simulations",
      icon: Sparkles
    }
  ];

  return (
    <section 
      className="py-20 bg-white"
      aria-labelledby="technology-integration-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="technology-integration-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Because Every Child is Unique, Every Education Should Be Too
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our adaptive learning technology creates truly personalized experiences while 
            maintaining the rigor and beauty of classical education.
          </p>
        </AnimatedSection>

        {/* Adaptive Learning Features */}
        <AnimatedSection delay={0.2} className="mb-20">
          <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
            How Technology Adapts to Your Child
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Feature Selector */}
            <div className="space-y-4" role="list" aria-label="Adaptive learning features">
              {adaptiveFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    role="listitem"
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        activeFeature === index 
                          ? 'shadow-xl border-2 border-patriot' 
                          : 'hover:shadow-lg border border-gray-200'
                      } focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy`}
                      onClick={() => setActiveFeature(index)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveFeature(index);
                        }
                      }}
                      role="button"
                      aria-pressed={activeFeature === index}
                      aria-label={`${feature.title}: ${feature.description}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-navy">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                          {activeFeature === index && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-patriot rounded-full"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Feature Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8"
                role="region"
                aria-live="polite"
                aria-label="Feature details"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${adaptiveFeatures[activeFeature].color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  {(() => {
                    const ActiveIcon = adaptiveFeatures[activeFeature].icon;
                    return <ActiveIcon className="w-10 h-10 text-white" aria-hidden="true" />;
                  })()}
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy text-center mb-6">
                  {adaptiveFeatures[activeFeature].title}
                </h4>
                <ul className="space-y-3" role="list">
                  {adaptiveFeatures[activeFeature].details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.1 }}
                      className="flex items-start space-x-3"
                      role="listitem"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Technology Tools Grid */}
        <AnimatedSection delay={0.4} className="mb-20">
          <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-3xl p-8 md:p-12">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
              Tools That Enhance Classical Learning
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Technology tools">
              {technologyTools.map((tool, index) => {
                const ToolIcon = tool.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    role="listitem"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white transform hover:scale-105 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy">
                      <CardContent className="p-6 text-center">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                          whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                        >
                          <ToolIcon className="w-8 h-8 text-white" aria-hidden="true" />
                        </motion.div>
                        <h4 className="font-semibold text-lg text-navy mb-2">{tool.name}</h4>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Parent Dashboard Preview */}
        <AnimatedSection delay={0.6} className="mb-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
              Stay Connected to Your Child's Journey
            </h3>
            
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-navy-600 to-patriot-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold">Parent Dashboard</h4>
                    <p className="opacity-90">Real-time insights into Emily's progress</p>
                  </div>
                  <Calendar className="w-8 h-8 opacity-75" aria-hidden="true" />
                </div>
              </div>
              
              <CardContent className="p-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" role="list" aria-label="Student metrics">
                  {dashboardMetrics.map((metric, index) => {
                    const MetricIcon = metric.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-lg p-4 text-center"
                        role="listitem"
                      >
                        <MetricIcon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} aria-hidden="true" />
                        <p className="text-2xl font-bold text-navy">{metric.value}</p>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <h5 className="font-semibold text-lg text-navy mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" />
                    Today's Highlights
                  </h5>
                  <ul className="space-y-3" role="list" aria-label="Today's achievements">
                    <li className="flex items-center space-x-3" role="listitem">
                      <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                      <span className="text-gray-700">Mastered fractions in Math</span>
                    </li>
                    <li className="flex items-center space-x-3" role="listitem">
                      <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                      <span className="text-gray-700">Completed Julius Caesar reading</span>
                    </li>
                    <li className="flex items-center space-x-3" role="listitem">
                      <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                      <span className="text-gray-700">Submitted Rome history essay</span>
                    </li>
                  </ul>
                </div>

              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Classical + Technology Balance */}
        <AnimatedSection delay={0.8} className="mb-16">
          <Card className="max-w-5xl mx-auto border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8 md:p-12">
              <h3 className="font-serif text-3xl font-bold text-navy text-center mb-4">
                Technology Supports, Never Replaces
              </h3>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                We thoughtfully blend time-tested classical methods with modern tools, 
                ensuring technology enhances rather than dominates the learning experience.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Classical and technology balance">
                {classicalBalance.map((item, index) => {
                  const BalanceIcon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4"
                      role="listitem"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BalanceIcon className="w-6 h-6 text-navy" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy">{item.traditional}</p>
                        <p className="text-sm text-gray-600">Enhanced by: {item.technology}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Parent Controls & Safety</h4>
                    <p className="text-gray-700">
                      Full visibility and control over your child's online experience. 
                      Safe, monitored, and age-appropriate at every step.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={1} className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              See Personalized Learning in Action
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Watch how our technology adapts to different learning styles and paces
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500"
                aria-label="Watch a demo video of our personalized learning technology"
              >
                <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                Watch Demo Video
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                aria-label="Request a free trial of our adaptive learning platform"
              >
                Request Free Trial
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TechnologyIntegrationSection;
