import { useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SupportPillar, SupportIconFeature } from '../types';
import {
  Users,
  LineChart,
  Shield,
  Laptop,
  Award,
  MessageSquare,
  Calendar,
  FileText,
  Palette,
  Globe,
  BookOpen,
  Briefcase
} from 'lucide-react';

export const useSupportPackage = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const prefersReducedMotion = usePrefersReducedMotion();

  const packages: SupportPillar[] = [
    {
      id: 'curriculum',
      name: 'Curriculum & Methodology',
      price: '',
      subtitle: 'Academic Excellence at Your Fingertips',
      highlights: [
        'S.O.A.R. Framework Integration',
        'Multi-Level Teaching Resources',
        'AI-Enhanced Learning Tools',
        'Classical Education Foundation'
      ],
      details: {
        included: [
          'Complete K-12 classical curriculum',
          'Teacher guides and lesson plans',
          'Assessment tools and rubrics',
          'Parent communication templates',
          'Student progress tracking system',
          'Digital resource library',
          'Quarterly curriculum updates'
        ],
        additional: [
          'Custom curriculum modifications',
          'Advanced placement materials',
          'Specialized learning support resources'
        ]
      },
      features: []
    },
    {
      id: 'business',
      name: 'Business & Operational',
      price: '',
      subtitle: 'Everything You Need to Run Successfully',
      highlights: [
        'Business Planning Tools',
        'Financial Modeling',
        'Legal Compliance',
        'Technology Platform'
      ],
      details: {
        included: [
          'Business plan templates',
          'Financial projection models',
          'Enrollment management system',
          'Parent portal access',
          'Billing and payment processing',
          'Legal document templates',
          'Compliance checklists',
          'Insurance guidance'
        ],
        additional: [
          'Custom financial consulting',
          'Legal review services',
          'Advanced analytics dashboard'
        ]
      },
      features: []
    },
    {
      id: 'training',
      name: 'Training & Development',
      price: '',
      subtitle: 'Continuous Growth and Support',
      highlights: [
        'Professional Development',
        'Community Network',
        'Mentorship Program',
        'Ongoing Support'
      ],
      details: {
        included: [
          'Initial 3-day intensive training',
          'Monthly webinar series',
          'Quarterly regional conferences',
          'Online learning platform access',
          'Peer mentorship matching',
          'Best practices library',
          '24/7 support community',
          'Annual national conference ticket'
        ],
        additional: [
          'On-site training visits',
          'Custom workshop development',
          'Executive coaching sessions'
        ]
      },
      features: []
    },
    {
      id: 'marketing',
      name: 'Brand & Marketing',
      price: '',
      subtitle: 'National Brand Power, Local Impact',
      highlights: [
        'AFA Brand Strength',
        'Marketing Assets',
        'Digital Presence',
        'Campaign Support'
      ],
      details: {
        included: [
          'Professional website template',
          'Marketing material library',
          'Social media templates',
          'Email campaign tools',
          'Local SEO optimization',
          'Press release templates',
          'Community event guides',
          'National advertising inclusion'
        ],
        additional: [
          'Custom marketing campaigns',
          'Professional photography',
          'Video production services'
        ]
      },
      features: []
    }
  ];

  const features: SupportIconFeature[] = [
    { id: 'community', name: 'Community', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: LineChart },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'technology', name: 'Technology', icon: Laptop },
    { id: 'quality', name: 'Quality', icon: Award },
    { id: 'support', name: 'Support', icon: MessageSquare },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'resources', name: 'Resources', icon: FileText },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'network', name: 'Network', icon: Globe },
    { id: 'curriculum', name: 'Curriculum', icon: BookOpen },
    { id: 'business', name: 'Business', icon: Briefcase }
  ];

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const handleKeydown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard(index);
    }
  };

  const expandAll = () => {
    setExpandedCards(new Set([0, 1, 2, 3]));
  };

  const collapseAll = () => {
    setExpandedCards(new Set());
  };

  return {
    packages,
    features,
    expandedCards,
    toggleCard,
    handleKeydown,
    expandAll,
    collapseAll,
    prefersReducedMotion,
  };
};

export type { SupportPillar, SupportIconFeature };
