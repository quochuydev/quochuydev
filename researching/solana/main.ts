import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import fs from "fs";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";
import { TransactionInstruction, PublicKey } from "@solana/web3.js";

async function main() {
  // 1. Connecting to devnet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 2. Create a new wallet (like a new wallet)
  const walletPath = "wallet.json";
  const walletPath2 = "wallet-2.json";

  const context: {
    wallet: Keypair | null;
    wallet2: Keypair | null;
  } = {
    wallet: null,
    wallet2: null,
  };

  context.wallet = await getOrCreateWallet({ walletPath });
  context.wallet2 = await getOrCreateWallet({ walletPath: walletPath2 });

  // 4. Query balance
  const balance = await connection.getBalance(context.wallet.publicKey);

  console.log(
    `Balance of ${context.wallet.publicKey.toBase58()}: ${
      balance / LAMPORTS_PER_SOL
    } SOL`
  );

  // 5. Transfer SOL
  await transferSOL({
    connection,
    fromWallet: context.wallet!,
    toWallet: context.wallet2!,
  });

  // 6. Query balance
  const balance2 = await connection.getBalance(context.wallet2.publicKey);

  console.log(
    `Balance of ${context.wallet2.publicKey.toBase58()}: ${
      balance2 / LAMPORTS_PER_SOL
    } SOL`
  );
}

async function getOrCreateWallet(params: { walletPath: string }) {
  const { walletPath } = params;

  if (fs.existsSync(walletPath)) {
    const wallet = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(walletPath, "utf-8")))
    );

    console.log(
      `Wallet loaded from ${walletPath}: ${wallet.publicKey.toBase58()}`
    );

    return wallet;
  }

  const wallet = Keypair.generate();
  fs.writeFileSync(walletPath, JSON.stringify(Array.from(wallet.secretKey)));

  console.log(`New wallet ${walletPath}: ${wallet.publicKey.toBase58()}`);

  return wallet;
}

async function transferSOL(params: {
  connection: Connection;
  fromWallet: Keypair;
  toWallet: Keypair;
}) {
  const { connection, fromWallet, toWallet } = params;

  // Create transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toWallet.publicKey,
      lamports: 0.0005 * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    fromWallet,
  ]);
  console.log("Transfer successful, signature:", signature);
}

async function createFungibleToken(params: {
  connection: Connection;
  payer: Keypair;
}) {
  const { connection, payer } = params;

  // Create token mint (9 decimals like SOL)
  const mint = await createMint(
    params.connection,
    params.payer,
    params.payer.publicKey,
    null,
    9
  );
  console.log("New token address:", mint.toBase58());

  // Create token account for owner
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  // Mint 100 token
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer,
    100_000_000_000 // = 100 token if decimals=9
  );
  console.log("Minted 100 tokens!");
}

async function callProgram(params: { connection: Connection; payer: Keypair }) {
  const { connection, payer } = params;

  const programId = new PublicKey("PROGRAM_PUBKEY_HERE");

  const instruction = new TransactionInstruction({
    keys: [],
    programId,
    data: Buffer.from([0]), // data sent to program
  });

  const tx = new Transaction().add(instruction);
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log("Called program, tx:", sig);
}

main().catch((err) => {
  console.error(err);
});
