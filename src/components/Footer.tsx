import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* FIXED: Using Next.js Image component */}
              <Image 
                src="/afa-logo.png" 
                alt="American Faith Academy Logo" 
                width={48}
                height={48}
                className="h-12 w-auto" 
              />
              <div>
                <h3 className="font-serif font-bold text-xl">American Faith Academy</h3>
                <p className="text-sm text-gray-300">Where Minds Soar and Faith Takes Flight</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Uniting Classic Wisdom, Modern Technology, and an Enduring Community for Lasting Impact.
            </p>
            <div className="flex space-x-4">
              {/* FIXED: Added aria-labels for all social media links */}
              <Link
                href="/"
                className="text-gray-300 hover:text-patriot transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                aria-label="Visit American Faith Academy on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-patriot transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                aria-label="Visit American Faith Academy on Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-patriot transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                aria-label="Visit American Faith Academy on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-patriot transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                aria-label="Visit American Faith Academy on YouTube"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">About Us</Link></li>
              <li><Link href="/academics" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Academics</Link></li>
              <li><Link href="/admissions" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Admissions</Link></li>
              <li><Link href="/soaring-centers" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Soaring Centers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Programs</h4>
            <ul className="space-y-2">
              <li><button type="button" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Solo Flights (Online)</button></li>
              <li><button type="button" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Soaring Centers</button></li>
              <li><button type="button" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">Classical Education</button></li>
              <li><button type="button" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">AI-Enhanced Learning</button></li>
              <li><button type="button" className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded">ESA Funding</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-patriot flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:279-263-9627" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                  aria-label="Call us at 279-263-9627"
                >
                  279-263-9627
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-patriot flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:admin@americanfaithacademy.org" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
                  aria-label="Email us at admin@americanfaithacademy.org"
                >
                  admin@americanfaithacademy.org
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-patriot mt-1 flex-shrink-0" aria-hidden="true" />
                <address className="text-gray-300 not-italic">
                  123 Education Way<br />
                  Faith City, FC 12345
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 American Faith Academy. All rights reserved.
            </p>
            <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Footer legal links">
              <Link 
                href="/privacy" 
                className="text-gray-300 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-300 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
              >
                Terms of Service
              </Link>
              <Link 
                href="/accessibility" 
                className="text-gray-300 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-patriot focus:ring-offset-2 focus:ring-offset-navy rounded"
              >
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;