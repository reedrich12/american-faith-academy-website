'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';
import { useScrolled, useModal } from '@/hooks';
import type { NavItem } from '@/types';

const Navigation = () => {
  const isScrolled = useScrolled(50);
  const [isOpen, setIsOpen] = useState(false);
  const applicationModal = useModal();

  const navItems: NavItem[] = [
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Academics' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/soaring-centers', label: 'Soaring Centers' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-navy text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-patriot z-50"
      >
        Skip to main content
      </a>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo - FIXED: Using Next.js Image */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-patriot rounded"
            >
              <Image 
                src="/afa-logo.png" 
                alt="American Faith Academy Logo - Home" 
                width={48}
                height={48}
                className="h-12 w-auto" 
                priority
              />
              <div className="hidden sm:block">
                <h1 className="font-serif font-bold text-xl text-navy">
                  American Faith Academy
                </h1>
                <p className="text-sm text-gray-600">Where Minds Soar and Faith Takes Flight</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-navy hover:text-patriot transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 rounded px-2 py-1"
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy hover:text-white"
                onClick={applicationModal.open}
              >
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Button - FIXED: Added aria-label and aria-expanded */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden focus:outline-none focus:ring-2 focus:ring-patriot"
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px]"
                id="mobile-navigation"
                aria-label="Mobile navigation menu"
              >
                <nav className="flex flex-col space-y-4 mt-8" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-navy hover:text-patriot transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 rounded px-2 py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button 
                    variant="outline" 
                    className="border-navy text-navy hover:bg-navy hover:text-white w-full"
                    onClick={() => {
                      applicationModal.open();
                      setIsOpen(false);
                    }}
                  >
                    Apply Now
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Modals */}
      <FormModal 
        isOpen={applicationModal.isOpen} 
        onClose={applicationModal.close}
        formId="navigation-application"
        formHeight="700px"
        formTitle="Start Your Application"
      />
    </>
  );
};

export default Navigation;