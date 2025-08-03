'use client';

import { PathOption } from './components/PathOption';
import { PathComparison } from './components/PathComparison';
import { PathSelector } from './components/PathSelector';
import { useTwoPaths } from './hooks/useTwoPaths';

export default function TwoPathsSection() {
  const { paths, selectedPath, comparison, handlePathSelect, prefersReducedMotion, starPositions } = useTwoPaths();

  return (
    <section id="two-paths" className="py-20" aria-labelledby="two-paths-heading">
      <div className="container mx-auto px-4">
        <PathSelector onSelect={handlePathSelect} prefersReducedMotion={prefersReducedMotion} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" role="region" aria-label="Path details">
          {paths.map((path, index) => (
            <PathOption
              key={path.id}
              path={path}
              isSelected={selectedPath === path.id}
              onSelect={() => handlePathSelect(path.id)}
              prefersReducedMotion={prefersReducedMotion}
              starPositions={starPositions}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
        <PathComparison data={comparison} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
