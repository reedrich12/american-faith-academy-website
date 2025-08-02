'use client';

import React from 'react';
import AnimatedSection from '@/components/ui/animated-section';
import { TechFeatures } from './components/TechFeatures';
import { TechBenefits } from './components/TechBenefits';
import { TechImplementation } from './components/TechImplementation';
import { useTechnologyIntegration } from './hooks/useTechnologyIntegration';

export default function TechnologyIntegrationSection() {
  const {
    features,
    tools,
    metrics,
    implementation,
    activeFeature,
    handleFeatureClick,
    prefersReducedMotion,
  } = useTechnologyIntegration();

  return (
    <section className="py-20 bg-white" aria-labelledby="technology-integration-heading">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2
            id="technology-integration-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Because Every Child is Unique, Every Education Should Be Too
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our adaptive learning technology creates truly personalized experiences while
            maintaining the rigor and beauty of classical education.
          </p>
        </AnimatedSection>

        <TechFeatures
          features={features}
          tools={tools}
          activeFeature={activeFeature}
          onFeatureClick={handleFeatureClick}
          prefersReducedMotion={prefersReducedMotion}
        />
        <TechBenefits metrics={metrics} prefersReducedMotion={prefersReducedMotion} />
        <TechImplementation steps={implementation} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
