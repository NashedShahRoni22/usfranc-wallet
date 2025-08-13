"use client"
import { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText, 
  Mail, 
  MessageCircle,
  Bell,
  User
} from 'lucide-react';

const CryptoNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <span className="text-white font-bold text-lg">UF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">USFranc</h1>
              <p className="text-xs text-slate-400 -mt-1">Wallet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Wallet Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('wallet')}
                className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors py-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'wallet' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'wallet' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                  <div className="py-2">
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>My Wallet</span>
                    </a>
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Portfolio</span>
                    </a>
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Transactions</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Trading */}
            <button className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors py-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trading</span>
            </button>

            {/* Security */}
            <button className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors py-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </button>

            {/* Support Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('support')}
                className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors py-2"
              >
                <Users className="w-4 h-4" />
                <span>Support</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'support' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'support' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                  <div className="py-2">
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Help Center</span>
                    </a>
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact Us</span>
                    </a>
                    <a 
                      href="#" 
                      onClick={closeDropdowns}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Documentation</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Connect Wallet Button */}
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 min-w-full  md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 backdrop-blur-xl rounded-xl mt-2 mb-4 border border-white/10">
              <a href="#" className="flex items-center space-x-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Wallet className="w-4 h-4" />
                <span>My Wallet</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <TrendingUp className="w-4 h-4" />
                <span>Trading</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                <span>Support</span>
              </a>
              
              {/* Mobile Profile Section */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">Profile</span>
                  <div className="ml-auto">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CryptoNavbar;