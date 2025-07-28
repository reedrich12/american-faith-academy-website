'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const ContactHeroSection = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Speak directly with our team",
      contact: "279-263-9627",
      availability: "Mon-Fri 8AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      contact: "admin@americanfaithacademy.org",
      availability: "24/7 - Response within 24hrs"
    },
    {
      icon: MessageCircle,
      title: "Send Message",
      description: "Get answers within 24 hours",
      contact: "Use form below",
      availability: "24/7 - Response within 24hrs"
    },
    {
      icon: Clock,
      title: "Schedule Call",
      description: "Book a consultation",
      contact: "Online calendar",
      availability: "Flexible scheduling"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 via-white to-patriot-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
            Have Questions? We're Here to Help.
          </h1>
          <h2 className="text-2xl md:text-3xl text-patriot font-semibold mb-6">
            Whether you're a parent, educator, or church leader, our team is ready to assist you.
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our dedicated support team is committed to providing you with the information and guidance 
            you need to make the best educational decisions for your family or organization.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group h-full">
                <CardContent className="p-0">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="font-serif text-xl font-bold text-navy mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-patriot font-semibold mb-2">
                    {method.contact}
                  </div>
                  <div className="text-xs text-gray-500">
                    {method.availability}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-16">
          <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center border border-gray-200">
            <h3 className="font-serif text-3xl font-bold text-navy mb-4">
              Our Commitment to You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
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
              ].map((commitment, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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