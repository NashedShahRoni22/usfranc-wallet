"use client"
import { useState } from 'react';
import { 
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Crown,
  Search,
  ChevronDown,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ReportPage() {
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true); // Toggle for demo
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const chains = [
    { id: 'all', name: 'All Chains', icon: '🌐' },
    { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
    { id: 'polygon', name: 'Polygon', icon: '⬡' },
    { id: 'solana', name: 'Solana', icon: '◎' },
    { id: 'bsc', name: 'BSC', icon: '◆' }
  ];

  const transactionTypes = [
    { id: 'all', name: 'All Transactions' },
    { id: 'native', name: 'Native Tokens' },
    { id: 'tokens', name: 'ERC20/Tokens' },
    { id: 'sent', name: 'Sent Only' },
    { id: 'received', name: 'Received Only' }
  ];

  // Simulated transaction data
  const allTransactions = [
    { 
      id: 1, 
      hash: '0x742d35...f0bEb', 
      type: 'receive', 
      chain: 'ethereum',
      tokenType: 'native',
      token: 'ETH', 
      amount: '+2.5678', 
      value: '$8,456.78',
      from: '0xabc...123',
      to: '0x742d...bEb',
      gasPrice: '25 Gwei',
      date: '2024-10-15',
      time: '14:32:15',
      status: 'confirmed'
    },
    { 
      id: 2, 
      hash: '0x8a9c4d...8c9d', 
      type: 'send', 
      chain: 'ethereum',
      tokenType: 'tokens',
      token: 'USDT', 
      amount: '-500.00', 
      value: '$500.00',
      from: '0x742d...bEb',
      to: '0xdef...456',
      gasPrice: '30 Gwei',
      date: '2024-10-14',
      time: '09:15:42',
      status: 'confirmed'
    },
    { 
      id: 3, 
      hash: '0x3f5e8b...2a1c', 
      type: 'receive', 
      chain: 'polygon',
      tokenType: 'native',
      token: 'MATIC', 
      amount: '+1234.56', 
      value: '$1,098.76',
      from: '0x123...abc',
      to: '0x8a9c...9d',
      gasPrice: '50 Gwei',
      date: '2024-10-13',
      time: '16:45:30',
      status: 'confirmed'
    },
    { 
      id: 4, 
      hash: '0x7b2d9e...4f3a', 
      type: 'send', 
      chain: 'polygon',
      tokenType: 'tokens',
      token: 'USDC', 
      amount: '-750.00', 
      value: '$750.00',
      from: '0x8a9c...9d',
      to: '0x456...def',
      gasPrice: '45 Gwei',
      date: '2024-10-12',
      time: '11:20:18',
      status: 'confirmed'
    },
    { 
      id: 5, 
      hash: 'DYw8jC...G5CNSKK', 
      type: 'receive', 
      chain: 'solana',
      tokenType: 'native',
      token: 'SOL', 
      amount: '+15.234', 
      value: '$2,213.45',
      from: 'ABC123...XYZ',
      to: 'DYw8jC...SKK',
      gasPrice: '0.00005',
      date: '2024-10-11',
      time: '08:30:55',
      status: 'confirmed'
    },
    { 
      id: 6, 
      hash: '0x9c8d7e...1b2a', 
      type: 'send', 
      chain: 'bsc',
      tokenType: 'native',
      token: 'BNB', 
      amount: '-3.5', 
      value: '$1,987.65',
      from: '0x789...ghi',
      to: '0x321...xyz',
      gasPrice: '5 Gwei',
      date: '2024-10-10',
      time: '13:45:22',
      status: 'confirmed'
    }
  ];

  const getFilteredTransactions = () => {
    return allTransactions.filter(tx => {
      const chainMatch = selectedChain === 'all' || tx.chain === selectedChain;
      
      let typeMatch = true;
      if (selectedType === 'native') typeMatch = tx.tokenType === 'native';
      else if (selectedType === 'tokens') typeMatch = tx.tokenType === 'tokens';
      else if (selectedType === 'sent') typeMatch = tx.type === 'send';
      else if (selectedType === 'received') typeMatch = tx.type === 'receive';
      
      const searchMatch = searchQuery === '' || 
        tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.token.toLowerCase().includes(searchQuery.toLowerCase());
      
      return chainMatch && typeMatch && searchMatch;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const calculateStats = () => {
    const sent = filteredTransactions.filter(tx => tx.type === 'send');
    const received = filteredTransactions.filter(tx => tx.type === 'receive');
    
    return {
      total: filteredTransactions.length,
      sent: sent.length,
      received: received.length,
      native: filteredTransactions.filter(tx => tx.tokenType === 'native').length,
      tokens: filteredTransactions.filter(tx => tx.tokenType === 'tokens').length
    };
  };

  const stats = calculateStats();

  const downloadReport = (format) => {
    if (!isSubscribed && format === 'custom') {
      alert('Premium feature: Upgrade to download customized reports');
      return;
    }

    setIsDownloading(true);
    
    // Simulate report generation
    setTimeout(() => {
      const reportData = filteredTransactions.map(tx => 
        `${tx.date},${tx.time},${tx.chain},${tx.type},${tx.token},${tx.amount},${tx.value},${tx.hash},${tx.status}`
      ).join('\n');
      
      const header = 'Date,Time,Chain,Type,Token,Amount,Value,Hash,Status\n';
      const csv = header + reportData;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transaction-report-${selectedChain}-${Date.now()}.csv`;
      a.click();
      
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Transaction Reports</h1>
            <p className="text-slate-400">View and download detailed transaction history</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-xl transition-all border border-white/10 md:hidden"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Sent</p>
          <p className="text-2xl font-bold text-red-400">{stats.sent}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Received</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.received}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Native</p>
          <p className="text-2xl font-bold text-blue-400">{stats.native}</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-xs mb-1">Tokens</p>
          <p className="text-2xl font-bold text-purple-400">{stats.tokens}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Chain Filter */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Select Chain
            </h3>
            <div className="space-y-2">
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => setSelectedChain(chain.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedChain === chain.id
                      ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                      : 'bg-slate-800/30 border border-white/5 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xl">{chain.icon}</span>
                  <span className="font-medium text-sm">{chain.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">Transaction Type</h3>
            <div className="space-y-2">
              {transactionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
                    selectedType === type.id
                      ? 'bg-blue-500/20 border border-blue-500/50 text-white font-medium'
                      : 'bg-slate-800/30 border border-white/5 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => downloadReport('csv')}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all border border-blue-500/20 disabled:opacity-50"
              >
                {isDownloading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">CSV Report</span>
              </button>
              
              <button
                onClick={() => downloadReport('custom')}
                disabled={isDownloading || !isSubscribed}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all border text-sm font-medium ${
                  isSubscribed
                    ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 text-amber-400 border-amber-500/20'
                    : 'bg-slate-800/30 text-slate-500 border-white/5 cursor-not-allowed'
                }`}
              >
                {!isSubscribed && <Crown className="w-4 h-4" />}
                {isDownloading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Custom Report</span>
              </button>
              
              {!isSubscribed && (
                <p className="text-xs text-slate-500 text-center mt-2">
                  Premium feature
                </p>
              )}
            </div>
          </div>

          {/* Upgrade Card */}
          {!isSubscribed && (
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Upgrade to Premium</h3>
              <p className="text-amber-200 text-sm mb-4">
                Get customized reports with advanced filters and export options
              </p>
              <a
                href="/subscription"
                className="block text-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg transition-all font-semibold text-sm"
              >
                Upgrade Now
              </a>
            </div>
          )}
        </div>

        {/* Transactions Table */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10">
            {/* Search Bar */}
            <div className="p-6 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by hash or token..."
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Type</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Chain</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Token</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Amount</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Value</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Date</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Hash</th>
                    <th className="text-left text-slate-400 text-xs font-medium px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${tx.type === 'receive' ? 'text-emerald-400' : 'text-red-400'}`}>
                            <div className={`p-2 rounded-lg ${tx.type === 'receive' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                              {tx.type === 'receive' ? (
                                <ArrowDownLeft className="w-4 h-4" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4" />
                              )}
                            </div>
                            <span className="text-sm font-medium capitalize">{tx.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{chains.find(c => c.id === tx.chain)?.icon}</span>
                            <span className="text-white text-sm capitalize">{tx.chain}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-white font-semibold text-sm">{tx.token}</span>
                            <p className="text-slate-500 text-xs capitalize">{tx.tokenType}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold text-sm ${tx.type === 'receive' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-medium text-sm">{tx.value}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white text-sm">{tx.date}</p>
                            <p className="text-slate-500 text-xs">{tx.time}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-blue-400 text-xs font-mono">{tx.hash}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <AlertCircle className="w-12 h-12 text-slate-600" />
                          <p className="text-slate-400">No transactions found</p>
                          <p className="text-slate-500 text-sm">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Placeholder */}
            {filteredTransactions.length > 0 && (
              <div className="p-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-slate-400 text-sm">
                  Showing {filteredTransactions.length} transactions
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-400 rounded-lg transition-all text-sm">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm">
                    1
                  </button>
                  <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-400 rounded-lg transition-all text-sm">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}