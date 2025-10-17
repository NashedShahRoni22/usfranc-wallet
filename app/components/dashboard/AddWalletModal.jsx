"use client"
import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Download,
  Key,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AddWalletModal = ({ isOpen, onClose, onCreateWallet }) => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [generatedMnemonic, setGeneratedMnemonic] = useState('');
  const [encryptedKey, setEncryptedKey] = useState('');
  const [walletName, setWalletName] = useState('');
  const [selectedChain, setSelectedChain] = useState('eth');
  const [step, setStep] = useState(1);

  const chains = [
    { id: 'eth', name: 'Ethereum', icon: '⟠', symbol: 'ETH' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', symbol: 'MATIC' },
    { id: 'solana', name: 'Solana', icon: '◎', symbol: 'SOL' }
  ];

  // Generate 12-word mnemonic (simulated - in real app use bip39)
  const generateMnemonic = () => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid'
    ];
    const mnemonic = Array.from({ length: 12 }, () => 
      words[Math.floor(Math.random() * words.length)]
    ).join(' ');
    setGeneratedMnemonic(mnemonic);
    setStep(2);
  };

  // Simulate RSA encryption with base64
  const encryptMnemonic = () => {
    const simulatedEncrypted = btoa(generatedMnemonic);
    setEncryptedKey(simulatedEncrypted);
    setStep(3);
  };

  const downloadEncryptedKey = () => {
    const element = document.createElement('a');
    const file = new Blob([encryptedKey], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `wallet-${walletName || 'encrypted'}-key.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCreateWallet = () => {
    const chainData = chains.find(c => c.id === selectedChain);
    const walletData = {
      name: walletName || `Wallet`,
      chain: chainData?.name || 'Ethereum',
      symbol: chainData?.symbol || 'ETH',
      icon: chainData?.icon || '⟠',
      mnemonic: generatedMnemonic,
      encryptedKey: encryptedKey
    };
    onCreateWallet(walletData);
    resetModal();
  };

  const resetModal = () => {
    setShowMnemonic(false);
    setGeneratedMnemonic('');
    setEncryptedKey('');
    setWalletName('');
    setSelectedChain('eth');
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600' : 'bg-slate-700'}`}>
                {step > 1 ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="text-white text-sm">1</span>}
              </div>
              <span className="text-white text-sm">Setup</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-700'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600' : 'bg-slate-700'}`}>
                {step > 2 ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="text-white text-sm">2</span>}
              </div>
              <span className="text-white text-sm">Mnemonic</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-700'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <span className="text-white text-sm">3</span>
              </div>
              <span className="text-white text-sm">Encrypt</span>
            </div>
          </div>

          {/* Step 1: Wallet Setup */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Create New Wallet</h2>
                <p className="text-slate-400">Choose your blockchain and wallet name</p>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Wallet Name</label>
                <input
                  type="text"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="My Wallet"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">Select Blockchain</label>
                <div className="grid grid-cols-3 gap-3">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
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

              <button
                onClick={generateMnemonic}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all"
              >
                <Key className="w-5 h-5" />
                <span>Generate Mnemonic</span>
              </button>
            </div>
          )}

          {/* Step 2: Mnemonic Display */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Recovery Phrase</h2>
                <p className="text-slate-400">Write down these 12 words in order. Keep them safe!</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  Never share your mnemonic phrase. Anyone with these words can access your wallet.
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-sm">12-Word Mnemonic Phrase</p>
                  <button
                    onClick={() => setShowMnemonic(!showMnemonic)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all"
                  >
                    {showMnemonic ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
                {showMnemonic ? (
                  <div className="grid grid-cols-3 gap-3">
                    {generatedMnemonic.split(' ').map((word, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-3">
                        <span className="text-slate-500 text-xs">{index + 1}.</span>
                        <span className="text-white ml-2 font-mono">{word}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">Click the eye icon to reveal</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={encryptMnemonic}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all"
                >
                  <Lock className="w-5 h-5" />
                  <span>Encrypt & Continue</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Encrypted Key */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Encrypted Key File</h2>
                <p className="text-slate-400">Your mnemonic has been encrypted using RSA 1024-bit encryption</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-200">
                  Encryption successful! Download your encrypted key file for backup.
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <p className="text-slate-400 text-sm mb-3">Encrypted Key (Base64)</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 break-all max-h-32 overflow-y-auto">
                  {encryptedKey}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadEncryptedKey}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all border border-blue-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Key File</span>
                </button>
                <button
                  onClick={handleCreateWallet}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete Setup</span>
                </button>
              </div>
            </div>
          )}

          {/* Cancel Button */}
          <button
            onClick={resetModal}
            className="w-full mt-4 px-6 py-3 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWalletModal;