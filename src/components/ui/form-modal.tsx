'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formHeight: string;
  formTitle: string;
}

const FormModal = ({ isOpen, onClose, formId, formHeight, formTitle }: FormModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Load the form embed script when modal opens
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Save current scroll position and scroll to top
      const scrollY = window.scrollY;
      window.scrollTo(0, 0);
      
      // Store scroll position to restore later
      document.body.setAttribute('data-scroll-position', scrollY.toString());
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = 'unset';
      
      // Restore scroll position
      const scrollY = document.body.getAttribute('data-scroll-position');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-position');
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[100]"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[5vh] overflow-y-auto" onClick={onClose}>
        <div 
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto my-auto"
          onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Form */}
          <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
            style={{
              width: '100%',
              height: formHeight,
              border: 'none'
            }}
            title={formTitle}
          />
        </div>
      </div>
    </>
  );
};

export default FormModal;