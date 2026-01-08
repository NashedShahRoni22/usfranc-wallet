"use client";
import { useState } from "react";
import {
  Search,
  Loader2,
  AlertCircle,
  Coins,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useApp } from "@/app/context/AppContext";

export default function BalancePage() {
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [address, setAddress] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const chains = [
    { id: "ethereum", name: "Ethereum", color: "from-blue-500 to-cyan-500" },
    { id: "polygon", name: "Polygon", color: "from-purple-500 to-pink-500" },
    { id: "solana", name: "Solana", color: "from-green-500 to-emerald-500" },
  ];

  const getTokenTypes = () => {
    if (selectedChain === "ethereum" || selectedChain === "polygon") {
      return [
        {
          id: "native",
          name: "Native Token",
          description: selectedChain === "ethereum" ? "ETH" : "MATIC",
        },
        { id: "erc20", name: "ERC20 Tokens", description: "All ERC20 tokens" },
      ];
    } else if (selectedChain === "solana") {
      return [
        { id: "native", name: "Native Token", description: "SOL" },
        {
          id: "spl",
          name: "SPL Tokens",
          description: "Solana Program Library tokens",
        },
      ];
    }
    return [];
  };

  const handleChainSelect = (chainId) => {
    setSelectedChain(chainId);
    setSelectedType("");
    setAddress("");
    setBalanceData(null);
    setError("");
    setStep(2);
  };

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setAddress("");
    setBalanceData(null);
    setError("");
    setStep(3);
  };

  const fetchBalance = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address");
      return;
    }

    setIsLoading(true);
    setError("");
    setBalanceData(null);

    let url = "";

    try {
      

      if (selectedChain === "ethereum") {
        if (selectedType === "native") {
          url = `https://server.usfrancwallet.com/v1/wallet/ethereum/native/balance?address=${address}`;
        } else {
          url = `https://server.usfrancwallet.com/v1/wallet/ethereum/erc20/balance?address=${address}`;
        }
      } else if (selectedChain === "polygon") {
        if (selectedType === "native") {
          url = `https://server.usfrancwallet.com/v1/wallet/polygon/native/balance?address=${address}`;
        } else {
          url = `https://server.usfrancwallet.com/v1/wallet/polygon/erc20/balance?address=${address}`;
        }
      } else if (selectedChain === "solana") {
        if (selectedType === "native") {
          url = `https://server.usfrancwallet.com/v1/wallet/solona/native/balance?address=${address}`;
        } else {
          url = `https://server.usfrancwallet.com/v1/wallet/solona/spl/balance?address=${address}`;
        }
      } 

      const response = await fetch(url, {
        
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          clientId: user.clientId,
        },
      });
      

      console.log("the response is", response);

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setBalanceData(data);
    } catch (err) {
      console.log("the fetch url is", url)
      console.error("Error fetching balance:", err);
      setError(
        "Failed to fetch balance. Please check the address and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderBalanceResults = () => {
    if (!balanceData) return null;

    // Handle Native Token Balance
    if (selectedType === "native") {
      let balance = "";
      let symbol = "";

      if (selectedChain === "ethereum") {
        balance = balanceData.balance_eth || "0";
        symbol = "ETH";
      } else if (selectedChain === "polygon") {
        balance = balanceData.native_MATIC || "0";
        symbol = "MATIC";
      } else if (selectedChain === "solana") {
        balance = balanceData.native_SOL || "0";
        symbol = "SOL";
      }

      return (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-14 h-14 bg-gradient-to-r ${
                chains.find((c) => c.id === selectedChain)?.color
              } rounded-xl flex items-center justify-center shadow-lg`}
            >
              <Coins className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Native Balance</h3>
              <p className="text-slate-400 text-sm">
                {chains.find((c) => c.id === selectedChain)?.name}
              </p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
            <p className="text-slate-400 text-sm mb-2">Total Balance</p>
            <p className="text-white text-4xl font-bold">
              {balance} {symbol}
            </p>
          </div>
        </div>
      );
    }

    // Handle ERC20 Tokens
    if (selectedType === "erc20") {
      const tokens = balanceData.data || [];

      if (tokens.length === 0) {
        return (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <Coins className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              No ERC20 tokens found for this address
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-xl mb-4">
            ERC20 Tokens ({tokens.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {token.symbol || "Unknown"}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {token.name || "Unknown Token"}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${
                      chains.find((c) => c.id === selectedChain)?.color
                    } rounded-lg flex items-center justify-center`}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                  <p className="text-slate-400 text-xs mb-1">Balance</p>
                  <p className="text-white text-xl font-bold">
                    {token.balance || "0"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle Solana SPL Tokens
    if (selectedType === "spl") {
      const tokens = balanceData.spl_tokens || [];

      if (tokens.length === 0) {
        return (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <Coins className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              No SPL tokens found for this address
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-xl mb-4">
            SPL Tokens ({tokens.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {token.symbol || "Unknown"}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {token.name || "Unknown Token"}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
                  <p className="text-slate-400 text-xs mb-1">Balance</p>
                  <p className="text-white text-xl font-bold">
                    {token.balance || "0"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const resetForm = () => {
    setStep(1);
    setSelectedChain("");
    setSelectedType("");
    setAddress("");
    setBalanceData(null);
    setError("");
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Check Balance</h1>
        <p className="text-slate-400">
          View your cryptocurrency balances across different chains
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {s}
            </div>
            {s < 3 && <ChevronRight className="w-5 h-5 text-slate-600" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Chain */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Select Blockchain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleChainSelect(chain.id)}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${chain.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl text-center">
                  {chain.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Token Type */}
      {step === 2 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Select Token Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getTokenTypes().map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${
                      chains.find((c) => c.id === selectedChain)?.color
                    } rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}
                  >
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      {type.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to chain selection
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Enter Address */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Enter Address
          </h2>

          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${
                  chains.find((c) => c.id === selectedChain)?.color
                } rounded-lg flex items-center justify-center`}
              >
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">
                  {chains.find((c) => c.id === selectedChain)?.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {getTokenTypes().find((t) => t.id === selectedType)?.name}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  selectedChain === "solana"
                    ? "Enter Solana address"
                    : "Enter 0x... address"
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
              />
            </div>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={fetchBalance}
                disabled={isLoading || !address.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check Balance</span>
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Balance Results */}
          {balanceData && (
            <div className="animate-fadeIn">{renderBalanceResults()}</div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setStep(2)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to token type
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
