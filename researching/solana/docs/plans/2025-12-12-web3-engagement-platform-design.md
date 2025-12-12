# Web3 Engagement Platform - Design Document

## Overview

A white-label Web3 engagement platform that you build and deploy for clients. Combines wallet authentication, balance gating, daily check-ins, and gamification (wheel game) to drive user engagement for crypto communities.

## Target Market

- Clients with budget who want engagement/reward campaigns
- Gen Z entrepreneurs who understand blockchain
- NFT projects, token communities, crypto brands

## Core Features

### 1. Wallet Login

Connect via multiple wallet providers:
- **Solana:** Phantom, Solflare
- **EVM (Ethereum, BSC, etc.):** MetaMask, WalletConnect

### 2. Balance Gate

Users must hold minimum X crypto to participate.
- Configurable threshold per deployment
- Checks wallet balance on-chain
- Blocks users below threshold with clear message

### 3. Daily Check-in System

| Element | Detail |
|---------|--------|
| Frequency | Once per 24 hours |
| Streak tracking | Count consecutive days checked in |
| Rewards | Configurable per day/milestone |
| Storage | Wallet address + last check-in timestamp |
| Reset rule | Miss a day = streak resets to 0 |

**Reward tiers example:**
- Day 1-6: Small reward
- Day 7: Bonus reward
- Day 30: Big milestone reward

### 4. Wheel Game

| Element | Detail |
|---------|--------|
| Trigger | After check-in or separate action |
| Segments | 6-8 prize slots |
| Odds | Configurable probability per segment |
| Result | Server-side random selection |
| Limit | 1 spin per day |

**Prize types:**
- Points
- Tokens
- NFTs
- Physical rewards
- "Try again" / empty slot

## User Flow

```
Connect Wallet → Check Balance → Gate Pass? → Check-in → Spin Wheel → Prize
```

1. User visits site
2. Connects wallet
3. System checks balance >= minimum
4. If yes: can check-in and spin wheel
5. If no: blocked with message

## Technical Architecture

### Frontend
- React / Next.js
- Solana: `@solana/wallet-adapter`
- EVM: `wagmi` or `web3modal`
- Wheel UI component (animated)

### Backend
- Node.js API (or serverless functions)
- Handles: balance check, check-in logic, wheel spin, prize distribution
- Database: PostgreSQL or MongoDB

### Data Model

**Users**
| Field | Type |
|-------|------|
| wallet_address | string (primary key) |
| created_at | timestamp |

**Check-ins**
| Field | Type |
|-------|------|
| wallet_address | string |
| check_in_date | date |
| streak_count | integer |

**Spins**
| Field | Type |
|-------|------|
| wallet_address | string |
| spin_date | date |
| prize_won | string |

**Prizes**
| Field | Type |
|-------|------|
| name | string |
| type | enum (points, token, nft, physical, empty) |
| probability | float (0-1) |
| quantity | integer (null = unlimited) |

### Blockchain Interaction
- **Read:** Check wallet balance (SOL, tokens)
- **Write (optional):** Distribute token/NFT rewards on-chain

## Deliverables to Client

1. Deployed web application
2. Admin panel to configure:
   - Minimum balance threshold
   - Prizes and probabilities
   - Reward tiers
3. Documentation for their team

## Future Considerations (Not in Scope)

- Leaderboards
- Referral system
- Multi-chain support expansion
- On-chain reward distribution automation
