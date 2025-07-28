import HeroSection from '@/components/sections/HeroSection';
import SoarFrameworkSection from '@/components/sections/SoarFrameworkSection';
import PioneeringEducationSection from '@/components/sections/PioneeringEducationSection';
import LearningModelsSection from '@/components/sections/LearningModelsSection';
import AITechnologySection from '@/components/sections/AITechnologySection';
import PartnershipSection from '@/components/sections/PartnershipSection';
import StudentTypesSection from '@/components/sections/StudentTypesSection';
import VirtualOpenHouseSection from '@/components/sections/VirtualOpenHouseSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <SoarFrameworkSection />
      <PioneeringEducationSection />
      <LearningModelsSection />
      <AITechnologySection />
      <PartnershipSection />
      <StudentTypesSection />
      <VirtualOpenHouseSection />
      <FinalCTASection />
    </div>
  );
}
