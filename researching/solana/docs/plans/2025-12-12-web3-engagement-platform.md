# Web3 Engagement Platform Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a white-label Web3 engagement platform with wallet login, balance gating, daily check-in, and wheel game.

**Architecture:** Next.js frontend with wallet adapters (Solana + EVM), Node.js API routes for backend logic, PostgreSQL database for persistence. Server-side prize determination to prevent cheating.

**Tech Stack:** Next.js 14, TypeScript, @solana/wallet-adapter, wagmi, PostgreSQL, Prisma ORM, TailwindCSS

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `web3-engagement/package.json`
- Create: `web3-engagement/tsconfig.json`
- Create: `web3-engagement/tailwind.config.js`

**Step 1: Create Next.js project**

```bash
cd /Users/silentium/Projects/github/quochuydev/researching/solana
npx create-next-app@latest web3-engagement --typescript --tailwind --eslint --app --src-dir --use-pnpm
```

Expected: Project scaffolded with src/app directory structure

**Step 2: Verify project runs**

```bash
cd web3-engagement && pnpm dev
```

Expected: Dev server starts at http://localhost:3000

**Step 3: Commit**

```bash
git add web3-engagement
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 2: Set Up Database with Prisma

**Files:**
- Create: `web3-engagement/prisma/schema.prisma`
- Modify: `web3-engagement/package.json`

**Step 1: Install Prisma**

```bash
cd web3-engagement
pnpm add prisma @prisma/client
pnpm add -D prisma
npx prisma init
```

**Step 2: Define database schema**

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  walletAddress String    @unique
  createdAt     DateTime  @default(now())
  checkIns      CheckIn[]
  spins         Spin[]
}

model CheckIn {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  checkInDate DateTime @default(now())
  streakCount Int      @default(1)
  createdAt   DateTime @default(now())

  @@index([userId, checkInDate])
}

model Spin {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  spinDate  DateTime @default(now())
  prizeId   String?
  prize     Prize?   @relation(fields: [prizeId], references: [id])
  createdAt DateTime @default(now())

  @@index([userId, spinDate])
}

model Prize {
  id          String  @id @default(cuid())
  name        String
  type        String  // points, token, nft, physical, empty
  probability Float   // 0.0 to 1.0
  quantity    Int?    // null = unlimited
  value       String? // JSON or string value
  spins       Spin[]
}

model Config {
  id               String @id @default(cuid())
  minBalanceSOL    Float  @default(0.1)
  minBalanceETH    Float  @default(0.01)
  checkInResetDays Int    @default(1)
}
```

**Step 3: Create .env file**

Create `web3-engagement/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/web3engagement?schema=public"
```

**Step 4: Generate Prisma client**

```bash
npx prisma generate
```

Expected: Prisma Client generated

**Step 5: Commit**

```bash
git add prisma .env.example
git commit -m "feat: add Prisma schema for users, check-ins, spins, prizes"
```

---

## Phase 2: Wallet Integration

### Task 3: Install Wallet Dependencies

**Files:**
- Modify: `web3-engagement/package.json`

**Step 1: Install Solana wallet adapter**

```bash
cd web3-engagement
pnpm add @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

**Step 2: Install EVM wallet libraries**

```bash
pnpm add wagmi viem @tanstack/react-query
```

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add Solana and EVM wallet dependencies"
```

---

### Task 4: Create Solana Wallet Provider

**Files:**
- Create: `web3-engagement/src/providers/SolanaWalletProvider.tsx`

**Step 1: Create provider component**

Create `src/providers/SolanaWalletProvider.tsx`:

```tsx
'use client';

import { FC, ReactNode, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: ReactNode;
}

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

**Step 2: Commit**

```bash
git add src/providers
git commit -m "feat: add Solana wallet provider with Phantom and Solflare"
```

---

### Task 5: Create EVM Wallet Provider

**Files:**
- Create: `web3-engagement/src/providers/EVMWalletProvider.tsx`
- Create: `web3-engagement/src/config/wagmi.ts`

**Step 1: Create wagmi config**

Create `src/config/wagmi.ts`:

```tsx
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc, polygon],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
});
```

**Step 2: Create EVM provider component**

Create `src/providers/EVMWalletProvider.tsx`:

```tsx
'use client';

import { FC, ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/config/wagmi';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export const EVMWalletProvider: FC<Props> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```

**Step 3: Commit**

```bash
git add src/config src/providers
git commit -m "feat: add EVM wallet provider with wagmi"
```

---

### Task 6: Create Combined Providers

**Files:**
- Create: `web3-engagement/src/providers/index.tsx`
- Modify: `web3-engagement/src/app/layout.tsx`

**Step 1: Create combined providers**

Create `src/providers/index.tsx`:

```tsx
'use client';

import { FC, ReactNode } from 'react';
import { SolanaWalletProvider } from './SolanaWalletProvider';
import { EVMWalletProvider } from './EVMWalletProvider';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <EVMWalletProvider>
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </EVMWalletProvider>
  );
};
```

**Step 2: Update app layout**

Modify `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 Engagement Platform',
  description: 'Daily check-in and rewards for Web3 communities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add src/providers src/app/layout.tsx
git commit -m "feat: combine wallet providers in app layout"
```

---

### Task 7: Create Wallet Connect Component

**Files:**
- Create: `web3-engagement/src/components/WalletConnect.tsx`

**Step 1: Create wallet connect component**

Create `src/components/WalletConnect.tsx`:

```tsx
'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

type WalletType = 'solana' | 'evm' | null;

export const WalletConnect: FC = () => {
  const [selectedType, setSelectedType] = useState<WalletType>(null);

  // Solana
  const { publicKey: solanaPublicKey, disconnect: solanaDisconnect } = useWallet();

  // EVM
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { connectors, connect: evmConnect } = useConnect();
  const { disconnect: evmDisconnect } = useDisconnect();

  const isConnected = solanaPublicKey || evmConnected;

  const handleDisconnect = () => {
    if (solanaPublicKey) solanaDisconnect();
    if (evmConnected) evmDisconnect();
    setSelectedType(null);
  };

  if (isConnected) {
    const address = solanaPublicKey?.toBase58() || evmAddress;
    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          Connected: {shortAddress}
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (!selectedType) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Select Wallet Type</h2>
        <button
          onClick={() => setSelectedType('solana')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Solana (Phantom, Solflare)
        </button>
        <button
          onClick={() => setSelectedType('evm')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          EVM (MetaMask, WalletConnect)
        </button>
      </div>
    );
  }

  if (selectedType === 'solana') {
    return (
      <div className="flex flex-col items-center gap-4">
        <WalletMultiButton />
        <button
          onClick={() => setSelectedType(null)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Connect EVM Wallet</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => evmConnect({ connector })}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {connector.name}
        </button>
      ))}
      <button
        onClick={() => setSelectedType(null)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back
      </button>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add src/components
git commit -m "feat: add wallet connect component with Solana and EVM support"
```

---

## Phase 3: Balance Gate

### Task 8: Create Balance Check API

**Files:**
- Create: `web3-engagement/src/app/api/balance/route.ts`
- Create: `web3-engagement/src/lib/balance.ts`

**Step 1: Create balance utility**

Create `src/lib/balance.ts`:

```tsx
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createPublicClient, http, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

const solanaConnection = new Connection('https://api.devnet.solana.com');

const evmClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export async function getSolanaBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await solanaConnection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
    return 0;
  }
}

export async function getEVMBalance(walletAddress: string): Promise<number> {
  try {
    const balance = await evmClient.getBalance({
      address: walletAddress as `0x${string}`,
    });
    return parseFloat(formatEther(balance));
  } catch (error) {
    console.error('Error fetching EVM balance:', error);
    return 0;
  }
}

export async function checkMinBalance(
  walletAddress: string,
  chain: 'solana' | 'evm',
  minBalance: number
): Promise<{ hasMinBalance: boolean; currentBalance: number }> {
  const balance =
    chain === 'solana'
      ? await getSolanaBalance(walletAddress)
      : await getEVMBalance(walletAddress);

  return {
    hasMinBalance: balance >= minBalance,
    currentBalance: balance,
  };
}
```

**Step 2: Create API route**

Create `src/app/api/balance/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { checkMinBalance } from '@/lib/balance';

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, chain } = await req.json();

    if (!walletAddress || !chain) {
      return NextResponse.json(
        { error: 'Missing walletAddress or chain' },
        { status: 400 }
      );
    }

    // Default minimum balances (should come from Config table in production)
    const minBalance = chain === 'solana' ? 0.1 : 0.01;

    const result = await checkMinBalance(walletAddress, chain, minBalance);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Balance check error:', error);
    return NextResponse.json(
      { error: 'Failed to check balance' },
      { status: 500 }
    );
  }
}
```

**Step 3: Commit**

```bash
git add src/lib src/app/api
git commit -m "feat: add balance check API for Solana and EVM"
```

---

### Task 9: Create Balance Gate Hook

**Files:**
- Create: `web3-engagement/src/hooks/useBalanceGate.ts`

**Step 1: Create hook**

Create `src/hooks/useBalanceGate.ts`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount } from 'wagmi';

interface BalanceGateResult {
  isLoading: boolean;
  hasMinBalance: boolean;
  currentBalance: number;
  walletAddress: string | null;
  chain: 'solana' | 'evm' | null;
}

export function useBalanceGate(): BalanceGateResult {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMinBalance, setHasMinBalance] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);

  const { publicKey: solanaPublicKey } = useWallet();
  const { address: evmAddress, isConnected: evmConnected } = useAccount();

  const walletAddress = solanaPublicKey?.toBase58() || evmAddress || null;
  const chain: 'solana' | 'evm' | null = solanaPublicKey
    ? 'solana'
    : evmConnected
    ? 'evm'
    : null;

  useEffect(() => {
    if (!walletAddress || !chain) {
      setHasMinBalance(false);
      setCurrentBalance(0);
      return;
    }

    const checkBalance = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress, chain }),
        });
        const data = await response.json();
        setHasMinBalance(data.hasMinBalance);
        setCurrentBalance(data.currentBalance);
      } catch (error) {
        console.error('Balance check failed:', error);
        setHasMinBalance(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBalance();
  }, [walletAddress, chain]);

  return { isLoading, hasMinBalance, currentBalance, walletAddress, chain };
}
```

**Step 2: Commit**

```bash
git add src/hooks
git commit -m "feat: add useBalanceGate hook for balance verification"
```

---

## Phase 4: Check-in System

### Task 10: Create Check-in API

**Files:**
- Create: `web3-engagement/src/app/api/checkin/route.ts`
- Create: `web3-engagement/src/lib/prisma.ts`

**Step 1: Create Prisma client singleton**

Create `src/lib/prisma.ts`:

```tsx
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Step 2: Create check-in API**

Create `src/app/api/checkin/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Missing walletAddress' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress },
      });
    }

    // Check for existing check-in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingCheckIn = await prisma.checkIn.findFirst({
      where: {
        userId: user.id,
        checkInDate: { gte: today },
      },
    });

    if (existingCheckIn) {
      return NextResponse.json({
        success: false,
        message: 'Already checked in today',
        streakCount: existingCheckIn.streakCount,
        canSpin: false,
      });
    }

    // Get last check-in to calculate streak
    const lastCheckIn = await prisma.checkIn.findFirst({
      where: { userId: user.id },
      orderBy: { checkInDate: 'desc' },
    });

    let streakCount = 1;

    if (lastCheckIn) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const lastCheckInDate = new Date(lastCheckIn.checkInDate);
      lastCheckInDate.setHours(0, 0, 0, 0);

      if (lastCheckInDate.getTime() === yesterday.getTime()) {
        // Consecutive day - increment streak
        streakCount = lastCheckIn.streakCount + 1;
      }
      // Otherwise streak resets to 1
    }

    // Create new check-in
    const checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        streakCount,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Check-in successful!',
      streakCount: checkIn.streakCount,
      canSpin: true,
    });
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Check-in failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Missing walletAddress' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      return NextResponse.json({
        checkedInToday: false,
        streakCount: 0,
        canSpin: false,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCheckIn = await prisma.checkIn.findFirst({
      where: {
        userId: user.id,
        checkInDate: { gte: today },
      },
    });

    // Check if user has spun today
    const todaySpin = await prisma.spin.findFirst({
      where: {
        userId: user.id,
        spinDate: { gte: today },
      },
    });

    return NextResponse.json({
      checkedInToday: !!todayCheckIn,
      streakCount: todayCheckIn?.streakCount || 0,
      canSpin: !!todayCheckIn && !todaySpin,
    });
  } catch (error) {
    console.error('Get check-in status error:', error);
    return NextResponse.json(
      { error: 'Failed to get check-in status' },
      { status: 500 }
    );
  }
}
```

**Step 3: Commit**

```bash
git add src/lib/prisma.ts src/app/api/checkin
git commit -m "feat: add check-in API with streak tracking"
```

---

### Task 11: Create Check-in Component

**Files:**
- Create: `web3-engagement/src/components/CheckIn.tsx`

**Step 1: Create check-in component**

Create `src/components/CheckIn.tsx`:

```tsx
'use client';

import { FC, useState, useEffect } from 'react';
import { useBalanceGate } from '@/hooks/useBalanceGate';

interface CheckInStatus {
  checkedInToday: boolean;
  streakCount: number;
  canSpin: boolean;
}

interface Props {
  onCheckInSuccess: () => void;
}

export const CheckIn: FC<Props> = ({ onCheckInSuccess }) => {
  const { walletAddress, hasMinBalance, isLoading: balanceLoading } = useBalanceGate();
  const [status, setStatus] = useState<CheckInStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchStatus = async () => {
      const response = await fetch(`/api/checkin?walletAddress=${walletAddress}`);
      const data = await response.json();
      setStatus(data);
    };

    fetchStatus();
  }, [walletAddress]);

  const handleCheckIn = async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus({
          checkedInToday: true,
          streakCount: data.streakCount,
          canSpin: data.canSpin,
        });
        onCheckInSuccess();
      }
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Connect your wallet to check in</p>
      </div>
    );
  }

  if (balanceLoading) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Checking balance...</p>
      </div>
    );
  }

  if (!hasMinBalance) {
    return (
      <div className="p-6 bg-red-100 rounded-lg text-center">
        <p className="text-red-600">
          Insufficient balance. You need minimum balance to participate.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Daily Check-in</h2>

      {status?.streakCount ? (
        <div className="mb-4">
          <span className="text-4xl">🔥</span>
          <p className="text-xl font-semibold">{status.streakCount} day streak!</p>
        </div>
      ) : null}

      {status?.checkedInToday ? (
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-semibold">
            ✓ You've checked in today!
          </p>
          {status.canSpin && (
            <p className="text-green-600 mt-2">Spin the wheel to claim your reward!</p>
          )}
        </div>
      ) : (
        <button
          onClick={handleCheckIn}
          disabled={isLoading}
          className="px-8 py-4 bg-purple-600 text-white text-xl font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Checking in...' : 'Check In Now'}
        </button>
      )}
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/CheckIn.tsx
git commit -m "feat: add check-in component with streak display"
```

---

## Phase 5: Wheel Game

### Task 12: Create Spin API

**Files:**
- Create: `web3-engagement/src/app/api/spin/route.ts`

**Step 1: Create spin API**

Create `src/app/api/spin/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function selectPrize(prizes: { id: string; name: string; probability: number }[]) {
  const random = Math.random();
  let cumulative = 0;

  for (const prize of prizes) {
    cumulative += prize.probability;
    if (random <= cumulative) {
      return prize;
    }
  }

  // Fallback to last prize
  return prizes[prizes.length - 1];
}

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Missing walletAddress' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Check in first.' },
        { status: 400 }
      );
    }

    // Check if user checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCheckIn = await prisma.checkIn.findFirst({
      where: {
        userId: user.id,
        checkInDate: { gte: today },
      },
    });

    if (!todayCheckIn) {
      return NextResponse.json(
        { error: 'Must check in before spinning' },
        { status: 400 }
      );
    }

    // Check if already spun today
    const todaySpin = await prisma.spin.findFirst({
      where: {
        userId: user.id,
        spinDate: { gte: today },
      },
    });

    if (todaySpin) {
      return NextResponse.json(
        { error: 'Already spun today. Come back tomorrow!' },
        { status: 400 }
      );
    }

    // Get available prizes
    const prizes = await prisma.prize.findMany({
      where: {
        OR: [{ quantity: null }, { quantity: { gt: 0 } }],
      },
    });

    if (prizes.length === 0) {
      return NextResponse.json(
        { error: 'No prizes available' },
        { status: 400 }
      );
    }

    // Select prize
    const selectedPrize = selectPrize(prizes);

    // Create spin record
    const spin = await prisma.spin.create({
      data: {
        userId: user.id,
        prizeId: selectedPrize.id,
      },
      include: { prize: true },
    });

    // Decrement prize quantity if limited
    if (selectedPrize.quantity !== null) {
      await prisma.prize.update({
        where: { id: selectedPrize.id },
        data: { quantity: { decrement: 1 } },
      });
    }

    return NextResponse.json({
      success: true,
      prize: {
        name: spin.prize?.name,
        type: spin.prize?.type,
        value: spin.prize?.value,
      },
    });
  } catch (error) {
    console.error('Spin error:', error);
    return NextResponse.json(
      { error: 'Spin failed' },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/spin
git commit -m "feat: add spin API with weighted prize selection"
```

---

### Task 13: Create Wheel Component

**Files:**
- Create: `web3-engagement/src/components/Wheel.tsx`

**Step 1: Create wheel component**

Create `src/components/Wheel.tsx`:

```tsx
'use client';

import { FC, useState } from 'react';

interface Prize {
  name: string;
  type: string;
  value?: string;
}

interface Props {
  walletAddress: string | null;
  canSpin: boolean;
  onSpinComplete: (prize: Prize) => void;
}

const WHEEL_SEGMENTS = [
  { label: '10 Points', color: '#FF6B6B' },
  { label: '25 Points', color: '#4ECDC4' },
  { label: '50 Points', color: '#45B7D1' },
  { label: 'Try Again', color: '#96CEB4' },
  { label: '100 Points', color: '#FFEAA7' },
  { label: 'NFT', color: '#DDA0DD' },
  { label: '5 Points', color: '#98D8C8' },
  { label: 'Jackpot!', color: '#F7DC6F' },
];

export const Wheel: FC<Props> = ({ walletAddress, canSpin, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<Prize | null>(null);

  const handleSpin = async () => {
    if (!walletAddress || !canSpin || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    try {
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();

      // Spin animation (random rotations + extra spins)
      const newRotation = rotation + 1800 + Math.random() * 360;
      setRotation(newRotation);

      // Wait for animation to complete
      setTimeout(() => {
        setIsSpinning(false);
        if (data.success && data.prize) {
          setResult(data.prize);
          onSpinComplete(data.prize);
        }
      }, 4000);
    } catch (error) {
      console.error('Spin failed:', error);
      setIsSpinning(false);
    }
  };

  const segmentAngle = 360 / WHEEL_SEGMENTS.length;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-red-600" />
        </div>

        {/* Wheel */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {WHEEL_SEGMENTS.map((segment, index) => {
            const startAngle = index * segmentAngle - 90;
            const endAngle = startAngle + segmentAngle;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 150 + 140 * Math.cos(startRad);
            const y1 = 150 + 140 * Math.sin(startRad);
            const x2 = 150 + 140 * Math.cos(endRad);
            const y2 = 150 + 140 * Math.sin(endRad);

            const largeArc = segmentAngle > 180 ? 1 : 0;

            const pathD = `M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArc} 1 ${x2} ${y2} Z`;

            const textAngle = startAngle + segmentAngle / 2;
            const textRad = (textAngle * Math.PI) / 180;
            const textX = 150 + 90 * Math.cos(textRad);
            const textY = 150 + 90 * Math.sin(textRad);

            return (
              <g key={index}>
                <path d={pathD} fill={segment.color} stroke="#fff" strokeWidth="2" />
                <text
                  x={textX}
                  y={textY}
                  fill="#333"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="20" fill="#333" />
        </svg>
      </div>

      {result && (
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-xl font-bold">🎉 You won: {result.name}!</p>
        </div>
      )}

      <button
        onClick={handleSpin}
        disabled={!canSpin || isSpinning || !walletAddress}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? 'Spinning...' : canSpin ? 'SPIN!' : 'Check in first'}
      </button>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Wheel.tsx
git commit -m "feat: add animated wheel component with SVG rendering"
```

---

## Phase 6: Main Page Integration

### Task 14: Create Main Page

**Files:**
- Modify: `web3-engagement/src/app/page.tsx`

**Step 1: Update main page**

Modify `src/app/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { CheckIn } from '@/components/CheckIn';
import { Wheel } from '@/components/Wheel';
import { useBalanceGate } from '@/hooks/useBalanceGate';

export default function Home() {
  const { walletAddress, hasMinBalance, currentBalance, chain } = useBalanceGate();
  const [canSpin, setCanSpin] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      setCanSpin(false);
      return;
    }

    const fetchStatus = async () => {
      const response = await fetch(`/api/checkin?walletAddress=${walletAddress}`);
      const data = await response.json();
      setCanSpin(data.canSpin);
    };

    fetchStatus();
  }, [walletAddress]);

  const handleCheckInSuccess = () => {
    setCanSpin(true);
  };

  const handleSpinComplete = () => {
    setCanSpin(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Web3 Engagement Platform
        </h1>

        <div className="max-w-md mx-auto space-y-8">
          {/* Wallet Connection */}
          <section className="bg-white/10 backdrop-blur rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Connect Wallet
            </h2>
            <WalletConnect />
          </section>

          {/* Balance Status */}
          {walletAddress && (
            <section className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">Balance Status</h2>
              <p>
                Chain: <span className="font-mono">{chain}</span>
              </p>
              <p>
                Balance: <span className="font-mono">{currentBalance.toFixed(4)}</span>
              </p>
              <p>
                Status:{' '}
                {hasMinBalance ? (
                  <span className="text-green-400">✓ Eligible</span>
                ) : (
                  <span className="text-red-400">✗ Below minimum</span>
                )}
              </p>
            </section>
          )}

          {/* Check-in */}
          {walletAddress && hasMinBalance && (
            <section>
              <CheckIn onCheckInSuccess={handleCheckInSuccess} />
            </section>
          )}

          {/* Wheel */}
          {walletAddress && hasMinBalance && (
            <section className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Spin to Win
              </h2>
              <Wheel
                walletAddress={walletAddress}
                canSpin={canSpin}
                onSpinComplete={handleSpinComplete}
              />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate wallet, check-in, and wheel on main page"
```

---

### Task 15: Seed Prize Data

**Files:**
- Create: `web3-engagement/prisma/seed.ts`
- Modify: `web3-engagement/package.json`

**Step 1: Create seed script**

Create `prisma/seed.ts`:

```tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing prizes
  await prisma.prize.deleteMany();

  // Seed prizes
  const prizes = [
    { name: '5 Points', type: 'points', probability: 0.25, value: '5' },
    { name: '10 Points', type: 'points', probability: 0.20, value: '10' },
    { name: '25 Points', type: 'points', probability: 0.15, value: '25' },
    { name: '50 Points', type: 'points', probability: 0.10, value: '50' },
    { name: '100 Points', type: 'points', probability: 0.05, value: '100' },
    { name: 'Try Again', type: 'empty', probability: 0.20, value: null },
    { name: 'NFT Reward', type: 'nft', probability: 0.04, quantity: 100, value: 'common-nft' },
    { name: 'Jackpot!', type: 'token', probability: 0.01, quantity: 10, value: '1000' },
  ];

  for (const prize of prizes) {
    await prisma.prize.create({ data: prize });
  }

  console.log('Seeded prizes successfully');

  // Seed default config
  await prisma.config.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      minBalanceSOL: 0.1,
      minBalanceETH: 0.01,
      checkInResetDays: 1,
    },
  });

  console.log('Seeded config successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Step 2: Add seed script to package.json**

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

**Step 3: Install tsx and run seed**

```bash
pnpm add -D tsx
npx prisma db push
npx prisma db seed
```

**Step 4: Commit**

```bash
git add prisma/seed.ts package.json
git commit -m "feat: add prize and config seed data"
```

---

## Phase 7: Final Setup

### Task 16: Create Environment Example

**Files:**
- Create: `web3-engagement/.env.example`

**Step 1: Create env example**

Create `.env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/web3engagement?schema=public"

# WalletConnect (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_project_id"

# Solana RPC (optional, defaults to devnet)
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
```

**Step 2: Update .gitignore**

Ensure `.env` is in `.gitignore`:

```
.env
.env.local
```

**Step 3: Commit**

```bash
git add .env.example .gitignore
git commit -m "docs: add environment example file"
```

---

### Task 17: Create README

**Files:**
- Create: `web3-engagement/README.md`

**Step 1: Create README**

Create `README.md`:

```markdown
# Web3 Engagement Platform

A white-label Web3 engagement platform with wallet login, balance gating, daily check-ins, and wheel game.

## Features

- **Multi-chain wallet support**: Solana (Phantom, Solflare) + EVM (MetaMask, WalletConnect)
- **Balance gating**: Minimum crypto required to participate
- **Daily check-in**: Streak tracking with milestone rewards
- **Wheel game**: Spin to win with configurable prizes

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your database URL and WalletConnect project ID

4. Push database schema:
   ```bash
   npx prisma db push
   ```

5. Seed prize data:
   ```bash
   npx prisma db seed
   ```

6. Start development server:
   ```bash
   pnpm dev
   ```

## Configuration

Edit `prisma/seed.ts` to customize:
- Prize types and probabilities
- Minimum balance requirements
- Streak milestones

## Deployment

1. Set production `DATABASE_URL`
2. Run `pnpm build`
3. Deploy to Vercel, Railway, or your preferred platform
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup instructions"
```

---

## Summary

**Total Tasks:** 17

**Phases:**
1. Project Setup (Tasks 1-2)
2. Wallet Integration (Tasks 3-7)
3. Balance Gate (Tasks 8-9)
4. Check-in System (Tasks 10-11)
5. Wheel Game (Tasks 12-13)
6. Main Page Integration (Tasks 14-15)
7. Final Setup (Tasks 16-17)

**Estimated commits:** 17 atomic commits

**Key deliverables:**
- Multi-chain wallet connection (Solana + EVM)
- Balance verification gate
- Daily check-in with streak tracking
- Animated wheel game
- Prize management system
- Ready-to-deploy Next.js application
