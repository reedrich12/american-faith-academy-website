import AnimatedSection from '@/components/ui/animated-section';

const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <h2 className="font-serif text-4xl font-bold text-navy mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about enrollment, curriculum, and our programs.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;