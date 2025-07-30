'use client';

import AnimatedSection from '@/components/ui/animated-section';

interface BaseHeroSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  cta?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const BaseHeroSection = ({
  title,
  subtitle,
  description,
  cta,
  children,
  className = '',
}: BaseHeroSectionProps) => (
  <AnimatedSection className={className}>
    <h1 className="font-serif text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
      {title}
    </h1>
    {subtitle && (
      <h2 className="text-2xl md:text-3xl text-patriot font-semibold mb-6">
        {subtitle}
      </h2>
    )}
    {description}
    {cta}
    {children}
  </AnimatedSection>
);

export default BaseHeroSection;

