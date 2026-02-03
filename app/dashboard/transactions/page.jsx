"use client";
import { useState } from "react";
import {
  Search,
  Loader2,
  AlertCircle,
  Coins,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Clock,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { useApp } from "@/app/context/AppContext";

export default function TransactionsPage() {
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [address, setAddress] = useState("");
  const [txData, setTxData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ─── Chain definitions (same palette as BalancePage) ────────────────────────
  const chains = [
    { id: "ethereum", name: "Ethereum", color: "from-blue-500 to-cyan-500" },
    { id: "polygon", name: "Polygon", color: "from-purple-500 to-pink-500" },
    { id: "solana", name: "Solana", color: "from-green-500 to-emerald-500" },
  ];

  // ─── Transaction-type options per chain ─────────────────────────────────────
  const getTransactionTypes = () => {
    if (selectedChain === "ethereum") {
      return [
        { id: "normal", name: "Normal Transactions", description: "Standard ETH transfers" },
        { id: "erc20", name: "ERC20 Transactions", description: "Token transfers" },
        { id: "internal", name: "Internal Transactions", description: "Contract-to-contract calls" },
      ];
    }
    if (selectedChain === "polygon") {
      return [
        { id: "normal", name: "Normal Transactions", description: "Standard MATIC transfers" },
        { id: "erc20", name: "ERC20 Transactions", description: "Token transfers" },
      ];
    }
    if (selectedChain === "solana") {
      return [
        { id: "all", name: "All Transactions", description: "Complete Solana tx history" },
      ];
    }
    return [];
  };

  // ─── Navigation helpers ─────────────────────────────────────────────────────
  const handleChainSelect = (chainId) => {
    setSelectedChain(chainId);
    setSelectedType("");
    setAddress("");
    setTxData(null);
    setError("");
    setStep(2);
  };

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setAddress("");
    setTxData(null);
    setError("");
    setStep(3);
  };

  // ─── URL builder ────────────────────────────────────────────────────────────
  const buildUrl = () => {
    const base = "https://server.usfrancallet.com/v1";
    const addr = address.trim();

    if (selectedChain === "ethereum") {
      if (selectedType === "normal")   return `${base}/ethereum/transaction/normal?address=${addr}`;
      if (selectedType === "erc20")    return `${base}/ethereum/transaction/erc20?address=${addr}`;
      if (selectedType === "internal") return `${base}/ethereum/transaction/internal?address=${addr}`;
    }
    if (selectedChain === "polygon") {
      if (selectedType === "normal") return `${base}/polygon/transaction/normal?address=${addr}`;
      if (selectedType === "erc20")  return `${base}/polygon/transaction/erc20?address=${addr}`;
    }
    if (selectedChain === "solana") {
      if (selectedType === "all") return `${base}/solona/transaction/all?address=${addr}`;
    }
    return "";
  };

  // ─── Fetch logic ────────────────────────────────────────────────────────────
  const fetchTransactions = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address");
      return;
    }

    const url = buildUrl();
    if (!url) {
      setError("Could not build request URL. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");
    setTxData(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          clientId: user.clientId,
        },
      });

      console.log("Transaction response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTxData(data);
    } catch (err) {
      console.log("Fetch URL:", url);
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch transactions. Please check the address and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Normalise API response into a flat array ──────────────────────────────
  // Each API may nest the list differently; this extracts it.
  const normaliseTransactions = () => {
    if (!txData) return [];

    // Solana → txData.transactions  OR  txData itself if already an array
    if (selectedChain === "solana") {
      return txData.transactions || (Array.isArray(txData) ? txData : []);
    }

    // Ethereum / Polygon → txData.result  OR  txData.data  OR  array at root
    return txData.result || txData.data || (Array.isArray(txData) ? txData : []);
  };

  // ─── Helpers for rendering a single row ─────────────────────────────────────
  const truncateAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "—";

  const formatValue = (tx) => {
    // ERC20 / SPL tokens may have a `value` as a string (can be very large integer)
    const raw = tx.value || tx.amount || "0";
    // If it's a decimal already (Solana sometimes returns decimals), show as-is
    if (String(raw).includes(".")) return String(raw);
    // For very large wei-style numbers, convert (divide by 1e18 for ETH/MATIC)
    try {
      const num = Number(raw);
      if (num > 1e15) return (num / 1e18).toFixed(6);
      return String(num);
    } catch {
      return String(raw);
    }
  };

  const getSymbol = (tx) => {
    if (selectedType === "erc20" || selectedType === "spl") return tx.tokenSymbol || tx.symbol || "TOKEN";
    if (selectedChain === "ethereum") return "ETH";
    if (selectedChain === "polygon")  return "MATIC";
    if (selectedChain === "solana")   return "SOL";
    return "";
  };

  const isSent = (tx) => {
    const from = (tx.from || "").toLowerCase();
    return from === address.trim().toLowerCase();
  };

  const formatTimestamp = (ts) => {
    if (!ts) return null;
    // Unix seconds (Ethereum/Polygon give seconds; some APIs give millis)
    const ms = ts > 1e12 ? ts : ts * 1000;
    return new Date(ms).toLocaleString();
  };

  // ─── Block-explorer link helper ─────────────────────────────────────────────
  const getExplorerLink = (tx) => {
    const hash = tx.hash || tx.txHash || tx.signature;
    if (!hash) return null;
    if (selectedChain === "ethereum") return `https://etherscan.io/tx/${hash}`;
    if (selectedChain === "polygon")  return `https://polygonscan.com/tx/${hash}`;
    if (selectedChain === "solana")   return `https://solscan.io/tx/${hash}`;
    return null;
  };

  // ─── Transaction row icon ──────────────────────────────────────────────────
  const TxIcon = ({ tx }) => {
    if (selectedType === "internal") {
      return (
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-white/10">
          <ArrowLeftRight className="w-5 h-5 text-amber-400" />
        </div>
      );
    }
    const sent = isSent(tx);
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${sent ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`}>
        {sent
          ? <ArrowUpRight className="w-5 h-5 text-red-400" />
          : <ArrowDownLeft className="w-5 h-5 text-green-400" />
        }
      </div>
    );
  };

  // ─── Render results ─────────────────────────────────────────────────────────
  const renderResults = () => {
    if (!txData) return null;

    const transactions = normaliseTransactions();

    if (transactions.length === 0) {
      return (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-10 border border-white/10 text-center">
          <Coins className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No transactions found for this address</p>
        </div>
      );
    }

    const chainColor = chains.find((c) => c.id === selectedChain)?.color;

    return (
      <div className="space-y-3">
        {/* Summary bar */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-xl">
            Transactions
            <span className="text-slate-500 font-normal text-sm ml-2">({transactions.length})</span>
          </h3>
          <div className={`px-3 py-1 bg-gradient-to-r ${chainColor} rounded-full`}>
            <span className="text-white text-xs font-semibold uppercase tracking-wide">
              {chains.find((c) => c.id === selectedChain)?.name} · {selectedType}
            </span>
          </div>
        </div>

        {/* Transaction list */}
        <div className="space-y-2">
          {transactions.map((tx, index) => {
            const sent = isSent(tx);
            const explorerLink = getExplorerLink(tx);
            const timestamp = formatTimestamp(tx.timeStamp || tx.blockTime || tx.timestamp);
            const hash = tx.hash || tx.txHash || tx.signature;

            return (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <TxIcon tx={tx} />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${sent ? "text-red-400" : "text-green-400"}`}>
                        {selectedType === "internal" ? "Internal" : sent ? "Sent" : "Received"}
                      </span>
                      {tx.tokenSymbol || tx.symbol ? (
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-white/5">
                          {tx.tokenSymbol || tx.symbol}
                        </span>
                      ) : null}
                      {tx.status !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${Number(tx.status) === 1 || tx.status === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                          {Number(tx.status) === 1 || tx.status === "success" ? "Success" : "Failed"}
                        </span>
                      )}
                    </div>

                    {/* From → To */}
                    <p className="text-slate-500 text-xs mt-1 font-mono">
                      {truncateAddress(tx.from || tx.sender)}
                      <span className="text-slate-600 mx-1.5">→</span>
                      {truncateAddress(tx.to || tx.recipient)}
                    </p>
                  </div>

                  {/* Value + meta */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-base ${sent ? "text-red-400" : "text-green-400"}`}>
                      {sent ? "−" : "+"}{formatValue(tx)} <span className="text-sm font-normal text-slate-400">{getSymbol(tx)}</span>
                    </p>
                    {timestamp && (
                      <p className="text-slate-600 text-xs flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {timestamp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hash row */}
                {hash && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <p className="text-slate-600 text-xs font-mono truncate mr-3">
                      {truncateAddress(hash)}
                    </p>
                    {explorerLink && (
                      <a
                        href={explorerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-xs flex-shrink-0"
                      >
                        Explorer <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Reset ──────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setStep(1);
    setSelectedChain("");
    setSelectedType("");
    setAddress("");
    setTxData(null);
    setError("");
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
        <p className="text-slate-400">
          View transaction history across different blockchains
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

      {/* ── Step 1: Select Chain ─────────────────────────────────────────── */}
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

      {/* ── Step 2: Select Transaction Type ──────────────────────────────── */}
      {step === 2 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Select Transaction Type
          </h2>
          <div className={`grid gap-6 ${getTransactionTypes().length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-" + getTransactionTypes().length}`}>
            {getTransactionTypes().map((type) => (
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

      {/* ── Step 3: Enter Address + Results ──────────────────────────────── */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Enter Address
          </h2>

          {/* Input card */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-6">
            {/* Selected chain + type badge */}
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
                  {getTransactionTypes().find((t) => t.id === selectedType)?.name}
                </p>
              </div>
            </div>

            {/* Address input */}
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchTransactions()}
                placeholder={
                  selectedChain === "solana"
                    ? "Enter Solana address"
                    : "Enter 0x… address"
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
              />
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={fetchTransactions}
                disabled={isLoading || !address.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Fetching…</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Get Transactions</span>
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

          {/* Results */}
          {txData && (
            <div className="animate-fadeIn">{renderResults()}</div>
          )}

          {/* Back link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setStep(2)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to transaction type
            </button>
          </div>
        </div>
      )}
    </div>
  );
}