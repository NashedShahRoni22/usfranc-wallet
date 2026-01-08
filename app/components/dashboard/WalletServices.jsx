"use client";


import * as bip39 from "bip39";
import { HDNodeWallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { argon2id } from 'hash-wasm';
import { openDB } from "idb";
import * as bitcoin from "bitcoinjs-lib";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";


bitcoin.initEccLib(ecc);



// service to Convert Mnemonic to Seed BIP39 Global standard.
export async function mnemonicToSeed(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid BIP39 mnemonic");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new Uint8Array(seed);
}


//Lite Coin representaion

// Litecoin Derivation Path (BIP-44)

export const litecoinNetwork = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30, // L addresses
  scriptHash: 0x32, // M addresses
  wif: 0xb0,
};



export async function deriveLitecoinAddresses(seed) {
  // seed: Uint8Array (from mnemonicToSeed)
  const root = bip32.BIP32Factory(ecc).fromSeed(seed, litecoinNetwork);

  // --- Legacy (BIP44) ---
  const legacyNode = root.derivePath("m/44'/2'/0'/0/0");
  const legacy = bitcoin.payments.p2pkh({
    pubkey: legacyNode.publicKey,
    network: litecoinNetwork,
  }).address;

  // --- P2SH-SegWit (BIP49) ---
  const segwitP2SHNode = root.derivePath("m/49'/2'/0'/0/0");
  const segwitP2SH = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
      pubkey: segwitP2SHNode.publicKey,
      network: litecoinNetwork,
    }),
    network: litecoinNetwork,
  }).address;

  // --- Native SegWit (BIP84) ---
  const segwitNativeNode = root.derivePath("m/84'/2'/0'/0/0");
  const segwitNative = bitcoin.payments.p2wpkh({
    pubkey: segwitNativeNode.publicKey,
    network: litecoinNetwork,
  }).address;

  return {
    legacy,          // L...
    segwitP2SH,      // M...
    segwitNative,    // ltc1...
  };
}




//Service for Handling Etherium and Polygon Address Derivation Only (HD WALLETS)
export async function deriveEVMWallet(seed) {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const wallet = hdNode.derivePath("m/44'/60'/0'/0/0");

  return  wallet.address
    
}


//Service for Handling Solona Address Derivation Only (HD WALLETS)
export async function deriveSolanaWallet(seed) {
  const path = "m/44'/501'/0'/0'";
  const derived = derivePath(path, Buffer.from(seed).toString("hex"));

  const keypair = Keypair.fromSeed(derived.key);

  return  keypair.publicKey.toBase58()
    
  
}


// https://antelle.net/argon2-browser/.     Refer for Testing  Note : (Every Salt Change Requires Cross Check)
// https://www.npmjs.com/package/argon2-browser?activeTab=readme    Code Reference taken from 

export async function deriveEncryptionKey(walletPassword, salt) {
  const hash = await argon2id({
    password: walletPassword,
    salt,
    hashLength: 32,
    parallelism: 1, 
    memorySize: 64 * 1024,
    iterations: 3,
  });

  return crypto.subtle.importKey(
    'raw',
    new Uint8Array(Buffer.from(hash, 'hex')),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}



export async function encryptSeed(
  seed,
  key
) {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    seed
  );

  return {
    ciphertext: new Uint8Array(encrypted),
    iv,
  };
}

const dbPromise = openDB("wallet-db", 2, {
  upgrade(db) {
   if (!db.objectStoreNames.contains("keys")) {
      db.createObjectStore("keys");
    }
  },
});

export async function storeEncryptedSeed({ ciphertext, iv, salt }, walletId) {
  // data is expected to be an object: { ciphertext, iv, salt }
  const db = await dbPromise;
  await db.put(
    "keys",
    { ciphertext, iv, salt,  },walletId
    
  );
}

