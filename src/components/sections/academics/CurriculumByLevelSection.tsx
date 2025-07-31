'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Globe, Calculator, Microscope, History, Palette, User, ChevronRight, GraduationCap, Sparkles, Search, Puzzle, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks';

interface Subject {
  name: string;
  icon: LucideIcon;
  pacing: 'Student-Paced' | 'School-Paced';
  topics: string[];
  description: string;
}

interface GradeLevel {
  id: string;
  title: string;
  theme: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
  subjects: Subject[];
}

const CurriculumByLevelSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeLevel, setActiveLevel] = useState(0);

  const gradeLevels: GradeLevel[] = [
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
          topics: ['Formal Logic', 'Argumentation', 'Critical Analysis', 'Debate Skills'],
          description: 'Learning to think clearly and argue persuasively'
        },
        {
          name: 'Advanced Mathematics',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Pre-Algebra', 'Algebra I', 'Geometry Foundations', 'Mathematical Proofs'],
          description: 'Abstract mathematical thinking and problem-solving'
        },
        {
          name: 'Literature & Composition',
          icon: BookOpen,
          pacing: 'Student-Paced',
          topics: ['Classic Literature', 'Essay Writing', 'Literary Analysis', 'Research Papers'],
          description: 'Deep engagement with great texts and ideas'
        },
        {
          name: 'Integrated Science',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Physical Science', 'Biology', 'Chemistry Basics', 'Lab Skills'],
          description: 'Rigorous scientific investigation and experimentation'
        },
        {
          name: 'History & Government',
          icon: History,
          pacing: 'School-Paced',
          topics: ['U.S. History', 'Government & Civics', 'World History', 'Current Events'],
          description: 'Understanding our heritage and civic responsibilities'
        },
        {
          name: 'Theology & Worldview',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Systematic Theology', 'Worldview Analysis', 'Apologetics', 'Ethics'],
          description: 'Developing a coherent biblical worldview'
        }
      ]
    },
    {
      id: '9-12',
      title: '9-12',
      theme: 'Mastery & Rhetoric',
      description: 'Preparing for college and life with advanced scholarship',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: GraduationCap,
      subjects: [
        {
          name: 'Rhetoric & Communication',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Classical Rhetoric', 'Public Speaking', 'Persuasive Writing', 'Senior Thesis'],
          description: 'Mastering the art of persuasion and communication'
        },
        {
          name: 'Advanced Mathematics',
          icon: Calculator,
          pacing: 'Student-Paced',
          topics: ['Algebra II', 'Pre-Calculus', 'Calculus', 'Statistics'],
          description: 'College-level mathematical preparation'
        },
        {
          name: 'Great Books',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Western Classics', 'Philosophy', 'Literary Criticism', 'Creative Writing'],
          description: 'Engaging with the greatest minds in history'
        },
        {
          name: 'Advanced Sciences',
          icon: Microscope,
          pacing: 'School-Paced',
          topics: ['Biology', 'Chemistry', 'Physics', 'AP Sciences'],
          description: 'College-preparatory laboratory sciences'
        },
        {
          name: 'History & Philosophy',
          icon: History,
          pacing: 'School-Paced',
          topics: ['Ancient Philosophy', 'Modern History', 'Economics', 'Political Philosophy'],
          description: 'Understanding ideas that shaped our world'
        },
        {
          name: 'Advanced Theology',
          icon: BookOpen,
          pacing: 'School-Paced',
          topics: ['Biblical Languages', 'Church History', 'Contemporary Issues', 'Missions'],
          description: 'Deep theological study and practical application'
        }
      ]
    }
  ];

  const pacingBadgeVariants = {
    'Student-Paced': 'bg-blue-100 text-blue-700 border-blue-200',
    'School-Paced': 'bg-green-100 text-green-700 border-green-200'
  };

  const currentLevel = gradeLevels[activeLevel];

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="curriculum-levels-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="curriculum-levels-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Curriculum by Grade Level
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our classical curriculum progresses through the natural stages of learning, 
            from wonder and discovery to mastery and rhetoric.
          </p>
        </AnimatedSection>

        {/* Grade Level Tabs */}
        <div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Grade level selection"
        >
          {gradeLevels.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.button
                key={level.id}
                onClick={() => setActiveLevel(index)}
                className={`
                  px-6 py-4 rounded-xl font-semibold transition-all duration-300
                  ${activeLevel === index 
                    ? `bg-gradient-to-r ${level.color} text-white shadow-lg scale-105` 
                    : 'bg-white text-gray-700 hover:shadow-md border-2 border-gray-200'
                  }
                `}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                role="tab"
                aria-selected={activeLevel === index}
                aria-controls={`tabpanel-${level.id}`}
                id={`tab-${level.id}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="text-lg">{level.title}</span>
                </div>
                <div className="text-sm font-normal mt-1">{level.theme}</div>
              </motion.button>
            );
          })}
        </div>

        {/* Content for Selected Level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
            id={`tabpanel-${currentLevel.id}`}
            aria-labelledby={`tab-${currentLevel.id}`}
          >
            {/* Level Header */}
            <div className={`${currentLevel.bgColor} rounded-2xl p-8 mb-8 text-center`}>
              <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                Grades {currentLevel.title}: {currentLevel.theme}
              </h3>
              <p className="text-lg text-gray-600">
                {currentLevel.description}
              </p>
            </div>

            {/* Subject Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label={`Subjects for grades ${currentLevel.title}`}
            >
              {currentLevel.subjects.map((subject, index) => {
                const SubjectIcon = subject.icon;
                return (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <Card 
                      className="h-full hover:shadow-xl transition-shadow duration-300"
                      role="listitem"
                    >
                      <CardContent className="p-6">
                        {/* Subject Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentLevel.color} flex items-center justify-center`}>
                              <SubjectIcon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <h4 className="font-serif text-xl font-bold text-navy">
                              {subject.name}
                            </h4>
                          </div>
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${pacingBadgeVariants[subject.pacing]}`}
                            aria-label={`${subject.pacing} subject`}
                          >
                            {subject.pacing}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">
                          {subject.description}
                        </p>

                        {/* Topics */}
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm text-gray-700 mb-2">Key Topics:</h5>
                          <ul 
                            className="space-y-1"
                            role="list"
                          >
                            {subject.topics.map((topic, topicIndex) => (
                              <li 
                                key={topicIndex}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <ChevronRight className="w-3 h-3 text-gray-400" aria-hidden="true" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Pacing Explanation */}
            <AnimatedSection delay={0.6} className="mt-12">
              <Card className="bg-gradient-to-r from-navy-50 to-patriot-50 border-0">
                <CardContent className="p-8">
                  <h4 className="font-serif text-2xl font-bold text-navy mb-4 text-center">
                    Understanding Our Pacing Model
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-700" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-lg text-navy mb-2">Student-Paced</h5>
                        <p className="text-gray-600">
                          Math and Language Arts progress at each student's individual pace, 
                          ensuring mastery before advancement with AI-powered support.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-green-700" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-lg text-navy mb-2">School-Paced</h5>
                        <p className="text-gray-600">
                          History, Science, and other subjects follow a community pace, 
                          fostering discussion and shared learning experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.8} className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link 
                  href="/admissions"
                  aria-label="Learn more about our curriculum and apply for admission"
                >
                  Explore Our Full Curriculum
                  <ChevronRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </AnimatedSection>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CurriculumByLevelSection;