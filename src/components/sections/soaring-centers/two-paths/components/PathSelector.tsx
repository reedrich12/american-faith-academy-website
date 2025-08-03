'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import Image from 'next/image';
import { Church, Briefcase } from 'lucide-react';

interface PathSelectorProps {
  onSelect: (id: string) => void;
  prefersReducedMotion: boolean;
}

export function PathSelector({ onSelect, prefersReducedMotion }: PathSelectorProps) {
  return (
    <AnimatedSection className="mb-16">
      <div className="text-center mb-12">
        <motion.h2
          id="two-paths-heading"
          className="font-serif text-5xl font-bold mb-6"
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #ffffff 35%, #ffffff 65%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
          }}
        >
          Two Paths to Impact
        </motion.h2>
        <motion.p
          className="text-xl max-w-3xl mx-auto"
          style={{
            background: 'linear-gradient(90deg, #fca5a5 0%, #ffffff 35%, #ffffff 65%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          }}
        >
          Whether you're a church leader or an education entrepreneur, we have a partnership path designed for your unique calling and goals.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" role="list" aria-label="Partnership path options">
        <motion.div
          role="listitem"
          className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-blue-900"
          onClick={() => onSelect('church')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect('church');
            }
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          tabIndex={0}
          aria-label="Church partnership path - Transform your ministry impact"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-950/80 z-10" />
          <Image
            src="/api/placeholder/600/400"
            alt="Church building with families"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
            <Church className="w-16 h-16 mb-4" aria-hidden="true" />
            <h3 className="text-3xl font-bold mb-2">For Churches</h3>
            <p className="text-lg">Transform Your Ministry Impact</p>
          </div>
        </motion.div>

        <motion.div
          role="listitem"
          className="relative h-64 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-red-700"
          onClick={() => onSelect('edupreneur')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect('edupreneur');
            }
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={prefersReducedMotion ? {} : { duration: 0.3 }}
          tabIndex={0}
          aria-label="Edupreneur path - Build your education business"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 to-red-800/80 z-10" />
          <Image
            src="/api/placeholder/600/400"
            alt="Professional educator with students"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
            <Briefcase className="w-16 h-16 mb-4" aria-hidden="true" />
            <h3 className="text-3xl font-bold mb-2">For Edupreneurs</h3>
            <p className="text-lg">Build Your Education Business</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
      >
        <p
          className="text-2xl font-semibold"
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #ffffff 35%, #ffffff 65%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          }}
        >
          Choose Your Path to Educational Impact
        </p>
      </motion.div>
    </AnimatedSection>
  );
}
