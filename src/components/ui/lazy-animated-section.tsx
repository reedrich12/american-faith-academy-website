import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Lazy load AnimatedSection for below-fold content
const AnimatedSection = dynamic(
  () => import('./animated-section'),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse">
        <div className="min-h-[200px] bg-gray-100 rounded-lg" />
      </div>
    )
  }
);

export type LazyAnimatedSectionProps = ComponentProps<typeof AnimatedSection>;
export default AnimatedSection;