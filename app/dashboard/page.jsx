"use client"
import { useState } from 'react';
import { 
  Wallet,
  Plus,
  Search,
  TrendingUp,
  Activity,
  DollarSign,
  Crown,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [publicAddress, setPublicAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState('eth');
  const [balance, setBalance] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const stats = [
    { 
      label: 'Total Balance', 
      value: '$45,678.90', 
      change: '+12.5%', 
      isUp: true,
      icon: Wallet,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      label: 'Total Profit', 
      value: '$8,234.50', 
      change: '+8.2%', 
      isUp: true,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      label: 'Total Assets', 
      value: '12', 
      change: '+3 New', 
      isUp: true,
      icon: Activity,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      label: 'Monthly Volume', 
      value: '$23,456.00', 
      change: '-2.3%', 
      isUp: false,
      icon: DollarSign,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const marketCaps = [
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: '$3,456.78', 
      marketCap: '$415.2B',
      change: '+5.2%',
      isUp: true,
      icon: '⟠',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      name: 'Polygon', 
      symbol: 'MATIC', 
      price: '$0.89', 
      marketCap: '$8.2B',
      change: '+3.8%',
      isUp: true,
      icon: '⬡',
      color: 'from-violet-500 to-purple-600'
    },
    { 
      name: 'Solana', 
      symbol: 'SOL', 
      price: '$145.23', 
      marketCap: '$64.5B',
      change: '+7.1%',
      isUp: true,
      icon: '◎',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const handleGetBalance = () => {
    if (!publicAddress) return;
    setBalance({
      eth: '2.5678 ETH',
      matic: '1,234.56 MATIC',
      sol: '45.78 SOL'
    });
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome to USFranc Wallet - Manage your crypto assets</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/create-wallet" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20">
              <Plus className="w-4 h-4" />
              <span>Create Wallet</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions - Wallet Creation & Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Create Wallet Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 border border-blue-500/20 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Create Your Wallet</h3>
            <p className="text-blue-100 mb-6">Get started with ETH, Polygon, and Solana wallets in seconds</p>
            <a href="/create-wallet" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all">
              Create Now
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Subscription Card */}
        {!isSubscribed && (
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 border border-amber-400/20 shadow-2xl shadow-amber-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Upgrade to Premium</h3>
              <p className="text-amber-100 mb-6">Unlock advanced features, priority support, and exclusive benefits</p>
              <a href="/subscription" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all">
                Subscribe Now
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${stat.isUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{showBalance ? stat.value : '••••••'}</p>
            </div>
          );
        })}
      </div>

      {/* Market Cap Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketCaps.map((coin, index) => (
            <div key={index} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${coin.color} text-white rounded-xl flex items-center justify-center shadow-lg text-2xl`}>
                  {coin.icon}
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${coin.isUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                  {coin.change}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{coin.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{coin.symbol}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Price</span>
                  <span className="text-white font-semibold">{coin.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Market Cap</span>
                  <span className="text-white font-semibold">{coin.marketCap}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Get Balance Section */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Check Balance</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Select Blockchain</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setSelectedChain('eth')}
                className={`p-4 rounded-xl border transition-all ${
                  selectedChain === 'eth'
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">⟠</div>
                <div className="font-semibold">Ethereum</div>
              </button>
              <button
                onClick={() => setSelectedChain('polygon')}
                className={`p-4 rounded-xl border transition-all ${
                  selectedChain === 'polygon'
                    ? 'bg-violet-500/20 border-violet-500 text-white'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">⬡</div>
                <div className="font-semibold">Polygon</div>
              </button>
              <button
                onClick={() => setSelectedChain('solana')}
                className={`p-4 rounded-xl border transition-all ${
                  selectedChain === 'solana'
                    ? 'bg-cyan-500/20 border-cyan-500 text-white'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">◎</div>
                <div className="font-semibold">Solana</div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-slate-400 text-sm mb-2">Public Address</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={publicAddress}
                onChange={(e) => setPublicAddress(e.target.value)}
                placeholder="Enter your public address (0x... or base58)"
                className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                onClick={handleGetBalance}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Get Balance</span>
              </button>
            </div>
          </div>

          {balance && (
            <div className="mt-6 p-6 bg-slate-800/50 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-4">Balance Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <span className="text-slate-400">Ethereum (ETH)</span>
                  <span className="text-white font-semibold">{balance.eth}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <span className="text-slate-400">Polygon (MATIC)</span>
                  <span className="text-white font-semibold">{balance.matic}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <span className="text-slate-400">Solana (SOL)</span>
                  <span className="text-white font-semibold">{balance.sol}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}