"use client"
import { useState } from 'react';
import { 
  Plus,
  Copy,
  RefreshCw,
  Key,
  Trash2
} from 'lucide-react';
import AddWalletModal from '@/app/components/dashboard/AddWalletModal';

export default function WalletPage() {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: 'Main Wallet',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      chain: 'Ethereum',
      balance: '2.5678 ETH',
      icon: '⟠',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Trading Wallet',
      address: '0x8a9c4dfe8b9b95d4cda9c3b2e73f4e5d6a7b8c9d',
      chain: 'Polygon',
      balance: '1,234.56 MATIC',
      icon: '⬡',
      color: 'from-violet-500 to-purple-600'
    }
  ]);

  const [showAddWallet, setShowAddWallet] = useState(false);

  const handleCreateWallet = (walletData) => {
    const newWallet = {
      id: wallets.length + 1,
      name: walletData.name,
      address: '0x' + Math.random().toString(16).substr(2, 40),
      chain: walletData.chain,
      balance: '0 ' + walletData.symbol,
      icon: walletData.icon,
      color: 'from-blue-500 to-indigo-600'
    };
    setWallets([...wallets, newWallet]);
  };

  const getBalance = (walletId) => {
    setWallets(wallets.map(w => 
      w.id === walletId 
        ? { ...w, balance: (Math.random() * 10).toFixed(4) + ' ' + w.chain.split(' ')[0] }
        : w
    ));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteWallet = (walletId) => {
    setWallets(wallets.filter(w => w.id !== walletId));
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Wallet Management</h1>
            <p className="text-slate-400">Add and manage your crypto wallets securely</p>
          </div>
          <button
            onClick={() => setShowAddWallet(true)}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Wallet</span>
          </button>
        </div>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${wallet.color} rounded-xl flex items-center justify-center shadow-lg text-2xl`}>
                  {wallet.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                  <p className="text-slate-400 text-sm">{wallet.chain}</p>
                </div>
              </div>
              <button
                onClick={() => deleteWallet(wallet.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                <p className="text-slate-400 text-xs mb-2">Public Address</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white text-sm font-mono truncate">{wallet.address}</p>
                  <button
                    onClick={() => copyToClipboard(wallet.address)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Copy className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-400 text-xs">Balance</p>
                  <button
                    onClick={() => getBalance(wallet.id)}
                    className="p-1 hover:bg-white/5 rounded transition-all"
                  >
                    <RefreshCw className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
                <p className="text-white text-xl font-bold">{wallet.balance}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all border border-blue-500/20">
                  <Key className="w-4 h-4" />
                  <span className="text-sm">Get Key</span>
                </button>
                <button
                  onClick={() => getBalance(wallet.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-all border border-emerald-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Wallet Modal */}
      <AddWalletModal 
        isOpen={showAddWallet}
        onClose={() => setShowAddWallet(false)}
        onCreateWallet={handleCreateWallet}
      />
    </div>
  );
}