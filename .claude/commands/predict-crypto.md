---
description: Predict crypto price (BTC/ETH/SOL/BNB) for multiple timeframes
---

# Crypto Price Prediction

## Step 1: Ask User

Use AskUserQuestion to ask:

**Which coin?**
- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- BNB (BNB Chain)

## Step 2: Web Research

Search for the selected coin:
- Current price
- Analyst price predictions/targets for short, medium, and long term
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

## Step 4: Generate Predictions

Generate predictions for ALL timeframes: 1 week, 2 weeks, 3 weeks, 1 month, 3 months, 6 months, 1 year.

Output format:

```markdown
## [COIN] Price Predictions

**Current Price:** $XX,XXX ([today's date])

| Timeframe | Target Date | Prediction | Change |
|-----------|-------------|------------|--------|
| 1 week    | [date]      | $XX,XXX    | +X%    |
| 2 weeks   | [date]      | $XX,XXX    | +X%    |
| 3 weeks   | [date]      | $XX,XXX    | +X%    |
| 1 month   | [date]      | $XX,XXX    | +X%    |
| 3 months  | [date]      | $XX,XXX    | +X%    |
| 6 months  | [date]      | $XX,XXX    | +X%    |
| 1 year    | [date]      | $XX,XXX    | +X%    |

**Reasoning:** [3-4 sentences explaining the predictions based on research and analysis]

*Sources: [list key sources used]*
```

## Step 5: Save to Daily

Append the prediction to `daily/YYMMDD.md` where YYMMDD is today's date (e.g., `251229`).

If file doesn't exist, create it with header `# Daily Notes - [date]`.

## Important Notes

- Be clear this is analysis, not financial advice
- Cite specific analyst predictions when possible
- Commit to ONE exact price per timeframe - no hedging with ranges
- Verify current price from CoinGecko or CoinMarketCap before calculating
- Shorter timeframes should show smaller changes, longer timeframes can show larger moves
