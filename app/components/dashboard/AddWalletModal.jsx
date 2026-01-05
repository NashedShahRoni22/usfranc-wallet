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

import {
  mnemonicToSeed,
  deriveEVMWallet,
  deriveSolanaWallet,
  deriveEncryptionKey,
  encryptSeed,
  storeEncryptedSeed
} from "./WalletServices";

import { openDB } from "idb";


const AddWalletModal = ({
  isOpen,
  onClose,
  onCreateWallet,
  clientId,
  token,
}) => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [generatedMnemonic, setGeneratedMnemonic] = useState("");
  const [walletPassword, setWalletPassword] = useState("Password");
  const [walletId, setwalletId] = useState("");
  const [evmAddress, setEvmAddress] = useState("");
  const [solonaAddress, setSolonaAddress] = useState("");
  const [importedMnemonic, setImportedMnemonic] = useState("");
  const [encryptedKey, setEncryptedKey] = useState("");
  const [walletName, setWalletName] = useState("");
  const [step, setStep] = useState(1);
  const [creationType, setCreationType] = useState("");
  const [isValidMnemonic, setIsValidMnemonic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fixed public key PEM (RSA 1024-bit)
  const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0cOtPjzABybjzm3fCg1aCYwnx
PmjXpbCkecAWLj/Cij1mJbFRuBuKxdB0V8I9xLp5vHCaXxPKJGvL3L3lLfJKjKcP
8OxS1x6VfxLtlBFxCp0kTYfCGOp0eqQSZwjMQJGjJiP6qPNxCJGmW4eLCvM3fBvC
R0xVGWqp7qL9TqLYMQIDAQAB
-----END PUBLIC KEY-----`;

  // Validate BIP39 mnemonic using bip39 library
  const validateBIP39 = (mnemonic) => {
    try {
      const bip39 = require("bip39");
      const isValid = bip39.validateMnemonic(mnemonic.trim());

      if (!isValid) {
        return {
          valid: false,
          error: "Invalid BIP39 mnemonic phrase. Please check your words.",
        };
      }

      return { valid: true, error: null };
    } catch (error) {
      return {
        valid: false,
        error: "Error validating mnemonic: " + error.message,
      };
    }
  };

  // Generate BIP39 compliant mnemonic
  const generateBIP39Mnemonic = () => {
    try {
      const bip39 = require("bip39");
      const mnemonic = bip39.generateMnemonic();

      console.log("The memonic is", mnemonic);

      setGeneratedMnemonic(mnemonic);
      setCreationType("new");
      setStep(2);
      setError("");
    } catch (error) {
      setError("Failed to generate mnemonic: " + error.message);
    }
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
    setGeneratedMnemonic(importedMnemonic.trim());
    setCreationType("import");
    setStep(2);
  };

  // RSA Encryption with JSEncrypt (Hybrid approach for long data)
  // RSA Encryption not required. Depricated
  const encryptWithRSA = async (mnemonic) => {
    try {
      // Try different ways to import JSEncrypt
      let JSEncryptClass;
      try {
        const JSEncryptModule = require("jsencrypt");
        JSEncryptClass =
          JSEncryptModule.JSEncrypt ||
          JSEncryptModule.default ||
          JSEncryptModule;
      } catch (e) {
        console.warn("JSEncrypt not available, using fallback");
        return btoa(mnemonic);
      }

      const encrypt = new JSEncryptClass();

      // Set the public key
      encrypt.setPublicKey(publicKeyPEM);

      // Test if the key is valid by getting the key
      const keyValid = encrypt.getPublicKey();
      if (!keyValid) {
        console.warn("Public key appears invalid, using fallback");
        return btoa(mnemonic);
      }

      // RSA 1024-bit can only encrypt ~117 bytes at a time
      // For longer data, we need to split it into chunks
      const maxLength = 100;
      const chunks = [];

      for (let i = 0; i < mnemonic.length; i += maxLength) {
        const chunk = mnemonic.substring(i, i + maxLength);
        const encryptedChunk = encrypt.encrypt(chunk);

        if (!encryptedChunk || encryptedChunk === false) {
          console.warn("RSA encryption failed, using fallback");
          // Fallback: Simple Base64 encoding (NOT SECURE - only for testing)
          return btoa(mnemonic);
        }

        chunks.push(encryptedChunk);
      }

      // Join chunks with a delimiter
      return chunks.join("|||");
    } catch (error) {
      console.error("Encryption error:", error);
      console.warn("Using fallback Base64 encoding");
      // Fallback: Simple Base64 encoding (NOT SECURE - only for testing)
      return btoa(mnemonic);
    }
  };

  // Encrypt mnemonic

  const encryptMnemonic = async () => {
  try {
    setIsLoading(true);
    setError("");

    const seed = await mnemonicToSeed(generatedMnemonic);

    const evmAddr = await deriveEVMWallet(seed);
    setEvmAddress(evmAddr);

    const solAddr = await deriveSolanaWallet(seed);
    setSolonaAddress(solAddr);

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const encryptionKey = await deriveEncryptionKey(walletPassword, salt);

    const { ciphertext, iv } = await encryptSeed(seed, encryptionKey);

    const walletId = crypto.randomUUID();
    setwalletId(walletId);

    await storeEncryptedSeed(
      {
        ciphertext,
        iv,
        salt,
        walletId,
      },
      
    );

   

    setStep(3);
  } catch (err) {
    setError(err.message || "Encryption failed");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

//   const encryptMnemonic = async () => {
//     try {
//       setIsLoading(true);
//       setError("");

//       const seed = await mnemonicToSeed(generatedMnemonic); // Converting Human Mnemo to Seed for address derivation
//       console.log("The generated Seed from Mnemonic is", seed);

//        const evmAddr = await deriveEVMWallet(seed); // Deriving EVM Compactable address
//        setEvmAddress(evmAddr);   
//        console.log("The EVM Address is", evmAddress)
      
//        const solAddr = await deriveSolanaWallet(seed); // Deriving EVM Compactable address
//        setSolonaAddress(solAddr);
//        console.log("The Solona Address is", solonaAddress)

//       const salt = crypto.getRandomValues(new Uint8Array(16)); // Generating Random Salt for Each Wallet
//       const encryptionKey = await deriveEncryptionKey(walletPassword, salt); //Generating cryptographic key from salt and Wallet Password 
//       console.log("The Password encrypted with generated salt is",encryptionKey )

//       const encryptedSeed = await encryptSeed(seed, encryptionKey); // Encrypting the Seed with Cryptographic key
//       console.log("The Seed Encrypted with Cryptographic key is", encryptedSeed)

//       const id = crypto.randomUUID(); // creatung unique Id for Wallet indexed DB reference Point POC from server)
//       setwalletId(id)
//       console.log("the wallet Id is", walletId)

//       const iv = crypto.getRandomValues(new Uint8Array(12));




       

//      await storeEncryptedSeed(
//   {
//     ciphertext: encryptedSeed,
//     iv,
//     salt,
//   },
//   walletId
// );

// const db = await dbPromise;
// const allKeys = await db.getAllKeys("keys");
// console.log(allKeys);

//       const encrypted = await encryptWithRSA(generatedMnemonic);
//       setEncryptedKey(encrypted);
//       setStep(3);
//     } catch (err) {
//       setError(err.message || "Encryption failed. Please try again.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // API call to create wallet
  const createWalletAPI = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        "https://server.usfrancwallet.com/v1/wallet/add/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            clientId: clientId,
          },
          body: JSON.stringify({
            name: walletName || "My Wallet",
            id : walletId,
            etherium : evmAddress,
            polygon : evmAddress,
            solana : solonaAddress,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create wallet");
      }

      const data = await response.json();

      // Notify parent component
      onCreateWallet({
        ...data,
        name: walletName || "My Wallet",
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
    setwalletId(""),
    setEvmAddress(""),
    setSolonaAddress(""),
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
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                  Enter your existing 12 or 24 word recovery phrase
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
                  Your mnemonic has been encrypted using RSA 1024-bit encryption
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
                  Encrypted Key (RSA 1024-bit)
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
