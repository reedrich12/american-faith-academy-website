'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import FormModal from '@/components/ui/form-modal';
import CalendarModal from '@/components/ui/calendar-modal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Academics' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/soaring-centers', label: 'Soaring Centers' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">AFA</span>
            </div>
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
                className="text-navy hover:text-patriot transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="bg-patriot hover:bg-patriot-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              onClick={() => setIsApplicationOpen(true)}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-6 border-b">
                  <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AFA</span>
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-navy">American Faith Academy</h2>
                  </div>
                </div>
                
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-navy hover:text-patriot transition-colors duration-200 font-medium text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <Button 
                  className="bg-patriot hover:bg-patriot-600 text-white mt-6"
                  onClick={() => {
                    setIsOpen(false);
                    setIsApplicationOpen(true);
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      
      {/* Admissions Application Form Modal */}
      <FormModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        formId="ZA1Leng5sS8fX1f5nkuU"
        formHeight="1165px"
        formTitle="Admissions Application"
      />
    </header>
  );
};

export default Navigation;