'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Book, Calendar, DollarSign, Users, GraduationCap, Phone, Mail } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { usePrefersReducedMotion } from '@/hooks';
import type { LucideIcon } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  faqs: FAQ[];
}

const FAQSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('enrollment');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const faqCategories: FAQCategory[] = [
    {
      id: 'enrollment',
      title: 'Enrollment & Admissions',
      icon: Users,
      faqs: [
        {
          question: "When can my child start at American Faith Academy?",
          answer: "Students can begin enrollment at any time during the school year. Once your application is approved and enrollment is confirmed, most students can start within 1-2 weeks. We offer rolling admissions to accommodate families' unique situations."
        },
        {
          question: "What grades does American Faith Academy serve?",
          answer: "We serve students from Kindergarten through 12th grade. Our programs are designed to meet the developmental needs of each age group, with age-appropriate classical Christian curriculum and teaching methods."
        },
        {
          question: "Do you accept students with special educational needs?",
          answer: "Yes! We work with families to create individualized education plans that meet each student's unique needs. Our flexible learning options and small class sizes allow us to provide personalized support. Please discuss your child's specific needs during the application process."
        },
        {
          question: "Is there an application deadline?",
          answer: "We offer rolling admissions throughout the year, so there's no strict deadline. However, we recommend applying early for the fall semester to ensure the smoothest transition and access to all orientation activities."
        }
      ]
    },
    {
      id: 'curriculum',
      title: 'Curriculum & Academics',
      icon: Book,
      faqs: [
        {
          question: "What is classical Christian education?",
          answer: "Classical Christian education combines time-tested teaching methods with a biblical worldview. It emphasizes the Trivium (Grammar, Logic, and Rhetoric stages), teaches students how to think critically, and integrates faith into all subjects. This approach develops wise, virtuous, and eloquent graduates."
        },
        {
          question: "How does the SOAR Framework work?",
          answer: "SOAR (Self-Directed, Omnibus, Applied, Relational) is our unique approach that combines the best of classical education with modern learning science. Students learn to take ownership of their education, see connections across subjects, apply knowledge practically, and build strong relationships with teachers and peers."
        },
        {
          question: "Is the curriculum accredited?",
          answer: "Yes! American Faith Academy is fully accredited by Cognia (formerly AdvancED), ensuring our curriculum meets rigorous educational standards. Our graduates receive a recognized diploma and are well-prepared for college admission."
        },
        {
          question: "How much homework should we expect?",
          answer: "Homework varies by grade level and program. Elementary students typically have 30-45 minutes per day, middle school students 1-1.5 hours, and high school students 2-3 hours. Our goal is meaningful practice, not busywork."
        }
      ]
    },
    {
      id: 'programs',
      title: 'Programs & Schedule',
      icon: Calendar,
      faqs: [
        {
          question: "What's the difference between Solo Flights and Soaring?",
          answer: "Solo Flights is our 2-day on-campus program (Tues/Thurs) with at-home learning the other days. Soaring is our fully flexible program where students learn primarily at home with weekly check-ins and full teacher support. Both programs use the same excellent curriculum."
        },
        {
          question: "Can we switch between programs?",
          answer: "Yes! We understand family needs change. You can request to switch programs at the semester break. Our admissions team will work with you to ensure a smooth transition that best serves your student."
        },
        {
          question: "What does a typical school day look like?",
          answer: "For Solo Flights, on-campus days run from 8:30 AM to 3:00 PM with core academic classes, enrichment activities, and lunch. For Soaring students, families create their own schedule with suggested daily rhythms provided by teachers."
        },
        {
          question: "Do you offer extracurricular activities?",
          answer: "Yes! We offer various clubs, sports teams, fine arts programs, and field trips. These activities are open to students in both programs, helping build community and develop interests beyond academics."
        }
      ]
    },
    {
      id: 'tuition',
      title: 'Tuition & Financial Aid',
      icon: DollarSign,
      faqs: [
        {
          question: "How much does tuition cost?",
          answer: "Most families pay nothing out-of-pocket thanks to ESA funding and scholarship programs. For families who don't qualify for full funding, tuition ranges from $5,000-$8,000 per year depending on the program. We offer payment plans and never want finances to be a barrier."
        },
        {
          question: "What is ESA funding and how do I qualify?",
          answer: "Education Savings Accounts (ESA) are state-funded programs that provide money for private school tuition. Eligibility varies by state but often includes all families regardless of income. Our team helps you navigate the application process."
        },
        {
          question: "What if we don't qualify for ESA funding?",
          answer: "We work with several Scholarship Granting Organizations (SGOs) and offer need-based financial aid. Additionally, we provide flexible payment plans. Our goal is to make AFA accessible to every family who wants a classical Christian education."
        },
        {
          question: "Are there additional fees beyond tuition?",
          answer: "There's a one-time $200 enrollment fee and optional costs for extracurricular activities. Books and basic supplies are included in tuition. Solo Flights students in grades K-8 receive a tablet at no additional cost."
        }
      ]
    },
    {
      id: 'technology',
      title: 'Technology & Learning',
      icon: GraduationCap,
      faqs: [
        {
          question: "What technology do students need?",
          answer: "For Soaring students, a computer or tablet with reliable internet is required. Solo Flights K-8 students receive a school-provided tablet. High school students need their own laptop. We provide tech support and can help families access devices if needed."
        },
        {
          question: "How do online classes work?",
          answer: "Online classes use interactive video conferencing with small class sizes (typically 12-15 students). Teachers use engaging methods including discussions, breakout rooms, digital whiteboards, and multimedia resources. Classes are recorded for review."
        },
        {
          question: "What learning management system do you use?",
          answer: "We use Canvas, a user-friendly platform where students access assignments, submit work, view grades, and communicate with teachers. Parents have their own login to monitor progress and stay involved."
        },
        {
          question: "Is tech support available?",
          answer: "Yes! We have a dedicated tech support team available during school hours. They help with everything from initial setup to troubleshooting issues. We also provide training for families new to online learning."
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null); // Reset expanded question when changing category
  };

  const toggleQuestion = (question: string) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  const categoryVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 }
  };

  const questionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 }
  };

  return (
    <section 
      className="py-20 bg-gray-50"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full mb-6"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
            role="presentation"
          >
            <MessageCircle className="w-10 h-10 text-white" aria-hidden="true" />
          </motion.div>
          <h2 
            id="faq-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about enrollment, curriculum, and our programs.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            role="tablist"
            aria-label="FAQ categories"
          >
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                    ${expandedCategory === category.id 
                      ? 'bg-navy text-white shadow-lg transform scale-105' 
                      : 'bg-white text-navy hover:bg-navy-50 border border-gray-200 hover:border-navy-200'
                    }
                    focus:ring-2 focus:ring-offset-2 focus:ring-navy focus:outline-none
                  `}
                  role="tab"
                  aria-selected={expandedCategory === category.id}
                  aria-controls={`${category.id}-panel`}
                  id={`${category.id}-tab`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-medium">{category.title}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <AnimatedSection key={category.id} delay={0.1}>
                  <motion.div
                    initial={false}
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={prefersReducedMotion ? {} : categoryVariants}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    role="tabpanel"
                    id={`${category.id}-panel`}
                    aria-labelledby={`${category.id}-tab`}
                    aria-hidden={!isExpanded}
                  >
                    {isExpanded && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <motion.div 
                            className="w-10 h-10 bg-gradient-to-r from-navy-100 to-patriot-100 rounded-lg flex items-center justify-center"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-5 h-5 text-navy" aria-hidden="true" />
                          </motion.div>
                          <h3 className="font-serif text-2xl font-bold text-navy">
                            {category.title}
                          </h3>
                        </div>

                        <div 
                          className="space-y-3"
                          role="list"
                        >
                          {category.faqs.map((faq, index) => (
                            <div 
                              key={index}
                              className="border border-gray-200 rounded-lg hover:border-navy-200 transition-all duration-300 hover:shadow-sm"
                              role="listitem"
                            >
                              <button
                                onClick={() => toggleQuestion(faq.question)}
                                className="w-full text-left p-4 flex items-center justify-between gap-4 focus:ring-2 focus:ring-inset focus:ring-navy focus:outline-none rounded-lg group"
                                aria-expanded={expandedQuestion === faq.question}
                                aria-controls={`faq-answer-${category.id}-${index}`}
                              >
                                <h4 className="font-medium text-gray-900 group-hover:text-navy transition-colors">
                                  {faq.question}
                                </h4>
                                <motion.div
                                  animate={{ rotate: expandedQuestion === faq.question ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown 
                                    className="w-5 h-5 text-gray-500 group-hover:text-navy transition-colors" 
                                    aria-hidden="true" 
                                  />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {expandedQuestion === faq.question && (
                                  <motion.div
                                    id={`faq-answer-${category.id}-${index}`}
                                    initial="collapsed"
                                    animate="expanded"
                                    exit="collapsed"
                                    variants={prefersReducedMotion ? {} : questionVariants}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4">
                                      <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Still Have Questions CTA */}
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="font-serif text-2xl font-bold text-navy mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our admissions team is here to help! Reach out for personalized answers to your specific questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:2792639627"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-navy text-navy hover:bg-navy hover:text-white rounded-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-navy"
                  aria-label="Call us at (279) 263-9627"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>Call (279) 263-9627</span>
                </a>
                <a
                  href="mailto:admin@americanfaithacademy.org"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-patriot hover:bg-patriot-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-patriot-500"
                  aria-label="Email admissions at admin@americanfaithacademy.org"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  <span>Email Admissions</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
