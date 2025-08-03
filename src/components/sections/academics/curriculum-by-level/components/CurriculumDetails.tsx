'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/animated-section';
import Link from 'next/link';
import { User, ChevronRight } from 'lucide-react';
import { CurriculumSubject } from '../types';

interface CurriculumDetailsProps {
  subjects: CurriculumSubject[];
  levelColor: string;
}

const pacingBadgeVariants = {
  'Student-Paced': 'bg-blue-100 text-blue-700 border-blue-200',
  'School-Paced': 'bg-green-100 text-green-700 border-green-200',
};

export function CurriculumDetails({ subjects, levelColor }: CurriculumDetailsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Subjects">
        {subjects.map((subject, index) => {
          const SubjectIcon = subject.icon;
          return (
            <AnimatedSection key={subject.id} delay={index * 0.1}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300" role="listitem">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${levelColor} flex items-center justify-center`}>
                        <SubjectIcon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <h4 className="font-serif text-xl font-bold text-navy">{subject.name}</h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${pacingBadgeVariants[subject.pacing]}`}
                      aria-label={`${subject.pacing} subject`}
                    >
                      {subject.pacing}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm text-gray-700 mb-2">Key Topics:</h5>
                    <ul className="space-y-1" role="list">
                      {subject.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <ChevronRight className="w-3 h-3 text-gray-400" aria-hidden="true" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>
      <AnimatedSection delay={0.6} className="mt-12">
        <Card className="bg-gradient-to-r from-navy-50 to-patriot-50 border-0">
          <CardContent className="p-8">
            <h4 className="font-serif text-2xl font-bold text-navy mb-4 text-center">
              Understanding Our Pacing Model
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-700" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-navy mb-2">Student-Paced</h5>
                  <p className="text-gray-600">
                    Math and Language Arts progress at each student's individual pace, ensuring mastery before
                    advancement with AI-powered support.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-green-700" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-navy mb-2">School-Paced</h5>
                  <p className="text-gray-600">
                    History, Science, and other subjects follow a community pace, fostering discussion and shared
                    learning experiences.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
      <AnimatedSection delay={0.8} className="text-center mt-12">
        <Button
          size="lg"
          className="bg-patriot hover:bg-patriot-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/admissions" aria-label="Learn more about our curriculum and apply for admission">
            Explore Our Full Curriculum
            <ChevronRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </Button>
      </AnimatedSection>
    </>
  );
}
