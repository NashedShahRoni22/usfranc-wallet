"use client"
import { 
  Mail, 
  Phone, 
  Twitter,
  Github,
  MessageCircle,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const CryptoFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Globe, href: "#", label: "Website" }
  ];

  const productLinks = [
    "Crypto Wallet",
    "Trading Platform", 
    "Portfolio Tracker",
    "DeFi Integration",
    "NFT Marketplace"
  ];

  const supportLinks = [
    "Help Center",
    "Documentation", 
    "API Reference",
    "Community Forum",
    "Security Center"
  ];

  const legalLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
    { text: "Cookie Policy", href: "#" },
    { text: "Legal", href: "#" }
  ];

  return (
    <footer className="bg-indigo-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <span className="text-white font-bold text-xl">UF</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">USFranc</h3>
                <p className="text-sm text-slate-400">Wallet</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The most secure and user-friendly crypto wallet for managing your digital assets with confidence and ease.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Products</h4>
            <div className="space-y-3">
              {productLinks.map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Support</h4>
            <div className="space-y-3">
              {supportLinks.map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Downloads */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Get Started</h4>
            
            {/* Download Buttons */}
            <div className="space-y-3 mb-8">
              <button className="flex items-center space-x-3 w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02]">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-colors">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold">Mobile App</p>
                  <p className="text-slate-400 text-xs">iOS & Android</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02]">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:from-indigo-600 group-hover:to-indigo-700 transition-colors">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold">Desktop App</p>
                  <p className="text-slate-400 text-xs">Windows, Mac, Linux</p>
                </div>
              </button>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm group">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <a href="mailto:support@usfranc.com" className="text-slate-400 hover:text-white transition-colors">
                  support@usfranc.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3 text-sm group">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Phone className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <a href="tel:+15551234567" className="text-slate-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-2 text-sm text-slate-400">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  {link.text}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-slate-400 text-center lg:text-right">
              <p>© {currentYear} USFranc Wallet. All rights reserved.</p>
              <p className="text-xs text-slate-500 mt-1">
                Built with security and trust in mind.
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="border-t border-white/5 py-4">
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10"></div>
            <div className="hidden sm:flex items-center space-x-2">
              <span>🔒 Bank-level security</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div className="hidden md:flex items-center space-x-2">
              <span>⚡ 99.9% uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CryptoFooter;