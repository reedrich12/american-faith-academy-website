'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Calendar, Navigation, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';

interface OfficeDetail {
  icon: LucideIcon;
  title: string;
  content: string | string[];
  href?: string;
  action?: string;
}

interface OfficeHour {
  day: string;
  hours: string;
}

const OfficeInfoSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const officeDetails: OfficeDetail[] = [
    {
      icon: MapPin,
      title: "Address",
      content: [
        "American Faith Academy",
        "123 Education Way",
        "Phoenix, AZ 85001"
      ],
      href: "https://maps.google.com/?q=123+Education+Way+Phoenix+AZ+85001",
      action: "Get directions"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(279) 263-9627",
      href: "tel:2792639627",
      action: "Call us"
    },
    {
      icon: Mail,
      title: "Email",
      content: "admin@americanfaithacademy.org",
      href: "mailto:admin@americanfaithacademy.org",
      action: "Email us"
    },
    {
      icon: Navigation,
      title: "Directions",
      content: "Located in central Phoenix, easily accessible from I-10 and I-17",
      href: "https://maps.google.com/?q=123+Education+Way+Phoenix+AZ+85001",
      action: "View on map"
    }
  ];

  const officeHours: OfficeHour[] = [
    { day: "Monday - Thursday", hours: "8:00 AM - 6:00 PM EST" },
    { day: "Friday", hours: "8:00 AM - 4:00 PM EST" },
    { day: "Saturday", hours: "By Appointment Only" },
    { day: "Sunday", hours: "Closed" }
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section 
      className="py-20 bg-gray-50"
      aria-labelledby="office-info-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 
            id="office-info-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Visit Our Office
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Located in the heart of America, serving families nationwide through our innovative 
            online and hybrid programs.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Office Details */}
          <AnimatedSection delay={0.2}>
            <Card className="h-full shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-navy" aria-hidden="true" />
                  </div>
                  Office Information
                </h3>
                
                <div 
                  className="space-y-6"
                  role="list"
                  aria-label="Office contact details"
                >
                  {officeDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                        role="listitem"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-navy-50 to-patriot-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-navy" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy mb-1">{detail.title}</h4>
                          {Array.isArray(detail.content) ? (
                            <address className="not-italic text-gray-600">
                              {detail.content.map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </address>
                          ) : detail.href ? (
                            <a 
                              href={detail.href}
                              className="text-patriot hover:text-patriot-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500 rounded px-1"
                              aria-label={`${detail.action}: ${detail.content}`}
                            >
                              {detail.content}
                            </a>
                          ) : (
                            <p className="text-gray-600">{detail.content}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Map Link */}
                <div className="mt-8">
                  <a
                    href="https://maps.google.com/?q=123+Education+Way+Phoenix+AZ+85001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-600 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                    aria-label="Get directions to American Faith Academy office (opens in new tab)"
                  >
                    <Navigation className="w-5 h-5" aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Office Hours */}
          <AnimatedSection delay={0.3}>
            <Card className="h-full shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-navy" aria-hidden="true" />
                  </div>
                  Office Hours
                </h3>
                
                <div 
                  className="space-y-4"
                  role="list"
                  aria-label="Office hours"
                >
                  {officeHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                      role="listitem"
                    >
                      <span className="font-medium text-navy">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-patriot-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> While our office maintains regular hours, our online support 
                    team is available to assist families across all time zones. Schedule a call at your 
                    convenience!
                  </p>
                </div>

                {/* Schedule Appointment CTA */}
                <div className="mt-6">
                  <a
                    href="#contact-forms"
                    className="inline-flex items-center gap-2 bg-patriot text-white px-6 py-3 rounded-lg hover:bg-patriot-600 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500 w-full justify-center"
                    aria-label="Schedule an appointment using the contact form"
                  >
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                    Schedule an Appointment
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Additional Info */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Serving Families Nationwide
            </h3>
            <p className="text-gray-600 mb-6">
              While our administrative office is located in Phoenix, Arizona, American Faith Academy 
              serves families across all 50 states through our innovative online programs and network 
              of Soaring Centers. No matter where you're located, we're here to support your 
              educational journey.
            </p>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="Service areas"
            >
              {[
                { number: "50", label: "States Served" },
                { number: "24/7", label: "Online Support" },
                { number: "100+", label: "Partner Locations" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <div 
                    className="text-3xl font-bold text-patriot mb-1"
                    aria-label={`${stat.number} ${stat.label}`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OfficeInfoSection;
