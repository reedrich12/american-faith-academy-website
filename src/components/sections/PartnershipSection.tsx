'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Heart, Star, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';

const PartnershipSection = () => {
  const paths = [
    {
      title: "Edupreneur Path",
      subtitle: "Bring Exceptional Learning To Your Community",
      description: "Bring AFA to your community as an Edupreneur and impact students through faith-driven education.",
      icon: Users,
      benefits: [
        "Proven Business Model",
        "Complete Training Program",
        "Ongoing Support",
        "Marketing Resources",
        "Community Impact"
      ],
      cta: "Become an Edupreneur",
      href: "/soaring-centers#edupreneur",
      color: "from-navy-500 to-navy-600",
      bgColor: "from-navy-50 to-navy-100"
    },
    {
      title: "Church Partnership",
      subtitle: "Turn Your Church into a Thriving Learning Center",
      description: "Support Christian families by offering education where faith takes flight.",
      icon: Building2,
      benefits: [
        "Ministry Expansion",
        "Community Service",
        "Additional Revenue",
        "Family Engagement",
        "Kingdom Impact"
      ],
      cta: "Partner with AFA",
      href: "/soaring-centers#church",
      color: "from-patriot-500 to-patriot-600",
      bgColor: "from-patriot-50 to-patriot-100"
    }
  ];

  const successStories = [
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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Launch a Soaring Center in Your Area
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transform your community through classical Christian education while building a sustainable, 
            impactful ministry or business.
          </p>
        </AnimatedSection>

        {/* Dual Path Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {paths.map((path, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${path.bgColor} p-8 relative overflow-hidden`}>
                    <motion.div 
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <path.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                      {path.title}
                    </h3>
                    <h4 className="text-xl font-semibold text-patriot mb-4">
                      {path.subtitle}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {path.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      {path.benefits.map((benefit, benefitIndex) => (
                        <motion.div 
                          key={benefitIndex}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: benefitIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${path.color}`} />
                          <span className="text-gray-600 font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <path.icon className="w-32 h-32" />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-8">
                    <Button 
                      size="lg" 
                      className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      asChild
                    >
                      <Link href={path.href}>
                        {path.cta}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Success Stories Carousel */}
        <AnimatedSection delay={0.4}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="font-serif text-3xl font-bold text-navy text-center mb-8">
              Success Stories from Our Partners
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Rating Stars */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(story.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" />
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
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Growth Visualization */}
        <AnimatedSection delay={0.6} className="mt-16">
          <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-3xl font-bold text-navy mb-6">
              Join Our Growing Network
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { number: "50+", label: "Soaring Centers", icon: Building2 },
                { number: "2,500+", label: "Students Served", icon: Users },
                { number: "95%", label: "Partner Satisfaction", icon: Heart },
                { number: "25%", label: "Annual Growth", icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-3xl font-bold text-patriot mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/soaring-centers">
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