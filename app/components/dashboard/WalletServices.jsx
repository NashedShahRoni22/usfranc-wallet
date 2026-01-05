"use client";


import * as bip39 from "bip39";
import { HDNodeWallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { argon2id } from 'hash-wasm';
import { openDB } from "idb";

// service to Convert Mnemonic to Seed BIP39 Global standard.
export async function mnemonicToSeed(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid BIP39 mnemonic");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new Uint8Array(seed);
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
    { ciphertext, iv, salt, walletId },
    
  );
}

