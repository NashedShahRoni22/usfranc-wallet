"use client"
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  ArrowLeftRight,
  Send,
  Download,
  FileText,
  Wallet,
  Settings,
  LogOut,
  X
} from 'lucide-react';

const DashboardSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, href: '/dashboard/wallet' },
    { id: 'swap', name: 'Swap', icon: ArrowLeftRight, href: '/dashboard/swap' },
    { id: 'send', name: 'Send', icon: Send, href: '/dashboard/send' },
    { id: 'receive', name: 'Receive', icon: Download, href: '/dashboard/receive' },
    { id: 'report', name: 'Report', icon: FileText, href: '/dashboard/report' },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/dashboard/settings' }
  ];

  const handleItemClick = (href) => {
    router.push(href);
    if (onClose) onClose();
  };

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-64 bg-slate-900 border-r border-white/10
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <span className="text-white font-bold text-lg">UF</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">USFranc</h2>
                <p className="text-xs text-slate-400 -mt-0.5">Wallet</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.href)}
                  className={`
                    cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200 w-full text-left
                    ${active
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {/* Logout Button */}
            <button
              onClick={() => {
                console.log('Logging out...');
                router.push('/auth');
              }}
              className="cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-xl w-full
                text-red-400 hover:text-red-300 hover:bg-red-500/10
                transition-all duration-200 border border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>

            {/* Help Card */}
            {/* <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-xl p-4 border border-blue-500/20">
              <p className="text-sm text-slate-300 font-medium mb-1">Need Help?</p>
              <p className="text-xs text-slate-400 mb-3">Check our documentation</p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm py-2 rounded-lg transition-all">
                View Docs
              </button>
            </div> */}

          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;