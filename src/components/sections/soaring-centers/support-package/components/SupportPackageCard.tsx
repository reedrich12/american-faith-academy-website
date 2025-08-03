import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, CheckCircle } from 'lucide-react';
import { SupportPillar } from '../types';

interface SupportPackageCardProps {
  pkg: SupportPillar;
  index: number;
  isExpanded: boolean;
  toggleCard: (index: number) => void;
  handleKeydown: (event: React.KeyboardEvent, index: number) => void;
  prefersReducedMotion: boolean;
}

export const SupportPackageCard: React.FC<SupportPackageCardProps> = ({
  pkg,
  index,
  isExpanded,
  toggleCard,
  handleKeydown,
  prefersReducedMotion
}) => {
  return (
    <motion.div
      role="listitem"
      className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group ${
        isExpanded ? 'ring-4 ring-patriot shadow-2xl' : 'hover:shadow-xl'
      }`}
      onClick={() => toggleCard(index)}
      onKeyDown={(e) => handleKeydown(e, index)}
      tabIndex={0}
      aria-label={`${pkg.name} support details`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
    >
      {/* Flag stripe pattern */}
      {isExpanded && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.08, scaleY: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            background:
              'repeating-linear-gradient(to bottom, #B22234 0%, #B22234 7.69%, #FFFFFF 7.69%, #FFFFFF 15.38%)',
            transformOrigin: 'top'
          }}
        />
      )}

      {/* Canton overlay for first card */}
      {index === 0 && isExpanded && !prefersReducedMotion && (
        <motion.div
          className="absolute top-0 left-0 w-full h-[26.92%] bg-navy pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
      )}

      <div className="relative z-10 p-6 bg-white/95">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-navy mb-1">{pkg.name}</h3>
            <p className="text-sm text-gray-600">{pkg.subtitle}</p>
          </div>
          <ChevronDown
            className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Highlights */}
        <div className="space-y-2" role="list" aria-label={`${pkg.name} highlights`}>
          {pkg.highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              role="listitem"
              className="flex items-center gap-2 text-sm text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.05 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" aria-hidden="true" />
              <span>{highlight}</span>
            </motion.div>
          ))}
        </div>

        {/* Expanded Content */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, marginTop: isExpanded ? 20 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-t pt-5">
            {/* Included Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                Included in Partnership
              </h4>
              <div className="space-y-2" role="list">
                {pkg.details.included.map((feature, idx) => (
                  <div key={idx} role="listitem" className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            <div>
              <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                Available Add-Ons
              </h4>
              <div className="space-y-2" role="list">
                {pkg.details.additional.map((feature, idx) => (
                  <div key={idx} role="listitem" className="flex items-start gap-2 text-sm text-gray-700">
                    <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SupportPackageCard;
