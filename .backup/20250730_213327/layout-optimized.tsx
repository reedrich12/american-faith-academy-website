'use client';

import { OptimizedStarBackground } from './components/OptimizedStarBackground';

export default function SoaringCentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OptimizedStarBackground>{children}</OptimizedStarBackground>;
}