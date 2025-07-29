'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Heart, Star, ArrowRight, Church, Briefcase, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';

const PartnershipSection = () => {
  const paths = [
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
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: path.cardBg,
                  border: `2px solid ${path.borderColor}`
                }}
              >
                <CardContent className="p-8 relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-6 relative z-10`}>
                    <path.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-navy mb-2 relative z-10">{path.title}</h3>
                  <p className="text-lg text-gray-600 mb-6 relative z-10">{path.subtitle}</p>
                  
                  <div className="space-y-3 mb-6 relative z-10">
                    {path.benefits.map((benefit, benefitIndex) => (
                      <motion.div 
                        key={benefitIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className={`w-5 h-5 ${path.checkColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

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
                    <Link href={path.href}>
                      {path.cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
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