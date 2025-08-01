'use client';

import { useEffect, useState, useRef } from 'react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface FormConfig {
  id: string;
  title: string;
  description: string;
  height: string;
  url: string;
  type: 'contact' | 'booking';
}

const ContactFormSection: React.FC = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState<boolean>(false);
  const [scriptError, setScriptError] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const scriptLoadedRef = useRef<boolean>(false);

  const formConfigs: FormConfig[] = [
    {
      id: 'tpx3XCm3kbkhzjV4WF2Q',
      title: 'Send Us a Message',
      description: 'Have a question or need more information? Send us a message and we\'ll get back to you within 24 hours.',
      height: '716px',
      url: 'https://api.leadconnectorhq.com/widget/form/tpx3XCm3kbkhzjV4WF2Q',
      type: 'contact'
    },
    {
      id: 'TLI1tD2XwVE32TSUGxNz',
      title: 'Schedule a Discovery Call',
      description: 'Book a convenient time to speak with our admissions team about your child\'s educational journey and learn how AFA can serve your family.',
      height: '716px',
      url: 'https://api.leadconnectorhq.com/widget/booking/TLI1tD2XwVE32TSUGxNz',
      type: 'booking'
    }
  ];

  useEffect(() => {
    // Only load script once
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Validate script source
    const scriptSrc = 'https://link.msgsndr.com/js/form_embed.js';
    const allowedDomains = ['link.msgsndr.com', 'api.leadconnectorhq.com'];
    
    try {
      const url = new URL(scriptSrc);
      if (!allowedDomains.includes(url.hostname)) {
        setScriptError(true);
        return;
      }
    } catch (error) {
      setScriptError(true);
      return;
    }

    // Load the form embed script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    
    script.onload = () => {
      setScriptsLoaded(true);
    };
    
    script.onerror = () => {
      setScriptError(true);
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const loadingAnimation = prefersReducedMotion
    ? {}
    : { rotate: 360 };

  const FormFallback = ({ config }: { config: FormConfig }) => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold mb-2">Form Loading Issue</h3>
      <p className="mb-4">We're having trouble loading the {config.type === 'contact' ? 'contact' : 'scheduling'} form.</p>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Please try one of these options:</p>
        <a 
          href="tel:2792639627" 
          className="block text-blue-600 hover:underline"
          aria-label="Call us at (279) 263-9627"
        >
          📞 Call us at (279) 263-9627
        </a>
        <a 
          href="mailto:admin@americanfaithacademy.org" 
          className="block text-blue-600 hover:underline"
          aria-label="Email us at admin@americanfaithacademy.org"
        >
          ✉️ Email admin@americanfaithacademy.org
        </a>
      </div>
    </div>
  );

  const FormLoader = () => (
    <div className="flex items-center justify-center h-64">
      <motion.div
        animate={loadingAnimation}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-navy" aria-label="Loading form" />
      </motion.div>
    </div>
  );

  return (
    <section 
      className="py-20 bg-white"
      aria-labelledby="contact-forms-heading"
    >
      <div className="container mx-auto px-4">
        <h1 id="contact-forms-heading" className="sr-only">Contact Forms</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {formConfigs.map((config, index) => (
            <AnimatedSection key={config.id} delay={index * 0.2}>
              <h2 className="font-serif text-3xl font-bold text-navy mb-6">
                {config.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {config.description}
              </p>
              
              <div 
                className="bg-gray-50 rounded-lg p-6"
                role="region"
                aria-label={config.title}
              >
                {scriptError ? (
                  <FormFallback config={config} />
                ) : !scriptsLoaded ? (
                  <FormLoader />
                ) : (
                  <>
                    {/* Pre-form trust signals */}
                    <div className="mb-4 text-sm text-gray-600">
                      <p>🔒 Your information is secure and will never be shared</p>
                    </div>
                    
                    <iframe
                      src={config.url}
                      style={{
                        width: '100%',
                        height: config.height,
                        border: 'none',
                        overflow: config.type === 'booking' ? 'hidden' : 'auto'
                      }}
                      scrolling={config.type === 'booking' ? 'no' : 'yes'}
                      id={`${config.id}_${Date.now()}`}
                      title={config.title}
                      loading="lazy"
                      sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                      aria-label={`${config.title} form`}
                    />
                    
                    {/* Post-form assurance */}
                    <div className="mt-4 text-xs text-gray-500">
                      <p>
                        By submitting this form, you agree to receive communications from American Faith Academy.
                        {config.type === 'booking' && ' You will receive a confirmation email with your scheduled time.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Contact Methods */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div className="bg-navy-50 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Prefer Other Contact Methods?
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">📧</span>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Email us at</p>
                  <a 
                    href="mailto:admin@americanfaithacademy.org"
                    className="text-navy font-semibold hover:text-patriot transition-colors"
                    aria-label="Email admin@americanfaithacademy.org"
                  >
                    admin@americanfaithacademy.org
                  </a>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">📱</span>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Call or text</p>
                  <a 
                    href="tel:2792639627"
                    className="text-navy font-semibold hover:text-patriot transition-colors"
                    aria-label="Call (279) 263-9627"
                  >
                    (279) 263-9627
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;
