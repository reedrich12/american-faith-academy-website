"use client";

import { useEffect } from "react";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      <PerformanceMonitor />
      {children}
    </div>
  );
}
