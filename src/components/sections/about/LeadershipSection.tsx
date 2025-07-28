'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Linkedin, Mail, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

interface Leader {
  name: string;
  title: string;
  image: string;
  shortBio: string;
  fullBio: string;
  credentials: string[];
  achievements: string[];
  linkedin?: string;
}

const LeadershipSection = () => {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);

  const leaders: Leader[] = [
    {
      name: "Jennifer Burns",
      title: "President",
      image: "/api/placeholder/300/400",
      shortBio: "Founder of Classical Consortium Academy with a passion for classical Christian education",
      fullBio: "First and foremost, I am a faithful follower of Jesus Christ, a wife to my wonderful husband David, and a proud mom of three boys—Ryan, Bradley, and Nicholas—and our loyal dog, and mother-in-law to Catherine. I am deeply honored that God has called me to serve in education and to lead American Faith Academy (AFA). As President, my mission is to provide an educational environment that helps students thrive academically while remaining firmly grounded in biblical truth.\n\nBefore helping launch AFA, I had the privilege of starting Classical Consortium Academy (CCA) in 2006. There, I saw firsthand the power of classical Christian education in a hybrid setting to transform lives and equip students with a strong foundation in both faith and knowledge. This experience shaped my unwavering belief in the importance of offering students an education that nurtures both mind and character.\n\nIn addition to my work at CCA, I served as the Director of Academics for Turning Point Education, where I had the honor of helping people across the country plant schools, create curriculum, and train educators. In this role, I helped establish educational models that bring a blend of academic excellence, faith, and community engagement to students and educators nationwide.\n\nAt AFA, we're committed to offering personalized, rigorous education that not only prepares students for academic success but also equips them to live faithfully, serve others, and make a lasting impact in the world. Guided by the scripture in Galatians 6:9-10, I am passionate about persevering in God's work and helping students achieve their God-given potential.",
      credentials: ["Founder of Classical Consortium Academy (2006)", "Former Director of Academics for Turning Point Education", "Expert in classical Christian education"],
      achievements: ["Founded and led CCA since 2006", "Helped plant schools nationwide", "Developed curriculum and trained educators across the country"],
      linkedin: "https://www.linkedin.com/posts/turning-point-usa-academy_schoolchoice-nationalschoolchoiceweek-activity-7291470378227449856-I2h0"
    },
    {
      name: "James Spencer",
      title: "CEO",
      image: "/api/placeholder/300/400",
      shortBio: "Higher education administrator and educational consultant with theological expertise",
      fullBio: "For more than a decade, I pursued my passions as a higher education administrator and educational consultant. During my time in online education, I was able to develop new biblical and theological curricula and programs that were designed to meet the challenges of students pursuing their education online. I was also privileged to work with men and women who have made me a better person and leader. As a dean over a multi-campus undergraduate school, I was blessed to work alongside faculty and oversee specialty programs such as missionary aviation and study abroad. In the next stage of my career, I will continue to use my background in theology and leadership to serve God's people as a Christian non-profit leader, writer, speaker, and podcaster.",
      credentials: ["Dean of multi-campus undergraduate school", "10+ years in higher education administration", "Biblical and theological curriculum developer"],
      achievements: ["Developed online biblical and theological curricula", "Oversaw specialty programs including missionary aviation", "Led study abroad programs"],
      linkedin: "https://www.linkedin.com/in/jamesgspencer"
    },
    {
      name: "Michael Clifford",
      title: "Co-Founder",
      image: "/api/placeholder/300/400",
      shortBio: "Serial entrepreneur and education investor with multiple successful IPOs",
      fullBio: "Fractional Large Scale Business Development Plus Capital Formation for CEOs & Private Equity Sponsors\n\nThree IPOs: Grand Canyon University (LOPE) MOST SUCCESSFUL IPO 2008, Woz U w/Steve Wozniak, Jack Welch Management Institute, Forbes Business School, Bridgepoint Education (BPI) MOST SUCCESSFUL IPO 2009, Ken Blanchard Business School, & most recently BethelTech, & others he can't publish...Investing Millions + Time: A Legacy of Helping Others: mkcadvisor.com\n\n\"Michael brings fresh creative strategies to unlock new-found profits...he sees opportunities others do not.\" - CEO\n\nClifford has been an entrepreneur since his first paper route at age 13, & has made and lost tens-of-millions of dollars. \"One's failures are more valuable than success,\" MKC.\n\nClifford serves CEO's to buy operating companies, families who desire to invest alongside high-quality private equity firms, business owners who want to sell their businesses or inject growth capital, regionally accredited higher education leaders that desire to expand access plus get surplus cash-flow, & charities desirous of monitization strategies to augment donations.\n\nHe has created companies in Christian Psychological Treatment, helped raise over $400M in charitable gifts, sold largest Six Sigma consulting agreement ($80M), co-managed Presidential Campaign, created second largest grossing political documentary in history, produced the award-winning film D.O.P.E.\n\nCatalyst to help create thousands of high paying jobs, $1.2B invested in real estate for schools, graduated hundreds-of-thousands of students with billions-of-dollars in return to institutions as well as investors.\n\nMKC offers access to the deepest pools of capital in the Middle East.\n\nClifford's charity-of-choice is dreamcenter.org. He lives with the best person he has ever known, Lindsey, enjoying their 4 terrific children plus Lindsey's ministry, jesuslifestyle.com. He has trouble sitting still, loves sailing, deep sea fishing, movies, walking, Bible, cigars, & as a trumpet player enjoys all genres of music.",
      credentials: ["Grand Canyon University IPO (2008)", "Bridgepoint Education IPO (2009)", "Multiple educational ventures"],
      achievements: ["Three successful IPOs in education", "Raised over $400M in charitable gifts", "Helped graduate hundreds of thousands of students"],
      linkedin: "https://www.linkedin.com/in/michael-k-clifford-5410411"
    },
    {
      name: "Brent Richardson",
      title: "Co-Founder",
      image: "/api/placeholder/300/400",
      shortBio: "Education entrepreneur and former CEO of Grand Canyon University",
      fullBio: "Brent Richardson has been an entrepreneur in the education space for over thirty years. He founded and led several successful companies, including Educational Management Group (EMG), Private Networks, National School Conference Institute, Learning 24-7, and Masters Online.\n\nIn 2003, Brent and his brother Chris acquired Grand Canyon University (GCU) in Phoenix when it was on the brink of foreclosure. As CEO and Chairman, Brent led the transformation of GCU, taking it public in 2008 and growing it into the largest Christian university in the world.\n\nIn 2017, Brent and Chris founded Lopes Capital, a family office dedicated to transforming education through strategic investments and innovative solutions.",
      credentials: ["30+ years in educational entrepreneurship", "Former CEO and Chairman of Grand Canyon University", "Founder of multiple education companies"],
      achievements: ["Transformed GCU into largest Christian university in the world", "Led GCU's successful IPO in 2008", "Founded Lopes Capital family office"],
      linkedin: "https://www.linkedin.com/in/brent-richardson-0ba148316"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of educators, technologists, and visionaries is united by a common 
            passion: providing an education worthy of our children.
          </p>
        </AnimatedSection>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {leaders.map((leader, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  {/* Photo */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="w-full h-64 bg-gradient-to-br from-navy-100 to-patriot-100 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                    >
                      <Button
                        size="sm"
                        className="bg-patriot hover:bg-patriot-600 text-white"
                        onClick={() => setSelectedLeader(index)}
                      >
                        Read Full Bio
                      </Button>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-navy mb-1">
                      {leader.name}
                    </h3>
                    <h4 className="text-patriot font-semibold mb-3">
                      {leader.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {leader.shortBio}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-patriot-500 to-patriot-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <AnimatedSection delay={0.4}>
          <div className="bg-gradient-to-r from-navy-50 to-patriot-50 rounded-2xl p-8 text-center border border-gray-200">
            <h3 className="font-serif text-3xl font-bold text-navy mb-6">
              Our Leadership Philosophy
            </h3>
            <blockquote className="text-xl text-gray-700 italic font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
              "Great leaders don't create followers—they create more leaders. Our team is committed 
              to developing not just excellent students, but future leaders who will transform their 
              communities and the world."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Servant Leadership",
                  description: "We lead by serving our students, families, and communities with humility and excellence."
                },
                {
                  title: "Collaborative Vision",
                  description: "Our diverse backgrounds unite around a shared commitment to educational excellence."
                },
                {
                  title: "Continuous Innovation",
                  description: "We constantly seek better ways to serve our students while honoring timeless principles."
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-lg text-navy mb-2">{principle.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bio Modal */}
        <AnimatePresence>
          {selectedLeader !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-navy-500 to-patriot-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {leaders[selectedLeader].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-navy">
                          {leaders[selectedLeader].name}
                        </h3>
                        <h4 className="text-patriot font-semibold">
                          {leaders[selectedLeader].title}
                        </h4>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedLeader(null)}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Full Bio */}
                  <div className="prose prose-lg text-gray-600 mb-6">
                    <p>{leaders[selectedLeader].fullBio}</p>
                  </div>

                  {/* Credentials */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-navy mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Education & Credentials
                    </h5>
                    <ul className="space-y-1">
                      {leaders[selectedLeader].credentials.map((credential, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-patriot rounded-full mr-3" />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-navy mb-3">Key Achievements</h5>
                    <ul className="space-y-1">
                      {leaders[selectedLeader].achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-patriot rounded-full mr-3" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="flex space-x-4 pt-4 border-t">
                    <a href="mailto:admin@americanfaithacademy.org">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </a>
                    {leaders[selectedLeader].linkedin && (
                      <a href={leaders[selectedLeader].linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LeadershipSection;