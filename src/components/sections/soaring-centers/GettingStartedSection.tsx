'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import CalendarModal from '@/components/ui/calendar-modal';
import { 
  Phone, 
  ChartBar, 
  Handshake, 
  Rocket, 
  PartyPopper,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Target,
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// TypeScript interfaces
interface Milestone {
  week: string;
  task: string;
  icon: LucideIcon;
}

interface Step {
  id: number;
  title: string;
  duration: string;
  icon: LucideIcon;
  description: string;
  details?: string[];
  milestones?: Milestone[];
  metrics?: string[];
  deliverable?: string;
  color: string;
}

interface PartnershipModel {
  id: 'church' | 'independent' | 'hybrid';
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  bestFor: string;
}

type ModelType = 'church' | 'independent' | 'hybrid';

const GettingStartedSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const steps: Step[] = [
    {
      id: 1,
      title: "Discovery Call",
      duration: "1 hour",
      icon: Phone,
      description: "Vision discussion and goal alignment",
      details: [
        "Explore your vision for education in your community",
        "Discuss your background and resources",
        "Review partnership models and requirements",
        "Get answers to all your questions"
      ],
      deliverable: "Clear understanding of partnership fit",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Market Analysis",
      duration: "2-3 weeks",
      icon: ChartBar,
      description: "Demographics, competition, and projections",
      details: [
        "Analyze local demographics and demand",
        "Evaluate competitive landscape",
        "Project enrollment and financial scenarios",
        "Identify optimal location and facility options"
      ],
      deliverable: "Comprehensive market report",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Partnership Agreement",
      duration: "1-2 weeks",
      icon: Handshake,
      description: "Legal documentation and timeline establishment",
      details: [
        "Review and sign partnership agreement",
        "Establish launch timeline and milestones",
        "Set up business entity and banking",
        "Begin facility preparation planning"
      ],
      deliverable: "Official partnership status",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Launch Preparation",
      duration: "8-12 weeks",
      icon: Rocket,
      description: "Facility setup, hiring, training, and marketing",
      milestones: [
        { week: "1-2", task: "Facility setup and design", icon: Building },
        { week: "3-4", task: "Teacher recruitment and hiring", icon: Users },
        { week: "5-6", task: "Staff training and onboarding", icon: GraduationCap },
        { week: "7-8", task: "Marketing campaign launch", icon: Target },
        { week: "9-10", task: "Student enrollment drive", icon: FileText },
        { week: "11-12", task: "Final preparations and soft launch", icon: CheckCircle }
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Grand Opening",
      duration: "Ongoing",
      icon: PartyPopper,
      description: "Launch support, optimization, and growth",
      details: [
        "Grand opening event and community celebration",
        "First day of classes support",
        "Ongoing optimization and coaching",
        "Growth planning and expansion opportunities"
      ],
      metrics: ["Enrollment targets", "Parent satisfaction", "Financial performance", "Expansion readiness"],
      color: "from-patriot to-patriot-dark"
    }
  ];

  const partnershipModels: PartnershipModel[] = [
    {
      id: 'church',
      title: "Church-Hosted",
      icon: Building,
      description: "Leverage your existing facilities and congregation",
      benefits: [
        "Minimal facility costs",
        "Built-in community",
        "Mission alignment",
        "Shared resources"
      ],
      bestFor: "Churches with education vision and available space"
    },
    {
      id: 'independent',
      title: "Independent Center",
      icon: Target,
      description: "Stand-alone facility with full control",
      benefits: [
        "Complete autonomy",
        "Custom facility design",
        "Flexible scheduling",
        "Maximum growth potential"
      ],
      bestFor: "Entrepreneurs ready to build from scratch"
    },
    {
      id: 'hybrid',
      title: "Hybrid Model",
      icon: Users,
      description: "Partner with existing organizations",
      benefits: [
        "Shared facility costs",
        "Collaborative approach",
        "Risk mitigation",
        "Community partnerships"
      ],
      bestFor: "Those seeking collaborative opportunities"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const handleStepKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveStep(index);
    }
  };

  return (
    <section className="py-20" aria-labelledby="getting-started-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="getting-started-heading"
            className="font-serif text-5xl font-bold mb-6 text-white"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Getting Started
          </h2>
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            Your journey from vision to thriving Soaring Center follows a proven 5-step process. 
            We'll be with you every step of the way, ensuring your success from day one.
          </motion.p>
        </AnimatedSection>

        {/* Timeline Visual */}
        <div className="mb-16">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
              <motion.div 
                className="absolute top-1/2 left-0 h-1 -translate-y-1/2"
                style={{
                  background: activeStep === 4 
                    ? 'linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 80%, #ef4444 80%, #dc2626 100%)'
                    : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: activeStep === 4 
                    ? '0 0 10px rgba(239, 68, 68, 0.6)'
                    : '0 0 10px rgba(255, 255, 255, 0.3)'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
              />

              {/* Steps */}
              <div className="relative flex justify-between" role="list" aria-label="Getting started steps">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.id}
                      role="listitem"
                      className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent rounded-lg p-2"
                      onClick={() => handleStepClick(index)}
                      onKeyDown={(e) => handleStepKeyDown(e, index)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      tabIndex={0}
                      aria-label={`Step ${step.id}: ${step.title} - ${step.duration}`}
                      aria-current={index === activeStep ? 'step' : undefined}
                    >
                      <motion.div
                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                          index <= activeStep && index < 4 ? 'bg-transparent border-2 border-white/60' : ''
                        }`}
                        style={{
                          background: index === 4 && index <= activeStep 
                            ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                            : index < 4 && index <= activeStep 
                              ? 'transparent' 
                              : '#e5e7eb',
                          boxShadow: index <= activeStep 
                            ? index === 4 
                              ? '0 0 10px rgba(239, 68, 68, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)' 
                              : '0 0 10px rgba(255, 255, 255, 0.3)'
                            : 'none',
                          backdropFilter: index < 4 && index <= activeStep ? 'blur(5px)' : 'none'
                        }}
                        animate={prefersReducedMotion ? {} : index === activeStep ? { scale: [1, 1.1, 1] } : {}}
                        transition={prefersReducedMotion ? {} : { duration: 0.5, repeat: index === activeStep ? Infinity : 0, repeatDelay: 2 }}
                      >
                        <Icon className={`w-10 h-10 ${index <= activeStep ? 'text-white' : 'text-gray-500'}`} 
                              style={index <= activeStep ? { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' } : {}} 
                              aria-hidden="true" />
                      </motion.div>
                      <h4 className={`font-semibold text-center`}
                          style={{
                            color: index <= activeStep 
                              ? index === 4 ? '#ef4444' : 'white'
                              : '#6b7280',
                            textShadow: index <= activeStep 
                              ? index === 4 ? '0 0 8px rgba(239, 68, 68, 0.4)' : '0 0 5px rgba(255, 255, 255, 0.3)'
                              : 'none'
                          }}>
                        {step.title}
                      </h4>
                      <p className="text-sm mt-1"
                         style={{
                           color: index <= activeStep 
                             ? index === 4 ? '#fca5a5' : 'rgba(255, 255, 255, 0.8)'
                             : '#9ca3af'
                         }}>{step.duration}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-4" role="list" aria-label="Getting started steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  role="listitem"
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                    index === activeStep && index < 4 ? 'backdrop-blur-sm border-2 border-white/60' : ''
                  }`}
                  style={{
                    background: index === activeStep 
                      ? index === 4 
                        ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                        : 'rgba(255, 255, 255, 0.1)'
                      : '#f3f4f6',
                    boxShadow: index === activeStep 
                      ? index === 4 
                        ? '0 0 10px rgba(239, 68, 68, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)' 
                        : '0 0 10px rgba(255, 255, 255, 0.3)'
                      : 'none'
                  }}
                  onClick={() => handleStepClick(index)}
                  onKeyDown={(e) => handleStepKeyDown(e, index)}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  tabIndex={0}
                  aria-current={index === activeStep ? 'step' : undefined}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === activeStep ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <Icon className={`w-8 h-8 ${index === activeStep ? 'text-white' : 'text-gray-600'}`}
                               style={index === activeStep ? { filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' } : {}} 
                               aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold`}
                        style={{
                          color: index === activeStep 
                            ? 'white'
                            : index === 4 ? '#ef4444' : '#374151'
                        }}>
                      Step {step.id}: {step.title}
                    </h4>
                    <p className={`text-sm`}
                       style={{
                         color: index === activeStep 
                           ? 'rgba(255, 255, 255, 0.8)'
                           : '#6b7280'
                       }}>
                      {step.duration} • {step.description}
                    </p>
                  </div>
                  {index === activeStep && <ArrowRight className="w-6 h-6 text-white" aria-hidden="true" />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step Details Card */}
        <AnimatedSection>
          <Card className="mb-16 backdrop-blur-md bg-transparent border-2 border-white/80"
                style={{
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
                }}
                role="region"
                aria-label="Step details">
            <CardContent className="p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-transparent border-2 border-white/80"
                     style={{
                       boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                       backdropFilter: 'blur(5px)'
                     }}>
                  {(() => { 
                    const Icon = steps[activeStep].icon; 
                    return <Icon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />; 
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white"
                      style={{
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                      }}>
                    Step {steps[activeStep].id}: {steps[activeStep].title}
                  </h3>
                  <p className="mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{steps[activeStep].description}</p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>Duration: {steps[activeStep].duration}</span>
                  </div>
                </div>
              </div>

              {/* Regular Step Details */}
              {steps[activeStep].details && (
                <div className="space-y-3 mb-6" role="list" aria-label="Step details">
                  {steps[activeStep].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      role="listitem"
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Launch Preparation Milestones */}
              {steps[activeStep].milestones && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" role="list" aria-label="Launch milestones">
                  {steps[activeStep].milestones.map((milestone, index) => {
                    const MilestoneIcon = milestone.icon;
                    return (
                      <motion.div
                        key={index}
                        role="listitem"
                        className="bg-gray-50 rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <MilestoneIcon className="w-5 h-5 text-patriot" aria-hidden="true" />
                          <span className="font-semibold text-sm text-navy">Week {milestone.week}</span>
                        </div>
                        <p className="text-sm text-gray-700">{milestone.task}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Grand Opening Metrics */}
              {steps[activeStep].metrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" role="list" aria-label="Success metrics">
                  {steps[activeStep].metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      role="listitem"
                      className="text-center p-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }}
                    >
                      <Sparkles className="w-6 h-6 mx-auto mb-2 text-white" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />
                      <p className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{metric}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Deliverable/Result */}
              {steps[activeStep].deliverable && (
                <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 border border-white/20">
                  <Target className="w-5 h-5 flex-shrink-0 text-white" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <strong className="text-white">Deliverable:</strong> {steps[activeStep].deliverable}
                  </span>
                </div>
              )}

            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Partnership Models */}
        <AnimatedSection delay={0.3}>
          <motion.h3 
            className="text-3xl font-bold text-center mb-12 text-white"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Choose Your Partnership Model
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Partnership model options">
            {partnershipModels.map((model, index) => {
              const ModelIcon = model.icon;
              return (
                <motion.div 
                  key={model.id} 
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1 }} 
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-300 backdrop-blur-md bg-transparent border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 focus-within:ring-offset-transparent ${
                      selectedModel === model.id ? 'ring-4 ring-red-500 shadow-xl border-red-500/50' : 'hover:shadow-lg border-white/80'
                    }`}
                    style={{
                      boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => setSelectedModel(model.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedModel(model.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedModel === model.id}
                    aria-label={`${model.title} partnership model`}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                           style={{
                             background: 'linear-gradient(to right, #ef4444, #dc2626)',
                             boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
                           }}>
                        <ModelIcon className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-white" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>{model.title}</h4>
                      <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{model.description}</p>
                      
                      <div className="space-y-2 mb-4" role="list">
                        {model.benefits.map((benefit, idx) => (
                          <div key={idx} role="listitem" className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 text-red-500" aria-hidden="true" />
                            <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          <strong className="text-white" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>Best for:</strong> {model.bestFor}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12">
            <motion.button
              className="px-8 py-4 text-white rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-3 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-transparent"
              style={{
                background: 'linear-gradient(to right, #ef4444, #dc2626)',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.8), 0 8px 12px rgba(0, 0, 0, 0.15)'
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={() => setIsCalendarOpen(true)}
              aria-label="Schedule your discovery call today"
            >
              <Calendar className="w-6 h-6" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />
              Schedule Your Discovery Call Today
              <ArrowRight className="w-6 h-6" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' }} aria-hidden="true" />
            </motion.button>
            <p className="mt-4" style={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}>
              Join the growing network of Soaring Centers transforming education across America
            </p>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Calendar Modal */}
      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </section>
  );
};

export default GettingStartedSection;