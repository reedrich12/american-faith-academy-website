import { motion } from 'framer-motion';
import { SupportIconFeature } from '../types';

interface SupportFeatureListProps {
  features: SupportIconFeature[];
  prefersReducedMotion: boolean;
}

export const SupportFeatureList: React.FC<SupportFeatureListProps> = ({
  features,
  prefersReducedMotion
}) => {
  return (
    <>
      <h3
        className="text-3xl font-bold text-center mb-12 text-white"
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
      >
        360° Support Coverage
      </h3>
      <div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
        role="list"
        aria-label="Support coverage areas"
      >
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              role="listitem"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div
                className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center mb-2 border-2 border-white/80"
                style={{
                  boxShadow:
                    '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <Icon
                  className="w-8 h-8 text-white"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
                  aria-hidden="true"
                />
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                }}
              >
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SupportFeatureList;
