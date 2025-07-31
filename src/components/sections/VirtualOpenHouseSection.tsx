'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Users, Video, CheckCircle, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import FormModal from '@/components/ui/form-modal';
import { usePrefersReducedMotion } from '@/hooks';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Event {
  date: string;
  time: string;
  title: string;
  description: string;
}

interface ExpectationItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimeUnit {
  label: string;
  value: number;
}

const VirtualOpenHouseSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Mock next event date (7 days from now)
  const nextEventDate = new Date();
  nextEventDate.setDate(nextEventDate.getDate() + 7);
  nextEventDate.setHours(19, 0, 0, 0); // 7:00 PM

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextEventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEventDate]);

  const upcomingEvents: Event[] = [
    {
      date: "March 15, 2024",
      time: "7:00 PM EST",
      title: "Introduction to Classical Education",
      description: "Discover the foundations of our educational approach"
    },
    {
      date: "March 22, 2024",
      time: "7:00 PM EST",
      title: "AI Technology in Learning",
      description: "See how personalized learning transforms education"
    },
    {
      date: "March 29, 2024",
      time: "7:00 PM EST",
      title: "Soaring Centers Overview",
      description: "Learn about our in-person learning communities"
    }
  ];

  const whatToExpect: ExpectationItem[] = [
    {
      icon: Users,
      title: "Meet Our Leadership",
      description: "Connect with our founders and educational leaders"
    },
    {
      icon: Video,
      title: "Live Demonstrations",
      description: "See our curriculum and technology in action"
    },
    {
      icon: CheckCircle,
      title: "Q&A Session",
      description: "Get answers to all your questions"
    }
  ];

  const timeUnits: TimeUnit[] = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  const pulseAnimation = prefersReducedMotion
    ? {}
    : {
        boxShadow: [
          "0 0 0 0 rgba(178, 34, 52, 0.4)",
          "0 0 0 30px rgba(178, 34, 52, 0)",
          "0 0 0 0 rgba(178, 34, 52, 0.4)"
        ]
      };

  const expectationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const eventVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-patriot-900 text-white relative overflow-hidden"
      aria-labelledby="virtual-open-house-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-patriot-500 to-patriot-600 rounded-full flex items-center justify-center"
            animate={pulseAnimation}
            transition={{ duration: 3, repeat: Infinity }}
            role="presentation"
          >
            <Video className="w-12 h-12 text-white" aria-hidden="true" />
          </motion.div>

          <h2 
            id="virtual-open-house-heading"
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
          >
            Experience Our School: Join a Virtual Open House
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Get an inside look at our learning model, meet our leadership, and discover how your student can soar.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Countdown Timer */}
          <AnimatedSection>
            <Card 
              className="bg-white/10 backdrop-blur-sm border-white/20"
              role="region"
              aria-labelledby="countdown-heading"
            >
              <CardContent className="p-8 text-center">
                <h3 
                  id="countdown-heading"
                  className="font-serif text-3xl font-bold mb-2"
                >
                  Next Open House
                </h3>
                <p className="text-gray-300 mb-6">
                  <time dateTime={nextEventDate.toISOString()}>
                    {nextEventDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} at 7:00 PM EST
                  </time>
                </p>

                {/* Countdown Display */}
                <div 
                  className="grid grid-cols-4 gap-4 mb-8"
                  role="timer"
                  aria-label="Countdown to next open house"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {timeUnits.map((unit, index) => (
                    <motion.div
                      key={unit.label}
                      className="bg-gradient-to-br from-patriot-500 to-patriot-600 rounded-lg p-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="text-3xl font-bold"
                        key={unit.value} // This will trigger re-animation when value changes
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        aria-label={`${unit.value} ${unit.label}`}
                      >
                        {unit.value.toString().padStart(2, '0')}
                      </motion.div>
                      <div className="text-sm text-gray-200">{unit.label}</div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-patriot hover:bg-patriot-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsFormOpen(true)}
                  aria-label="Register for the next virtual open house"
                >
                  Register for the Next Open House
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* What to Expect */}
          <AnimatedSection delay={0.2}>
            <h3 className="font-serif text-3xl font-bold mb-6">What to Expect</h3>
            <ul 
              className="space-y-6"
              role="list"
              aria-label="What to expect at our virtual open house"
            >
              {whatToExpect.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-4"
                    variants={expectationVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-patriot-500 to-patriot-600 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      role="presentation"
                    >
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>

        {/* Upcoming Events Schedule */}
        <AnimatedSection delay={0.4} className="mt-16">
          <h3 className="font-serif text-3xl font-bold text-center mb-8">Upcoming Events</h3>
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Upcoming virtual open house events"
          >
            {upcomingEvents.map((event, index) => (
              <motion.article
                key={index}
                variants={eventVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 text-patriot-300 mb-3">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time className="text-sm">{event.date}</time>
                    </div>
                    <div className="flex items-center space-x-2 text-patriot-300 mb-4">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-2 group-hover:text-patriot-200 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            role="region"
            aria-labelledby="recording-cta-heading"
          >
            <h3 
              id="recording-cta-heading"
              className="font-serif text-3xl font-bold mb-4"
            >
              Can't Make It Live? No Problem!
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              All registered attendees receive a recording of the session and exclusive access to 
              additional resources and Q&A follow-ups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsFormOpen(true)}
                aria-label="Register now for virtual open house"
              >
                Register Now
              </Button>
              <Button 
                size="lg" 
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                aria-label="View recordings of past virtual open house sessions"
              >
                View Past Sessions
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Virtual Open House Registration Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formId="565zEwV6gKqiSiiLDyQJ"
        formHeight="893px"
        formTitle="Virtual Open House Registration"
      />
    </section>
  );
};

export default VirtualOpenHouseSection;