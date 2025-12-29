---
description: Predict crypto price (BTC/ETH/SOL/BNB) for 1-3 months
---

# Crypto Price Prediction

## Step 1: Ask User

Use AskUserQuestion to ask two questions:

1. **Which coin?**
   - BTC (Bitcoin)
   - ETH (Ethereum)
   - SOL (Solana)
   - BNB (BNB Chain)

2. **Prediction horizon?**
   - 1 month
   - 2 months
   - 3 months

## Step 2: Web Research

Search for the selected coin:
- Current price
- Analyst price predictions/targets for the timeframe
- Recent news and developments
- Market sentiment (fear/greed, social sentiment)
- Key upcoming events (upgrades, ETF decisions, unlocks)

## Step 3: AI Analysis

Analyze based on research:
- Market cycle position (accumulation/markup/distribution)
- Technical patterns and support/resistance levels
- Macro factors (rates, liquidity, dollar strength)
- On-chain trends if available
- Compare analyst consensus with your reasoning

## Step 4: Generate Prediction

Output format:

```markdown
## [COIN] Price Prediction ([X] months)

**Current Price:** $XX,XXX ([today's date])
**Target Date:** [Month Year]

**Prediction: $XX,XXX** (+XX%)

**Reasoning:** [2-3 sentences explaining the prediction based on research and analysis]

*Sources: [list key sources used]*
```

## Step 5: Save to Daily

Append the prediction to `daily/YYMMDD.md` where YYMMDD is today's date (e.g., `251229`).

If file doesn't exist, create it with header `# Daily Notes - [date]`.

## Important Notes

- Be clear this is analysis, not financial advi
- Cite specific analyst predictions when possible
- Commit to ONE exact price - no hedging with ranges
- Verify current price from CoinGecko or CoinMarketCap before calculating
