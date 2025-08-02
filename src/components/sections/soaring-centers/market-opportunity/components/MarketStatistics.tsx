'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MarketStat } from '../types';

interface Props {
  statistics: MarketStat[];
  prefersReducedMotion: boolean;
}

export const MarketStatistics = ({ statistics, prefersReducedMotion }: Props) => {
  return (
    <div
      className="flex justify-between items-start gap-2 md:gap-4 lg:gap-6 mb-16 overflow-x-auto"
      role="list"
      aria-label="Market statistics"
    >
      {statistics.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            role="listitem"
            className="flex-1 min-w-[140px] md:min-w-[180px] relative overflow-hidden rounded-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
            style={{
              backgroundColor: stat.hasStars ? 'transparent' : 'white',
              backgroundImage: stat.hasStripes
                ? 'repeating-linear-gradient(to bottom, #B22234 0px, #B22234 10px, #FFFFFF 10px, #FFFFFF 20px)'
                : 'none',
              border: stat.hasStars ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
              boxShadow: stat.hasStars
                ? '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
              backdropFilter: stat.hasStars ? 'blur(10px)' : 'none',
            }}
            whileHover=
              {prefersReducedMotion
                ? {}
                : stat.hasStars
                ? {
                    boxShadow:
                      '0 0 40px rgba(255, 255, 255, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                  }
                : { boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
          >
            {stat.hasStripes && <div className="absolute inset-0 bg-white/90" />}
            <div className="p-4 md:p-6 relative z-10">
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div
                  className={`p-2 md:p-3 rounded-lg ${
                    stat.hasStars
                      ? 'bg-transparent border border-white/60'
                      : stat.hasStripes
                      ? 'bg-blue-900'
                      : 'bg-gray-100'
                  }`}
                  style={
                    stat.hasStars
                      ? {
                          boxShadow:
                            '0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(5px)',
                        }
                      : {}
                  }
                >
                  <Icon
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      stat.hasStars ? '' : stat.hasStripes ? 'text-white' : stat.color
                    }`}
                    style={
                      stat.hasStars
                        ? { color: 'white', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }
                        : {}
                    }
                    aria-hidden="true"
                  />
                </div>
                <ArrowUpRight
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : 'text-gray-400'
                  }`}
                  style={stat.hasStars ? { color: 'rgba(255, 255, 255, 0.8)' } : {}}
                  aria-hidden="true"
                />
              </div>
              <div
                className={`text-2xl md:text-3xl font-bold mb-1 ${
                  stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : stat.color
                }`}
                style={
                  stat.hasStars
                    ? { color: 'white', textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }
                    : {}
                }
              >
                {stat.value}
              </div>
              <div
                className={`font-semibold text-sm md:text-base ${
                  stat.hasStars ? '' : stat.hasStripes ? 'text-blue-900' : 'text-gray-900'
                }`}
                style={
                  stat.hasStars
                    ? { color: 'white', textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }
                    : {}
                }
              >
                {stat.label}
              </div>
              <div
                className={`text-xs md:text-sm mt-1 ${
                  stat.hasStars ? '' : stat.hasStripes ? 'text-gray-700' : 'text-gray-600'
                }`}
                style={stat.hasStars ? { color: 'rgba(255, 255, 255, 0.9)' } : {}}
              >
                {stat.subtext}
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
