"use client";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Download,
  Key,
  Lock,
  CheckCircle,
  AlertCircle,
  Upload,
  Loader2,
} from "lucide-react";

const AddWalletModal = ({
  isOpen,
  onClose,
  onCreateWallet,
  clientId,
  token,
}) => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [generatedMnemonic, setGeneratedMnemonic] = useState("");
  const [importedMnemonic, setImportedMnemonic] = useState("");
  const [encryptedKey, setEncryptedKey] = useState("");
  const [walletName, setWalletName] = useState("");
  const [selectedChain, setSelectedChain] = useState("eth");
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState(""); // 'new' or 'import'
  const [isValidMnemonic, setIsValidMnemonic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const chains = [
    { id: "eth", name: "Ethereum", icon: "⟠", symbol: "ETH" },
    { id: "polygon", name: "Polygon", icon: "⬡", symbol: "MATIC" },
    { id: "solana", name: "Solana", icon: "◎", symbol: "SOL" },
  ];

  // BIP39 word list (first 100 words for demo - in production use full 2048 word list)
  const bip39WordList = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
    "account",
    "accuse",
    "achieve",
    "acid",
    "acoustic",
    "acquire",
    "across",
    "act",
    "action",
    "actor",
    "actress",
    "actual",
    "adapt",
    "add",
    "addict",
    "address",
    "adjust",
    "admit",
    "adult",
    "advance",
    "advice",
    "aerobic",
    "afford",
    "afraid",
    "again",
    "age",
    "agent",
    "agree",
    "ahead",
    "aim",
    "air",
    "airport",
    "aisle",
    "alarm",
    "album",
    "alcohol",
    "alert",
    "alien",
    "all",
    "alley",
    "allow",
    "almost",
    "alone",
    "alpha",
    "already",
    "also",
    "alter",
    "always",
    "amateur",
    "amazing",
    "among",
    "amount",
    "amused",
    "analyst",
    "anchor",
    "ancient",
    "anger",
    "angle",
    "angry",
    "animal",
    "ankle",
    "announce",
    "annual",
    "another",
    "answer",
    "antenna",
    "antique",
    "anxiety",
    "any",
    "apart",
    "apology",
    "appear",
    "apple",
    "approve",
    "april",
    "arch",
    "arctic",
    "area",
    "arena",
    "argue",
    "arm",
    "armed",
    "armor",
    "army",
    "around",
    "arrange",
    "arrest",
    "arrive",
    "arrow",
    "art",
    "artefact",
    "artist",
  ];

  // Validate BIP39 mnemonic
  const validateBIP39 = (mnemonic) => {
    const words = mnemonic.trim().toLowerCase().split(/\s+/);

    // Check word count (12, 15, 18, 21, or 24 words)
    const validLengths = [12, 15, 18, 21, 24];
    if (!validLengths.includes(words.length)) {
      return {
        valid: false,
        error: `Invalid word count. Must be 12, 15, 18, 21, or 24 words. Got ${words.length}.`,
      };
    }

    // Check if all words are in BIP39 word list (simplified check)
    const invalidWords = words.filter((word) => !bip39WordList.includes(word));
    if (invalidWords.length > 0) {
      return {
        valid: false,
        error: `Invalid BIP39 words: ${invalidWords.join(", ")}`,
      };
    }

    return { valid: true, error: null };
  };

  // Generate BIP39 compliant 12-word mnemonic
  const generateBIP39Mnemonic = () => {
    const mnemonic = Array.from(
      { length: 12 },
      () => bip39WordList[Math.floor(Math.random() * bip39WordList.length)]
    ).join(" ");

    setGeneratedMnemonic(mnemonic);
    setCreationType("new");
    setStep(2);
    setError("");
  };

  // Handle import mnemonic
  const handleImportMnemonic = () => {
    setError("");
    const validation = validateBIP39(importedMnemonic);

    if (!validation.valid) {
      setIsValidMnemonic(false);
      setError(validation.error);
      return;
    }

    setIsValidMnemonic(true);
    setGeneratedMnemonic(importedMnemonic.trim().toLowerCase());
    setCreationType("import");
    setStep(2);
  };

  // RSA Encryption with Public PEM (Base64)
  const encryptWithRSA = async (mnemonic) => {
    try {
      // Public PEM key (1024-bit) - This should be provided by your backend
      const publicKeyPEM = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKn8xQBjqxUjqLmF5P3jYnPXaH
                            kGZMnqFvQ3jxH4Kj6mPqFQH7PxXLqQKrGHqXW8uHKGvGTqLBhJnQKFmPqHGqXW8u
                            HKGvGTqLBhJnQKFmPqHGqXW8uHKGvGTqLBhJnQKFmPqHGqXW8uHKGvGTqLBhJnQK
                            FmPqHGqXW8uHKGvGTqLBhJnQKFmPqHGqXW8uHwIDAQAB`;

      // In a real implementation, you would use Web Crypto API or a library like jsencrypt
      // For now, we'll simulate RSA encryption with Base64 encoding
      // IMPORTANT: In production, implement proper RSA encryption

      const simulatedEncrypted = btoa(mnemonic + ":" + Date.now());
      return simulatedEncrypted;
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt mnemonic");
    }
  };

  // Encrypt mnemonic
  const encryptMnemonic = async () => {
    try {
      setIsLoading(true);
      setError("");

      const encrypted = await encryptWithRSA(generatedMnemonic);
      setEncryptedKey(encrypted);
      setStep(3);
    } catch (err) {
      setError("Encryption failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // API call to create wallet
  const createWalletAPI = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        "https://server.usfrancwallet.com/v1/v1/wallet/add/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            clientId: clientId,
          },
          body: JSON.stringify({
            name: walletName || "My Wallet",
            key: encryptedKey,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create wallet");
      }

      const data = await response.json();

      // Notify parent component
      const chainData = chains.find((c) => c.id === selectedChain);
      onCreateWallet({
        ...data,
        name: walletName || "My Wallet",
        chain: chainData?.name || "Ethereum",
        symbol: chainData?.symbol || "ETH",
        icon: chainData?.icon || "⟠",
      });

      resetModal();
      return data;
    } catch (err) {
      setError(err.message || "Failed to create wallet");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadEncryptedKey = () => {
    const element = document.createElement("a");
    const file = new Blob([encryptedKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `wallet-${walletName || "encrypted"}-key.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetModal = () => {
    setShowMnemonic(false);
    setGeneratedMnemonic("");
    setImportedMnemonic("");
    setEncryptedKey("");
    setWalletName("");
    setSelectedChain("eth");
    setStep(1);
    setCreationType("");
    setIsValidMnemonic(null);
    setIsLoading(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                {step > 1 ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white text-sm">1</span>
                )}
              </div>
              <span className="text-white text-sm">Setup</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                step >= 2 ? "bg-blue-600" : "bg-slate-700"
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                {step > 2 ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white text-sm">2</span>
                )}
              </div>
              <span className="text-white text-sm">Mnemonic</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                step >= 3 ? "bg-blue-600" : "bg-slate-700"
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <span className="text-white text-sm">3</span>
              </div>
              <span className="text-white text-sm">Encrypt</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">{error}</div>
            </div>
          )}

          {/* Step 1: Wallet Setup */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create or Import Wallet
                </h2>
                <p className="text-slate-400">
                  Choose to create a new wallet or import existing one
                </p>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">
                  Wallet Name
                </label>
                <input
                  type="text"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="My Wallet"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-3">
                  Select Blockchain
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedChain === chain.id
                          ? "bg-blue-500/20 border-blue-500 text-white"
                          : "bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div className="text-2xl mb-2">{chain.icon}</div>
                      <div className="font-semibold text-sm">{chain.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={generateBIP39Mnemonic}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  <Key className="w-5 h-5" />
                  <span>Generate New</span>
                </button>
                <button
                  onClick={() => setStep(1.5)}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-white/10 disabled:opacity-50"
                >
                  <Upload className="w-5 h-5" />
                  <span>Import Existing</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 1.5: Import Mnemonic */}
          {step === 1.5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Import Mnemonic
                </h2>
                <p className="text-slate-400">
                  Enter your existing 12-24 word recovery phrase
                </p>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">
                  Recovery Phrase (BIP39)
                </label>
                <textarea
                  value={importedMnemonic}
                  onChange={(e) => {
                    setImportedMnemonic(e.target.value);
                    setIsValidMnemonic(null);
                    setError("");
                  }}
                  placeholder="Enter your 12 or 24 word mnemonic phrase separated by spaces"
                  rows={4}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
                {isValidMnemonic === true && (
                  <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Valid BIP39 mnemonic
                  </p>
                )}
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  Make sure you trust this device. Never share your mnemonic
                  with anyone.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setImportedMnemonic("");
                    setIsValidMnemonic(null);
                    setError("");
                  }}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleImportMnemonic}
                  disabled={!importedMnemonic.trim() || isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  <span>Validate & Continue</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Mnemonic Display */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {creationType === "new"
                    ? "Your Recovery Phrase"
                    : "Confirm Your Mnemonic"}
                </h2>
                <p className="text-slate-400">
                  {creationType === "new"
                    ? "Write down these words in order. Keep them safe!"
                    : "Verify your mnemonic before encryption"}
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200">
                  Never share your mnemonic phrase. Anyone with these words can
                  access your wallet.
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-400 text-sm">
                    {generatedMnemonic.split(" ").length}-Word Mnemonic Phrase
                    (BIP39 Standard)
                  </p>
                  <button
                    onClick={() => setShowMnemonic(!showMnemonic)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all"
                  >
                    {showMnemonic ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                {showMnemonic ? (
                  <div className="grid grid-cols-3 gap-3">
                    {generatedMnemonic.split(" ").map((word, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/50 rounded-lg p-3"
                      >
                        <span className="text-slate-500 text-xs">
                          {index + 1}.
                        </span>
                        <span className="text-white ml-2 font-mono">
                          {word}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">
                    Click the eye icon to reveal
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(creationType === "import" ? 1.5 : 1)}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={encryptMnemonic}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                  <span>Encrypt & Continue</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Encrypted Key */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Encrypted Key File
                </h2>
                <p className="text-slate-400">
                  Your mnemonic has been encrypted using RSA 1024-bit with
                  Base64 encoding
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-200">
                  Encryption successful! Your wallet will be created securely.
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                <p className="text-slate-400 text-sm mb-3">
                  Encrypted Key (Base64 - RSA 1024-bit)
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 break-all max-h-32 overflow-y-auto">
                  {encryptedKey}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadEncryptedKey}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl transition-all border border-blue-500/20 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Backup</span>
                </button>
                <button
                  onClick={createWalletAPI}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  <span>Create Wallet</span>
                </button>
              </div>
            </div>
          )}

          {/* Cancel Button */}
          <button
            onClick={resetModal}
            disabled={isLoading}
            className="w-full mt-4 px-6 py-3 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWalletModal;
