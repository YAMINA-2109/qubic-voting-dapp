# Qubic Voting dApp - Backend

Simple FastAPI backend for voting with sentiment analysis.

## Features

- FastAPI server
- Sentiment Analysis with Hugging Face Transformers
- Endpoint `/vote` to analyze comment sentiment

## Tech

- Python 3.10
- FastAPI
- Uvicorn
- Transformers

## Setup

```bash
conda create -n qubic-voting-env python=3.10
conda activate qubic-voting-env
pip install -r requirements.txt
uvicorn main:app --reload
```
