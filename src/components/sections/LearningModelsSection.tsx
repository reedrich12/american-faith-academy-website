'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Users, MapPin, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks';

interface LearningModel {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: string;
  bgColor: string;
}

interface ScheduleOption {
  days: number;
  label: string;
  description: string;
}

interface MapPin {
  x: string;
  y: string;
  delay: number;
}

const LearningModelsSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const models: LearningModel[] = [
    {
      title: "Solo Flights",
      subtitle: "Complete Online Learning",
      description: "Parents guide learning at home using AFA's structured curriculum, supported by our adaptive learning platform and comprehensive resources.",
      icon: Monitor,
      features: [
        "100% Online Curriculum",
        "Parent-Guided Learning",
        "AI-Adaptive Technology",
        "Flexible Scheduling",
        "Comprehensive Resources",
        "Virtual Community"
      ],
      color: "from-navy-500 to-navy-600",
      bgColor: "from-navy-50 to-navy-100"
    },
    {
      title: "Soaring Centers",
      subtitle: "Flexible In-Person Community",
      description: "Students engage in in-person learning at our church partner locations, with flexible schedules—one to five days a week—to meet your family's unique needs.",
      icon: Users,
      features: [
        "In-Person Community",
        "Church Partner Locations",
        "1-5 Days Per Week",
        "Certified Teachers",
        "Peer Interaction",
        "Family Flexibility"
      ],
      color: "from-patriot-500 to-patriot-600",
      bgColor: "from-patriot-50 to-patriot-100"
    }
  ];

  const scheduleOptions: ScheduleOption[] = [
    { days: 1, label: "One Day", description: "Perfect for supplemental learning" },
    { days: 2, label: "Two Days", description: "Balanced home and community" },
    { days: 3, label: "Three Days", description: "Strong community connection" },
    { days: 4, label: "Four Days", description: "Comprehensive in-person experience" },
    { days: 5, label: "Five Days", description: "Full traditional school experience" }
  ];

  const mapPins: MapPin[] = [
    { x: '20%', y: '30%', delay: 0 },
    { x: '45%', y: '25%', delay: 0.2 },
    { x: '70%', y: '40%', delay: 0.4 },
    { x: '30%', y: '60%', delay: 0.6 },
    { x: '60%', y: '70%', delay: 0.8 },
    { x: '80%', y: '55%', delay: 1.0 }
  ];

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const pinVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const pulseAnimation = prefersReducedMotion
    ? {}
    : {
        scale: [1, 2, 1],
        opacity: [0.7, 0, 0.7]
      };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="learning-models-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="learning-models-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Two Flexible Learning Models - Choose What Works for Your Family
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our program empowers parents to select between structured learning paths: online education 
            or in-person learning at Soaring Centers.
          </p>
        </AnimatedSection>

        {/* Learning Models Comparison */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          role="list"
          aria-label="Learning model options"
        >
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.2}>
                <Card 
                  className="h-full group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden"
                  role="listitem"
                >
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${model.bgColor} p-8 relative overflow-hidden`}>
                      <motion.div 
                        className={`w-20 h-20 rounded-full bg-gradient-to-r ${model.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        role="presentation"
                      >
                        <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                      </motion.div>
                      
                      <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                        {model.title}
                      </h3>
                      <h4 className="text-xl font-semibold text-patriot mb-4">
                        {model.subtitle}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {model.description}
                      </p>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 opacity-10" aria-hidden="true">
                        <Icon className="w-32 h-32" />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="p-8">
                      <h5 className="font-semibold text-navy mb-4">Key Features:</h5>
                      <ul 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        role="list"
                      >
                        {model.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex}
                            className="flex items-center space-x-2"
                            variants={featureVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div 
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${model.color}`}
                              aria-hidden="true"
                            />
                            <span className="text-gray-600">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Soaring Centers Schedule Flexibility */}
        <AnimatedSection delay={0.4}>
          <div 
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            role="region"
            aria-labelledby="schedule-options-heading"
          >
            <h3 
              id="schedule-options-heading"
              className="font-serif text-3xl font-bold text-navy text-center mb-8"
            >
              Soaring Centers: Choose Your Schedule
            </h3>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              role="list"
              aria-label="Schedule options"
            >
              {scheduleOptions.map((option, index) => (
                <motion.button
                  key={index}
                  className="text-center p-4 rounded-lg border-2 border-gray-200 hover:border-patriot-300 hover:bg-patriot-50 transition-all duration-300 cursor-pointer group"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                  aria-label={`${option.label}: ${option.description}`}
                  tabIndex={0}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">{option.days}</span>
                  </div>
                  <h4 className="font-semibold text-navy mb-2">{option.label}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive Map Preview */}
        <AnimatedSection delay={0.6}>
          <div 
            className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center"
            role="region"
            aria-labelledby="soaring-centers-map-heading"
          >
            <h3 
              id="soaring-centers-map-heading"
              className="font-serif text-3xl font-bold text-navy mb-4"
            >
              Find a Soaring Center Near You
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Our network of church partners is growing across the nation. Discover the learning 
              community that's right for your family.
            </p>
            
            {/* Map Placeholder with Animated Pins */}
            <div 
              className="relative bg-white rounded-lg p-8 mb-6 min-h-[300px] flex items-center justify-center overflow-hidden"
              role="img"
              aria-label="Map showing Soaring Center locations"
            >
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-br from-navy-100 to-patriot-100" />
              </div>
              
              {/* Animated Location Pins */}
              {mapPins.map((pin, index) => (
                <motion.div
                  key={index}
                  className="absolute w-6 h-6 bg-patriot rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                  style={{ left: pin.x, top: pin.y }}
                  variants={pinVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: pin.delay }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.5 }}
                  viewport={{ once: true }}
                  role="presentation"
                  aria-hidden="true"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-patriot rounded-full"
                    animate={pulseAnimation}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: pin.delay
                    }}
                  />
                </motion.div>
              ))}
              
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-patriot mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link 
                href="/soaring-centers"
                aria-label="Find a Soaring Center location near you"
              >
                Find a Soaring Center Near You
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LearningModelsSection;