import { motion } from 'framer-motion';

interface SupportPricingProps {
  prefersReducedMotion: boolean;
}

export const SupportPricing: React.FC<SupportPricingProps> = ({ prefersReducedMotion }) => {
  return (
    <div className="text-center">
      <motion.p
        className="text-xl font-semibold mb-4 text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }}
      >
        Total Partnership Value:{' '}
        <span
          className="text-3xl text-white"
          style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
        >
          $250,000+
        </span>
      </motion.p>
      <p
        className="max-w-2xl mx-auto"
        style={{
          color: 'rgba(255, 255, 255, 0.9)',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        }}
      >
        Access resources and support that would cost over a quarter million dollars to develop
        independently, all included in your partnership.
      </p>
    </div>
  );
};

export default SupportPricing;
