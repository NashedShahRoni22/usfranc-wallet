"use client"
import { useState } from 'react';
import { 
  Menu, 
  X, 
  Wallet, 
  Shield, 
  HelpCircle,
  User,
  HomeIcon,
  LayoutDashboard
} from 'lucide-react';

const CryptoNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Single array to manage all menu items
  const menuItems = [
    { id: 'wallet', name: 'Home', icon: HomeIcon, href: '/home' },
    // { id: 'wallet', name: 'Wallet', icon: Wallet, href: '/wallet' },
    { id: 'security', name: 'Security', icon: Shield, href: '/security' },
    { id: 'notice', name: 'Notice', icon: HelpCircle, href: '/notice' },
    { id: 'portfolio', name: 'Portfolio', icon: User, href: '/portfolio', hasBadge: true },
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-indigo-950 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/home" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <span className="text-white font-bold text-lg">UF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">USFranc</h1>
              <p className="text-xs text-slate-400 -mt-1">Wallet</p>
            </div>
          </a>

          {/* Desktop Navigation - Icons Only */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <Icon className="w-5 h-5" />
                  {item.hasBadge && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </a>
              );
            })}
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

        {/* Mobile menu - Icons with Names */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 min-w-full md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 backdrop-blur-xl rounded-xl mt-2 mb-4 border border-white/10">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {item.hasBadge && (
                      <span className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CryptoNavbar;