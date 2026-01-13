"use client";
import { dbPromise, deriveEncryptionKey } from "./WalletServices";
import hdkey from "hdkey";
import { keccak256 } from "ethers";
import nacl from "tweetnacl";
import { derivePath  } from "ed25519-hd-key";


// Deriving Seed from Indexed DB
//Decrypting the Cyper Text with salt and User Password 
export async function unlockWallet(walletId, walletPassword) {
  const db = await dbPromise;
  const record = await db.get("keys", walletId);

  if (!record) throw new Error("Wallet not found");

  const { ciphertext, iv, salt } = record;

  const encryptionKey = await deriveEncryptionKey(walletPassword, salt);

  const seed = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    encryptionKey,
    ciphertext
  );

  return new Uint8Array(seed); // ⚠️ MEMORY ONLY
}

// Derivation of Private key from Seed :- Chain Specific

export function deriveEthereumPrivateKey(seed) {
  const root = hdkey.fromMasterSeed(Buffer.from(seed));
  const node = root.derive("m/44'/60'/0'/0/0");

  if (!node.privateKey) {
    throw new Error("Failed to derive Ethereum private key");
  }

  return node.privateKey; // Buffer (32 bytes)
}



export function deriveSolanaPrivateKey(seed) {
  const derived = derivePath(
    "m/44'/501'/0'/0'",
    Buffer.from(seed).toString("hex")
  );

  const keypair = nacl.sign.keyPair.fromSeed(derived.key);

  return keypair.secretKey; // Uint8Array (64 bytes)
}
