"use client"
import { useState } from 'react';
import { 
  ArrowDownUp,
  ChevronDown,
  Search,
  Info,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader,
  TrendingUp,
  Clock,
  Fuel
} from 'lucide-react';

export default function SwapPage() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [searchToken, setSearchToken] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResponse, setSwapResponse] = useState(null);
  const [gasPrice, setGasPrice] = useState(null);
  const [balance, setBalance] = useState(null);

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'from-purple-500 to-indigo-600' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', color: 'from-violet-500 to-purple-600' },
    { id: 'solana', name: 'Solana', icon: '◎', color: 'from-cyan-500 to-blue-600' },
    { id: 'bsc', name: 'BSC', icon: '◆', color: 'from-amber-500 to-orange-600' }
  ];

  // Simulated token list (would come from API)
  const tokens = {
    ethereum: [
      { symbol: 'ETH', name: 'Ethereum', balance: '2.5678', price: '$3,456.78', logo: '⟠' },
      { symbol: 'USDT', name: 'Tether USD', balance: '5000.00', price: '$1.00', logo: '₮' },
      { symbol: 'USDC', name: 'USD Coin', balance: '3000.00', price: '$1.00', logo: '◎' },
      { symbol: 'DAI', name: 'Dai Stablecoin', balance: '1500.00', price: '$1.00', logo: '◈' },
      { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.125', price: '$67,890.00', logo: '₿' },
      { symbol: 'UNI', name: 'Uniswap', balance: '50.00', price: '$8.45', logo: '🦄' }
    ],
    polygon: [
      { symbol: 'MATIC', name: 'Polygon', balance: '1234.56', price: '$0.89', logo: '⬡' },
      { symbol: 'USDT', name: 'Tether USD', balance: '2000.00', price: '$1.00', logo: '₮' },
      { symbol: 'USDC', name: 'USD Coin', balance: '1500.00', price: '$1.00', logo: '◎' }
    ],
    solana: [
      { symbol: 'SOL', name: 'Solana', balance: '45.78', price: '$145.23', logo: '◎' },
      { symbol: 'USDT', name: 'Tether USD', balance: '3000.00', price: '$1.00', logo: '₮' },
      { symbol: 'RAY', name: 'Raydium', balance: '100.00', price: '$2.34', logo: '⚡' }
    ],
    bsc: [
      { symbol: 'BNB', name: 'BNB', balance: '12.34', price: '$567.89', logo: '◆' },
      { symbol: 'USDT', name: 'Tether USD', balance: '4000.00', price: '$1.00', logo: '₮' },
      { symbol: 'CAKE', name: 'PancakeSwap', balance: '200.00', price: '$3.45', logo: '🥞' }
    ]
  };

  const getChainTokens = () => {
    return tokens[selectedChain] || [];
  };

  const filteredTokens = getChainTokens().filter(token =>
    token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
    token.name.toLowerCase().includes(searchToken.toLowerCase())
  );

  const selectFromToken = (token) => {
    setFromToken(token);
    setShowFromTokens(false);
    setBalance(token.balance);
    calculateGasPrice();
  };

  const selectToToken = (token) => {
    setToToken(token);
    setShowToTokens(false);
  };

  const calculateGasPrice = () => {
    // Simulate gas price calculation
    const gasPrices = {
      ethereum: { slow: '15', average: '25', fast: '35' },
      polygon: { slow: '30', average: '50', fast: '80' },
      solana: { slow: '0.00001', average: '0.00005', fast: '0.0001' },
      bsc: { slow: '3', average: '5', fast: '8' }
    };
    setGasPrice(gasPrices[selectedChain]);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    if (fromToken && toToken && value) {
      // Simulate exchange rate calculation
      const rate = parseFloat(fromToken.price.replace(/[$,]/g, '')) / parseFloat(toToken.price.replace(/[$,]/g, ''));
      setToAmount((parseFloat(value) * rate * 0.997).toFixed(6)); // 0.3% fee
    }
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const executeSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) return;

    setIsSwapping(true);
    
    // Simulate API call
    setTimeout(() => {
      setSwapResponse({
        success: true,
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        fromAmount: fromAmount,
        fromToken: fromToken.symbol,
        toAmount: toAmount,
        toToken: toToken.symbol,
        gasUsed: gasPrice?.average || '25',
        timestamp: new Date().toISOString()
      });
      setIsSwapping(false);
    }, 3000);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Swap Tokens</h1>
        <p className="text-slate-400">Exchange tokens instantly across different blockchains</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Chain Selection */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
          <label className="block text-slate-400 text-sm mb-3">Select Blockchain</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => {
                  setSelectedChain(chain.id);
                  setFromToken(null);
                  setToToken(null);
                  setFromAmount('');
                  setToAmount('');
                  setSwapResponse(null);
                }}
                className={`p-4 rounded-xl border transition-all ${
                  selectedChain === chain.id
                    ? 'bg-blue-500/20 border-blue-500 text-white'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{chain.icon}</div>
                <div className="font-semibold text-sm">{chain.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Swap Interface */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
          {/* From Token */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-400 text-sm">From</label>
              {balance && (
                <span className="text-slate-400 text-xs">
                  Balance: {balance} {fromToken?.symbol}
                </span>
              )}
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 mb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFromTokens(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all"
                >
                  {fromToken ? (
                    <>
                      <span className="text-xl">{fromToken.logo}</span>
                      <span className="text-white font-semibold">{fromToken.symbol}</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Select token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-white text-2xl font-semibold outline-none placeholder-slate-600"
                />
              </div>
              {fromToken && fromAmount && (
                <p className="text-slate-400 text-sm mt-2">
                  ≈ ${(parseFloat(fromAmount) * parseFloat(fromToken.price.replace(/[$,]/g, ''))).toFixed(2)}
                </p>
              )}
            </div>
            {balance && fromAmount && parseFloat(fromAmount) > parseFloat(balance) && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Insufficient balance
              </p>
            )}
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={switchTokens}
              disabled={!fromToken || !toToken}
              className="p-3 bg-slate-800 hover:bg-slate-700 border-4 border-slate-900/50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowDownUp className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* To Token */}
          <div>
            <label className="text-slate-400 text-sm mb-2 block">To</label>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowToTokens(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all"
                >
                  {toToken ? (
                    <>
                      <span className="text-xl">{toToken.logo}</span>
                      <span className="text-white font-semibold">{toToken.symbol}</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Select token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-white text-2xl font-semibold outline-none placeholder-slate-600"
                />
              </div>
              {toToken && toAmount && (
                <p className="text-slate-400 text-sm mt-2">
                  ≈ ${(parseFloat(toAmount) * parseFloat(toToken.price.replace(/[$,]/g, ''))).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gas Price & Details */}
        {gasPrice && fromToken && toToken && fromAmount && (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Transaction Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Exchange Rate</span>
                <span className="text-white font-medium">
                  1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <Fuel className="w-3 h-3" />
                  Gas Price (Average)
                </span>
                <span className="text-white font-medium">{gasPrice.average} Gwei</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Estimated Fee</span>
                <span className="text-white font-medium">~$2.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Slippage Tolerance</span>
                <span className="text-white font-medium">0.5%</span>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">You'll receive (min)</span>
                  <span className="text-emerald-400 font-semibold">
                    {(parseFloat(toAmount) * 0.995).toFixed(6)} {toToken.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={executeSwap}
          disabled={!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) > parseFloat(balance || 0) || isSwapping}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
        >
          {isSwapping ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Swapping...</span>
            </>
          ) : (
            <>
              <ArrowDownUp className="w-5 h-5" />
              <span>Swap Tokens</span>
            </>
          )}
        </button>

        {/* Swap Response */}
        {swapResponse && (
          <div className="mt-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Swap Successful!</h3>
                <p className="text-emerald-300 text-sm">Your transaction has been confirmed</p>
              </div>
            </div>
            
            <div className="space-y-3 bg-slate-900/50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Swapped</span>
                <span className="text-white font-semibold">
                  {swapResponse.fromAmount} {swapResponse.fromToken}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Received</span>
                <span className="text-emerald-400 font-semibold">
                  {swapResponse.toAmount} {swapResponse.toToken}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Gas Used</span>
                <span className="text-white font-medium">{swapResponse.gasUsed} Gwei</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <p className="text-slate-400 text-xs mb-1">Transaction Hash</p>
                <p className="text-blue-400 text-xs font-mono break-all">{swapResponse.txHash}</p>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Clock className="w-3 h-3" />
                <span>{new Date(swapResponse.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSwapResponse(null)}
              className="w-full mt-4 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg transition-all border border-emerald-500/20"
            >
              Make Another Swap
            </button>
          </div>
        )}
      </div>

      {/* Token Selection Modal - From */}
      {showFromTokens && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/10 max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Select Token</h3>
                <button
                  onClick={() => setShowFromTokens(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  placeholder="Search token..."
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {filteredTokens.map((token, index) => (
                <button
                  key={index}
                  onClick={() => selectFromToken(token)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-xl transition-all mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xl">
                      {token.logo}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">{token.symbol}</p>
                      <p className="text-slate-400 text-xs">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{token.balance}</p>
                    <p className="text-slate-400 text-xs">{token.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Selection Modal - To */}
      {showToTokens && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/10 max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Select Token</h3>
                <button
                  onClick={() => setShowToTokens(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  placeholder="Search token..."
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {filteredTokens.map((token, index) => (
                <button
                  key={index}
                  onClick={() => selectToToken(token)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-xl transition-all mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xl">
                      {token.logo}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">{token.symbol}</p>
                      <p className="text-slate-400 text-xs">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{token.balance}</p>
                    <p className="text-slate-400 text-xs">{token.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}