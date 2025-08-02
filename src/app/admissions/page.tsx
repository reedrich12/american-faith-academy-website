import AdmissionsHeroSection from '@/components/sections/admissions/AdmissionsHeroSection';
import ProgramOptionsSection from '@/components/sections/admissions/ProgramOptionsSection';
import EnrollmentProcessSection from '@/components/sections/admissions/enrollment/EnrollmentProcessSection';
import ESAFundingSection from '@/components/sections/admissions/ESAFundingSection';
import FAQSection from '@/components/sections/admissions/FAQSection';

export default function AdmissionsPage() {
  return (
    <div className="pt-20">
      <AdmissionsHeroSection />
      <ProgramOptionsSection />
      <EnrollmentProcessSection />
      <ESAFundingSection />
      <FAQSection />
    </div>
  );
}