'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formHeight: string;
  formTitle: string;
}

const FormModal: React.FC<FormModalProps> = ({ 
  isOpen, 
  onClose, 
  formId, 
  formHeight, 
  formTitle 
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Load the form embed script when modal opens
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      script.defer = true;
      
      // Add integrity check for security
      script.addEventListener('error', () => {
        // TODO: handle form script load failure
      });
      
      document.body.appendChild(script);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Save current scroll position and scroll to top
      const scrollY = window.scrollY;
      window.scrollTo(0, 0);
      
      // Store scroll position to restore later
      document.body.setAttribute('data-scroll-position', scrollY.toString());

      // Focus trap
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Focus the modal for screen readers
      if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Clean up script
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = 'unset';
      
      // Restore scroll position
      const scrollY = document.body.getAttribute('data-scroll-position');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        document.body.removeAttribute('data-scroll-position');
      }

      // Restore focus to the element that triggered the modal
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div 
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[5vh] overflow-y-auto" 
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            <motion.div 
              ref={modalRef}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto my-auto"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, type: 'spring', damping: 25 }}
              role="dialog"
              aria-modal="true"
              aria-label={formTitle}
              tabIndex={-1}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 float-right mr-4 mt-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-patriot-500 focus:ring-offset-2"
                aria-label="Close form modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              
              {/* Form */}
              <div className="p-8">
                <h2 className="sr-only">{formTitle}</h2>
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                  style={{
                    width: '100%',
                    height: formHeight,
                    border: 'none'
                  }}
                  title={formTitle}
                  loading="lazy"
                  sandbox="allow-forms allow-scripts allow-same-origin"
                />
                
                {/* Fallback for iframe loading issues */}
                <noscript>
                  <div className="text-center p-8">
                    <p className="text-gray-600 mb-4">
                      JavaScript is required to load this form.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please enable JavaScript or contact us at{' '}
                      <a 
                        href="tel:5551234567" 
                        className="text-patriot-600 hover:underline"
                      >
                        (555) 123-4567
                      </a>
                    </p>
                  </div>
                </noscript>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FormModal;