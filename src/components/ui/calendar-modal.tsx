'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Load the calendar embed script when modal opens
      const script = document.createElement('script');
      script.src = 'https://api.leadconnectorhq.com/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = 'unset';
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
        className="fixed inset-0 bg-black/50 z-50"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 mt-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Calendar */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/TLI1tD2XwVE32TSUGxNz"
            style={{
              width: '100%',
              height: '800px',
              border: 'none',
              overflow: 'hidden'
            }}
            scrolling="no"
            id="TLI1tD2XwVE32TSUGxNz_1753572116417"
            title="Schedule Virtual Tour"
          />
        </div>
      </div>
    </>
  );
};

export default CalendarModal;