import SoaringCentersHeroSection from '@/components/sections/soaring-centers/SoaringCentersHeroSection';
import TwoPathsSection from '@/components/sections/soaring-centers/TwoPathsSection';
import SupportPackageSection from '@/components/sections/soaring-centers/SupportPackageSection';
import MarketOpportunitySection from '@/components/sections/soaring-centers/market-opportunity/MarketOpportunitySection';
import GettingStartedSection from '@/components/sections/soaring-centers/GettingStartedSection';

export default function SoaringCentersPage() {
  return (
    <div className="pt-20">
      <SoaringCentersHeroSection />
      <TwoPathsSection />
      <SupportPackageSection />
      <MarketOpportunitySection />
      <GettingStartedSection />
    </div>
  );
}