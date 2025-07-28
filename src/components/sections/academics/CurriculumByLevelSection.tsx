'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Globe, 
  Calculator, 
  Microscope, 
  History, 
  Music, 
  Palette,
  User,
  Clock,
  Star,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Search,
  Puzzle,
  Target
} from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const CurriculumByLevelSection = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  const gradeLevels = [
    {
      id: 'k-2',
      title: 'K-2',
      theme: 'Wonder & Foundation',
      description: 'Building joy in learning through exploration and discovery',
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: Sparkles,
      subjects: [
        {
          name: 'Language Arts',
          icon: BookOpen,
          pacing: 'Student-Paced',
          topics: ['Phonics & Reading', 'Handwriting', 'Basic Grammar', 'Story Comprehension'],
          description: 'Foundation in reading and writing through systematic phonics'
        },
        {
          name: 'Mathematics',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Number Sense', 'Basic Operations', 'Patterns', 'Problem Solving'],
          description: 'Concrete to abstract mathematical thinking'
        },
        {
          name: 'History & Geography',
          icon: Globe,
          pacing: 'School-Paced',
          topics: ['Community Helpers', 'Maps & Globes', 'American Symbols', 'Family History'],
          description: 'Understanding our place in the world'
        },
        {
          name: 'Science',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Nature Study', 'Seasons', 'Animals', 'Simple Experiments'],
          description: 'Wonder-filled exploration of God\'s creation'
        },
        {
          name: 'Bible',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Bible Stories', 'Character Building', 'Memory Verses', 'Prayer'],
          description: 'Foundation of faith through engaging stories'
        },
        {
          name: 'Fine Arts',
          icon: Palette,
          pacing: 'School-Paced',
          topics: ['Art Appreciation', 'Music & Movement', 'Creative Expression'],
          description: 'Developing creativity and appreciation for beauty'
        }
      ]
    },
    {
      id: '3-6',
      title: '3-6',
      theme: 'Discovery & Logic',
      description: 'Developing critical thinking through integrated subjects',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: Search,
      subjects: [
        {
          name: 'Language Arts',
          icon: BookOpen,
          pacing: 'Student-Paced',
          topics: ['Grammar & Composition', 'Literature Study', 'Vocabulary', 'Research Skills'],
          description: 'Mastering language through classical texts'
        },
        {
          name: 'Mathematics',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Multiplication/Division', 'Fractions', 'Geometry', 'Word Problems'],
          description: 'Building mathematical reasoning and problem-solving'
        },
        {
          name: 'History',
          icon: History,
          pacing: 'School-Paced',
          topics: ['Ancient Civilizations', 'Medieval Times', 'American History', 'World Geography'],
          description: 'Chronological journey through human history'
        },
        {
          name: 'Science',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Life Science', 'Earth Science', 'Physical Science', 'Scientific Method'],
          description: 'Systematic exploration of natural phenomena'
        },
        {
          name: 'Latin',
          icon: Globe,
          pacing: 'School-Paced',
          topics: ['Basic Vocabulary', 'Grammar Forms', 'Roman Culture', 'English Derivatives'],
          description: 'Foundation for language mastery and logical thinking'
        },
        {
          name: 'Bible & Theology',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Old Testament Survey', 'New Testament Survey', 'Christian Worldview', 'Apologetics Basics'],
          description: 'Deeper understanding of Scripture and faith'
        }
      ]
    },
    {
      id: '7-8',
      title: '7-8',
      theme: 'Analysis & Reasoning',
      description: 'Mastering the art of logical thinking and argumentation',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Puzzle,
      subjects: [
        {
          name: 'Logic & Rhetoric',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Formal Logic', 'Debate', 'Critical Analysis', 'Persuasive Writing'],
          description: 'Learning to think and communicate clearly'
        },
        {
          name: 'Pre-Algebra & Algebra',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Algebraic Thinking', 'Equations', 'Functions', 'Real-World Applications'],
          description: 'Abstract mathematical reasoning'
        },
        {
          name: 'Omnibus I & II',
          icon: History,
          pacing: 'School-Paced',
          topics: ['Primary Sources', 'Great Books', 'Theology', 'Historical Analysis'],
          description: 'Integrated literature, history, and theology'
        },
        {
          name: 'Physical Science',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Chemistry Basics', 'Physics Principles', 'Lab Work', 'Scientific Writing'],
          description: 'Hands-on exploration of physical laws'
        },
        {
          name: 'Latin II',
          icon: Globe,
          pacing: 'School-Paced',
          topics: ['Advanced Grammar', 'Translation', 'Classical Texts', 'Etymology'],
          description: 'Reading original Latin texts'
        },
        {
          name: 'Worldview Studies',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Philosophy Basics', 'Comparative Worldviews', 'Ethics', 'Current Issues'],
          description: 'Analyzing ideas through a biblical lens'
        }
      ]
    },
    {
      id: '9-12',
      title: '9-12',
      theme: 'Rhetoric & Mastery',
      description: 'Preparing servant-leaders for college and beyond',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: Target,
      subjects: [
        {
          name: 'Rhetoric & Composition',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Advanced Rhetoric', 'Research Papers', 'Thesis Defense', 'Public Speaking'],
          description: 'Mastering the art of persuasion'
        },
        {
          name: 'Advanced Mathematics',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Geometry', 'Trigonometry', 'Pre-Calculus', 'Calculus (optional)'],
          description: 'College-level mathematical preparation'
        },
        {
          name: 'Omnibus III-VI',
          icon: History,
          pacing: 'School-Paced',
          topics: ['Ancient Epics', 'Medieval Literature', 'Modern Classics', 'American Literature'],
          description: 'Great Books integrated with history and theology'
        },
        {
          name: 'Laboratory Sciences',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Biology', 'Chemistry', 'Physics', 'Advanced Electives'],
          description: 'College-prep lab sciences'
        },
        {
          name: 'Modern Languages',
          icon: Globe,
          pacing: 'Student-Paced',
          topics: ['Spanish/French', 'Cultural Studies', 'Conversation', 'Literature'],
          description: 'Practical language skills for global engagement'
        },
        {
          name: 'Senior Thesis',
          icon: GraduationCap,
          pacing: 'Student-Paced',
          topics: ['Research Project', 'Written Thesis', 'Oral Defense', 'Mentor Guidance'],
          description: 'Capstone project demonstrating mastery'
        }
      ]
    }
  ];

  const PacingBadge = ({ pacing }: { pacing: string }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      pacing === 'Student-Paced' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-blue-100 text-blue-800'
    }`}>
      <Clock className="w-3 h-3 mr-1" />
      {pacing}
    </span>
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Curriculum by Grade Level
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A carefully sequenced journey from wonder to wisdom, building knowledge and skills 
            progressively through each developmental stage.
          </p>
        </AnimatedSection>

        {/* Grade Level Tabs - Desktop */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-8 bg-gray-100 p-2 rounded-xl">
            {gradeLevels.map((level, index) => (
              <motion.button
                key={level.id}
                onClick={() => setActiveLevel(index)}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  activeLevel === index
                    ? 'bg-white shadow-lg text-navy'
                    : 'text-gray-600 hover:text-navy hover:bg-white/50'
                }`}
                whileHover={{ scale: activeLevel === index ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <level.icon className="w-8 h-8 text-navy" />
                  <div className="text-left">
                    <div className="text-lg font-bold">{level.title}</div>
                    <div className="text-sm font-normal">{level.theme}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`border-2 ${gradeLevels[activeLevel].borderColor} shadow-xl`}>
                <CardContent className="p-8">
                  {/* Level Header */}
                  <div className={`-m-8 mb-8 p-8 ${gradeLevels[activeLevel].bgColor} border-b-2 ${gradeLevels[activeLevel].borderColor}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                          Grades {gradeLevels[activeLevel].title}: {gradeLevels[activeLevel].theme}
                        </h3>
                        <p className="text-lg text-gray-700">
                          {gradeLevels[activeLevel].description}
                        </p>
                      </div>
                      <motion.div 
                        className={`w-20 h-20 bg-gradient-to-br ${gradeLevels[activeLevel].color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {React.createElement(gradeLevels[activeLevel].icon, { className: "w-10 h-10 text-white" })}
                      </motion.div>
                    </div>
                  </div>

                  {/* Subjects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gradeLevels[activeLevel].subjects.map((subject, idx) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${gradeLevels[activeLevel].color} rounded-lg flex items-center justify-center`}>
                                  <subject.icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-semibold text-lg text-navy">{subject.name}</h4>
                              </div>
                              <PacingBadge pacing={subject.pacing} />
                            </div>
                            
                            <p className="text-gray-600 mb-4">{subject.description}</p>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-semibold text-gray-700">Key Topics:</p>
                              <div className="flex flex-wrap gap-2">
                                {subject.topics.map((topic) => (
                                  <span key={topic} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual Progression Arrow */}
                  {activeLevel < gradeLevels.length - 1 && (
                    <motion.div 
                      className="mt-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button
                        onClick={() => setActiveLevel(activeLevel + 1)}
                        className="inline-flex items-center space-x-2 text-patriot hover:text-patriot-600 font-medium transition-colors"
                      >
                        <span>Continue to {gradeLevels[activeLevel + 1].title}</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {gradeLevels.map((level, index) => (
            <AnimatedSection key={level.id} delay={index * 0.1}>
              <Card className={`border-2 ${level.borderColor} overflow-hidden`}>
                <button
                  onClick={() => setActiveLevel(activeLevel === index ? -1 : index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <level.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-navy">
                          Grades {level.title}
                        </h3>
                        <p className="text-sm text-gray-600">{level.theme}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeLevel === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeLevel === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 ${level.bgColor} border-t-2 ${level.borderColor}`}>
                        <p className="text-gray-700 mb-6">{level.description}</p>
                        
                        <div className="space-y-4">
                          {level.subjects.map((subject) => (
                            <div key={subject.name} className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <subject.icon className="w-5 h-5 text-navy" />
                                  <h4 className="font-semibold text-navy">{subject.name}</h4>
                                </div>
                                <PacingBadge pacing={subject.pacing} />
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{subject.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {subject.topics.slice(0, 3).map((topic) => (
                                  <span key={topic} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {topic}
                                  </span>
                                ))}
                                {subject.topics.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{subject.topics.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CurriculumByLevelSection;