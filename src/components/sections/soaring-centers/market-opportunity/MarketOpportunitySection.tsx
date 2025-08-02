'use client';

import { motion } from 'framer-motion';
import { MarketStatistics } from './components/MarketStatistics';
import { MarketGrowthChart } from './components/MarketGrowthChart';
import { MarketProjections } from './components/MarketProjections';
import { MarketCTA } from './components/MarketCTA';
import { useMarketOpportunity } from './hooks/useMarketOpportunity';

export default function MarketOpportunitySection() {
  const {
    statistics,
    marketForces,
    validationMetrics,
    students,
    setStudents,
    tuition,
    setTuition,
    scenario,
    setScenario,
    roi,
    prefersReducedMotion,
    handleCTAClick,
  } = useMarketOpportunity();

  return (
    <section className="py-20" aria-labelledby="market-opportunity-heading">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-16">
          <motion.h2
            id="market-opportunity-heading"
            className="text-5xl font-bold mb-6 font-serif text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
          >
            The Market Opportunity
          </motion.h2>
          <motion.p
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }
            }
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          >
            The education landscape is shifting dramatically. Growing demand for classical Christian education, coupled with expanding school choice programs, creates an unprecedented opportunity for Soaring Centers.
          </motion.p>
        </div>

        <MarketStatistics statistics={statistics} prefersReducedMotion={prefersReducedMotion} />
        <MarketGrowthChart
          students={students}
          setStudents={setStudents}
          tuition={tuition}
          setTuition={setTuition}
          scenario={scenario}
          setScenario={setScenario}
          roi={roi}
          prefersReducedMotion={prefersReducedMotion}
        />
        <MarketProjections
          marketForces={marketForces}
          validationMetrics={validationMetrics}
          prefersReducedMotion={prefersReducedMotion}
        />
        <MarketCTA onAction={handleCTAClick} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
