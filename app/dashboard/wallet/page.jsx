"use client"
import { useState, useEffect } from 'react';
import { 
  Plus,
  Copy,
  RefreshCw,
  Key,
  Trash2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import AddWalletModal from '@/app/components/dashboard/AddWalletModal';
import { useApp } from '@/app/context/AppContext';

export default function WalletPage() {
  const { user } = useApp();
  const [wallets, setWallets] = useState([]);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch all wallets on component mount
  useEffect(() => {
    if (user.clientId && user.token) {
      fetchWallets();
    }
  }, [user.clientId, user.token]);

  const fetchWallets = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://server.usfrancwallet.com/v1/wallet/get/meta/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'clientId': user.clientId
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallets');
      }

      const data = await response.json();
      console.log(data);
      
      // Transform API response to match UI format
      const transformedWallets = data?.map((wallet, index) => ({
        id: wallet.id || wallet._id,
        name: wallet.name,
        address: wallet.address || wallet.publicKey || 'N/A',
        chain: wallet.blockchain || 'Ethereum',
        balance: wallet.balance || '0 ETH',
        icon: getChainIcon(wallet.blockchain),
        color: getChainColor(index)
      })) || [];

      setWallets(transformedWallets);
    } catch (err) {
      console.error('Error fetching wallets:', err);
      setError('Failed to load wallets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getChainIcon = (blockchain) => {
    const icons = {
      'Ethereum': '⟠',
      'Polygon': '⬡',
      'Solana': '◎',
      'Bitcoin': '₿'
    };
    return icons[blockchain] || '⟠';
  };

  const getChainColor = (index) => {
    const colors = [
      'from-purple-500 to-indigo-600',
      'from-violet-500 to-purple-600',
      'from-blue-500 to-indigo-600',
      'from-cyan-500 to-blue-600',
      'from-teal-500 to-cyan-600'
    ];
    return colors[index % colors.length];
  };

  const handleCreateWallet = async (walletData) => {
    // Wallet is already created via API in the modal
    // Just refresh the wallet list
    await fetchWallets();
    setShowAddWallet(false);
  };

  const getBalance = async (walletId) => {
    try {
      // Implement balance fetching logic here
      // For now, just simulate a balance update
      setWallets(wallets.map(w => 
        w.id === walletId 
          ? { ...w, balance: (Math.random() * 10).toFixed(4) + ' ' + w.chain.split(' ')[0] }
          : w
      ));
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Add toast notification here
  };

  const deleteWallet = async (walletId) => {
    if (!confirm('Are you sure you want to delete this wallet?')) {
      return;
    }

    try {
      // Implement delete API call here
      // const response = await fetch(`http://localhost:8090/v1/v1/wallet/delete/${walletId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`,
      //     'clientId': user.clientId
      //   }
      // });

      // For now, just remove from state
      setWallets(wallets.filter(w => w.id !== walletId));
    } catch (err) {
      console.error('Error deleting wallet:', err);
      alert('Failed to delete wallet');
    }
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

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-200">{error}</p>
            <button
              onClick={fetchWallets}
              className="text-sm text-red-400 hover:text-red-300 underline mt-1"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-400">Loading wallets...</p>
          </div>
        </div>
      ) : wallets.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6">
            <Key className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Wallets Yet</h3>
          <p className="text-slate-400 mb-6 text-center max-w-md">
            Create your first wallet to start managing your crypto assets securely
          </p>
          <button
            onClick={() => setShowAddWallet(true)}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Wallet</span>
          </button>
        </div>
      ) : (
        /* Wallets Grid */
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
                      title="Copy address"
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
                      title="Refresh balance"
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
      )}

      {/* Add Wallet Modal */}
      <AddWalletModal 
        isOpen={showAddWallet}
        onClose={() => setShowAddWallet(false)}
        onCreateWallet={handleCreateWallet}
        clientId={user.clientId}
        token={user.token}
      />
    </div>
  );
}