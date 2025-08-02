'use client';
import GettingStartedTimeline from './GettingStartedTimeline';
import GettingStartedSteps from './GettingStartedSteps';
import GettingStartedCTA from './GettingStartedCTA';
import { useGettingStarted } from '@/hooks/useGettingStarted';

const GettingStartedSection = () => {
  const data = useGettingStarted();

  return (
    <section className="py-20" aria-labelledby="getting-started-heading">
      <div className="container mx-auto px-4">
        <h2 id="getting-started-heading" className="sr-only">
          Getting Started
        </h2>
        <GettingStartedTimeline data={data} />
        <GettingStartedSteps data={data} />
        <GettingStartedCTA data={data} />
      </div>
    </section>
  );
};

export default GettingStartedSection;
