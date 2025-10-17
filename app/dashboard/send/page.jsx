"use client"
import { useState, useEffect } from 'react';
import {
  Send,
  ChevronDown,
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  Copy,
  ArrowRight
} from 'lucide-react';

export default function SendPage() {
  // State Management
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Result
  const [selectedChain, setSelectedChain] = useState('eth');
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');
  const [tokenSearch, setTokenSearch] = useState('');

  // Mock Data
  const chains = [
    { id: 'eth', name: 'Ethereum', icon: '⟠', symbol: 'ETH', rpcUrl: 'https://eth-rpc.example.com' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.example.com' },
    { id: 'solana', name: 'Solana', icon: '◎', symbol: 'SOL', rpcUrl: 'https://solana-rpc.example.com' }
  ];

  const tokensByChain = {
    eth: [
      { id: 1, name: 'Ethereum', symbol: 'ETH', balance: '2.5678', decimals: 18, contractAddress: '0x0000' },
      { id: 2, name: 'USDC', symbol: 'USDC', balance: '1,250.00', decimals: 6, contractAddress: '0xA0b86991' },
      { id: 3, name: 'Dai Stablecoin', symbol: 'DAI', balance: '850.50', decimals: 18, contractAddress: '0x6B175474' },
      { id: 4, name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: '0.25', decimals: 8, contractAddress: '0x2260FAC5' }
    ],
    polygon: [
      { id: 1, name: 'Polygon', symbol: 'MATIC', balance: '1,234.56', decimals: 18, contractAddress: '0x0000' },
      { id: 2, name: 'USDC', symbol: 'USDC', balance: '2,500.00', decimals: 6, contractAddress: '0x2791Bca1' },
      { id: 3, name: 'Aave', symbol: 'AAVE', balance: '5.50', decimals: 18, contractAddress: '0xD6DF932' }
    ],
    solana: [
      { id: 1, name: 'Solana', symbol: 'SOL', balance: '10.5', decimals: 9, contractAddress: 'So11111111' },
      { id: 2, name: 'USDC', symbol: 'USDC', balance: '5,000.00', decimals: 6, contractAddress: 'EPjFWaJgt' },
      { id: 3, name: 'Raydium', symbol: 'RAY', balance: '250.75', decimals: 6, contractAddress: '4k3Dyjzvzp' }
    ]
  };

  const currentChain = chains.find(c => c.id === selectedChain);
  const currentTokens = tokensByChain[selectedChain] || [];
  const filteredTokens = currentTokens.filter(token =>
    token.name.toLowerCase().includes(tokenSearch.toLowerCase()) ||
    token.symbol.toLowerCase().includes(tokenSearch.toLowerCase())
  );

  // Simulate fetching gas price
  const fetchGasPrice = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          standard: '50',
          fast: '75',
          instant: '100'
        });
      }, 500);
    });
  };

  // Handle token selection
  const handleSelectToken = (token) => {
    setSelectedToken(token);
    setShowTokenDropdown(false);
    setTokenSearch('');
  };

  // Validate form
  const validateForm = () => {
    if (!selectedToken) {
      setError('Please select a token');
      return false;
    }
    if (!recipientAddress) {
      setError('Please enter recipient address');
      return false;
    }
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      setError('Please enter a valid transfer amount');
      return false;
    }
    if (parseFloat(transferAmount) > parseFloat(selectedToken.balance.replace(/,/g, ''))) {
      setError('Insufficient balance');
      return false;
    }
    setError('');
    return true;
  };

  // Handle review/confirmation
  const handleReview = async () => {
    if (!validateForm()) return;
    setStep(2);
  };

  // Simulate transaction execution
  const executeTransaction = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate transaction hash response
      const hash = '0x' + Math.random().toString(16).substr(2, 64);
      setTransactionHash(hash);
      setStep(3);
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle reset
  const resetForm = () => {
    setStep(1);
    setSelectedToken(null);
    setRecipientAddress('');
    setTransferAmount('');
    setTransactionHash('');
    setError('');
    setTokenSearch('');
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Send Coins & Tokens</h1>
        <p className="text-slate-400">Transfer your crypto across different chains</p>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {/* Step 1: Form */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Select Chain */}
              <div>
                <label className="block text-slate-400 text-sm mb-3 font-medium">Select Blockchain</label>
                <div className="grid grid-cols-3 gap-3">
                  {chains.map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setSelectedChain(chain.id);
                        setSelectedToken(null);
                      }}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedChain === chain.id
                          ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{chain.icon}</div>
                      <div className="text-sm font-semibold">{chain.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Token */}
              <div>
                <label className="block text-slate-400 text-sm mb-2 font-medium">Select Token</label>
                <div className="relative">
                  <button
                    onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white flex items-center justify-between hover:border-white/20 transition-all"
                  >
                    <div className="text-left">
                      {selectedToken ? (
                        <div>
                          <div className="font-semibold">{selectedToken.symbol}</div>
                          <div className="text-xs text-slate-400">Balance: {selectedToken.balance}</div>
                        </div>
                      ) : (
                        <span className="text-slate-500">Choose a token...</span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showTokenDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Token Dropdown */}
                  {showTokenDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-50">
                      <input
                        type="text"
                        placeholder="Search token..."
                        value={tokenSearch}
                        onChange={(e) => setTokenSearch(e.target.value)}
                        className="w-full bg-slate-700 border-b border-white/10 px-4 py-2 text-white placeholder-slate-500 focus:outline-none rounded-t-xl"
                      />
                      <div className="max-h-64 overflow-y-auto">
                        {filteredTokens.length > 0 ? (
                          filteredTokens.map(token => (
                            <button
                              key={token.id}
                              onClick={() => handleSelectToken(token)}
                              className="w-full px-4 py-3 text-left hover:bg-white/5 border-b border-white/5 flex justify-between items-center transition-all"
                            >
                              <div>
                                <div className="text-white font-semibold text-sm">{token.symbol}</div>
                                <div className="text-slate-400 text-xs">{token.name}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-white text-sm font-semibold">{token.balance}</div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-slate-500 text-sm">No tokens found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Token Info */}
              {selectedToken && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Token:</span>
                    <span className="text-white font-semibold">{selectedToken.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Balance:</span>
                    <span className="text-white font-semibold">{selectedToken.balance} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Gas Fee (Estimated):</span>
                    <span className="text-emerald-400 font-semibold">~0.015 {currentChain?.symbol}</span>
                  </div>
                </div>
              )}

              {/* Recipient Address */}
              <div>
                <label className="block text-slate-400 text-sm mb-2 font-medium">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Transfer Amount */}
              <div>
                <label className="block text-slate-400 text-sm mb-2 font-medium">Amount to Send</label>
                <div className="relative">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.0001"
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all pr-16"
                  />
                  {selectedToken && (
                    <button
                      onClick={() => setTransferAmount(selectedToken.balance.replace(/,/g, ''))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                    >
                      Max
                    </button>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={handleReview}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-5 h-5" />
                  Review & Send
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Review Transaction</h2>
                <p className="text-slate-400">Please verify the details before confirming</p>
              </div>

              {/* Transaction Details */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">From Chain</span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    {currentChain?.icon} {currentChain?.name}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">Token</span>
                  <span className="text-white font-semibold">{selectedToken?.symbol}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">Amount</span>
                  <span className="text-white font-semibold text-lg">{transferAmount} {selectedToken?.symbol}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">To Address</span>
                  <span className="text-white font-mono text-sm font-semibold truncate max-w-xs">{recipientAddress}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Gas Fee</span>
                  <span className="text-emerald-400 font-semibold">~0.015 {currentChain?.symbol}</span>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  Once confirmed, this transaction cannot be reversed. Please ensure all details are correct.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium"
                >
                  Back
                </button>
                <button
                  onClick={executeTransaction}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Confirm & Send
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success Result */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h2>
                <p className="text-slate-400">Your transaction has been submitted to the network</p>
              </div>

              {/* Transaction Receipt */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">Amount Sent</span>
                  <span className="text-white font-semibold text-lg">{transferAmount} {selectedToken?.symbol}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">Recipient</span>
                  <span className="text-white font-mono text-sm font-semibold truncate max-w-xs">{recipientAddress}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400">Network</span>
                  <span className="text-white font-semibold">{currentChain?.name}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-slate-400">Transaction Hash</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-mono text-sm truncate max-w-xs">{transactionHash}</span>
                    <button
                      onClick={() => copyToClipboard(transactionHash)}
                      className="p-2 hover:bg-white/5 rounded transition-all"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* View Links */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all font-medium border border-blue-500/20"
                >
                  View on Explorer
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all font-medium border border-blue-500/20"
                >
                  Share
                </button>
              </div>

              {/* New Transaction Button */}
              <button
                onClick={resetForm}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all font-medium"
              >
                <ArrowRight className="w-5 h-5" />
                Send Another Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}