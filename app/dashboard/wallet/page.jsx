"use client"
import { useState, useEffect } from 'react';
import { 
  Plus,
  Copy,
  Trash2,
  Loader2,
  AlertCircle,
  Wallet
} from 'lucide-react';
import AddWalletModal from '@/app/components/dashboard/AddWalletModal';
import { useApp } from '@/app/context/AppContext';
import { toast } from 'react-toastify';

export default function WalletPage() {
  const { user } = useApp();
  const [wallets, setWallets] = useState([]);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
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
      setWallets(data || []);
    } catch (err) {
      console.error('Error fetching wallets:', err);
      setError('Failed to load wallets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWallet = async () => {
    await fetchWallets();
    setShowAddWallet(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied to clipboard!');
  };

  const deleteWallet = async (walletId) => {
    if (!confirm('Are you sure you want to delete this wallet?')) {
      return;
    }

    try {
      const response = await fetch(`https://server.usfrancwallet.com/v1/wallet/remove/${walletId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'clientId': user.clientId
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete wallet');
      }

      await fetchWallets();
    } catch (err) {
      console.error('Error deleting wallet:', err);
      alert('Failed to delete wallet');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            <Wallet className="w-10 h-10 text-slate-600" />
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
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Wallet className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                    <p className="text-slate-400 text-xs">Created {formatDate(wallet.created_at)}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteWallet(wallet.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Ethereum Address */}
                {wallet.eth_address && (
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <p className="text-slate-400 text-xs mb-1.5">Ethereum Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-mono truncate">{wallet.eth_address}</p>
                      <button
                        onClick={() => copyToClipboard(wallet.eth_address)}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-all flex-shrink-0"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Polygon Address */}
                {wallet.polygon_address && (
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <p className="text-slate-400 text-xs mb-1.5">Polygon Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-mono truncate">{wallet.polygon_address}</p>
                      <button
                        onClick={() => copyToClipboard(wallet.polygon_address)}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-all flex-shrink-0"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Solana Address */}
                {wallet.solana_address && (
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <p className="text-slate-400 text-xs mb-1.5">Solana Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-mono truncate">{wallet.solana_address}</p>
                      <button
                        onClick={() => copyToClipboard(wallet.solana_address)}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-all flex-shrink-0"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}
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