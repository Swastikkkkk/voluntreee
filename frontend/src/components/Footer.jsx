import React, { useState } from 'react';

const Footer = () => {
  

  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold">Voluntree</h3>
            </div>
            <p className="text-green-200 leading-relaxed">
              Connecting passionate volunteers with meaningful causes. 
              Together, we're building a better world, one act of kindness at a time.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {/* ... existing social icons ... */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Find Opportunities</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">For NGOs</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Report Issue</a></li>
            </ul>
          </div>

          {/* Newsletter + Language Selector */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-green-200 text-sm">
              Get the latest volunteer opportunities and impact stories delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-green-800 border border-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors font-semibold">
                Subscribe
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-green-200 text-sm">
              © 2024 Voluntree. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-green-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
