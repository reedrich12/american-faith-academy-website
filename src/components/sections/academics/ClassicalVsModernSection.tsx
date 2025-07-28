'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Lightbulb, 
  GraduationCap, 
  CheckCircle,
  ChevronDown,
  Award,
  Users,
  Target
} from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const ClassicalVsModernSection = () => {
  const [showBenefits, setShowBenefits] = useState(false);

  const educationTypes = [
    {
      type: "Modern Education",
      focus: "What to Think",
      description: "Content delivery and information retention",
      icon: BookOpen,
      color: "gray",
      features: [
        "Standardized testing focus",
        "Subject isolation",
        "Grade-level restrictions",
        "One-size-fits-all approach"
      ],
      bgGradient: "from-gray-100 to-gray-200"
    },
    {
      type: "Classical Education",
      focus: "How to Think",
      description: "Mental training and wisdom development",
      icon: Brain,
      color: "navy",
      features: [
        "Critical thinking emphasis",
        "Integrated subjects",
        "Developmental stages",
        "Personalized pacing"
      ],
      bgGradient: "from-navy-50 to-patriot-50"
    }
  ];

  const classicalStages = [
    {
      stage: "Grammar",
      ages: "K-6",
      icon: BookOpen,
      focus: "Knowledge Acquisition",
      description: "Building a strong foundation of facts and understanding",
      skills: ["Memorization", "Observation", "Listening", "Reading fundamentals"]
    },
    {
      stage: "Logic",
      ages: "7-8",
      icon: Brain,
      focus: "Critical Thinking",
      description: "Learning to analyze, question, and reason through ideas",
      skills: ["Analytical thinking", "Debate", "Formal logic", "Research methods"]
    },
    {
      stage: "Rhetoric",
      ages: "9-12",
      icon: GraduationCap,
      focus: "Wisdom & Expression",
      description: "Articulating ideas beautifully and persuasively",
      skills: ["Public speaking", "Writing mastery", "Leadership", "Original thought"]
    }
  ];

  const classicalBenefits = [
    {
      icon: Award,
      title: "2,000+ Years Proven",
      description: "Time-tested method that produced history's greatest minds"
    },
    {
      icon: Brain,
      title: "Develops Critical Thinking",
      description: "Students learn to analyze, evaluate, and create—not just memorize"
    },
    {
      icon: Users,
      title: "Creates Lifelong Learners",
      description: "Teaches students how to learn, preparing them for any future challenge"
    },
    {
      icon: Target,
      title: "Integrated Knowledge",
      description: "Subjects connect and reinforce each other for deeper understanding"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Classical vs Modern Education
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how our classical approach develops deeper thinking and lasting wisdom,
            preparing students not just for tests, but for life.
          </p>
        </AnimatedSection>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {educationTypes.map((edu, index) => (
            <AnimatedSection key={edu.type} delay={index * 0.2}>
              <Card className={`h-full border-0 shadow-lg ${edu.type === "Classical Education" ? 'ring-2 ring-patriot' : ''}`}>
                <CardContent className="p-8">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${edu.bgGradient} -m-8 mb-6 p-6 rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-16 h-16 ${edu.color === "navy" ? 'bg-navy' : 'bg-gray-400'} rounded-2xl flex items-center justify-center`}>
                        <edu.icon className="w-8 h-8 text-white" />
                      </div>
                      {edu.type === "Classical Education" && (
                        <span className="bg-patriot text-white px-3 py-1 rounded-full text-sm font-semibold">
                          AFA Approach
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy mt-4 mb-2">
                      {edu.type}
                    </h3>
                    <p className={`text-3xl font-bold ${edu.color === "navy" ? 'text-patriot' : 'text-gray-600'}`}>
                      {edu.focus}
                    </p>
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {edu.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${edu.color === "navy" ? 'text-patriot' : 'text-gray-400'}`} />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Three Stages Timeline */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
              The Classical Education Journey
            </h3>
            
            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
              {/* Progress Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200">
                <motion.div 
                  className="h-full bg-gradient-to-r from-navy-500 via-patriot-500 to-navy-500"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Stages */}
              <div className="grid grid-cols-3 gap-8 relative">
                {classicalStages.map((stage, index) => (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Stage Number */}
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="w-12 h-12 bg-white border-4 border-patriot rounded-full flex items-center justify-center relative z-10"
                        whileInView={{ scale: [0.8, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="font-bold text-navy">{index + 1}</span>
                      </motion.div>
                    </div>

                    {/* Stage Card */}
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <stage.icon className="w-8 h-8 text-navy" />
                        </div>
                        <h4 className="font-serif text-2xl font-bold text-navy mb-2">
                          {stage.stage} Stage
                        </h4>
                        <p className="text-patriot font-semibold mb-2">Ages {stage.ages}</p>
                        <p className="text-lg font-medium text-gray-700 mb-3">{stage.focus}</p>
                        <p className="text-gray-600 mb-4">{stage.description}</p>
                        
                        {/* Skills */}
                        <div className="space-y-2">
                          {stage.skills.map((skill, idx) => (
                            <div key={idx} className="text-sm text-gray-600 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-patriot rounded-full mr-2" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-6">
              {classicalStages.map((stage, index) => (
                <AnimatedSection key={stage.stage} delay={index * 0.1}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-patriot text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-xl flex items-center justify-center">
                              <stage.icon className="w-6 h-6 text-navy" />
                            </div>
                            <h4 className="font-serif text-xl font-bold text-navy">
                              {stage.stage} Stage
                            </h4>
                          </div>
                          <p className="text-patriot font-semibold mb-2">Ages {stage.ages}</p>
                          <p className="font-medium text-gray-700 mb-2">{stage.focus}</p>
                          <p className="text-gray-600 text-sm">{stage.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Why Classical Works Section */}
        <AnimatedSection delay={0.6}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-serif text-3xl font-bold text-navy text-center mb-8">
                Why Classical Education Works
              </h3>

              {/* Always Visible Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {classicalBenefits.slice(0, 2).map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-navy mb-1">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Expandable Benefits */}
              <motion.div
                initial={false}
                animate={{ height: showBenefits ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {classicalBenefits.slice(2).map((benefit, index) => (
                    <motion.div
                      key={index + 2}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: showBenefits ? 1 : 0, y: showBenefits ? 0 : 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-navy mb-1">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Toggle Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowBenefits(!showBenefits)}
                  className="inline-flex items-center space-x-2 text-patriot hover:text-patriot-600 font-medium transition-colors"
                >
                  <span>{showBenefits ? 'Show Less' : 'Discover More Benefits'}</span>
                  <motion.div
                    animate={{ rotate: showBenefits ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClassicalVsModernSection;