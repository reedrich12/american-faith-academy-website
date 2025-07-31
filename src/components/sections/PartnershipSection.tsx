'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Heart, Star, ArrowRight, Church, Briefcase, CheckCircle2, LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks';

interface Path {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  uniqueValue: string;
  cta: string;
  href: string;
  color: string;
  bgColor: string;
  cardBg: string;
  borderColor: string;
  checkColor: string;
  uniqueBgColor: string;
  uniqueBorderColor: string;
  uniqueTextColor: string;
}

interface SuccessStory {
  name: string;
  location: string;
  impact: string;
  quote: string;
  rating: number;
}

interface Statistic {
  number: string;
  label: string;
  icon: LucideIcon;
}

const PartnershipSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const paths: Path[] = [
    {
      title: "Church Partnership",
      subtitle: "Turn Your Church into a Thriving Learning Center",
      description: "Support Christian families by offering education where faith takes flight.",
      icon: Church,
      benefits: [
        "Ministry Expansion",
        "Community Service",
        "Additional Revenue",
        "Family Engagement",
        "Kingdom Impact"
      ],
      uniqueValue: "Transform your existing facilities into a thriving educational ministry that impacts generations.",
      cta: "Partner with AFA",
      href: "/soaring-centers#church",
      color: "from-blue-900 to-blue-950",
      bgColor: "from-blue-50 to-blue-100",
      cardBg: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)",
      borderColor: "rgba(59, 130, 246, 0.2)",
      checkColor: "text-blue-900",
      uniqueBgColor: "bg-blue-50",
      uniqueBorderColor: "border-blue-300",
      uniqueTextColor: "text-blue-900"
    },
    {
      title: "Edupreneur Path",
      subtitle: "Bring Exceptional Learning To Your Community",
      description: "Bring AFA to your community as an Edupreneur and impact students through faith-driven education.",
      icon: Briefcase,
      benefits: [
        "Proven Business Model",
        "Complete Training Program",
        "Ongoing Support",
        "Marketing Resources",
        "Community Impact"
      ],
      uniqueValue: "Launch a successful education business that changes lives while providing financial freedom.",
      cta: "Become an Edupreneur",
      href: "/soaring-centers#edupreneur",
      color: "from-red-700 to-red-800",
      bgColor: "from-red-50 to-red-100",
      cardBg: "linear-gradient(135deg, #ffffff 0%, #ffe4e4 50%, #ffcccc 100%)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      checkColor: "text-red-700",
      uniqueBgColor: "bg-red-50",
      uniqueBorderColor: "border-red-300",
      uniqueTextColor: "text-red-900"
    }
  ];

  const successStories: SuccessStory[] = [
    {
      name: "Grace Community Church",
      location: "Austin, TX",
      impact: "150+ Students Served",
      quote: "Partnering with AFA has transformed our community outreach and strengthened families in our congregation.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      impact: "Edupreneur Success",
      quote: "Starting a Soaring Center has been the most rewarding career decision I've ever made. I'm making a real difference.",
      rating: 5
    },
    {
      name: "Faith Baptist Church",
      location: "Nashville, TN",
      impact: "200+ Students Served",
      quote: "AFA's curriculum and support have exceeded our expectations. Our families are thriving academically and spiritually.",
      rating: 5
    }
  ];

  const statistics: Statistic[] = [
    { number: "50+", label: "Soaring Centers", icon: Building2 },
    { number: "2,500+", label: "Students Served", icon: Users },
    { number: "95%", label: "Partner Satisfaction", icon: Heart },
    { number: "25%", label: "Annual Growth", icon: TrendingUp }
  ];

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      aria-labelledby="partnership-heading"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 
            id="partnership-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            Launch a Soaring Center in Your Area
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transform your community through classical Christian education while building a sustainable, 
            impactful ministry or business.
          </p>
        </AnimatedSection>

        {/* Dual Path Options */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          role="list"
          aria-label="Partnership path options"
        >
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.2}>
                <Card 
                  className="h-full cursor-pointer transition-all duration-300 hover:shadow-2xl"
                  style={{
                    background: path.cardBg,
                    border: `2px solid ${path.borderColor}`
                  }}
                  role="listitem"
                  tabIndex={0}
                  aria-labelledby={`path-title-${index}`}
                >
                  <CardContent className="p-8 relative">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 relative z-10`}>
                      <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>
                    
                    <h3 id={`path-title-${index}`} className="text-3xl font-bold text-navy mb-2 relative z-10">
                      {path.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 relative z-10">{path.subtitle}</p>
                    
                    <ul 
                      className="space-y-3 mb-6 relative z-10"
                      role="list"
                      aria-label={`${path.title} benefits`}
                    >
                      {path.benefits.map((benefit, benefitIndex) => (
                        <motion.li 
                          key={benefitIndex}
                          className="flex items-start gap-3"
                          variants={benefitVariants}
                          initial="hidden"
                          whileInView="visible"
                          transition={{ delay: benefitIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle2 className={`w-5 h-5 ${path.checkColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                          <span className="text-gray-700">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className={`p-4 ${path.uniqueBgColor} rounded-lg border ${path.uniqueBorderColor} relative z-10 mb-6`}>
                      <p className={`text-sm font-semibold ${path.uniqueTextColor}`}>
                        {path.uniqueValue}
                      </p>
                    </div>

                    <Button 
                      size="lg" 
                      className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      asChild
                    >
                      <Link 
                        href={path.href}
                        aria-label={`${path.cta} - Learn more about ${path.title}`}
                      >
                        {path.cta}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Success Stories Carousel */}
        <AnimatedSection delay={0.4}>
          <div 
            className="bg-white rounded-2xl shadow-lg p-8"
            role="region"
            aria-labelledby="success-stories-heading"
          >
            <h3 
              id="success-stories-heading"
              className="font-serif text-3xl font-bold text-navy text-center mb-8"
            >
              Success Stories from Our Partners
            </h3>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="Partner success stories"
            >
              {successStories.map((story, index) => (
                <motion.article
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  {/* Rating Stars */}
                  <div 
                    className="flex space-x-1 mb-4"
                    role="img"
                    aria-label={`${story.rating} out of 5 stars rating`}
                  >
                    {[...Array(story.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-600 italic mb-4 leading-relaxed">
                    "{story.quote}"
                  </blockquote>

                  {/* Attribution */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-navy">{story.name}</h4>
                    <p className="text-sm text-gray-500">{story.location}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-patriot-100 text-patriot-700 px-3 py-1 rounded-full text-sm font-medium">
                        {story.impact}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Growth Visualization */}
        <AnimatedSection delay={0.6} className="mt-16">
          <div 
            className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center"
            role="region"
            aria-labelledby="network-growth-heading"
          >
            <h3 
              id="network-growth-heading"
              className="font-serif text-3xl font-bold text-navy mb-6"
            >
              Join Our Growing Network
            </h3>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              role="list"
              aria-label="Network statistics"
            >
              {statistics.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    variants={statVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    role="listitem"
                  >
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      role="presentation"
                    >
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </motion.div>
                    <div 
                      className="text-3xl font-bold text-patriot mb-2"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link 
                href="/soaring-centers"
                aria-label="Explore partnership opportunities to launch a Soaring Center"
              >
                Explore Partnership Opportunities
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PartnershipSection;