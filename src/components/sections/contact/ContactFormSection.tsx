'use client';

import { useEffect } from 'react';
import AnimatedSection from '@/components/ui/animated-section';

const ContactFormSection = () => {
  useEffect(() => {
    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Send Message Form */}
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold text-navy mb-6">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              Have a question or need more information? Send us a message and we'll get back to you within 24 hours.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/tpx3XCm3kbkhzjV4WF2Q"
                style={{
                  width: '100%',
                  height: '716px',
                  border: 'none'
                }}
                title="Contact Us"
              />
            </div>
          </AnimatedSection>

          {/* Schedule Call Widget */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-3xl font-bold text-navy mb-6">
              Schedule a Discovery Call
            </h2>
            <p className="text-gray-600 mb-8">
              Book a convenient time to speak with our admissions team about your child's educational journey and learn how AFA can serve your family.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/TLI1tD2XwVE32TSUGxNz"
                style={{
                  width: '100%',
                  height: '716px',
                  border: 'none',
                  overflow: 'hidden'
                }}
                scrolling="no"
                id="TLI1tD2XwVE32TSUGxNz_1753572116417"
                title="Schedule Discovery Call"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;