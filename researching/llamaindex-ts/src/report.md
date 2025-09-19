# Event Storming to Draw.io XML Generator

## LLM Pricing

**Standard** _Prices per 1M tokens_

| Model       | Input | Cached input | Output |
| ----------- | ----- | ------------ | ------ |
| gpt-4o      | $2.50 | $1.25        | $10.00 |
| gpt-4o-mini | $0.15 | $0.075       | $0.60  |

## Model Specifications

| Use case         | Model       | Time  | Request Tokens | Response Tokens | Request cost | Response cost | Total cost | Quality |
| ---------------- | ----------- | ----- | -------------- | --------------- | ------------ | ------------- | ---------- | ------- |
| GSM Booking      | gpt-4o-mini |       |                |                 |              |               |            | ❌      |
| GSM Booking      | gpt-4o      | 27.6s | ~1897t         | ~3310t          | $0.009485    | $0.04965      | $0.0592    | ✅      |
| GSM Registration | gpt-4o      | 26.2s | ~5864t         | ~3221t          | $0.02932     | $0.048315     | $0.0776    | ✅      |
