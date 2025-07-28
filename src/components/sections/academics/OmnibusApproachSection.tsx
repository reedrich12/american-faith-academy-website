'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Globe, 
  Palette, 
  History, 
  Music, 
  Lightbulb,
  Users,
  Brain,
  Link2,
  Quote,
  ArrowRight,
  CheckCircle,
  Church
} from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const OmnibusApproachSection = () => {
  const [activeConnection, setActiveConnection] = useState<string | null>(null);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const subjects = [
    { id: 'history', name: 'History', icon: History, color: 'from-amber-400 to-orange-500', position: { x: 50, y: 24 } },
    { id: 'literature', name: 'Literature', icon: BookOpen, color: 'from-blue-400 to-indigo-500', position: { x: 72, y: 38 } },
    { id: 'theology', name: 'Theology', icon: Church, color: 'from-purple-400 to-pink-500', position: { x: 72, y: 62 } },
    { id: 'geography', name: 'Geography', icon: Globe, color: 'from-green-400 to-emerald-500', position: { x: 50, y: 76 } },
    { id: 'arts', name: 'Fine Arts', icon: Palette, color: 'from-rose-400 to-red-500', position: { x: 28, y: 62 } },
    { id: 'music', name: 'Music', icon: Music, color: 'from-cyan-400 to-blue-500', position: { x: 28, y: 38 } }
  ];

  const connections = [
    { from: 'history', to: 'literature', label: 'Historical Context' },
    { from: 'history', to: 'theology', label: 'God\'s Providence' },
    { from: 'literature', to: 'theology', label: 'Moral Themes' },
    { from: 'geography', to: 'history', label: 'Place & Time' },
    { from: 'arts', to: 'history', label: 'Cultural Expression' },
    { from: 'music', to: 'theology', label: 'Worship & Beauty' },
    { from: 'literature', to: 'arts', label: 'Visual Interpretation' },
    { from: 'geography', to: 'arts', label: 'Regional Styles' }
  ];

  const romeExample = {
    history: "Study the rise and fall of the Roman Empire",
    literature: "Read Julius Caesar by Shakespeare & Virgil's Aeneid",
    theology: "Explore early Christianity & Paul's missionary journeys",
    geography: "Map the expansion of Rome & Mediterranean world",
    arts: "Analyze Roman architecture, mosaics, and sculptures",
    music: "Learn Gregorian chants & early Christian hymns"
  };

  const benefits = [
    {
      icon: Brain,
      title: "Deeper Understanding",
      description: "Subjects reinforce each other, creating lasting knowledge"
    },
    {
      icon: Link2,
      title: "Natural Connections",
      description: "Students see how all knowledge is interconnected"
    },
    {
      icon: Users,
      title: "Engaging Discussions",
      description: "Rich conversations that span multiple disciplines"
    },
    {
      icon: Lightbulb,
      title: "Critical Thinking",
      description: "Analyze events from multiple perspectives"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            The Beauty of Integrated Learning: Our Omnibus Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Unlike traditional education that isolates subjects, our Omnibus curriculum weaves 
            history, literature, theology, and the arts into one beautiful tapestry of learning.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-20">
          {/* Interactive Subject Web */}
          <AnimatedSection delay={0.2}>
            <Card className="h-full border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-bold text-navy mb-6 text-center">
                  How Subjects Connect
                </h3>
                
                {/* Desktop Web Visualization */}
                <div className="hidden md:block relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-xl shadow-inner">
                  {/* Create a custom aspect ratio container that's slightly taller than square */}
                  <div className="relative w-full" style={{ paddingBottom: '115%' }}>
                    <div className="absolute inset-8 inset-x-6">
                      {/* Grid Container for Hexagon Layout */}
                      <div className="relative w-full h-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr_1fr] gap-0">
                    {/* Connections SVG Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                      {connections.map((conn) => {
                        const fromSubject = subjects.find(s => s.id === conn.from);
                        const toSubject = subjects.find(s => s.id === conn.to);
                        if (!fromSubject || !toSubject) return null;
                        
                        const isActive = activeConnection === `${conn.from}-${conn.to}` || 
                                        hoveredSubject === conn.from || 
                                        hoveredSubject === conn.to;
                        
                        return (
                          <g key={`${conn.from}-${conn.to}`}>
                            <line
                              x1={`${fromSubject.position.x}%`}
                              y1={`${fromSubject.position.y}%`}
                              x2={`${toSubject.position.x}%`}
                              y2={`${toSubject.position.y}%`}
                              stroke="#6b7280"
                              strokeWidth="2"
                              strokeDasharray="5 5"
                              opacity={isActive ? 0 : 0.3}
                            />
                            <motion.line
                              x1={`${fromSubject.position.x}%`}
                              y1={`${fromSubject.position.y}%`}
                              x2={`${toSubject.position.x}%`}
                              y2={`${toSubject.position.y}%`}
                              stroke="#B22234"
                              strokeWidth="3"
                              opacity={isActive ? 1 : 0}
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: isActive ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* History - Top Center */}
                    <motion.div
                      className="col-start-3 row-start-1 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0 }}
                      onMouseEnter={() => setHoveredSubject('history')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'history' ? 'ring-4 ring-amber-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <History className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'history' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          History
                        </p>
                      </div>
                    </motion.div>

                    {/* Literature - Top Right */}
                    <motion.div
                      className="col-start-5 row-start-2 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      onMouseEnter={() => setHoveredSubject('literature')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'literature' ? 'ring-4 ring-blue-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'literature' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          Literature
                        </p>
                      </div>
                    </motion.div>

                    {/* Theology - Bottom Right */}
                    <motion.div
                      className="col-start-5 row-start-4 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onMouseEnter={() => setHoveredSubject('theology')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'theology' ? 'ring-4 ring-purple-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Church className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'theology' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          Theology
                        </p>
                      </div>
                    </motion.div>

                    {/* Geography - Bottom Center */}
                    <motion.div
                      className="col-start-3 row-start-5 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      onMouseEnter={() => setHoveredSubject('geography')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'geography' ? 'ring-4 ring-green-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'geography' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          Geography
                        </p>
                      </div>
                    </motion.div>

                    {/* Fine Arts - Bottom Left */}
                    <motion.div
                      className="col-start-1 row-start-4 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      onMouseEnter={() => setHoveredSubject('arts')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'arts' ? 'ring-4 ring-rose-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Palette className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'arts' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          Fine Arts
                        </p>
                      </div>
                    </motion.div>

                    {/* Music - Top Left */}
                    <motion.div
                      className="col-start-1 row-start-2 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      onMouseEnter={() => setHoveredSubject('music')}
                      onMouseLeave={() => setHoveredSubject(null)}
                    >
                      <div className="flex flex-col items-center cursor-pointer">
                        <motion.div 
                          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                            hoveredSubject === 'music' ? 'ring-4 ring-cyan-300 ring-opacity-50' : ''
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Music className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </motion.div>
                        <p className={`mt-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                          hoveredSubject === 'music' ? 'text-navy scale-110' : 'text-gray-700'
                        }`}>
                          Music
                        </p>
                      </div>
                    </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile List View */}
                <div className="md:hidden space-y-3">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center`}>
                        <subject.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700">{subject.name}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-gray-600 mt-12">
                  <span className="hidden md:inline">Hover over subjects to see connections</span>
                  <span className="md:hidden">All subjects work together in harmony</span>
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Rome Example */}
          <AnimatedSection delay={0.4}>
            <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-2xl font-bold text-navy">
                    Example: Studying Ancient Rome
                  </h3>
                  <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    6 Subjects, 1 Theme
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(romeExample).map(([subjectId, content], index) => {
                    const subject = subjects.find(s => s.id === subjectId);
                    if (!subject) return null;

                    return (
                      <motion.div
                        key={subjectId}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <subject.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy mb-1">{subject.name}</h4>
                          <p className="text-sm text-gray-600">{content}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                  <p className="text-sm text-amber-800 font-medium text-center">
                    All subjects explore the same time period, creating deep, 
                    multifaceted understanding
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Benefits Grid */}
        <AnimatedSection delay={0.6}>
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-12">
              Why Integrated Learning Works Better
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-navy mb-2">{benefit.title}</h4>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Student Testimonial */}
        <AnimatedSection delay={0.8}>
          <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-gradient-to-r from-navy-50 to-patriot-50">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-patriot mb-6 mx-auto" />
              <blockquote className="text-center">
                <p className="text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "I never understood why we studied history until Omnibus. Learning about the Reformation 
                  while reading Luther's writings, studying Renaissance art, and seeing how it all connected 
                  to God's plan—it made everything come alive. History isn't just dates anymore; 
                  it's God's story, and we're part of it."
                </p>
                <footer className="text-gray-600">
                  <p className="font-semibold text-navy">Sarah M., 11th Grade</p>
                  <p className="text-sm">AFA Student</p>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default OmnibusApproachSection;