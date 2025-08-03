import AcademicsHeroSection from '@/components/sections/academics/AcademicsHeroSection';
import SoarFrameworkDeepDive from '@/components/sections/academics/SoarFrameworkDeepDive';
import ClassicalVsModernSection from '@/components/sections/academics/ClassicalVsModernSection';
import CurriculumByLevelSection from '@/components/sections/academics/curriculum-by-level/CurriculumByLevelSection';
import OmnibusApproachSection from '@/components/sections/academics/OmnibusApproachSection';
import TechnologyIntegrationSection from '@/components/sections/academics/technology-integration/TechnologyIntegrationSection';

export default function AcademicsPage() {
  return (
    <div className="pt-20">
      <AcademicsHeroSection />
      <SoarFrameworkDeepDive />
      <ClassicalVsModernSection />
      <CurriculumByLevelSection />
      <OmnibusApproachSection />
      <TechnologyIntegrationSection />
    </div>
  );
}