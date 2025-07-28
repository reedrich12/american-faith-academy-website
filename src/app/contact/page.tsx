import ContactHeroSection from '@/components/sections/contact/ContactHeroSection';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';
import OfficeInfoSection from '@/components/sections/contact/OfficeInfoSection';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactHeroSection />
      <ContactFormSection />
      <OfficeInfoSection />
    </div>
  );
}