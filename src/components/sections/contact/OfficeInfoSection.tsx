import AnimatedSection from '@/components/ui/animated-section';

const OfficeInfoSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <h2 className="font-serif text-4xl font-bold text-navy mb-6">
            Visit Our Office
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Located in the heart of America, serving families nationwide.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OfficeInfoSection;