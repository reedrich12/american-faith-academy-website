'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Clock, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import BaseHeroSection from '@/components/sections/BaseHeroSection';
import { usePrefersReducedMotion } from '@/hooks';

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  availability: string;
  href?: string;
  action?: string;
}

interface Commitment {
  title: string;
  description: string;
}

const ContactHeroSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const contactMethods: ContactMethod[] = [
    {
      icon: Phone,
      title: "Phone",
      description: "Speak directly with our team",
      contact: "(279) 263-9627",
      availability: "Mon-Fri 8AM-6PM EST",
      href: "tel:2792639627",
      action: "Call us"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      contact: "admin@americanfaithacademy.org",
      availability: "24/7 - Response within 24hrs",
      href: "mailto:admin@americanfaithacademy.org",
      action: "Email us"
    },
    {
      icon: MessageCircle,
      title: "Send Message",
      description: "Get answers within 24 hours",
      contact: "Use form below",
      availability: "24/7 - Response within 24hrs",
      action: "Fill out contact form"
    },
    {
      icon: Clock,
      title: "Schedule Call",
      description: "Book a consultation",
      contact: "Online calendar",
      availability: "Flexible scheduling",
      action: "Schedule a call"
    }
  ];

  const commitments: Commitment[] = [
    {
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours during business days"
    },
    {
      title: "Personal Attention",
      description: "Every family receives individualized support and guidance"
    },
    {
      title: "Expert Knowledge",
      description: "Our team has deep expertise in classical Christian education"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-navy-50 via-white to-patriot-50"
      aria-labelledby="contact-hero-heading"
    >
      <div className="container mx-auto px-4">
        <BaseHeroSection
          className="text-center mb-16"
          title="Have Questions? We're Here to Help."
          subtitle="Whether you're a parent, educator, or church leader, our team is ready to assist you."
          description={
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our dedicated support team is committed to providing you with the information and guidance
              you need to make the best educational decisions for your family or organization.
            </p>
          }
        />

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Contact methods"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card 
                  className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group h-full focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-navy"
                  role="listitem"
                >
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      role="presentation"
                    >
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <h3 className="font-serif text-xl font-bold text-navy mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    <div className="text-patriot font-semibold mb-2">
                      {method.href ? (
                        <a 
                          href={method.href}
                          className="hover:text-patriot-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500 rounded px-2 py-1"
                          aria-label={`${method.action} at ${method.contact}`}
                        >
                          {method.contact}
                        </a>
                      ) : (
                        <span>{method.contact}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {method.availability}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.5} className="mt-16">
          <div 
            className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center border border-gray-200"
            role="region"
            aria-labelledby="commitment-heading"
          >
            <h3 
              id="commitment-heading"
              className="font-serif text-3xl font-bold text-navy mb-4"
            >
              Our Commitment to You
            </h3>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="Our commitments"
            >
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <h4 className="font-semibold text-lg text-navy mb-2">{commitment.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{commitment.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactHeroSection;
