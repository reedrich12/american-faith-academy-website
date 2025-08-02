'use client';

import AnimatedSection from '@/components/ui/animated-section';
import { Calculator } from 'lucide-react';
import { ScenarioType } from '../types';

interface ROICalc {
  actualStudents: number;
  annualRevenue: number;
  netIncome: number;
  monthlyIncome: number;
  breakEvenMonth: number;
}

interface Props {
  students: number;
  setStudents: (n: number) => void;
  tuition: number;
  setTuition: (n: number) => void;
  scenario: ScenarioType;
  setScenario: (s: ScenarioType) => void;
  roi: ROICalc;
  prefersReducedMotion: boolean;
}

export const MarketGrowthChart = ({
  students,
  setStudents,
  tuition,
  setTuition,
  scenario,
  setScenario,
  roi,
  prefersReducedMotion,
}: Props) => {
  return (
    <AnimatedSection delay={0.4}>
      <div
        className="overflow-hidden bg-transparent backdrop-blur-md rounded-2xl border-2 border-white/80"
        style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)' }}
      >
        <div className="relative bg-transparent text-white p-8 overflow-hidden">
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3 relative z-10 text-white">
            <Calculator className="w-8 h-8 text-white" aria-hidden="true" />
            Financial Opportunity Calculator
          </h3>
          <p className="text-blue-100 relative z-10">
            See your potential revenue based on real market data
          </p>
        </div>

        <div className="relative p-8 bg-transparent">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
            {/* Student Capacity */}
            <div>
              <label htmlFor="student-capacity" className="block text-sm font-semibold text-white mb-2">
                Student Capacity
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="student-capacity"
                  type="range"
                  min="40"
                  max="80"
                  value={students}
                  onChange={(e) => setStudents(Number(e.target.value))}
                  className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((students - 40) / 40) * 100}%, #1e3a8a40 ${((students - 40) / 40) * 100}%, #1e3a8a40 100%)`,
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                  }}
                  aria-label={`Student capacity: ${students} students`}
                />
                <span className="text-2xl font-bold text-white w-12 text-right" aria-live="polite">{students}</span>
              </div>
              <div className="flex justify-between text-xs text-blue-100 mt-1" aria-hidden="true">
                <span>40</span>
                <span>80</span>
              </div>
            </div>

            {/* Average Tuition */}
            <div>
              <label htmlFor="average-tuition" className="block text-sm font-semibold text-white mb-2">
                Average Annual Tuition
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="average-tuition"
                  type="range"
                  min="4000"
                  max="7000"
                  step="100"
                  value={tuition}
                  onChange={(e) => setTuition(Number(e.target.value))}
                  className="flex-1 h-2 bg-blue-800/50 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 ${((tuition - 4000) / 3000) * 100}%, #1e3a8a40 100%)`,
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.3)'
                  }}
                  aria-label={`Average annual tuition: $${tuition.toLocaleString()}`}
                />
                <span className="text-2xl font-bold text-white w-20 text-right" aria-live="polite">
                  ${tuition.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-blue-100 mt-1" aria-hidden="true">
                <span>$4,000</span>
                <span>$7,000</span>
              </div>
            </div>

            {/* Scenario Toggle */}
            <div>
              <fieldset>
                <legend className="block text-sm font-semibold text-white mb-2">
                  Projection Scenario
                </legend>
                <div className="flex gap-2" role="radiogroup">
                  <button
                    onClick={() => setScenario('conservative')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                      scenario === 'conservative'
                        ? 'bg-white text-blue-900'
                        : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                    }`}
                    role="radio"
                    aria-checked={scenario === 'conservative'}
                    aria-label="Conservative projection scenario"
                  >
                    Conservative
                  </button>
                  <button
                    onClick={() => setScenario('optimistic')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-transparent ${
                      scenario === 'optimistic'
                        ? 'bg-white text-blue-900'
                        : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800/70'
                    }`}
                    role="radio"
                    aria-checked={scenario === 'optimistic'}
                    aria-label="Optimistic projection scenario"
                  >
                    Optimistic
                  </button>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Results Display */}
          <div
            className="relative bg-transparent rounded-xl p-6 overflow-hidden border-2 border-white/60"
            style={{
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
            role="region"
            aria-label="Financial projection results"
            aria-live="polite"
          >
            <h4 className="text-xl font-semibold text-white mb-6 relative z-10">
              Your Projected Financial Results
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <div>
                <div className="text-sm text-blue-100 mb-1">Enrolled Students</div>
                <div className="text-2xl font-bold text-white">
                  {roi.actualStudents} students
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-100 mb-1">Annual Revenue</div>
                <div className="text-2xl font-bold text-white">
                  ${roi.annualRevenue.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-100 mb-1">Net Annual Income</div>
                <div className="text-2xl font-bold text-white">
                  ${roi.netIncome.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-blue-100 mb-1">Monthly Income</div>
                <div className="text-2xl font-bold text-white">
                  ${Math.floor(roi.monthlyIncome).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-700 relative z-10">
              <div className="text-center">
                <span className="text-sm text-blue-100">Break-even Timeline: </span>
                <span className="font-semibold text-white">{roi.breakEvenMonth} months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
