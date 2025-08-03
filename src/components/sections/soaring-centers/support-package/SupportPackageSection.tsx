'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import SupportPackageCard from './components/SupportPackageCard';
import SupportFeatureList from './components/SupportFeatureList';
import SupportPricing from './components/SupportPricing';
import { useSupportPackage } from './hooks/useSupportPackage';

const SupportPackageSection = () => {
  const {
    packages,
    features,
    expandedCards,
    toggleCard,
    handleKeydown,
    expandAll,
    collapseAll,
    prefersReducedMotion
  } = useSupportPackage();

  return (
    <section className="py-20" aria-labelledby="support-package-heading">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2
            id="support-package-heading"
            className="font-serif text-5xl font-bold mb-6 text-white"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
          >
            What You Get: Complete Support for Success
          </h2>
          <motion.p
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            Our comprehensive support system ensures you have everything needed to launch and grow
            a thriving Soaring Center. From proven curriculum to marketing power, we've got you covered.
          </motion.p>
        </AnimatedSection>

        <div className="text-center mb-10">
          <button
            className="bg-transparent text-white border-2 border-white/80 px-6 py-3 rounded-lg font-semibold mr-4 transition-all hover:bg-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent"
            onClick={expandAll}
            aria-label="Expand all support pillar cards"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)'
            }}
          >
            Expand All Cards
          </button>
          <button
            className="bg-transparent text-white border-2 border-white/80 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent"
            onClick={collapseAll}
            aria-label="Collapse all support pillar cards"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)'
            }}
          >
            Collapse All Cards
          </button>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          role="list"
          aria-label="Support pillars"
        >
          {packages.map((pkg, index) => (
            <SupportPackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              isExpanded={expandedCards.has(index)}
              toggleCard={toggleCard}
              handleKeydown={handleKeydown}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div
            className="bg-transparent backdrop-blur-sm rounded-2xl p-8 lg:p-12 border-2 border-white/30"
            style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1)' }}
          >
            <SupportFeatureList features={features} prefersReducedMotion={prefersReducedMotion} />
            <SupportPricing prefersReducedMotion={prefersReducedMotion} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SupportPackageSection;
