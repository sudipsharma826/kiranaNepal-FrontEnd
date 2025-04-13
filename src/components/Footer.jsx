import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Kirana Nepal Logo" className="h-10 w-auto mr-3" />
              <h3 className="text-white text-xl font-bold">Kirana Nepal</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted destination for authentic Nepali groceries and essentials, delivering quality products right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Products', 'Categories', 'Special Offers', 'Blog'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping Policy', 'Return Policy', 'Privacy Policy'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span>+977 981-666-2624</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <a href="mailto:info@sudipsharma.info.np" className="hover:text-white transition-colors">
                  info@sudipsharma.info.np
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>Nityananda Tole 16,<br />Pokhara, Nepal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Kirana Nepal.  All rights reserved.
            </p>
            <div className="flex items-center text-sm text-gray-400 gap-2">
              <span>Developed with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <a
                href="https://sudipsharma.info.np"
                className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors"
              >
                Sudip Sharma
              </a>
              <img src="/logo7.png" alt="Dev Logo" className="h-5 w-5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
