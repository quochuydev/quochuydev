# Building generative AI models

## Fine-tunning a Model

```json
{
  "prompt": "What is the name of the company?",
  "candidate_labels": [
    "OCBC Bank",
    "OCBC",
    "Oversea-Chinese Banking Corporation Limited"
  ],
  "candidate_scores": [0.99, 0.98, 0.97]
}
```

```json
{
  "prompt": "What is AWS?",
  "completion": "Amazon Web Services (AWS) is a subsidiary of Amazon that provides on-demand cloud computing platforms and other infrastructure services to individuals, companies, and governments, on a metered pay-as-you-go basis."
}
```

```json
{
  "input": "Amazon Web Services (AWS) is a subsidiary of Amazon that provides on-demand cloud computing platforms and other infrastructure services to individuals, companies, and governments, on a metered pay-as-you-go basis."
}
```

## RAG - Retrieval Augmented Generation

1. S3 bucket -- Data source --> Knowledge base --> Vector DB

2. User --> Who is the product manager of the company? --> Prompt

3. Prompt -- Search for relevant information --> Knowledge base

4. Knowledge base -- retrieval of relevant information (Retrieval text) --> Prompt

Retrieval of relevant information:

Retrieval text
Company information:

- Product manager: Jennie
- Product designer: Lisa
- Engineering: John

5. Prompt -- _Query_ + Retrieval text --> Foundation model

6. Foundation model -- generate response --> _Response_ Jennie is the product manager of the company.
