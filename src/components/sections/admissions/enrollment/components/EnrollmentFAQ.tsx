'use client';

import { EnrollmentFAQ as FAQType } from '../types';

interface EnrollmentFAQProps {
  faqs: FAQType[];
  compact?: boolean;
}

export function EnrollmentFAQ({ faqs, compact = false }: EnrollmentFAQProps) {
  if (compact) {
    return (
      <div>
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-2">
            <p className="text-sm font-medium text-gray-700 mb-0.5">{faq.question}</p>
            <p className="text-sm text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-20" aria-labelledby="enrollment-faq-heading">
      <h3 id="enrollment-faq-heading" className="font-serif text-3xl font-bold text-navy mb-8 text-center">
        Frequently Asked Questions
      </h3>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-semibold text-navy mb-2">{faq.question}</h4>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
