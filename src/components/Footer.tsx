import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/afa-logo.png" alt="AFA Logo" className="h-12 w-auto" />
              <div>
                <h3 className="font-serif font-bold text-xl">American Faith Academy</h3>
                <p className="text-sm text-gray-300">Where Minds Soar and Faith Takes Flight</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Uniting Classic Wisdom, Modern Technology, and an Enduring Community for Lasting Impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-patriot transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-patriot transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-patriot transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-patriot transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="text-gray-300 hover:text-white transition-colors">Academics</Link></li>
              <li><Link href="/admissions" className="text-gray-300 hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/soaring-centers" className="text-gray-300 hover:text-white transition-colors">Soaring Centers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Solo Flights (Online)</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Soaring Centers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Classical Education</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AI-Enhanced Learning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">ESA Funding</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-patriot">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-patriot" />
                <span className="text-gray-300">279-263-9627</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-patriot" />
                <span className="text-gray-300">admin@americanfaithacademy.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-patriot mt-1" />
                <span className="text-gray-300">
                  123 Education Way<br />
                  Faith City, FC 12345
                </span>
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
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-300 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;