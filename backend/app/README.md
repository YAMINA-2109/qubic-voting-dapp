# Backend Plan - Qubic Voting dApp

## Goal
Provide REST API for voting and AI analysis.

## Endpoints

### POST /vote
- Input: userID, choice, comment
- Steps:
  - Call Qubic CLI to store vote on testnet
  - Run NLP sentiment analysis on comment
- Output:
  - status
  - transaction_id
  - sentiment result

### GET /votes
- Call Qubic CLI to get votes from testnet
- Return list of votes

## NLP Component
- transformers pipeline: sentiment-analysis
- Optional: toxicity detection
- Example:
  from transformers import pipeline
  analyzer = pipeline("sentiment-analysis")
  result = analyzer("I support this")

## Data Model

Input:
{
  "userID": "user123",
  "choice": "YES",
  "comment": "I support this law"
}

Output:
{
  "status": "success",
  "transaction_id": "abc123",
  "sentiment": {
    "label": "POSITIVE",
    "score": 0.98
  }
}

## Steps
1. Create FastAPI app
2. Install transformers
3. Define POST /vote
4. Run sentiment analysis
5. Call Qubic CLI
6. Define GET /votes
7. Return JSON

## Expected Result
- User posts a vote → gets confirmation + AI analysis
- User fetches votes → sees on-chain results
