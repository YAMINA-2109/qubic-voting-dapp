# NLP Component Plan - Qubic Voting dApp

## Goal
Analyze the text comment of a vote to produce sentiment analysis.

## Use Case
- User writes a comment when voting.
- The backend runs NLP analysis.
- Returns sentiment label (POSITIVE, NEGATIVE, NEUTRAL) and confidence score.

## Technology
- Language: Python
- Library: transformers (Hugging Face)
- Model: distilbert-base-uncased-finetuned-sst-2-english

## Example Code
from transformers import pipeline

analyzer = pipeline("sentiment-analysis")
result = analyzer("I strongly support this")
print(result)
# Output: [{'label': 'POSITIVE', 'score': 0.98}]

## Integration in FastAPI
- Define function analyze_comment(comment)
- Call Hugging Face pipeline
- Return result

## Expected Result
- Simple, fast, no training needed.
- Runs locally with minimal resources.
- Makes the voting app smarter and more engaging.
