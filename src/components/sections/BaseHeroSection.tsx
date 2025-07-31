'use client';

import { ReactNode } from 'react';
import AnimatedSection from '@/components/ui/animated-section';
import { cn } from '@/lib/utils';


interface BaseHeroSectionProps {
  title: ReactNode;
  titleId?: string; // Allow custom ID to prevent duplicates
  subtitle?: ReactNode;
  description?: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'split';
  background?: 'default' | 'gradient' | 'pattern';
  ariaLabel?: string; // Custom aria-label for the section
}

const BaseHeroSection: React.FC<BaseHeroSectionProps> = ({
  title,
  titleId = 'hero-heading',
  subtitle,
  description,
  cta,
  children,
  className = '',
  variant = 'default',
  background = 'default',
  ariaLabel
}) => {


  const backgroundClasses = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-navy-50 via-white to-patriot-50',
    pattern: 'bg-white relative overflow-hidden'
  };

  const variantClasses = {
    default: 'text-left',
    centered: 'text-center mx-auto',
    split: 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
  };

  const getContentClasses = () => {
    if (variant === 'centered') return 'max-w-4xl mx-auto';
    if (variant === 'split') return 'lg:pr-8';
    return '';
  };

  return (
    <section 
      className={cn(
        'py-20',
        backgroundClasses[background],
        className
      )}
      aria-labelledby={titleId}
      aria-label={ariaLabel}
    >
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002868' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={variantClasses[variant]}>
          <AnimatedSection className={getContentClasses()}>
            <h1 
              id={titleId}
              className="font-serif text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy rounded"
              tabIndex={-1}
            >
              {title}
            </h1>
            
            {subtitle && (
              <h2 className="text-2xl md:text-3xl text-patriot font-semibold mb-6">
                {subtitle}
              </h2>
            )}
            
            {description && (
              <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                {description}
              </div>
            )}
            
            {cta && (
              <div className="flex flex-col sm:flex-row gap-4 justify-start" role="group" aria-label="Call to action buttons">
                {cta}
              </div>
            )}
          </AnimatedSection>
          
          {variant === 'split' && children && (
            <AnimatedSection delay={0.2}>
              {children}
            </AnimatedSection>
          )}
        </div>
        
        {variant !== 'split' && children && (
          <AnimatedSection delay={0.3} className="mt-12">
            {children}
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default BaseHeroSection;