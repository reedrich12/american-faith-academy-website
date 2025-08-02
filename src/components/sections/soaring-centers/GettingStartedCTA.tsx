'use client';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import CalendarModal from '@/components/ui/calendar-modal';
import type { useGettingStarted } from '@/hooks/useGettingStarted';

interface Props {
  data: ReturnType<typeof useGettingStarted>;
}

const GettingStartedCTA = ({ data }: Props) => {
  const { prefersReducedMotion, setIsCalendarOpen, isCalendarOpen } = data;

  return (
    <AnimatedSection>
      <div className="text-center mt-12">
        <motion.button
          className="px-8 py-4 text-white rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-3 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-transparent"
          style={{
            background: 'linear-gradient(to right, #ef4444, #dc2626)',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05, boxShadow: '0 0 40px rgba(239, 68, 68, 0.8), 0 8px 12px rgba(0,0,0,0.15)' }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => setIsCalendarOpen(true)}
          aria-label="Schedule your discovery call today"
        >
          <Calendar className="w-6 h-6" aria-hidden="true" />
          Schedule Your Discovery Call Today
          <ArrowRight className="w-6 h-6" aria-hidden="true" />
        </motion.button>
        <p
          className="mt-4"
          style={{ color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
        >
          Join the growing network of Soaring Centers transforming education across America
        </p>
      </div>
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </AnimatedSection>
  );
};

export default GettingStartedCTA;
