"use client"
import { useState } from 'react';
import { 
  Mail,
  Wallet,
  Copy,
  Download,
  CheckCircle,
  AlertCircle,
  Loader,
  ArrowDownLeft,
  User,
  ChevronDown,
  QrCode
} from 'lucide-react';

export default function ReceivePage() {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [customerEmail, setCustomerEmail] = useState('user@example.com');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [customAddress, setCustomAddress] = useState('');
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenType, setTokenType] = useState('ETH');
  const [isSending, setIsSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Simulated user wallets (would come from your wallet management)
  const userWallets = [
    { 
      id: 1, 
      name: 'Main Wallet', 
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      chain: 'Ethereum',
      icon: '⟠',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      id: 2, 
      name: 'Trading Wallet', 
      address: '0x8a9c4dfe8b9b95d4cda9c3b2e73f4e5d6a7b8c9d',
      chain: 'Polygon',
      icon: '⬡',
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 3, 
      name: 'Solana Wallet', 
      address: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
      chain: 'Solana',
      icon: '◎',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const getActiveAddress = () => {
    if (useCustomAddress) return customAddress;
    return selectedWallet?.address || '';
  };

  const copyAddress = () => {
    const address = getActiveAddress();
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const downloadQR = () => {
    // In real app, generate actual QR code and download
    alert('QR Code download functionality would be implemented here');
  };

  const sendReceiveRequest = async () => {
    if (!receiverEmail || !getActiveAddress()) return;

    setIsSending(true);

    // Simulate API call to send emails
    setTimeout(() => {
      setRequestSent(true);
      setIsSending(false);
    }, 2000);
  };

  const resetForm = () => {
    setReceiverEmail('');
    setMessage('');
    setAmount('');
    setRequestSent(false);
    setSelectedWallet(null);
    setCustomAddress('');
    setUseCustomAddress(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Receive Tokens</h1>
        <p className="text-slate-400">Request tokens by sending your wallet address via email</p>
      </div>

      {!requestSent ? (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Request Form */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Send Request
              </h2>

              <div className="space-y-5">
                {/* Receiver Email */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2">
                    Receiver Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={receiverEmail}
                      onChange={(e) => setReceiverEmail(e.target.value)}
                      placeholder="receiver@example.com"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <p className="text-slate-500 text-xs mt-1">Email of the person who will send you tokens</p>
                </div>

                {/* Customer Email (Pre-filled) */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Your Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={customerEmail}
                      readOnly
                      className="w-full bg-slate-800/30 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Token Type & Amount */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Token Type</label>
                    <select
                      value={tokenType}
                      onChange={(e) => setTokenType(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                    >
                      <option value="ETH">ETH</option>
                      <option value="MATIC">MATIC</option>
                      <option value="SOL">SOL</option>
                      <option value="BNB">BNB</option>
                      <option value="USDT">USDT</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Amount (Optional)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a note for the receiver..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Wallet Address Selection */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Receiving Address
              </h2>

              <div className="space-y-5">
                {/* Toggle Custom Address */}
                <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl border border-white/5">
                  <input
                    type="checkbox"
                    id="useCustom"
                    checked={useCustomAddress}
                    onChange={(e) => {
                      setUseCustomAddress(e.target.checked);
                      if (e.target.checked) setSelectedWallet(null);
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <label htmlFor="useCustom" className="text-slate-300 text-sm cursor-pointer">
                    Use custom address instead of saved wallets
                  </label>
                </div>

                {/* Saved Wallets Dropdown */}
                {!useCustomAddress && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">
                      Select Wallet <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                        className="w-full flex items-center justify-between bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-white/20 transition-all"
                      >
                        {selectedWallet ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{selectedWallet.icon}</span>
                            <div className="text-left">
                              <p className="font-semibold">{selectedWallet.name}</p>
                              <p className="text-xs text-slate-400">{selectedWallet.chain}</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400">Choose a wallet</span>
                        )}
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showWalletDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showWalletDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-xl border border-white/10 shadow-2xl z-10 max-h-60 overflow-y-auto">
                          {userWallets.map((wallet) => (
                            <button
                              key={wallet.id}
                              onClick={() => {
                                setSelectedWallet(wallet);
                                setShowWalletDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 p-4 hover:bg-slate-700/50 transition-all first:rounded-t-xl last:rounded-b-xl"
                            >
                              <div className={`w-10 h-10 bg-gradient-to-r ${wallet.color} rounded-lg flex items-center justify-center text-xl`}>
                                {wallet.icon}
                              </div>
                              <div className="text-left flex-1">
                                <p className="text-white font-semibold">{wallet.name}</p>
                                <p className="text-xs text-slate-400">{wallet.chain}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Address Input */}
                {useCustomAddress && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">
                      Custom Wallet Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      placeholder="0x... or base58 address"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-mono text-sm"
                    />
                  </div>
                )}

                {/* Address Display */}
                {getActiveAddress() && (
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-white/10">
                    <p className="text-slate-400 text-xs mb-2">Address to Receive</p>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <p className="text-white text-sm font-mono truncate flex-1">
                        {getActiveAddress()}
                      </p>
                      <button
                        onClick={copyAddress}
                        className="p-2 hover:bg-white/5 rounded-lg transition-all"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    
                    {/* QR Code Placeholder */}
                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="w-32 h-32 mx-auto text-slate-900 mb-2" />
                        <button
                          onClick={downloadQR}
                          className="text-slate-600 text-xs hover:text-slate-900 transition-colors"
                        >
                          Download QR Code
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email Confirmation Info */}
          <div className="bg-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 mb-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Email Confirmations</h3>
                <p className="text-blue-200 text-sm mb-3">
                  When you send this request, both parties will receive email confirmations:
                </p>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span><strong>Receiver</strong> ({receiverEmail || 'receiver@example.com'}) will get your wallet address and request details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span><strong>You</strong> ({customerEmail}) will get a confirmation that the request was sent</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={sendReceiveRequest}
            disabled={!receiverEmail || !getActiveAddress() || isSending}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {isSending ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Sending Request...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Send Receive Request</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Success Screen */
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">Request Sent Successfully!</h2>
            <p className="text-emerald-200 text-lg mb-8">
              Your receive request has been sent to both parties via email
            </p>

            <div className="bg-slate-900/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-white font-semibold mb-4">Request Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-slate-400">Receiver Email</span>
                  <span className="text-white font-medium">{receiverEmail}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-slate-400">Your Email</span>
                  <span className="text-white font-medium">{customerEmail}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-slate-400">Wallet Address</span>
                  <span className="text-white font-mono text-sm truncate max-w-xs">{getActiveAddress()}</span>
                </div>
                {amount && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-slate-400">Requested Amount</span>
                    <span className="text-white font-medium">{amount} {tokenType}</span>
                  </div>
                )}
                {message && (
                  <div className="pt-3">
                    <span className="text-slate-400 block mb-2">Message</span>
                    <p className="text-white text-sm bg-slate-800/30 rounded-lg p-3">{message}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-semibold"
              >
                Send Another Request
              </button>
              <a
                href="/dashboard"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all font-semibold text-center"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}