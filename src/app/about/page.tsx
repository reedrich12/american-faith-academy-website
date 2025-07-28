import AboutHeroSection from '@/components/sections/about/AboutHeroSection';
import OurStorySection from '@/components/sections/about/OurStorySection';
import LeadershipSection from '@/components/sections/about/LeadershipSection';
import MissionSection from '@/components/sections/about/MissionSection';
import ValuesSection from '@/components/sections/about/ValuesSection';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHeroSection />
      <OurStorySection />
      <LeadershipSection />
      <MissionSection />
      <ValuesSection />
    </div>
  );
}